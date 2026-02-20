import Anthropic from '@anthropic-ai/sdk'
import { AI_SYSTEM_PROMPT } from './ai-system-prompt'
import type { ContentBlock, CardBlock } from './types'
import type { ParsedAIBlock } from './ai-pipeline-types'
import { validateSection, normalizeTheme } from './ai-pipeline-types'
import type { AIThemeOutput } from './ai-pipeline-types'

const STORAGE_KEY = 'anthropic-api-key'

export function isAIConfigured(): boolean {
  return !!localStorage.getItem(STORAGE_KEY)?.trim()
}

export function getAPIKey(): string {
  return localStorage.getItem(STORAGE_KEY)?.trim() ?? ''
}

export function setAPIKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim())
}

const CARD_TYPES = ['plugin', 'colorPalette', 'settings', 'progress', 'themePicker', 'page', 'postDraft', 'themeUpdate', 'sectionEdit', 'skillBanner', 'pageCreate'] as const
type CardType = typeof CARD_TYPES[number]

/**
 * Unified fence regex — matches card:TYPE, section:TYPE, theme, templatePart:TYPE, card:context
 * Uses [\w-]+ to support hyphenated section types like hero-split, content-cards
 */
const UNIFIED_FENCE_REGEX = /```(card:[\w-]+|section:[\w-]+|theme|templatePart:[\w-]+)\s*\n([\s\S]*?)```/g
const UNIFIED_PARTIAL_FENCE_REGEX = /```(?:card:[\w-]+|section:[\w-]+|theme|templatePart:[\w-]+)\s*\n[^]*$/

/**
 * Parse AI response into ContentBlock[] (backward compatible).
 * Also handles new Phase 2 fence types but converts them to text blocks
 * for the chat display — the pipeline uses parseGenerationResponse() instead.
 */
function parseAIResponse(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const regex = new RegExp(UNIFIED_FENCE_REGEX.source, 'g')

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).trim()
    if (before) {
      blocks.push({ type: 'text', text: before })
    }

    const fenceType = match[1]!
    const jsonStr = match[2]!.trim()

    if (fenceType.startsWith('card:')) {
      const cardType = fenceType.slice(5)
      // Skip card:context — it's consumed by the pipeline, not displayed
      if (cardType === 'context') {
        lastIndex = match.index + match[0].length
        continue
      }
      if (CARD_TYPES.includes(cardType as CardType)) {
        try {
          const data = JSON.parse(jsonStr)
          blocks.push({
            type: 'card',
            card: cardType as CardType,
            data,
          } as CardBlock)
        } catch {
          blocks.push({ type: 'text', text: `\`\`\`json\n${jsonStr}\n\`\`\`` })
        }
      } else {
        blocks.push({ type: 'text', text: `\`\`\`${cardType}\n${jsonStr}\n\`\`\`` })
      }
    } else {
      // section:*, theme, templatePart:* — skip in chat display (handled by pipeline)
      // Don't show raw JSON to user
    }

    lastIndex = match.index + match[0].length
  }

  const remaining = text.slice(lastIndex).trim()
  if (remaining) {
    blocks.push({ type: 'text', text: remaining })
  }

  if (blocks.length === 0) {
    blocks.push({ type: 'text', text })
  }

  return blocks
}

/**
 * Parse AI response into ParsedAIBlock[] for the generation pipeline.
 * Handles section:TYPE, theme, templatePart:TYPE, and card:context fences.
 */
export function parseGenerationResponse(text: string): ParsedAIBlock[] {
  const blocks: ParsedAIBlock[] = []
  const regex = new RegExp(UNIFIED_FENCE_REGEX.source, 'g')

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index).trim()
    if (before) {
      blocks.push({ type: 'text', text: before })
    }

    const fenceType = match[1]!
    const jsonStr = match[2]!.trim()

    try {
      const data = JSON.parse(jsonStr)

      if (fenceType === 'theme') {
        blocks.push({ type: 'theme', data: normalizeTheme(data as AIThemeOutput) })
      } else if (fenceType.startsWith('templatePart:')) {
        const partType = fenceType.slice('templatePart:'.length)
        blocks.push({ type: 'templatePart', partType, data })
      } else if (fenceType.startsWith('section:')) {
        const sectionType = fenceType.slice('section:'.length)
        const validation = validateSection(sectionType, data)
        blocks.push({
          type: 'section',
          sectionType,
          data,
          valid: validation.valid,
          errors: validation.errors,
        })
      } else if (fenceType === 'card:context') {
        blocks.push({ type: 'context', data })
      } else if (fenceType.startsWith('card:')) {
        const cardType = fenceType.slice('card:'.length)
        blocks.push({ type: 'card', cardType, data })
      }
    } catch {
      blocks.push({ type: 'error', fenceType, raw: jsonStr, error: 'Invalid JSON' })
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text (hide partial fences)
  const remaining = text.slice(lastIndex)
  const partialRegex = new RegExp(UNIFIED_PARTIAL_FENCE_REGEX.source)
  if (!partialRegex.test(remaining)) {
    const trimmed = remaining.trim()
    if (trimmed) {
      blocks.push({ type: 'text', text: trimmed })
    }
  }

  return blocks
}

/**
 * Parse streaming text for the generation pipeline.
 * Returns ParsedAIBlock[] with completed blocks; partial fences are hidden.
 */
export function parseGenerationStream(raw: string): ParsedAIBlock[] {
  return parseGenerationResponse(raw)
}

/**
 * Streaming AI response.
 * Calls `onUpdate` with the current parsed ContentBlock[] as text arrives.
 * Text streams in real-time; cards are buffered until their closing fence.
 */
export async function streamAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onUpdate: (blocks: ContentBlock[]) => void,
  systemPrompt?: string,
): Promise<ContentBlock[]> {
  const apiKey = getAPIKey()
  if (!apiKey) {
    const blocks: ContentBlock[] = [{ type: 'text', text: "I'm not connected to an AI service yet. Add your Anthropic API key in settings to enable live responses." }]
    onUpdate(blocks)
    return blocks
  }

  try {
    const client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt ?? AI_SYSTEM_PROMPT,
      messages,
    })

    let accumulated = ''

    stream.on('text', (text) => {
      accumulated += text
      onUpdate(parseStreamingText(accumulated))
    })

    await stream.finalMessage()

    // Final parse for complete response
    const finalBlocks = parseAIResponse(accumulated)
    onUpdate(finalBlocks)
    return finalBlocks
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error calling AI service'
    const blocks: ContentBlock[] = [{ type: 'text', text: `⚠️ AI error: ${message}` }]
    onUpdate(blocks)
    return blocks
  }
}

/**
 * Incremental parser for streaming text.
 * Renders text outside card fences immediately.
 * Completed card fences get parsed as cards.
 * In-progress card fences are hidden (buffered).
 * Updated to use unified fence regex supporting section:*, theme, templatePart:*.
 */
function parseStreamingText(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  // Match complete fenced blocks (cards, sections, theme, templateParts)
  const cardRegex = new RegExp(UNIFIED_FENCE_REGEX.source, 'g')
  // Detect an in-progress (unclosed) fence at the end
  const partialFenceRegex = new RegExp(UNIFIED_PARTIAL_FENCE_REGEX.source)

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = cardRegex.exec(raw)) !== null) {
    const before = raw.slice(lastIndex, match.index).trim()
    if (before) {
      blocks.push({ type: 'text', text: before })
    }

    const fenceType = match[1] as string
    const jsonStr = match[2]!.trim()

    if (fenceType.startsWith('card:')) {
      const cardType = fenceType.slice(5)
      if (cardType === 'context') {
        // Skip context blocks in chat display
        lastIndex = match.index + match[0].length
        continue
      }
      if (CARD_TYPES.includes(cardType as CardType)) {
        try {
          const data = JSON.parse(jsonStr)
          blocks.push({ type: 'card', card: cardType as CardType, data } as CardBlock)
        } catch {
          blocks.push({ type: 'text', text: `\`\`\`json\n${jsonStr}\n\`\`\`` })
        }
      } else {
        blocks.push({ type: 'text', text: `\`\`\`${cardType}\n${jsonStr}\n\`\`\`` })
      }
    } else {
      // section:*, theme, templatePart:* — hide from chat streaming display
    }

    lastIndex = match.index + match[0].length
  }

  const remaining = raw.slice(lastIndex)

  // Check if the remaining text contains an unclosed fence
  if (partialFenceRegex.test(remaining)) {
    // There's a fence being streamed — show text before it, hide the rest
    const fenceStart = remaining.search(/```(?:card:|section:|theme|templatePart:)/)
    const visibleText = remaining.slice(0, fenceStart).trim()
    if (visibleText) {
      blocks.push({ type: 'text', text: visibleText })
    }
  } else {
    const trimmed = remaining.trim()
    if (trimmed) {
      blocks.push({ type: 'text', text: trimmed })
    }
  }

  if (blocks.length === 0) {
    blocks.push({ type: 'text', text: '' })
  }

  return blocks
}
