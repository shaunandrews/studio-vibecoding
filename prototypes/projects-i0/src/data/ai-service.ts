import Anthropic from '@anthropic-ai/sdk'
import { AI_SYSTEM_PROMPT } from './ai-system-prompt'
import type { ContentBlock, CardBlock } from './types'

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

const CARD_TYPES = ['plugin', 'colorPalette', 'settings', 'progress', 'themePicker', 'page', 'postDraft'] as const
type CardType = typeof CARD_TYPES[number]

function parseAIResponse(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  // Match ```card:TYPE\n...\n```
  const cardRegex = /```card:(\w+)\s*\n([\s\S]*?)```/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = cardRegex.exec(text)) !== null) {
    // Add any text before this card block
    const before = text.slice(lastIndex, match.index).trim()
    if (before) {
      blocks.push({ type: 'text', text: before })
    }

    const cardType = match[1] as string
    const jsonStr = match[2]!.trim()

    if (CARD_TYPES.includes(cardType as CardType)) {
      try {
        const data = JSON.parse(jsonStr)
        blocks.push({
          type: 'card',
          card: cardType as CardType,
          data,
        } as CardBlock)
      } catch {
        // JSON parse failed — show as text
        blocks.push({ type: 'text', text: `\`\`\`json\n${jsonStr}\n\`\`\`` })
      }
    } else {
      // Unknown card type — show as text
      blocks.push({ type: 'text', text: `\`\`\`${cardType}\n${jsonStr}\n\`\`\`` })
    }

    lastIndex = match.index + match[0].length
  }

  // Add any remaining text
  const remaining = text.slice(lastIndex).trim()
  if (remaining) {
    blocks.push({ type: 'text', text: remaining })
  }

  // If nothing was parsed, return the whole thing as text
  if (blocks.length === 0) {
    blocks.push({ type: 'text', text })
  }

  return blocks
}

export async function sendToAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt?: string,
): Promise<ContentBlock[]> {
  const apiKey = getAPIKey()
  if (!apiKey) {
    return [{ type: 'text', text: "I'm not connected to an AI service yet. Add your Anthropic API key in settings to enable live responses." }]
  }

  try {
    const client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt ?? AI_SYSTEM_PROMPT,
      messages,
    })

    // Extract text from response
    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n')

    return parseAIResponse(responseText)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error calling AI service'
    return [{ type: 'text', text: `⚠️ AI error: ${message}` }]
  }
}
