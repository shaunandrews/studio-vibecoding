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
import type { Section } from './sections/types'

// Module-level singleton state (shared across components like other composables)
const pipelineState = shallowRef<PipelineState | null>(null)
const skeletonSlots = ref<SkeletonSlot[]>([])
const activePage = ref<string>('/')
const isRunning = ref(false)
const error = ref<string | null>(null)

let currentOrchestrator: PipelineOrchestrator | null = null
let pageConfigs: PageConfig[] = []

// Progress card data for chat integration
const progressCardData = ref<ProgressCardData | null>(null)

// Callbacks for chat integration
let onProgressUpdate: ((data: ProgressCardData) => void) | null = null
let onComplete: ((state: PipelineState) => void) | null = null
let onError: ((message: string) => void) | null = null

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
  if (sections) {
    const currentSlots = [...skeletonSlots.value]
    sections.forEach((section: Section, i: number) => {
      if (currentSlots[i] && currentSlots[i].status !== 'complete') {
        skeletonSlots.value = completeSlot(currentSlots, i, section)
      }
    })
  }

  // Update progress card
  const card = buildProgressCard(state)
  progressCardData.value = card
  onProgressUpdate?.(card)

  // Check for completion or error
  if (state.status === 'complete') {
    isRunning.value = false
    onComplete?.(state)
  } else if (state.status === 'error') {
    isRunning.value = false
    const failedStep = state.steps.find(s => s.status === 'error')
    const msg = failedStep?.error || 'Pipeline failed'
    error.value = msg
    onError?.(msg)
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
  async function startBuild(brief: CreativeBrief): Promise<void> {
    // Check API key first (unless mock mode)
    if (!isAIConfigured()) {
      error.value = 'No API key configured. Add your Anthropic API key in settings, or use demo mode.'
      onError?.(error.value)
      return
    }

    error.value = null
    isRunning.value = true

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

  /**
   * Start a mock/demo build without an API key.
   * Uses the first mock site's data to simulate pipeline output.
   */
  async function startMockBuild(brief: CreativeBrief): Promise<void> {
    error.value = null
    isRunning.value = true

    pageConfigs = getPagesForSiteType(brief.siteType)
    activePage.value = pageConfigs[0]?.slug ?? '/'
    createSlotsForPage(activePage.value)

    // Simulate pipeline with delays
    const mockState: PipelineState = {
      status: 'running',
      steps: [],
      brief,
      templateParts: {},
      pages: {},
    }

    // Step 1: theme (fake delay)
    mockState.steps.push({ id: 'theme', status: 'generating', label: 'Design theme', artifacts: [], retryCount: 0 })
    handleStateChange({ ...mockState })
    await delay(1200)

    // Use a default theme
    const { normalizeTheme } = await import('./ai-pipeline-types')
    mockState.theme = normalizeTheme({
      color: {
        palette: [
          { slug: 'primary', name: 'Primary', hex: '#2563eb' },
          { slug: 'secondary', name: 'Secondary', hex: '#7c3aed' },
          { slug: 'base', name: 'Base', hex: '#ffffff' },
          { slug: 'contrast', name: 'Contrast', hex: '#1e293b' },
        ],
        background: '#ffffff',
        text: '#1e293b',
      },
      typography: {
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { hero: '3rem', xlarge: '2rem', large: '1.25rem', medium: '1rem', small: '0.875rem' },
      },
    })
    mockState.steps[0]!.status = 'complete'

    // Step 2: template parts
    mockState.steps.push({ id: 'templateParts', status: 'generating', label: 'Header & footer', artifacts: [], retryCount: 0 })
    handleStateChange({ ...mockState })
    await delay(800)

    mockState.templateParts = {
      header: { navItems: pageConfigs.map(p => ({ label: p.title, page: p.slug })) },
      footer: { tagline: `© ${brief.siteName}`, address: '123 Demo Street' },
    }
    mockState.steps[1]!.status = 'complete'
    handleStateChange({ ...mockState })

    // Step 3: pages
    for (const page of pageConfigs) {
      const stepId = `page:${page.slug}`
      mockState.steps.push({ id: stepId, status: 'generating', label: page.title, artifacts: [], retryCount: 0 })
      handleStateChange({ ...mockState })
      await delay(600)

      // Generate simple mock sections
      const sections: Section[] = page.suggestedSections.map((type, i) => ({
        id: `${page.slug.replace(/\//g, '') || 'home'}-section-${i}`,
        type,
        data: generateMockSectionData(type, brief),
      }))
      mockState.pages[page.slug] = sections
      const step = mockState.steps.find(s => s.id === stepId)
      if (step) step.status = 'complete'

      // Update slots for active page
      if (page.slug === activePage.value) {
        const currentSlots = [...skeletonSlots.value]
        sections.forEach((section, i) => {
          skeletonSlots.value = completeSlot(currentSlots, i, section)
        })
      }

      handleStateChange({ ...mockState })
    }

    mockState.status = 'complete'
    handleStateChange({ ...mockState })
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

  /** Register callbacks for chat integration */
  function onProgress(cb: (data: ProgressCardData) => void): void {
    onProgressUpdate = cb
  }

  function onBuildComplete(cb: (state: PipelineState) => void): void {
    onComplete = cb
  }

  function onBuildError(cb: (message: string) => void): void {
    onError = cb
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
    startMockBuild,
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function generateMockSectionData(type: string, brief: CreativeBrief): Record<string, any> {
  const name = brief.siteName
  switch (type) {
    case 'hero-split':
      return {
        heading: `Welcome to ${name}`,
        tagline: brief.description,
        image: { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop', alt: name },
      }
    case 'hero-simple':
      return { heading: name }
    case 'hero-fullwidth':
      return {
        image: { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=400&fit=crop', alt: name },
      }
    case 'content-cards':
      return {
        heading: 'What We Offer',
        cards: [
          { title: 'Quality', body: 'The best in class.' },
          { title: 'Service', body: 'Always here for you.' },
          { title: 'Value', body: 'Fair pricing, always.' },
        ],
      }
    case 'content-prose':
      return {
        heading: `About ${name}`,
        body: `<p>${brief.description}</p><p>We're passionate about what we do and committed to excellence.</p>`,
      }
    case 'contact-info':
      return {
        heading: 'Get in Touch',
        address: '123 Main Street, Anytown, USA',
        phone: '(555) 123-4567',
        email: 'hello@example.com',
        hours: [
          { label: 'Monday–Friday', value: '9:00 AM – 5:00 PM' },
          { label: 'Saturday–Sunday', value: 'Closed' },
        ],
      }
    case 'cta-banner':
      return {
        text: `Visit ${name} today!`,
        linkText: 'Get Started',
        linkPage: '/',
      }
    case 'menu-list':
      return {
        variant: 'columns',
        categories: [
          {
            name: 'Featured',
            items: [
              { name: 'Item One', price: '$10', description: 'A popular choice.' },
              { name: 'Item Two', price: '$12', description: 'Another great option.' },
            ],
          },
        ],
      }
    case 'team-grid':
      return {
        heading: 'Our Team',
        members: [
          { name: 'Alex Johnson', role: 'Founder', bio: 'Passionate leader.', initials: 'AJ' },
          { name: 'Sam Lee', role: 'Designer', bio: 'Creative thinker.', initials: 'SL' },
        ],
      }
    case 'event-list':
      return {
        heading: 'Upcoming Events',
        events: [
          {
            date: { month: 'MAR', day: '15', dow: 'SAT' },
            title: 'Grand Opening',
            meta: '6:00 PM – 9:00 PM',
            description: 'Join us for our grand opening celebration!',
          },
        ],
      }
    case 'image-gallery':
      return {
        heading: 'Gallery',
        images: [
          { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop', alt: 'Photo 1' },
          { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', alt: 'Photo 2' },
        ],
      }
    case 'image-strip':
      return {
        images: [
          { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', alt: 'Photo 1' },
          { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', alt: 'Photo 2' },
          { src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop', alt: 'Photo 3' },
        ],
      }
    default:
      return { heading: type }
  }
}
