/**
 * Conversational Build Orchestrator
 *
 * When startBuild() is called it:
 *  1. Hides the preview panel
 *  2. Gets/creates a conversation for the project
 *  3. Streams an opening agent message narrating the build
 *  4. Passes an onEvent callback to generateSite that:
 *     - brief-done  → streamed message + ProgressCard (homepage steps → running)
 *     - page-start  → mark that page's steps as running
 *     - section-done (first) → auto-open preview with animation
 *     - section-done (each)  → mutate ProgressCard steps
 *     - complete    → summary message
 *  5. Updates project status on completion or error
 */

import { reactive } from 'vue'
import { useGeneration } from './generation/useGeneration'
import { useProjects } from './useProjects'
import { useConversations } from './useConversations'
import { usePreviewState } from './usePreviewState'
import type { ProjectBrief, ProjectType, ContentBlock } from './types'
import type { GenerationEvent } from './generation/types'

// ---- Page Configs per Project Type ----

const PAGE_CONFIGS: Record<ProjectType, { title: string; slug: string; sectionRoles: string[] }[]> = {
  restaurant: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'menu-preview', 'about-preview', 'footer'] },
    { title: 'Menu', slug: '/menu', sectionRoles: ['header', 'menu-full', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  portfolio: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'work-preview', 'footer'] },
    { title: 'Work', slug: '/work', sectionRoles: ['header', 'work-grid', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  store: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'featured-products', 'testimonials', 'footer'] },
    { title: 'Products', slug: '/products', sectionRoles: ['header', 'product-grid', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  blog: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'recent-posts', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  custom: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'features', 'cta', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
}

// ---- Helpers ----

function humanizeRole(role: string): string {
  return role.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// ---- Build State ----

interface BuildState {
  status: 'building' | 'complete' | 'error'
  error?: string
}

const buildStates: Record<string, BuildState> = reactive({})

// ---- Export ----

export function useBuildProgress() {
  const { generateSite, progress, abort } = useGeneration()
  const { setStatus } = useProjects()
  const { ensureConversation, sendMessage, streamAgentMessage, messages } = useConversations()
  const { hide, show } = usePreviewState()

  return {
    isBuilding(projectId: string): boolean {
      return buildStates[projectId]?.status === 'building'
    },

    getBuildState(projectId: string): BuildState | undefined {
      return buildStates[projectId]
    },

    progress,

    async startBuild(projectId: string, brief: ProjectBrief): Promise<void> {
      buildStates[projectId] = { status: 'building' }

      const pageConfigs = PAGE_CONFIGS[brief.type] || PAGE_CONFIGS.custom
      const siteType = brief.freeTextType || brief.type

      // 1. Hide preview until first section lands
      hide(projectId)

      // 2. Get or create conversation
      const convo = ensureConversation(projectId, 'assistant')

      // 3. Opening narration (streamed)
      await streamAgentMessage(
        convo.id,
        `Let me design **${brief.name}** for you. I'll start with a design brief, then build each section one by one.`,
        'assistant',
      )

      // Thinking indicator while brief generates
      streamAgentMessage(convo.id, 'Crafting the design brief...', 'assistant')

      // Track state for event callback
      let progressMsgId: string | null = null
      let firstSectionSeen = false

      // Build the step list from page configs — include page title for lookup
      const allSteps = pageConfigs.flatMap(page =>
        page.sectionRoles.map(role => ({
          name: `${page.title} — ${humanizeRole(role)}`,
          pageTitle: page.title,
          status: 'pending' as 'pending' | 'running' | 'done' | 'error',
        }))
      )

      // Helper: find the progress card block and update it reactively
      function updateProgressCard(updater: (steps: typeof allSteps) => void) {
        if (!progressMsgId) return
        const msg = messages.value.find(m => m.id === progressMsgId)
        if (!msg) return
        const cardBlock = msg.content.find(
          (b): b is Extract<ContentBlock, { type: 'card' }> => b.type === 'card' && b.card === 'progress'
        )
        if (!cardBlock || cardBlock.card !== 'progress') return
        updater(cardBlock.data.steps as typeof allSteps)
        msg.content = [...msg.content] // trigger Vue reactivity
      }

      // 4. Event callback
      const onEvent = (event: GenerationEvent) => {
        switch (event.type) {
          case 'brief-done': {
            // Extract color values from the CSS variables for the brief card
            const colorRegex = /--(color-[\w-]+):\s*([^;]+);/g
            const colors: { name: string; value: string }[] = []
            let match
            while ((match = colorRegex.exec(event.brief.cssVariables)) !== null) {
              if (match[1] && match[2]) {
                colors.push({ name: match[1], value: match[2].trim() })
              }
            }

            // Push the DesignBriefCard
            const briefCardContent: ContentBlock[] = [{
              type: 'card',
              card: 'designBrief',
              data: {
                direction: event.brief.direction,
                fonts: event.brief.fonts,
                colors,
              },
            }]
            sendMessage(convo.id, 'agent', briefCardContent, 'assistant')

            // Stream the building message (fire-and-forget — don't block generation)
            streamAgentMessage(
              convo.id,
              `Building ${allSteps.length} sections across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}...`,
              'assistant',
            )

            // Push a ProgressCard message with homepage steps already running
            // (homepage sections fire in parallel immediately after brief)
            const homepageTitle = pageConfigs[0]?.title
            const cardSteps = allSteps.map(s => ({
              name: s.name,
              status: s.pageTitle === homepageTitle ? 'running' as const : s.status,
            }))

            const cardContent: ContentBlock[] = [{
              type: 'card',
              card: 'progress',
              data: { label: 'Build Progress', steps: cardSteps },
            }]
            sendMessage(convo.id, 'agent', cardContent, 'assistant')

            // Grab the message so we can mutate it later
            const lastMsg = messages.value[messages.value.length - 1]
            if (lastMsg) progressMsgId = lastMsg.id
            break
          }

          case 'page-start': {
            // Mark this page's steps as running
            updateProgressCard(steps => {
              for (const step of steps) {
                if (step.name.startsWith(`${event.pageTitle} —`) && step.status === 'pending') {
                  step.status = 'running'
                }
              }
            })
            break
          }

          case 'section-done': {
            // Auto-open preview on first section
            if (!firstSectionSeen) {
              firstSectionSeen = true
              show(projectId)
              streamAgentMessage(
                convo.id,
                `First section is up — **${humanizeRole(event.sectionId)}**. Opening the preview now.`,
                'assistant',
              )
            }

            // Mark the completed step as done
            updateProgressCard(steps => {
              const step = steps.find(s =>
                s.name.includes(humanizeRole(event.sectionId)) && s.status === 'running'
              )
              if (step) step.status = 'done'
            })
            break
          }

          case 'section-error': {
            // Mark the failed step as error in the ProgressCard
            updateProgressCard(steps => {
              const step = steps.find(s =>
                s.name.includes(humanizeRole(event.sectionId)) && s.status === 'running'
              )
              if (step) step.status = 'error'
            })
            break
          }

          case 'complete': {
            // Mark any remaining running steps as done (pending ones from skipped pages stay pending)
            updateProgressCard(steps => {
              steps.forEach(s => {
                if (s.status === 'running') s.status = 'done'
              })
            })

            const succeeded = allSteps.length - event.failed.length
            if (event.failed.length === 0) {
              streamAgentMessage(
                convo.id,
                `**${brief.name}** is ready! ${allSteps.length} sections built across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}. Take a look and let me know if you want to tweak anything.`,
                'assistant',
              )
            } else {
              streamAgentMessage(
                convo.id,
                `**${brief.name}** is mostly ready — ${succeeded} of ${allSteps.length} sections built. ${event.failed.length} section${event.failed.length > 1 ? 's' : ''} couldn't be generated: ${event.failed.map(humanizeRole).join(', ')}. You can ask me to regenerate them.`,
                'assistant',
              )
            }
            break
          }

          case 'error': {
            // Mark running steps as error
            updateProgressCard(steps => {
              steps.forEach(s => {
                if (s.status === 'running') s.status = 'error'
              })
            })

            streamAgentMessage(
              convo.id,
              `Something went wrong: ${event.error}`,
              'assistant',
            )
            break
          }
        }
      }

      try {
        await generateSite(projectId, brief.name, siteType, brief.description, pageConfigs, onEvent)
        buildStates[projectId] = { status: 'complete' }
        setStatus(projectId, 'running')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error(`[Build] Failed for ${projectId}:`, message)
        buildStates[projectId] = { status: 'error', error: message }
        setStatus(projectId, 'stopped')
      }
    },

    stopBuild(projectId: string): void {
      abort()
      buildStates[projectId] = { status: 'error', error: 'Cancelled' }
      setStatus(projectId, 'stopped')
    },
  }
}
