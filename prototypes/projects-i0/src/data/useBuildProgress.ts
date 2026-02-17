/**
 * Conversational Build Orchestrator
 *
 * When startBuild() is called it:
 *  1. Hides the preview panel
 *  2. Gets/creates a conversation for the project
 *  3. Generates 3 design briefs in parallel
 *  4. Shows DesignBriefCards with Choose buttons — waits for selection
 *  5. Passes chosen brief + onEvent callback to generateSite
 *  6. Narrates the build via chat messages and ProgressCard
 */

import { reactive } from 'vue'
import { useGeneration } from './generation/useGeneration'
import { useProjects } from './useProjects'
import { useConversations } from './useConversations'
import { usePreviewState } from './usePreviewState'
import type { ProjectBrief, ProjectType, ContentBlock } from './types'
import type { DesignBrief, GenerationEvent } from './generation/types'

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

function extractBriefCardData(brief: DesignBrief, siteName: string) {
  const colorRegex = /--(color-[\w-]+):\s*([^;]+);/g
  const colors: { name: string; value: string }[] = []
  let match
  while ((match = colorRegex.exec(brief.cssVariables)) !== null) {
    if (match[1] && match[2]) {
      colors.push({ name: match[1], value: match[2].trim() })
    }
  }

  // Extract specific colors for the card chrome
  const findColor = (...patterns: string[]) => {
    for (const pattern of patterns) {
      const c = colors.find(c => c.name.includes(pattern))
      if (c) return c.value
    }
    return null
  }

  const bgColor = findColor('bg', 'background', 'surface') || '#1a1a2e'
  const textColor = findColor('text', 'foreground') || '#e0e0e0'
  const accentColor = findColor('primary', 'accent', 'brand') || colors[0]?.value || '#6366f1'

  return { siteName, direction: brief.direction, fonts: brief.fonts, colors, bgColor, textColor, accentColor }
}

// ---- Build State ----

interface BuildState {
  status: 'building' | 'complete' | 'error'
  error?: string
}

const buildStates: Record<string, BuildState> = reactive({})

// Pending brief selections — resolved when user clicks Choose
const pendingSelections: Record<string, {
  resolve: (brief: DesignBrief) => void
  briefs: DesignBrief[]
}> = {}

// ---- Export ----

export function useBuildProgress() {
  const { generateSite, generateDesignBrief, progress, abort } = useGeneration()
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

    /** Called by AgentPanel when user clicks a Choose button */
    selectBrief(projectId: string, briefIndex: number): void {
      const pending = pendingSelections[projectId]
      if (!pending) return
      const brief = pending.briefs[briefIndex]
      if (!brief) return
      pending.resolve(brief)
      delete pendingSelections[projectId]
    },

    async startBuild(projectId: string, brief: ProjectBrief): Promise<void> {
      buildStates[projectId] = { status: 'building' }

      const pageConfigs = PAGE_CONFIGS[brief.type] || PAGE_CONFIGS.custom
      const siteType = brief.freeTextType || brief.type

      // 1. Hide preview until first section lands
      hide(projectId)

      // 2. Get or create conversation
      const convo = ensureConversation(projectId, 'assistant')

      // 3. Opening narration
      await streamAgentMessage(
        convo.id,
        `Let me design **${brief.name}** for you. I'll create a few design directions for you to choose from.`,
        'assistant',
      )
      streamAgentMessage(convo.id, 'Crafting design briefs...', 'assistant')

      // 4. Generate 3 briefs in parallel
      const briefPromises = [0, 1, 2].map(async (i) => {
        try {
          return await generateDesignBrief(brief.name, siteType, brief.description)
        } catch (error) {
          console.warn(`[Build] Brief ${i} failed:`, error)
          return null
        }
      })

      const briefResults = await Promise.all(briefPromises)
      const validBriefs = briefResults.filter((b): b is DesignBrief => b !== null)

      if (validBriefs.length === 0) {
        streamAgentMessage(convo.id, 'All design briefs failed to generate. Please try again.', 'assistant')
        buildStates[projectId] = { status: 'error', error: 'All briefs failed' }
        setStatus(projectId, 'stopped')
        return
      }

      // 5. Show brief cards with Choose buttons
      await streamAgentMessage(
        convo.id,
        `Here ${validBriefs.length === 1 ? 'is 1 direction' : `are ${validBriefs.length} directions`} for **${brief.name}**. Pick the one that feels right:`,
        'assistant',
      )

      const briefCards: ContentBlock[] = validBriefs.flatMap((b, i) => {
        const cardData = extractBriefCardData(b, brief.name)
        const blocks: ContentBlock[] = [
          {
            type: 'card',
            card: 'designBrief',
            id: `brief-${i}`,
            data: cardData,
          },
        ]
        return blocks
      })

      // Add action buttons for choosing
      const actions: ContentBlock = {
        type: 'actions',
        actions: validBriefs.map((_, i) => ({
          id: `choose-brief-${i}`,
          label: `Option ${i + 1}`,
          variant: i === 0 ? 'primary' as const : 'secondary' as const,
          action: {
            type: 'send-message' as const,
            message: `I'll go with option ${i + 1}`,
            payload: { briefSelection: String(i), projectId },
          },
        })),
      }
      briefCards.push(actions)

      sendMessage(convo.id, 'agent', briefCards, 'assistant')

      // 6. Wait for user selection
      const chosenBrief = await new Promise<DesignBrief>((resolve) => {
        pendingSelections[projectId] = { resolve, briefs: validBriefs }
      })

      // 7. Acknowledge selection and start building
      await streamAgentMessage(
        convo.id,
        `Great choice. Let's build it.`,
        'assistant',
      )

      // Track state for event callback
      let progressMsgId: string | null = null
      let firstSectionSeen = false

      const allSteps = pageConfigs.flatMap(page =>
        page.sectionRoles.map(role => ({
          name: `${page.title} — ${humanizeRole(role)}`,
          pageTitle: page.title,
          status: 'pending' as 'pending' | 'running' | 'done' | 'error',
        }))
      )

      function updateProgressCard(updater: (steps: typeof allSteps) => void) {
        if (!progressMsgId) return
        const msg = messages.value.find(m => m.id === progressMsgId)
        if (!msg) return
        const cardBlock = msg.content.find(
          (b): b is Extract<ContentBlock, { type: 'card' }> => b.type === 'card' && b.card === 'progress'
        )
        if (!cardBlock || cardBlock.card !== 'progress') return
        updater(cardBlock.data.steps as typeof allSteps)
        msg.content = [...msg.content]
      }

      const onEvent = (event: GenerationEvent) => {
        switch (event.type) {
          case 'brief-done': {
            // Brief was pre-selected, this shouldn't fire — but handle gracefully
            break
          }

          case 'page-start': {
            // First page-start: push the ProgressCard
            if (!progressMsgId) {
              const homepageTitle = pageConfigs[0]?.title
              const cardSteps = allSteps.map(s => ({
                name: s.name,
                status: s.pageTitle === homepageTitle ? 'running' as const : s.status,
              }))

              streamAgentMessage(
                convo.id,
                `Building ${allSteps.length} sections across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}...`,
                'assistant',
              )

              const cardContent: ContentBlock[] = [{
                type: 'card',
                card: 'progress',
                data: { label: 'Build Progress', steps: cardSteps },
              }]
              sendMessage(convo.id, 'agent', cardContent, 'assistant')

              const lastMsg = messages.value[messages.value.length - 1]
              if (lastMsg) progressMsgId = lastMsg.id
            } else {
              // Subsequent pages: mark steps as running
              updateProgressCard(steps => {
                for (const step of steps) {
                  if (step.name.startsWith(`${event.pageTitle} —`) && step.status === 'pending') {
                    step.status = 'running'
                  }
                }
              })
            }
            break
          }

          case 'section-done': {
            if (!firstSectionSeen) {
              firstSectionSeen = true
              show(projectId)
              streamAgentMessage(
                convo.id,
                `First section is up — **${humanizeRole(event.sectionId)}**. Opening the preview now.`,
                'assistant',
              )
            }

            updateProgressCard(steps => {
              const step = steps.find(s =>
                s.name.includes(humanizeRole(event.sectionId)) && s.status === 'running'
              )
              if (step) step.status = 'done'
            })
            break
          }

          case 'section-error': {
            updateProgressCard(steps => {
              const step = steps.find(s =>
                s.name.includes(humanizeRole(event.sectionId)) && s.status === 'running'
              )
              if (step) step.status = 'error'
            })
            break
          }

          case 'complete': {
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
            updateProgressCard(steps => {
              steps.forEach(s => {
                if (s.status === 'running') s.status = 'error'
              })
            })
            streamAgentMessage(convo.id, `Something went wrong: ${event.error}`, 'assistant')
            break
          }
        }
      }

      try {
        await generateSite(projectId, brief.name, siteType, brief.description, pageConfigs, onEvent, chosenBrief)
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
