/**
 * Conversational Build Orchestrator
 *
 * When startBuild() is called it:
 *  1. Hides the preview panel
 *  2. Gets/creates a conversation for the project
 *  3. Posts an opening agent message narrating the build
 *  4. Passes an onEvent callback to generateSite that:
 *     - brief-done  → agent message + ProgressCard with all steps pending
 *     - section-done (first) → auto-open preview
 *     - section-done (each)  → mutate ProgressCard steps
 *     - complete    → summary message
 *  5. Updates project status on completion or error
 */

import { reactive } from 'vue'
import { useGeneration } from './generation/useGeneration'
import { useProjects } from './useProjects'
import { useConversations } from './useConversations'
import { usePreviewState } from './usePreviewState'
import type { ProjectBrief, ProjectType, ContentBlock, Message } from './types'
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

function agentMsg(text: string): ContentBlock[] {
  return [{ type: 'text', text }]
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
  const { ensureConversation, sendMessage, messages } = useConversations()
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

      // 3. Opening narration
      sendMessage(convo.id, 'agent', `Let me design **${brief.name}** for you. I'll start with a design brief, then build each section one by one.`, 'assistant')

      // Track state for event callback
      let progressMsgId: string | null = null
      let firstSectionSeen = false

      // Build the step list from page configs
      const allSteps = pageConfigs.flatMap(page =>
        page.sectionRoles.map(role => ({
          name: `${page.title} — ${humanizeRole(role)}`,
          status: 'pending' as const,
        }))
      )

      // 4. Event callback
      const onEvent = (event: GenerationEvent) => {
        switch (event.type) {
          case 'brief-done': {
            sendMessage(convo.id, 'agent', `Design brief locked in. Building ${allSteps.length} sections across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}...`, 'assistant')

            // Push a ProgressCard message
            const cardContent: ContentBlock[] = [{
              type: 'card',
              card: 'progress',
              data: {
                label: 'Build Progress',
                steps: allSteps.map(s => ({ ...s })),
              },
            }]
            sendMessage(convo.id, 'agent', cardContent, 'assistant')

            // Grab the message we just pushed so we can mutate it later
            const lastMsg = messages.value[messages.value.length - 1]
            if (lastMsg) progressMsgId = lastMsg.id
            break
          }

          case 'section-done': {
            // Auto-open preview on first section
            if (!firstSectionSeen) {
              firstSectionSeen = true
              show(projectId)
              sendMessage(convo.id, 'agent', `First section is up — **${humanizeRole(event.sectionId)}**. Opening the preview now.`, 'assistant')
            }

            // Mutate the ProgressCard steps — replace the content array to trigger reactivity
            if (progressMsgId) {
              const msg = messages.value.find(m => m.id === progressMsgId)
              if (msg) {
                const cardBlock = msg.content.find(
                  (b): b is Extract<ContentBlock, { type: 'card' }> => b.type === 'card' && b.card === 'progress'
                )
                if (cardBlock && cardBlock.card === 'progress') {
                  // Find the step for this section and mark done
                  const step = cardBlock.data.steps.find(s => s.name.includes(humanizeRole(event.sectionId)))
                  if (step) step.status = 'done'

                  // Mark next pending step as running
                  const nextPending = cardBlock.data.steps.find(s => s.status === 'pending')
                  if (nextPending) nextPending.status = 'running'

                  // Replace content array to trigger Vue reactivity
                  msg.content = [...msg.content]
                }
              }
            }
            break
          }

          case 'complete': {
            // Mark any remaining steps as done
            if (progressMsgId) {
              const msg = messages.value.find(m => m.id === progressMsgId)
              if (msg) {
                const cardBlock = msg.content.find(
                  (b): b is Extract<ContentBlock, { type: 'card' }> => b.type === 'card' && b.card === 'progress'
                )
                if (cardBlock && cardBlock.card === 'progress') {
                  cardBlock.data.steps.forEach(s => { s.status = 'done' })
                  msg.content = [...msg.content]
                }
              }
            }

            sendMessage(convo.id, 'agent', `**${brief.name}** is ready! ${allSteps.length} sections built across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}. Take a look and let me know if you want to tweak anything.`, 'assistant')
            break
          }

          case 'error': {
            sendMessage(convo.id, 'agent', `Something went wrong: ${event.error}`, 'assistant')
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
