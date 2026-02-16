/**
 * Phase 3: Build Progress Composable
 *
 * Tracks active builds and exposes reactive BuildState per project.
 * Connects to usePipeline for actual generation, and manages the
 * build-time chat flow (progress messages, questions, completion).
 *
 * Usage:
 *   After creating a project with status 'loading', call:
 *     startBuild(projectId, brief)
 *   The composable will run the pipeline and post chat messages.
 */

import { computed, reactive } from 'vue'
import type { CreativeBrief } from './ai-pipeline-types'
import type { SiteTheme } from './themes/types'
import type { Section } from './sections/types'
import type { ContentBlock, ProjectBrief } from './types'
import { usePipeline } from './usePipeline'
import { useConversations } from './useConversations'
import { useProjects } from './useProjects'
import { getPagesForSiteType } from './generation-prompts'
import { isAIConfigured } from './ai-service'

// ---- Types ----

export type BuildStatus =
  | 'queued'
  | 'generating-theme'
  | 'generating-structure'
  | 'generating-sections'
  | 'complete'
  | 'error'

export interface BuildPageState {
  title: string
  slug: string
  planned: boolean
  sections: Section[]
  complete: boolean
}

export interface BuildState {
  projectId: string
  status: BuildStatus
  brief: ProjectBrief
  theme: SiteTheme | null
  templateParts: { header: string | null; footer: string | null }
  pages: Record<string, BuildPageState>
  chatAnswers: Record<string, any>
  error?: string
}

// ---- Module-level singleton state ----

const builds = reactive<Map<string, BuildState>>(new Map())

// Track chat behavior per build
const chatState = reactive<Map<string, {
  unansweredQuestions: number
  questionsAsked: number
  lastQuestionTime: number
  questionsStopped: boolean
  completionSent: boolean
  firstMessageSent: boolean
  pagesReportedComplete: Set<string>
}>>(new Map())

// Queued edits for sections not yet built
const editQueue = reactive<Map<string, Array<{ description: string; pageSlug?: string }>>>(new Map())

export function useBuildProgress() {
  const pipeline = usePipeline()
  const { ensureConversation, messages } = useConversations()
  const { setStatus } = useProjects()

  // ---- Helper: post agent message to project chat ----

  function postBuildMessage(projectId: string, text: string, content?: ContentBlock[]) {
    const conv = ensureConversation(projectId, 'assistant')
    const blocks: ContentBlock[] = content ?? [{ type: 'text', text }]
    // Directly append as agent message (don't trigger AI response)
    messages.value.push({
      id: `msg-build-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      conversationId: conv.id,
      role: 'agent',
      agentId: 'assistant',
      content: blocks,
      timestamp: new Date().toISOString(),
    })
  }

  // ---- Build Chat: first message ----

  function sendFirstMessage(state: BuildState) {
    const cs = chatState.get(state.projectId)
    if (!cs || cs.firstMessageSent) return
    cs.firstMessageSent = true

    const pageList = Object.values(state.pages)
      .map(p => p.title)
      .join(', ')

    const typeMessages: Record<string, string> = {
      restaurant: `Setting up ${state.brief.name} — I'm building you a warm, inviting site with ${pageList.toLowerCase()}.\n\nThis'll take a minute. While I work, I'll have some questions that'll make your site way better.`,
      portfolio: `Building out your portfolio site — clean layout with ${pageList.toLowerCase()}. Hang tight while I put it together.\n\nGot a few questions while I work that'll help me nail it.`,
      store: `Setting up ${state.brief.name} — putting together ${pageList.toLowerCase()} for your store.\n\nI'll have a few questions while I build that'll help make it yours.`,
      blog: `Building ${state.brief.name} — setting up ${pageList.toLowerCase()} for your blog.\n\nGot a couple questions while I work.`,
      custom: `Building ${state.brief.name} — I'm putting together ${pageList.toLowerCase()}.\n\nThis'll take a minute. I might have a few questions along the way.`,
    }

    const msg = typeMessages[state.brief.type] ?? typeMessages.custom!
    postBuildMessage(state.projectId, msg)
  }

  // ---- Build Chat: progress updates ----

  function sendPageCompleteMessage(state: BuildState, pageSlug: string) {
    const cs = chatState.get(state.projectId)
    if (!cs) return

    const page = state.pages[pageSlug]
    if (!page) return

    // Don't double-report
    if (cs.pagesReportedComplete.has(pageSlug)) return
    cs.pagesReportedComplete.add(pageSlug)

    const completedCount = Object.values(state.pages).filter(p => p.complete).length
    const totalCount = Object.keys(state.pages).length

    if (completedCount < totalCount) {
      const remaining = Object.values(state.pages).filter(p => !p.complete)
      const nextPage = remaining[0]
      postBuildMessage(
        state.projectId,
        `${page.title} page is ready — take a peek at the preview. ${nextPage ? `Working on ${nextPage.title} next.` : ''}`,
      )
    }
  }

  // ---- Build Chat: completion ----

  function sendCompletionMessage(state: BuildState) {
    const cs = chatState.get(state.projectId)
    if (!cs || cs.completionSent) return
    cs.completionSent = true

    const pageIcons: Record<string, string> = {
      '/': '🏠', 'home': '🏠',
      'menu': '📋', 'about': 'ℹ️',
      'contact': '📍', 'events': '📅',
      'work': '💼', 'portfolio': '🎨',
      'blog': '✍️', 'shop': '🛍️',
      'services': '⚙️',
    }

    const pageLines = Object.values(state.pages).map(p => {
      const slugKey = p.slug.replace(/^\//, '') || 'home'
      const icon = pageIcons[slugKey] ?? '📄'
      const sectionCount = p.sections.length
      return `${icon} **${p.title}** — ${sectionCount} section${sectionCount !== 1 ? 's' : ''}`
    }).join('\n')

    postBuildMessage(
      state.projectId,
      `Your site is ready! Here's what I built:\n\n${pageLines}\n\nClick around the preview to explore. Tell me what you'd like to change — I can update anything.`,
    )
  }

  // ---- Build Chat: error ----

  function sendErrorMessage(state: BuildState, _errorMsg: string) {
    const completedPages = Object.values(state.pages).filter(p => p.complete)
    if (completedPages.length > 0) {
      postBuildMessage(
        state.projectId,
        `I ran into a problem building part of your site. ${completedPages.length} page${completedPages.length !== 1 ? 's are' : ' is'} ready — want me to try again for the rest?`,
      )
    } else {
      postBuildMessage(
        state.projectId,
        `Something went wrong and I couldn't build the site. Want to try again?`,
      )
    }
  }

  // ---- Start Build ----

  async function startBuild(projectId: string, brief: ProjectBrief): Promise<void> {
    // Only one build at a time — abort any existing build (pipeline is a singleton).
    // If another build is active, mark it as error so the UI knows it stopped.
    for (const [existingId, existingBuild] of builds.entries()) {
      if (existingId !== projectId && existingBuild.status !== 'complete' && existingBuild.status !== 'error') {
        existingBuild.status = 'error'
        existingBuild.error = 'Superseded by a new build'
        pipeline.abort()
      }
    }

    // Get page configs for this site type
    const pageConfigs = getPagesForSiteType(brief.type)

    // Initialize BuildState
    const buildState: BuildState = {
      projectId,
      status: 'queued',
      brief,
      theme: null,
      templateParts: { header: null, footer: null },
      pages: {},
      chatAnswers: {},
    }

    // Populate planned pages
    for (const pc of pageConfigs) {
      buildState.pages[pc.slug] = {
        title: pc.title,
        slug: pc.slug,
        planned: true,
        sections: [],
        complete: false,
      }
    }

    builds.set(projectId, buildState)

    // Initialize chat state
    chatState.set(projectId, {
      unansweredQuestions: 0,
      questionsAsked: 0,
      lastQuestionTime: 0,
      questionsStopped: false,
      completionSent: false,
      firstMessageSent: false,
      pagesReportedComplete: new Set(),
    })

    editQueue.set(projectId, [])

    // Send first chat message
    sendFirstMessage(buildState)

    // Convert to CreativeBrief for pipeline
    const creativeBrief: CreativeBrief = {
      siteType: brief.type,
      siteName: brief.name,
      description: brief.description,
    }

    // Register pipeline callbacks
    const unsubProgress = pipeline.onProgress(() => {
      updateBuildFromPipeline(projectId)
    })

    const unsubComplete = pipeline.onBuildComplete((pipelineState) => {
      const bs = builds.get(projectId)
      if (!bs) return
      bs.status = 'complete'
      // Mark all pages with sections as complete
      for (const [slug, sections] of Object.entries(pipelineState.pages)) {
        if (bs.pages[slug]) {
          bs.pages[slug]!.sections = sections
          bs.pages[slug]!.complete = true
        }
      }
      // Update project status
      setStatus(projectId, 'running')
      // Send completion message
      sendCompletionMessage(bs)
      // Cleanup
      unsubProgress()
      unsubComplete()
      unsubError()
    })

    const unsubError = pipeline.onBuildError((msg) => {
      const bs = builds.get(projectId)
      if (!bs) return
      bs.status = 'error'
      bs.error = msg
      sendErrorMessage(bs, msg)
      unsubProgress()
      unsubComplete()
      unsubError()
    })

    // Start the pipeline
    buildState.status = 'generating-theme'
    if (isAIConfigured()) {
      await pipeline.startBuild(creativeBrief, projectId)
    } else {
      await pipeline.startMockBuild(creativeBrief, projectId)
    }
  }

  // ---- Sync pipeline state → BuildState ----

  function updateBuildFromPipeline(projectId: string) {
    const bs = builds.get(projectId)
    const ps = pipeline.pipelineState.value
    if (!bs || !ps) return

    // Update theme
    if (ps.theme && !bs.theme) {
      bs.theme = ps.theme
      bs.status = 'generating-structure'
    }

    // Update template parts
    if (ps.templateParts.header && !bs.templateParts.header) {
      bs.templateParts.header = JSON.stringify(ps.templateParts.header)
      bs.status = 'generating-sections'
    }
    if (ps.templateParts.footer && !bs.templateParts.footer) {
      bs.templateParts.footer = JSON.stringify(ps.templateParts.footer)
    }

    // Update pages
    for (const [slug, sections] of Object.entries(ps.pages)) {
      if (bs.pages[slug]) {
        const wasComplete = bs.pages[slug]!.complete
        bs.pages[slug]!.sections = sections
        const pageStep = ps.steps.find(s => s.id === `page:${slug}`)
        if (pageStep?.status === 'complete' && !wasComplete) {
          bs.pages[slug]!.complete = true
          sendPageCompleteMessage(bs, slug)
        }
      }
    }
  }

  // ---- Getters ----

  function getBuildState(projectId: string): BuildState | undefined {
    return builds.get(projectId)
  }

  function isBuilding(projectId: string): boolean {
    const bs = builds.get(projectId)
    return !!bs && bs.status !== 'complete' && bs.status !== 'error'
  }

  // ---- Computed helpers (for a given projectId) ----

  function completedPages(projectId: string) {
    return computed(() => {
      const bs = builds.get(projectId)
      if (!bs) return []
      return Object.values(bs.pages).filter(p => p.complete)
    })
  }

  function currentStage(projectId: string) {
    return computed(() => {
      const bs = builds.get(projectId)
      return bs?.status ?? null
    })
  }

  function totalProgress(projectId: string) {
    return computed(() => {
      const bs = builds.get(projectId)
      if (!bs) return 0
      const pages = Object.values(bs.pages)
      if (pages.length === 0) return 0
      const completed = pages.filter(p => p.complete).length
      // Theme + structure + pages
      const themeWeight = 0.1
      const structureWeight = 0.1
      const pagesWeight = 0.8
      let progress = 0
      if (bs.theme) progress += themeWeight
      if (bs.templateParts.header) progress += structureWeight
      progress += (completed / pages.length) * pagesWeight
      return Math.min(1, progress)
    })
  }

  // ---- Edge case: user sends edit during build ----

  function queueEdit(projectId: string, description: string, pageSlug?: string) {
    const queue = editQueue.get(projectId)
    if (queue) {
      queue.push({ description, pageSlug })
      postBuildMessage(
        projectId,
        `Got it — I'll ${pageSlug ? `update the ${pageSlug} page` : 'make that change'} once I finish building.`,
      )
    }
  }

  // ---- Retry after error ----

  async function retryBuild(projectId: string) {
    const bs = builds.get(projectId)
    if (!bs || bs.status !== 'error') return
    // Re-run with same brief
    builds.delete(projectId)
    chatState.delete(projectId)
    await startBuild(projectId, bs.brief)
  }

  return {
    // State
    builds,

    // Actions
    startBuild,
    retryBuild,
    queueEdit,

    // Getters
    getBuildState,
    isBuilding,
    completedPages,
    currentStage,
    totalProgress,
  }
}
