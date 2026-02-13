import { ref, computed, type Ref, unref } from 'vue'
import { seedConversations, seedMessages } from './seed-conversations'
import {
  SCRIPTED_REPLY_DELAY_MS,
  buildFallbackAgentMessage,
  getInitialScriptState,
  resolveScriptTransition,
} from './scripted-flows'
import type { Conversation, Message, AgentId, ContentBlock, MessageContext } from './types'

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
const scriptedState = ref<Record<string, string>>({})

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

function ensureScriptState(conversationId: string): string | null {
  const existing = scriptedState.value[conversationId]
  if (existing) return existing
  const initial = getInitialScriptState(conversationId)
  if (!initial) return null
  scriptedState.value = { ...scriptedState.value, [conversationId]: initial }
  return initial
}

function setScriptState(conversationId: string, state: string) {
  scriptedState.value = { ...scriptedState.value, [conversationId]: state }
}

function maybeQueueScriptedResponse(conversationId: string, text: string, messageContext?: MessageContext) {
  const state = ensureScriptState(conversationId)
  if (!state) return

  const transition = resolveScriptTransition(conversationId, state, text, messageContext)
  const fallback = !transition ? buildFallbackAgentMessage(conversationId) : null
  const replies = transition?.responses ?? (fallback ? [fallback] : [])
  const agentId = getConversationAgent(conversationId)

  if (replies.length === 0) return

  if (transition) setScriptState(conversationId, transition.to)

  window.setTimeout(() => {
    for (const reply of replies) {
      appendMessage(conversationId, reply.role, reply.content, agentId)
    }
  }, SCRIPTED_REPLY_DELAY_MS)
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
      maybeQueueScriptedResponse(conversationId, text, messageContext)
    }
  }

  return {
    conversations,
    messages,
    getConversations,
    getConversation,
    getMessages,
    ensureConversation,
    sendMessage,
  }
}
