import { ref, computed, type Ref, unref } from 'vue'
import { seedConversations, seedMessages } from './seed-conversations'
import type { Conversation, Message, AgentId } from './types'

// Module-level state (singleton)
const conversations = ref<Conversation[]>(structuredClone(seedConversations))
const messages = ref<Message[]>(structuredClone(seedMessages))

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

  function sendMessage(conversationId: string, role: 'user' | 'agent', content: string, agentId?: AgentId) {
    messages.value.push({
      id: `msg-${Date.now()}`,
      conversationId,
      role,
      agentId,
      content,
      timestamp: new Date().toISOString(),
    })
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
