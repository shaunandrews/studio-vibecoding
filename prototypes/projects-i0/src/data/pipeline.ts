/**
 * Phase 2: Pipeline Orchestrator
 *
 * Orchestrates the AI generation flow:
 *   theme (sequential) → template parts (sequential) → pages (parallel, max 3 concurrent)
 *
 * Each step uses streamAI from ai-service with generation-specific prompts.
 * Retry logic: 2 retries per step. Theme/templatePart failure is fatal, page failure is non-fatal.
 */

import type { Section } from './sections/types'
import type {
  PipelineState,
  PipelineStep,
  CreativeBrief,
  ParsedAIBlock,
  PageConfig,
  ContextData,
} from './ai-pipeline-types'
import { parseGenerationResponse } from './ai-service'
import {
  buildGenerationSystemPrompt,
  buildThemePrompt,
  buildTemplatePartsPrompt,
  buildPagePrompt,
  getPagesForSiteType,
} from './generation-prompts'

const MAX_RETRIES = 2
const MAX_CONCURRENT_PAGES = 3

export class PipelineOrchestrator {
  private state: PipelineState
  private onStateChange: (state: PipelineState) => void
  private aborted = false

  constructor(brief: CreativeBrief, onStateChange: (state: PipelineState) => void) {
    this.state = {
      status: 'idle',
      steps: [],
      brief,
      templateParts: {},
      pages: {},
    }
    this.onStateChange = onStateChange
  }

  getState(): PipelineState {
    return this.state
  }

  /** Abort the pipeline */
  abort(): void {
    this.aborted = true
    this.state.status = 'error'
    this.notify()
  }

  /** Update context mid-build (e.g., address from chat) */
  updateContext(data: ContextData): void {
    if (!this.state.brief.additionalContext) {
      this.state.brief.additionalContext = {}
    }
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        this.state.brief.additionalContext[key] = value
      } else if (Array.isArray(value)) {
        this.state.brief.additionalContext[key] = value.join('; ')
      }
    }
  }

  /** Run the full pipeline */
  async start(): Promise<PipelineState> {
    this.state.status = 'running'
    this.aborted = false
    this.notify()

    // Step 1: Theme
    const themeStep = this.addStep('theme', 'Design theme')
    await this.executeStep(themeStep, () => buildThemePrompt(this.state.brief))
    if (themeStep.status === 'error' || this.aborted) {
      return this.fail()
    }

    // Extract theme from artifacts
    const themeBlock = themeStep.artifacts.find(b => b.type === 'theme')
    if (themeBlock && themeBlock.type === 'theme') {
      this.state.theme = themeBlock.data
    }

    // Step 2: Template parts
    const pageConfigs = getPagesForSiteType(this.state.brief.siteType)
    const partsStep = this.addStep('templateParts', 'Header & footer')
    await this.executeStep(partsStep, () => buildTemplatePartsPrompt(this.state.brief, pageConfigs))
    if (partsStep.status === 'error' || this.aborted) {
      return this.fail()
    }

    // Extract template parts from artifacts
    for (const block of partsStep.artifacts) {
      if (block.type === 'templatePart') {
        this.state.templateParts[block.partType] = block.data
      }
    }

    // Step 3: Pages (parallel, max 3 concurrent)
    const pageSteps = pageConfigs.map(p => this.addStep(`page:${p.slug}`, p.title))
    this.notify()

    await this.executeParallel(
      pageSteps.map((step, i) => () => this.executePageStep(step, pageConfigs[i]!)),
      MAX_CONCURRENT_PAGES,
    )

    // Determine final status
    const hasPageErrors = pageSteps.some(s => s.status === 'error')
    this.state.status = hasPageErrors ? 'error' : 'complete'
    this.notify()

    return this.state
  }

  // ---- Internal ----

  private addStep(id: string, label: string): PipelineStep {
    const step: PipelineStep = {
      id,
      status: 'pending',
      label,
      artifacts: [],
      retryCount: 0,
    }
    this.state.steps.push(step)
    return step
  }

  private notify(): void {
    this.onStateChange({ ...this.state })
  }

  private fail(): PipelineState {
    this.state.status = 'error'
    this.notify()
    return this.state
  }

  /**
   * Execute a single pipeline step with streaming + retry.
   */
  private async executeStep(
    step: PipelineStep,
    buildPrompt: () => string,
  ): Promise<void> {
    if (this.aborted) return

    step.status = 'generating'
    this.notify()

    const systemPrompt = buildGenerationSystemPrompt(this.state.brief, this.state.theme)
    const prompt = buildPrompt()
    const messages: { role: 'user' | 'assistant'; content: string }[] = [
      { role: 'user', content: prompt },
    ]

    try {
      // Stream directly and capture raw text for generation parsing
      const rawBlocks = await this.streamAndCapture(messages, systemPrompt)
      step.artifacts = rawBlocks
      step.status = 'complete'
    } catch (err) {
      step.error = err instanceof Error ? err.message : 'Unknown error'

      if (step.retryCount < MAX_RETRIES) {
        step.retryCount++
        step.status = 'retrying'
        this.notify()
        await this.executeStep(step, buildPrompt)
        return
      }

      step.status = 'error'
    }

    this.notify()
  }

  /**
   * Execute a page generation step. Extracts sections into state.pages.
   */
  private async executePageStep(step: PipelineStep, pageConfig: PageConfig): Promise<void> {
    await this.executeStep(step, () => buildPagePrompt(pageConfig, this.state.brief))

    if (step.status === 'complete') {
      // Extract sections from artifacts
      const sections: Section[] = []
      let sectionIndex = 0
      for (const block of step.artifacts) {
        if (block.type === 'section') {
          sections.push({
            id: `${pageConfig.slug}-section-${sectionIndex++}`,
            type: block.sectionType,
            data: block.data as Record<string, any>,
          })
        }
      }
      this.state.pages[pageConfig.slug] = sections
      this.notify()
    }
  }

  /**
   * Stream AI and capture the raw text for generation parsing.
   * Returns ParsedAIBlock[] from the generation parser.
   */
  private async streamAndCapture(
    messages: { role: 'user' | 'assistant'; content: string }[],
    systemPrompt: string,
  ): Promise<ParsedAIBlock[]> {
    let rawText = ''

    // Use a wrapper that captures the raw streaming text
    const { getAPIKey } = await import('./ai-service')
    const apiKey = getAPIKey()

    if (!apiKey) {
      return [{ type: 'text', text: 'No API key configured.' }]
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    })

    stream.on('text', (text) => {
      rawText += text
    })

    await stream.finalMessage()

    return parseGenerationResponse(rawText)
  }

  /**
   * Execute tasks in parallel with a concurrency limit.
   */
  private async executeParallel(
    tasks: (() => Promise<void>)[],
    concurrency: number,
  ): Promise<void> {
    const executing = new Set<Promise<void>>()
    for (const task of tasks) {
      if (this.aborted) break
      const p = task().finally(() => executing.delete(p))
      executing.add(p)
      if (executing.size >= concurrency) {
        await Promise.race(executing)
      }
    }
    await Promise.all(executing)
  }
}

/**
 * Create a mock pipeline for testing without an API key.
 * Returns a pre-populated PipelineState after a short delay.
 */
export function createMockPipeline(
  brief: CreativeBrief,
  onStateChange: (state: PipelineState) => void,
): PipelineOrchestrator {
  const orchestrator = new PipelineOrchestrator(brief, onStateChange)
  return orchestrator
}
