import { ref, computed, type Ref, unref } from 'vue'
import { isAIConfigured, streamAI } from './ai-service'
import { AI_SYSTEM_PROMPT } from './ai-system-prompt'
import { useInputActions } from './useInputActions'
import type { Conversation, Message, AgentId, ContentBlock, MessageContext, ActionButton } from './types'

const { pushActions } = useInputActions()

// Module-level state (singleton)
const conversations = ref<Conversation[]>([])
const messages = ref<Message[]>([])

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

function queueAgentResponse(conversationId: string, text: string) {
  const agentId = getConversationAgent(conversationId)
  sendToAIWithIndicator(conversationId, text, agentId)
}

async function sendToAIWithIndicator(conversationId: string, text: string, agentId?: AgentId) {
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

  await streamAI(history, (blocks) => {
    // Update the message content in place — Vue reactivity handles re-render
    const idx = messages.value.findIndex(m => m.id === streamingId)
    if (idx !== -1) {
      messages.value[idx]!.content = blocks
    }
  })

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

  for (const block of blocks) {
    if (block.type !== 'card') continue

    if (block.card === 'plugin') {
      const data = block.data
      if (data.status === 'available') {
        actions.push({
          id: `install-${data.slug}-${Date.now()}`,
          label: `Install ${data.name}`,
          variant: 'primary',
          action: {
            type: 'send-message',
            message: `Install the ${data.name} plugin`,
            payload: { pluginSlug: data.slug },
          },
        })
      }
    }
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
  ) {
    appendMessage(conversationId, role, content, agentId, messageContext)

    if (role === 'user') {
      const text = typeof content === 'string'
        ? content
        : content
          .filter(block => block.type === 'text')
          .map(block => block.text)
          .join('\n')
      queueAgentResponse(conversationId, text)
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
