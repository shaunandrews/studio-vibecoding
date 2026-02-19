import { ref, computed, type Ref, unref } from 'vue'
import { seedConversations, seedMessages } from './seed-conversations'
import { isAIConfigured, streamAI } from './ai-service'
import { AI_SYSTEM_PROMPT } from './ai-system-prompt'
import { useInputActions } from './useInputActions'
import type { Conversation, Message, AgentId, ContentBlock, MessageContext, ActionButton, ThemeUpdateCardData } from './types'

const { pushActions } = useInputActions()

// Module-level state (singleton)
function cloneContentBlock(block: ContentBlock): ContentBlock {
  if (block.type === 'text') return { ...block }
  if (block.type === 'actions') {
    return {
      ...block,
      actions: block.actions.map(action => ({
        ...action,
        action: {
          ...action.action,
          payload: action.action.payload ? { ...action.action.payload } : undefined,
        },
      })),
    }
  }
  return { ...block }
}

function cloneMessage(message: Message): Message {
  return {
    ...message,
    content: message.content.map(cloneContentBlock),
    messageContext: message.messageContext
      ? {
          ...message.messageContext,
          payload: message.messageContext.payload ? { ...message.messageContext.payload } : undefined,
        }
      : undefined,
  }
}

const conversations = ref<Conversation[]>(seedConversations.map(conversation => ({ ...conversation })))
const messages = ref<Message[]>(seedMessages.map(cloneMessage))

function textBlocks(text: string): ContentBlock[] {
  return [{ type: 'text', text }]
}

function normalizeContent(content: string | ContentBlock[]): ContentBlock[] {
  return typeof content === 'string' ? textBlocks(content) : content
}

function appendMessage(
  conversationId: string,
  role: 'user' | 'agent',
  content: string | ContentBlock[],
  agentId?: AgentId,
  messageContext?: MessageContext,
) {
  messages.value.push({
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    conversationId,
    role,
    agentId,
    content: normalizeContent(content),
    messageContext,
    timestamp: new Date().toISOString(),
  })
}

function getConversationAgent(conversationId: string): AgentId | undefined {
  return conversations.value.find(c => c.id === conversationId)?.agentId
}

function queueAgentResponse(conversationId: string, text: string, siteContext?: string) {
  const agentId = getConversationAgent(conversationId)
  sendToAIWithIndicator(conversationId, text, agentId, siteContext)
}

async function sendToAIWithIndicator(conversationId: string, text: string, agentId?: AgentId, siteContext?: string) {
  if (!isAIConfigured()) {
    window.setTimeout(() => {
      appendMessage(
        conversationId,
        'agent',
        "I'm not connected to an AI service yet. Add your Anthropic API key in settings to enable live responses.",
        agentId,
      )
    }, 500)
    return
  }

  // Add streaming message placeholder
  const streamingId = `msg-streaming-${Date.now()}`
  const streamingMsg: Message = {
    id: streamingId,
    conversationId,
    role: 'agent',
    agentId,
    content: [{ type: 'text', text: '' }],
    timestamp: new Date().toISOString(),
  }
  messages.value.push(streamingMsg)

  // Build message history
  const history = messages.value
    .filter(m => m.conversationId === conversationId && m.id !== streamingId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .map(m => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: m.content
        .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
        .map(b => b.text)
        .join('\n') || '(card response)',
    }))

  const systemPrompt = siteContext
    ? `${AI_SYSTEM_PROMPT}\n\n${siteContext}`
    : undefined

  await streamAI(history, (blocks) => {
    // Update the message content in place — Vue reactivity handles re-render
    const idx = messages.value.findIndex(m => m.id === streamingId)
    if (idx !== -1) {
      messages.value[idx]!.content = blocks
    }
  }, systemPrompt)

  // After AI finishes, extract any actionable cards and push as input actions
  const finalBlocks = messages.value.find(m => m.id === streamingId)?.content
  if (finalBlocks) {
    extractCardActions(conversationId, finalBlocks)
  }
}

/**
 * After an AI response, scan content blocks for actionable cards
 * and auto-push corresponding input actions for the user to confirm.
 */
function extractCardActions(conversationId: string, blocks: ContentBlock[]) {
  const actions: ActionButton[] = []

  // Collect all theme changes into a single bundled action
  const themeChanges: { mode: string; changes: any; label: string }[] = []
  for (const block of blocks) {
    if (block.type !== 'card') continue

    if (block.card === 'themeUpdate') {
      const data = block.data as ThemeUpdateCardData & { mode?: string }
      if (data.changes) {
        themeChanges.push({
          mode: data.mode === 'dark' ? 'dark' : 'light',
          changes: data.changes,
          label: data.label,
        })
      }
    }

    if (block.card === 'sectionEdit') {
      const data = block.data as Record<string, any>
      if (data.sectionId) {
        actions.push({
          id: `apply-section-${data.sectionId}-${Date.now()}`,
          label: `Apply: ${data.label}`,
          variant: 'primary',
          action: {
            type: 'send-message',
            message: `Apply section edit: ${data.label}`,
            payload: {
              applyType: 'sectionEdit',
              sectionId: data.sectionId,
              html: data.html ?? '',
              css: data.css ?? '',
            },
          },
        })
      }
    }
  }

  // Bundle all theme cards into one "Apply" action
  if (themeChanges.length > 0) {
    const label = themeChanges.length === 1
      ? themeChanges[0]!.label
      : themeChanges[0]!.label.replace(/ - (Light|Dark) Mode$/i, '')
    actions.unshift({
      id: `apply-theme-${Date.now()}`,
      label: `Apply: ${label}`,
      variant: 'primary',
      action: {
        type: 'send-message',
        message: `Apply the theme changes: ${label}`,
        payload: {
          applyType: 'themeBatch',
          themeChanges: JSON.stringify(themeChanges),
        },
      },
    })
  }

  if (actions.length > 0) {
    pushActions({
      id: `ai-proposals-${conversationId}`,
      conversationId,
      actions,
      sourceRef: 'ai-response',
    })
  }
}

export function useConversations() {
  function getConversations(projectId: Ref<string | null> | string | null) {
    return computed(() =>
      conversations.value.filter(c => c.projectId === unref(projectId))
    )
  }

  function getConversation(projectId: Ref<string | null> | string | null, agentId: Ref<AgentId> | AgentId) {
    return computed(() =>
      conversations.value.find(c => c.projectId === unref(projectId) && c.agentId === unref(agentId)) ?? null
    )
  }

  function getMessages(conversationId: Ref<string | null> | string | null) {
    return computed(() => {
      const id = unref(conversationId)
      if (!id) return []
      return messages.value
        .filter(m => m.conversationId === id)
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    })
  }

  function ensureConversation(projectId: string | null, agentId: AgentId): Conversation {
    const existing = conversations.value.find(c => c.projectId === projectId && c.agentId === agentId)
    if (existing) return existing
    const conv: Conversation = {
      id: `conv-${Date.now()}`,
      projectId,
      agentId,
      createdAt: new Date().toISOString(),
    }
    conversations.value.push(conv)
    return conv
  }

  function sendMessage(
    conversationId: string,
    role: 'user' | 'agent',
    content: string | ContentBlock[],
    agentId?: AgentId,
    messageContext?: MessageContext,
    siteContext?: string,
  ) {
    appendMessage(conversationId, role, content, agentId, messageContext)

    if (role === 'user') {
      const text = typeof content === 'string'
        ? content
        : content
          .filter(block => block.type === 'text')
          .map(block => block.text)
          .join('\n')
      queueAgentResponse(conversationId, text, siteContext)
    }
  }

  /**
   * Push an agent message that "types in" over ~400ms, matching the look
   * of real AI streaming. Returns a promise that resolves when done.
   */
  function streamAgentMessage(
    conversationId: string,
    text: string,
    agentId?: AgentId,
  ): Promise<void> {
    const msgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const msg: Message = {
      id: msgId,
      conversationId,
      role: 'agent',
      agentId,
      content: [{ type: 'text', text: '' }],
      timestamp: new Date().toISOString(),
    }
    messages.value.push(msg)

    return new Promise(resolve => {
      const chars = [...text]
      const total = chars.length
      const duration = Math.min(400, total * 8) // cap at 400ms
      const interval = duration / total
      let i = 0

      function tick() {
        // Write a few characters per tick for longer messages
        const chunkSize = Math.max(1, Math.ceil(total / 50))
        const end = Math.min(i + chunkSize, total)
        const partial = chars.slice(0, end).join('')
        i = end

        const idx = messages.value.findIndex(m => m.id === msgId)
        if (idx !== -1) {
          messages.value[idx]!.content = [{ type: 'text', text: partial }]
        }

        if (i < total) {
          setTimeout(tick, interval * chunkSize)
        } else {
          resolve()
        }
      }

      // Start after a brief pause (feels more natural)
      setTimeout(tick, 80)
    })
  }

  function postMessage(
    conversationId: string,
    role: 'user' | 'agent',
    content: string | ContentBlock[],
    agentId?: AgentId,
    messageContext?: MessageContext,
  ) {
    appendMessage(conversationId, role, content, agentId, messageContext)
  }

  function removeMessage(messageId: string) {
    const idx = messages.value.findIndex(m => m.id === messageId)
    if (idx !== -1) messages.value.splice(idx, 1)
  }

  return {
    conversations,
    messages,
    getConversations,
    getConversation,
    getMessages,
    ensureConversation,
    sendMessage,
    postMessage,
    removeMessage,
    streamAgentMessage,
  }
}
