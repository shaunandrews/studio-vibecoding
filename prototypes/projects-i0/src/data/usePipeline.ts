/**
 * Phase 2: Pipeline Composable
 *
 * Provides reactive pipeline state to Vue components.
 * Bridges PipelineOrchestrator → Vue reactivity (ref/computed).
 * Consumed by ProjectPage to feed both AgentPanel and SitePreview.
 */

import { ref, computed, shallowRef, type Ref } from 'vue'
import type { PipelineState, SkeletonSlot, CreativeBrief, PageConfig } from './ai-pipeline-types'
import type { ProgressCardData } from './types'
import { PipelineOrchestrator } from './pipeline'
import { createSkeletonSlots, completeSlot } from './progressive-renderer'
import { getPagesForSiteType } from './generation-prompts'
import { isAIConfigured } from './ai-service'
import { persistPipelineResult } from './generated-sites'
import type { Section } from './sections/types'

// Module-level singleton state (shared across components like other composables)
const pipelineState = shallowRef<PipelineState | null>(null)
const skeletonSlots = ref<SkeletonSlot[]>([])
const activePage = ref<string>('/')
const isRunning = ref(false)
const error = ref<string | null>(null)

let currentOrchestrator: PipelineOrchestrator | null = null
let pageConfigs: PageConfig[] = []
let currentProjectId: string | null = null

// Progress card data for chat integration
const progressCardData = ref<ProgressCardData | null>(null)

// Callback arrays for chat integration (fix: last-writer-wins → arrays)
const onProgressCallbacks: Array<(data: ProgressCardData) => void> = []
const onCompleteCallbacks: Array<(state: PipelineState) => void> = []
const onErrorCallbacks: Array<(message: string) => void> = []

function buildProgressCard(state: PipelineState): ProgressCardData {
  return {
    label: 'Building your site…',
    steps: state.steps.map(s => ({
      name: s.label,
      status: s.status === 'complete' ? 'done' as const
        : s.status === 'generating' || s.status === 'retrying' ? 'running' as const
        : s.status === 'error' ? 'error' as const
        : 'pending' as const,
    })),
  }
}

function handleStateChange(state: PipelineState): void {
  // Deep clone to ensure Vue reactivity triggers
  pipelineState.value = JSON.parse(JSON.stringify(state))

  // Update skeleton slots from page sections as they arrive
  const currentPageSlug = activePage.value
  const sections = state.pages[currentPageSlug]
  if (sections && sections.length > 0) {
    let currentSlots = [...skeletonSlots.value]
    sections.forEach((section: Section, i: number) => {
      if (currentSlots[i] && currentSlots[i].status !== 'complete') {
        currentSlots = completeSlot(currentSlots, i, section)
      }
    })
    skeletonSlots.value = currentSlots
  }

  // Update progress card
  const card = buildProgressCard(state)
  progressCardData.value = card
  for (const cb of onProgressCallbacks) cb(card)

  // Check for completion or error
  if (state.status === 'complete') {
    isRunning.value = false
    // Persist generated site data
    if (currentProjectId) {
      persistPipelineResult(currentProjectId, state)
    }
    for (const cb of onCompleteCallbacks) cb(state)
  } else if (state.status === 'error') {
    isRunning.value = false
    const failedStep = state.steps.find(s => s.status === 'error')
    const msg = failedStep?.error || 'Pipeline failed'
    error.value = msg
    for (const cb of onErrorCallbacks) cb(msg)
  }
}

function createSlotsForPage(pageSlug: string): void {
  const config = pageConfigs.find(p => p.slug === pageSlug)
  if (config) {
    const sanitizedSlug = config.slug.replace(/\//g, '') || 'home'
    skeletonSlots.value = createSkeletonSlots(config.suggestedSections, sanitizedSlug)
  }
}

export function usePipeline() {
  /**
   * Start a build from a creative brief.
   * Returns content blocks for the progress card to inject into chat.
   */
  async function startBuild(brief: CreativeBrief, projectId?: string): Promise<void> {
    // Check API key first (unless mock mode)
    if (!isAIConfigured()) {
      error.value = 'No API key configured. Add your Anthropic API key in settings, or use demo mode.'
      for (const cb of onErrorCallbacks) cb(error.value)
      return
    }

    error.value = null
    isRunning.value = true
    currentProjectId = projectId ?? null

    // Determine pages for this site type
    pageConfigs = getPagesForSiteType(brief.siteType)

    // Create skeleton slots for the first page
    activePage.value = pageConfigs[0]?.slug ?? '/'
    createSlotsForPage(activePage.value)

    // Create orchestrator
    currentOrchestrator = new PipelineOrchestrator(brief, handleStateChange)

    // Run pipeline
    await currentOrchestrator.start()
  }

  function abort(): void {
    currentOrchestrator?.abort()
    isRunning.value = false
  }

  /** Switch which page's skeleton slots are displayed */
  function setActivePage(slug: string): void {
    activePage.value = slug
    const state = pipelineState.value
    if (!state) return

    // If page already has sections, show them completed
    const sections = state.pages[slug]
    if (sections && sections.length > 0) {
      const config = pageConfigs.find(p => p.slug === slug)
      const sanitizedSlug = slug.replace(/\//g, '') || 'home'
      const slots = createSkeletonSlots(
        config?.suggestedSections ?? sections.map(s => s.type),
        sanitizedSlug,
      )
      let current = slots
      sections.forEach((section, i) => {
        current = completeSlot(current, i, section)
      })
      skeletonSlots.value = current
    } else {
      createSlotsForPage(slug)
    }
  }

  /** Register callbacks for chat integration (supports multiple listeners) */
  function onProgress(cb: (data: ProgressCardData) => void): () => void {
    onProgressCallbacks.push(cb)
    return () => {
      const idx = onProgressCallbacks.indexOf(cb)
      if (idx >= 0) onProgressCallbacks.splice(idx, 1)
    }
  }

  function onBuildComplete(cb: (state: PipelineState) => void): () => void {
    onCompleteCallbacks.push(cb)
    return () => {
      const idx = onCompleteCallbacks.indexOf(cb)
      if (idx >= 0) onCompleteCallbacks.splice(idx, 1)
    }
  }

  function onBuildError(cb: (message: string) => void): () => void {
    onErrorCallbacks.push(cb)
    return () => {
      const idx = onErrorCallbacks.indexOf(cb)
      if (idx >= 0) onErrorCallbacks.splice(idx, 1)
    }
  }

  /** Feed context data from chat card:context blocks */
  function updateContext(data: Record<string, unknown>): void {
    currentOrchestrator?.updateContext(data)
  }

  const isProgressiveMode = computed(() =>
    pipelineState.value !== null && pipelineState.value.status !== 'idle',
  )

  return {
    // State
    pipelineState: pipelineState as Readonly<Ref<PipelineState | null>>,
    skeletonSlots: skeletonSlots as Readonly<Ref<SkeletonSlot[]>>,
    isRunning: isRunning as Readonly<Ref<boolean>>,
    error: error as Readonly<Ref<string | null>>,
    progressCardData: progressCardData as Readonly<Ref<ProgressCardData | null>>,
    isProgressiveMode,

    // Actions
    startBuild,
    abort,
    setActivePage,
    updateContext,

    // Callbacks
    onProgress,
    onBuildComplete,
    onBuildError,
  }
}

// ---- Helpers ----

