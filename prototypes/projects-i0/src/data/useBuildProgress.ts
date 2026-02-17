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

/**
 * Parse a CSS hex color to [r, g, b] (0-255).
 * Supports #rgb, #rrggbb, and named fallbacks.
 */
function parseHex(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#([0-9a-f]{3,8})$/i)
  if (!m || !m[1]) return null
  const h = m[1]
  if (h.length === 3) {
    return [parseInt(h[0]! + h[0]!, 16), parseInt(h[1]! + h[1]!, 16), parseInt(h[2]! + h[2]!, 16)]
  }
  if (h.length >= 6) {
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
  }
  return null
}

/** Relative luminance (WCAG 2.0) — 0 = black, 1 = white */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!
}

/** Contrast ratio between two luminance values (1:1 to 21:1) */
function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
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

  let bgColor = findColor('bg', 'background', 'surface') || '#1a1a2e'
  let textColor = findColor('text', 'foreground') || '#e0e0e0'
  let accentColor = findColor('primary', 'accent', 'brand') || colors[0]?.value || '#6366f1'

  // Ensure readable contrast — fix bad AI color picks
  const bgRgb = parseHex(bgColor)
  const textRgb = parseHex(textColor)
  const accentRgb = parseHex(accentColor)

  if (bgRgb && textRgb) {
    const bgLum = luminance(...bgRgb)
    const textLum = luminance(...textRgb)
    const ratio = contrastRatio(bgLum, textLum)

    // If text/bg contrast is too low, force readable values
    if (ratio < 3) {
      // Determine if bg is light or dark
      if (bgLum > 0.5) {
        // Light background — use dark text
        textColor = '#1a1a2e'
      } else {
        // Dark background — use light text
        textColor = '#f0f0f0'
      }
    }
  }

  if (bgRgb && accentRgb) {
    const bgLum = luminance(...bgRgb)
    const accentLum = luminance(...accentRgb)
    const ratio = contrastRatio(bgLum, accentLum)

    if (ratio < 2.5) {
      // Accent invisible against bg — try to find any color with decent contrast
      for (const c of colors) {
        const rgb = parseHex(c.value)
        if (!rgb) continue
        const lum = luminance(...rgb)
        if (contrastRatio(bgLum, lum) >= 3) {
          accentColor = c.value
          break
        }
      }
    }
  }

  // Limit palette to 8 swatches — skip bg/text dupes since those are already shown as card chrome
  const displayColors = colors
    .filter(c => c.value !== bgColor && c.value !== textColor)
    .slice(0, 8)

  return { siteName, direction: brief.direction, fonts: brief.fonts, colors: displayColors, bgColor, textColor, accentColor }
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
  const { ensureConversation, sendMessage, streamAgentMessage, postMessage, removeMessage, messages } = useConversations()
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

      // Mutate the picker card in-place: keep only the chosen brief, remove buttons
      const pickerMsg = messages.value.find(m =>
        m.content.some(b => b.type === 'card' && b.card === 'designBriefPicker')
      )
      if (pickerMsg) {
        const cardBlock = pickerMsg.content.find(
          (b): b is Extract<ContentBlock, { type: 'card'; card: 'designBriefPicker' }> =>
            b.type === 'card' && b.card === 'designBriefPicker'
        )
        if (cardBlock) {
          cardBlock.data = {
            briefs: [cardBlock.data.briefs[briefIndex]!],
          }
          pickerMsg.content = [...pickerMsg.content]
        }
      }

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
      await streamAgentMessage(convo.id, 'Crafting design briefs...', 'assistant')

      // Add a thinking indicator while briefs generate
      const thinkingId = `msg-thinking-${projectId}`
      messages.value.push({
        id: thinkingId,
        conversationId: convo.id,
        role: 'agent',
        agentId: 'assistant',
        content: [{ type: 'text', text: '...' }],
        timestamp: new Date().toISOString(),
      })

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

      // Remove thinking indicator
      removeMessage(thinkingId)

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

      const pickerCard: ContentBlock[] = [{
        type: 'card',
        card: 'designBriefPicker',
        id: 'brief-picker',
        data: {
          briefs: validBriefs.map(b => extractBriefCardData(b, brief.name)),
          actions: validBriefs.map((_, i) => ({
            id: `choose-brief-${i}`,
            label: `Pick option ${i + 1}`,
            variant: 'primary' as const,
            action: {
              type: 'send-message' as const,
              message: `I'll go with option ${i + 1}`,
              payload: { briefSelection: String(i), projectId },
            },
          })),
        },
      }]

      sendMessage(convo.id, 'agent', pickerCard, 'assistant')

      // 6. Wait for user selection
      const chosenBrief = await new Promise<DesignBrief>((resolve) => {
        pendingSelections[projectId] = { resolve, briefs: validBriefs }
      })

      // 7. Acknowledge selection and show progress card immediately
      const allSteps = pageConfigs.flatMap(page =>
        page.sectionRoles.map(role => ({
          name: `${page.title} — ${humanizeRole(role)}`,
          pageTitle: page.title,
          status: 'pending' as 'pending' | 'running' | 'done' | 'error',
        }))
      )

      // Single message: intro text + progress card together
      const buildIntro: ContentBlock[] = [
        { type: 'text', text: `Great choice! Building **${brief.name}** — ${allSteps.length} sections across ${pageConfigs.length} page${pageConfigs.length > 1 ? 's' : ''}.` },
        {
          type: 'card',
          card: 'progress',
          data: { label: 'Build Progress', steps: allSteps.map(s => ({ name: s.name, status: s.status })) },
        },
      ]
      sendMessage(convo.id, 'agent', buildIntro, 'assistant')

      const progressMsgId = messages.value[messages.value.length - 1]?.id ?? null
      let firstSectionSeen = false

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
          case 'brief-done':
            break

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
            if (!firstSectionSeen) {
              firstSectionSeen = true
              show(projectId)
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
                `**${brief.name}** is ready! Take a look and let me know if you want to tweak anything.`,
                'assistant',
              )
            } else {
              streamAgentMessage(
                convo.id,
                `**${brief.name}** is mostly ready — ${succeeded} of ${allSteps.length} sections built. ${event.failed.length} couldn't be generated. You can ask me to regenerate them.`,
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
