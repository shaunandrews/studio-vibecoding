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
import { useInputActions } from './useInputActions'
import { useSiteStore } from './useSiteStore'
import type { ProjectBrief, ProjectType, ContentBlock, VariationHint, PageCreateCardData } from './types'
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

  return { siteName, styleName: brief.styleName, direction: brief.direction, fonts: brief.fonts, colors: displayColors, bgColor, textColor, accentColor, styleTile: brief.styleTile }
}

// ---- Build State ----

interface BuildState {
  status: 'building' | 'complete' | 'error'
  error?: string
}

const buildStates: Record<string, BuildState> = reactive({})

// Pending brief selections — resolved when user clicks a brief card
const pendingSelections: Record<string, {
  resolve: (brief: DesignBrief) => void
  briefs: DesignBrief[]
  cardData: ReturnType<typeof extractBriefCardData>[]
}> = {}

// Rejected briefs per project — used as avoidance context for regen
const rejectedBriefs: Record<string, string[]> = {}

// Build context per project — needed for regen to re-call generateDesignBrief
const buildContexts: Record<string, {
  projectId: string
  brief: ProjectBrief
  siteType: string
  convoId: string
}> = {}

// ---- Algorithmic Color Anchors ----
// Instead of asking the LLM to invent colors, we generate concrete hex anchors
// using color theory (120° hue spacing) and inject them as hard constraints.
// The LLM's job becomes design narration around our chosen palette, not color invention.

interface ColorAnchor {
  bg: string
  text: string
  accent: string
  mood: string  // one-line personality hint for the AI
}

/** Convert HSL (h: 0-360, s: 0-100, l: 0-100) to hex */
function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100
  const lN = l / 100
  const a = sN * Math.min(lN, 1 - lN)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = lN - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/** Generate 3 color anchors with guaranteed visual diversity */
function generateColorAnchors(): ColorAnchor[] {
  // Pick a random starting hue, then space the other two 120° apart (triadic)
  const baseHue = Math.floor(Math.random() * 360)
  const hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360]

  // Shuffle the structural modes so the order isn't always dark/light/colorful
  const modes = [
    { type: 'dark' as const, moods: ['Luxurious, editorial, cinematic', 'Moody, atmospheric, noir', 'Raw, technical, brutalist'] },
    { type: 'light' as const, moods: ['Clean, minimal, Swiss', 'Warm, artisanal, handcrafted', 'Crisp, professional, modern'] },
    { type: 'saturated' as const, moods: ['Bold, branded, unapologetic', 'Rich, earthy, grounded', 'Playful, fresh, energetic'] },
  ]
  // Shuffle modes
  for (let i = modes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[modes[i], modes[j]] = [modes[j]!, modes[i]!]
  }

  return modes.map((mode, i) => {
    const hue = hues[i]!
    const mood = mode.moods[Math.floor(Math.random() * mode.moods.length)]!

    switch (mode.type) {
      case 'dark': {
        // Dark bg with slight hue tint, light text, vivid accent from the hue
        const bg = hslToHex(hue, 15 + Math.random() * 20, 8 + Math.random() * 7)
        const text = hslToHex(hue, 5 + Math.random() * 10, 88 + Math.random() * 8)
        const accent = hslToHex(hue, 70 + Math.random() * 25, 55 + Math.random() * 15)
        return { bg, text, accent, mood }
      }
      case 'light': {
        // Light bg, dark text, muted accent from the hue
        const bg = hslToHex(hue, 5 + Math.random() * 15, 95 + Math.random() * 4)
        const text = hslToHex(hue, 10 + Math.random() * 15, 12 + Math.random() * 10)
        const accent = hslToHex(hue, 50 + Math.random() * 30, 40 + Math.random() * 20)
        return { bg, text, accent, mood }
      }
      case 'saturated': {
        // Saturated hue as background, contrasting text
        const bgLightness = 25 + Math.random() * 30
        const bg = hslToHex(hue, 50 + Math.random() * 35, bgLightness)
        const text = bgLightness < 45
          ? hslToHex(hue, 5 + Math.random() * 10, 92 + Math.random() * 6)
          : hslToHex(hue, 15 + Math.random() * 10, 10 + Math.random() * 8)
        const accent = hslToHex((hue + 30 + Math.random() * 60) % 360, 60 + Math.random() * 30, 55 + Math.random() * 20)
        return { bg, text, accent, mood }
      }
    }
  })
}

function anchorToVariation(anchor: ColorAnchor): string {
  return `USE THESE EXACT SEED COLORS — build your full palette around them:
  Background: ${anchor.bg}
  Text: ${anchor.text}
  Primary/Accent: ${anchor.accent}
You may adjust slightly for harmony but the background MUST stay within the same hue and lightness range. Do not drift to a different color family.
Mood/personality: ${anchor.mood}.`
}

// ---- Export ----

export function useBuildProgress() {
  const { generateSite, generateDesignBrief, progress, abort } = useGeneration()
  const { setStatus } = useProjects()
  const { ensureConversation, sendMessage, streamAgentMessage, postMessage, messages } = useConversations()
  const { hide, show, requestNavigation } = usePreviewState()
  const { pushActions, clearBySource } = useInputActions()
  const siteStore = useSiteStore()

  /**
   * Generate briefs and show them as style tile cards in the input area.
   * Returns false if all briefs failed to generate.
   */
  async function generateAndShowBriefs(
    projectId: string,
    convoId: string,
    siteName: string,
    siteType: string,
    description: string,
    visualDirection?: string,
    inspiration?: string,
  ): Promise<boolean> {
    const anchors = generateColorAnchors()
    const variations = anchors.map(a => anchorToVariation(a))
    const avoided = rejectedBriefs[projectId] || []

    const briefPromises = variations.map(async (variation, i) => {
      try {
        return await generateDesignBrief(
          siteName, siteType, description, variation,
          visualDirection, inspiration,
          avoided.length ? avoided : undefined,
        )
      } catch (error) {
        console.warn(`[Build] Brief ${i} failed:`, error)
        return null
      }
    })

    const briefResults = await Promise.all(briefPromises)
    const validBriefs = briefResults.filter((b): b is DesignBrief => b !== null)

    if (validBriefs.length === 0) return false

    const variationHints: VariationHint[] = ['bold', 'minimal', 'warm']
    const briefCardData = validBriefs.map((b, i) => ({
      ...extractBriefCardData(b, siteName),
      variationHint: variationHints[i] || 'bold' as VariationHint,
    }))

    // Load Google Fonts for brief previews
    const allFonts = new Set(briefCardData.flatMap(d => d.fonts))
    if (allFonts.size > 0) {
      const families = [...allFonts].map(f => `family=${encodeURIComponent(f)}:wght@400;700;800`).join('&')
      const id = `brief-fonts-${[...allFonts].join('-').replace(/\s+/g, '-')}`
      if (!document.getElementById(id)) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
        document.head.appendChild(link)
      }
    }

    // Accumulate briefs into the pending selection (additive across rounds)
    const existing = pendingSelections[projectId]
    if (existing) {
      existing.briefs.push(...validBriefs)
      existing.cardData.push(...briefCardData)
    } else {
      pendingSelections[projectId] = {
        resolve: () => {}, // placeholder, overwritten by caller
        briefs: validBriefs,
        cardData: briefCardData,
      }
    }

    // Rebuild full action list from ALL accumulated briefs
    const allBriefs = pendingSelections[projectId]!.cardData
    const briefPickActions = allBriefs.map((d, i) => ({
      id: `pick-brief-${i}`,
      label: d.styleName,
      variant: 'secondary' as const,
      card: {
        style: {},
        content: '',
        briefData: d,
      },
      action: {
        type: 'send-message' as const,
        message: d.styleName,
        payload: { briefSelection: String(i), projectId },
      },
    }))

    const showMoreAction = {
      id: 'regen-briefs',
      label: 'Show more',
      variant: 'secondary' as const,
      action: {
        type: 'send-message' as const,
        message: 'Show me more options',
        payload: { briefRegenerate: 'true', projectId },
      },
    }

    pushActions({
      id: 'brief-pick',
      conversationId: convoId,
      actions: [...briefPickActions, showMoreAction],
      sourceRef: 'brief-picker',
    })

    return true
  }

  return {
    isBuilding(projectId: string): boolean {
      return buildStates[projectId]?.status === 'building'
    },

    getBuildState(projectId: string): BuildState | undefined {
      return buildStates[projectId]
    },

    progress,

    /** Called by AgentPanel when user clicks a brief card */
    selectBrief(projectId: string, briefIndex: number): void {
      const pending = pendingSelections[projectId]
      if (!pending) return
      const brief = pending.briefs[briefIndex]
      if (!brief) return

      // Clear the input actions
      clearBySource('brief-picker')

      // Post the chosen brief as a card in the message stream
      const convo = ensureConversation(projectId, 'assistant')
      const cardData = pending.cardData[briefIndex]
      if (cardData) {
        postMessage(convo.id, 'agent', [{
          type: 'card',
          card: 'designBriefPicker',
          data: { briefs: [cardData] },
        }], 'assistant')
      }

      // Clean up rejected briefs for this project
      delete rejectedBriefs[projectId]
      delete buildContexts[projectId]

      pending.resolve(brief)
      delete pendingSelections[projectId]
    },

    /** Called by AgentPanel when user clicks the "Show more" button */
    async regenerateBriefs(projectId: string): Promise<void> {
      const pending = pendingSelections[projectId]
      const ctx = buildContexts[projectId]
      if (!pending || !ctx) return

      // Narrate
      const convo = ensureConversation(projectId, 'assistant')
      await streamAgentMessage(convo.id, 'Generating more options...', 'assistant')

      // Generate and append (generateAndShowBriefs is additive now)
      const ok = await generateAndShowBriefs(
        projectId, ctx.convoId,
        ctx.brief.name, ctx.siteType, ctx.brief.description,
        ctx.brief.visualDirection, ctx.brief.inspiration,
      )

      if (!ok) {
        await streamAgentMessage(convo.id, 'Those failed to generate. Try once more.', 'assistant')
      }
    },

    async startBuild(projectId: string, brief: ProjectBrief): Promise<void> {
      buildStates[projectId] = { status: 'building' }

      const pageConfigs = PAGE_CONFIGS[brief.type] || PAGE_CONFIGS.custom
      const siteType = brief.freeTextType || brief.type

      // 1. Hide preview until first section lands
      hide(projectId)

      // 2. Get or create conversation
      const convo = ensureConversation(projectId, 'assistant')

      // Store build context for regen
      buildContexts[projectId] = { projectId, brief, siteType, convoId: convo.id }

      // 3. Opening narration
      await streamAgentMessage(
        convo.id,
        `Let me design **${brief.name}** for you. I'll create a few design directions for you to choose from.`,
        'assistant',
      )
      await streamAgentMessage(convo.id, 'Crafting design briefs...', 'assistant')

      // 4. Generate and show brief cards
      const ok = await generateAndShowBriefs(
        projectId, convo.id,
        brief.name, siteType, brief.description,
        brief.visualDirection, brief.inspiration,
      )

      if (!ok) {
        streamAgentMessage(convo.id, 'All design briefs failed to generate. Please try again.', 'assistant')
        buildStates[projectId] = { status: 'error', error: 'All briefs failed' }
        setStatus(projectId, 'stopped')
        return
      }

      // 5. Show brief options
      await streamAgentMessage(
        convo.id,
        `Here are ${pendingSelections[projectId]?.briefs.length || 3} directions for **${brief.name}**. Pick the one that feels right:`,
        'assistant',
      )

      // 6. Wait for user selection (regen cycles update the pending selection in place)
      const chosenBrief = await new Promise<DesignBrief>((resolve) => {
        const pending = pendingSelections[projectId]
        if (pending) {
          pending.resolve = resolve
        } else {
          pendingSelections[projectId] = { resolve, briefs: [], cardData: [] }
        }
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

    async buildPage(projectId: string, pageData: PageCreateCardData, conversationId?: string): Promise<void> {
      const { generatePageSections } = useGeneration()
      const site = siteStore.getSite(projectId)
      if (!site) return

      const convoId = conversationId ?? ensureConversation(projectId, 'assistant').id

      // 1. Validate slug — check for duplicates
      const normalizedSlug = pageData.slug.startsWith('/') ? pageData.slug : `/${pageData.slug}`
      if (site.pages.some(p => p.slug === normalizedSlug)) {
        await streamAgentMessage(
          convoId,
          `A page at **${normalizedSlug}** already exists. Try a different slug.`,
          'assistant',
        )
        return
      }

      // 2. Separate reused sections from new ones to generate
      const reusedSections: { role: string; existingId: string }[] = []
      const sectionsToGenerate: { role: string; description: string }[] = []

      for (const section of pageData.sections) {
        if (section.reuse) {
          if (site.sections[section.reuse]) {
            reusedSections.push({ role: section.role, existingId: section.reuse })
          } else {
            // AI referenced a section that doesn't exist — move to generate list
            console.warn(`[BuildPage] Reused section "${section.reuse}" not found, will generate instead`)
            sectionsToGenerate.push({ role: section.role, description: section.description })
          }
        } else {
          sectionsToGenerate.push({ role: section.role, description: section.description })
        }
      }

      // 3. Build section ID list for the page
      const sectionIds = pageData.sections.map(s => {
        if (s.reuse && site.sections[s.reuse]) return s.reuse
        // For new sections, check collision with existing IDs
        if (site.sections[s.role]) {
          const prefix = pageData.title.toLowerCase().replace(/\s+/g, '-')
          return `${prefix}-${s.role}`
        }
        return s.role
      })

      // 4. Add the page to the site and navigate the preview to it
      siteStore.addPage(projectId, normalizedSlug, pageData.title, sectionIds)
      requestNavigation(projectId, normalizedSlug)

      // 5. Short-circuit if all sections are reused
      if (sectionsToGenerate.length === 0) {
        await streamAgentMessage(
          convoId,
          `**${pageData.title}** page is ready at \`${normalizedSlug}\` — all sections reused from existing pages. You might want to update the header navigation to include a link to it.`,
          'assistant',
        )
        return
      }

      // 6. Post progress card
      const allSteps = sectionsToGenerate.map(s => ({
        name: humanizeRole(s.role),
        status: 'running' as 'pending' | 'running' | 'done' | 'error',
      }))

      const buildIntro: ContentBlock[] = [
        { type: 'text', text: `Building **${pageData.title}** page — ${sectionsToGenerate.length} new section${sectionsToGenerate.length > 1 ? 's' : ''} to generate.` },
        {
          type: 'card',
          card: 'progress',
          data: { label: `Building ${pageData.title}`, steps: allSteps.map(s => ({ name: s.name, status: s.status })) },
        },
      ]
      postMessage(convoId, 'agent', buildIntro, 'assistant')

      const progressMsgId = messages.value[messages.value.length - 1]?.id ?? null

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

      // 7. Generate sections with event handler
      const onEvent = (event: GenerationEvent) => {
        switch (event.type) {
          case 'section-done': {
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

            const succeeded = sectionsToGenerate.length - event.failed.length
            if (event.failed.length === 0) {
              streamAgentMessage(
                convoId,
                `**${pageData.title}** page is ready at \`${normalizedSlug}\`!`,
                'assistant',
              ).then(() => {
                pushActions({
                  id: `nav-update-${normalizedSlug}`,
                  conversationId: convoId,
                  actions: [{
                    id: `update-nav-${Date.now()}`,
                    label: `Add ${pageData.title} to navigation`,
                    variant: 'primary',
                    action: {
                      type: 'send-message',
                      message: `Update the header navigation to include a link to the new ${pageData.title} page at ${normalizedSlug}`,
                    },
                  }],
                  sourceRef: 'page-build-nav',
                })
              })
            } else {
              streamAgentMessage(
                convoId,
                `**${pageData.title}** page is mostly ready — ${succeeded} of ${sectionsToGenerate.length} sections built. You can ask me to regenerate the failed ones.`,
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
            streamAgentMessage(convoId, `Something went wrong building the page: ${event.error}`, 'assistant')
            break
          }
        }
      }

      await generatePageSections(site, projectId, pageData.title, sectionsToGenerate, onEvent)
    },

    stopBuild(projectId: string): void {
      abort()
      buildStates[projectId] = { status: 'error', error: 'Cancelled' }
      setStatus(projectId, 'stopped')
    },
  }
}
