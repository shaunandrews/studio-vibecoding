/**
 * Phase 2: Pipeline Orchestrator
 *
 * Orchestrates the AI generation flow:
 *   theme (sequential) → template parts (sequential) → pages (parallel, max 3 concurrent)
 *
 * Each step uses the Anthropic SDK directly with generation-specific prompts.
 * Retry logic: 2 retries per step with exponential backoff.
 * Theme/templatePart failure is fatal, page failure is non-fatal.
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
import { parseGenerationResponse, parseGenerationStream } from './ai-service'
import {
  buildGenerationSystemPrompt,
  buildThemePrompt,
  buildTemplatePartsPrompt,
  buildPagePrompt,
  getPagesForSiteType,
} from './generation-prompts'

const MAX_RETRIES = 2
const MAX_CONCURRENT_PAGES = 3
const RETRY_DELAYS = [1000, 3000] // exponential backoff

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
    } else {
      // No theme block found — fatal
      themeStep.status = 'error'
      themeStep.error = 'AI did not return a valid theme'
      return this.fail()
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
    this.onStateChange(JSON.parse(JSON.stringify(this.state)))
  }

  private fail(): PipelineState {
    this.state.status = 'error'
    this.notify()
    return this.state
  }

  /**
   * Execute a single pipeline step with streaming + retry.
   * Uses a loop instead of recursion for retries, with exponential backoff.
   */
  private async executeStep(
    step: PipelineStep,
    buildPrompt: () => string,
  ): Promise<void> {
    while (true) {
      if (this.aborted) return

      step.status = 'generating'
      this.notify()

      const systemPrompt = buildGenerationSystemPrompt(this.state.brief, this.state.theme)
      const prompt = buildPrompt()
      const messages: { role: 'user' | 'assistant'; content: string }[] = [
        { role: 'user', content: prompt },
      ]

      try {
        const rawBlocks = await this.streamAndCapture(messages, systemPrompt, step)
        step.artifacts = rawBlocks
        step.status = 'complete'
        this.notify()
        return
      } catch (err) {
        step.error = err instanceof Error ? err.message : 'Unknown error'

        if (step.retryCount < MAX_RETRIES) {
          const delayMs = RETRY_DELAYS[step.retryCount] ?? 3000
          step.retryCount++
          step.status = 'retrying'
          this.notify()
          await this.delay(delayMs)
          continue
        }

        step.status = 'error'
        this.notify()
        return
      }
    }
  }

  /**
   * Extract sections from step artifacts into state.pages for a given page config.
   * Called both during streaming (incremental) and after completion.
   */
  private extractPageSections(step: PipelineStep, pageConfig: PageConfig): void {
    const sanitizedSlug = pageConfig.slug.replace(/\//g, '') || 'home'
    const sections: Section[] = []
    let sectionIndex = 0
    for (const block of step.artifacts) {
      if (block.type === 'section') {
        sections.push({
          id: `${sanitizedSlug}-section-${sectionIndex++}`,
          type: block.sectionType,
          data: block.data as Record<string, any>,
        })
      }
    }
    this.state.pages[pageConfig.slug] = sections
  }

  /**
   * Execute a page generation step. Extracts sections into state.pages
   * both during streaming (via onArtifactsUpdated) and after completion.
   */
  private async executePageStep(step: PipelineStep, pageConfig: PageConfig): Promise<void> {
    // Hook into artifact updates during streaming so pages update incrementally
    const originalNotify = this.notify.bind(this)
    const origExtract = () => this.extractPageSections(step, pageConfig)
    const patchedNotify = () => {
      origExtract()
      originalNotify()
    }
    // Temporarily patch notify to extract page sections before each notification
    const savedNotify = this.notify
    this.notify = patchedNotify as typeof this.notify

    await this.executeStep(step, () => buildPagePrompt(pageConfig, this.state.brief))

    // Restore original notify
    this.notify = savedNotify

    if (step.status === 'complete') {
      this.extractPageSections(step, pageConfig)
      this.notify()
    }
  }

  /**
   * Stream AI and capture the raw text for generation parsing.
   * Emits incremental section updates during streaming via onStateChange.
   * Throws on missing API key or API errors.
   */
  private async streamAndCapture(
    messages: { role: 'user' | 'assistant'; content: string }[],
    systemPrompt: string,
    step: PipelineStep,
  ): Promise<ParsedAIBlock[]> {
    let rawText = ''

    const { getAPIKey } = await import('./ai-service')
    const apiKey = getAPIKey()

    if (!apiKey) {
      throw new Error('No API key configured. Add your Anthropic API key in settings.')
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

    let lastBlockCount = 0

    stream.on('text', (text) => {
      rawText += text

      // Parse incrementally to detect new section blocks arriving
      const blocks = parseGenerationStream(rawText)
      const sectionBlocks = blocks.filter(b => b.type === 'section' || b.type === 'theme' || b.type === 'templatePart')

      // If new blocks appeared, update step artifacts and notify
      if (sectionBlocks.length > lastBlockCount) {
        lastBlockCount = sectionBlocks.length
        step.artifacts = blocks
        this.notify()
      }
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
