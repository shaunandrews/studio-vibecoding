<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { sidebar } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import TabBar from '@/components/composites/TabBar.vue'
import ChatMessageList from '@/components/composites/ChatMessageList.vue'
import InputChat from '@/components/composites/InputChat.vue'
import { useAgents } from '@/data/useAgents'
import { useConversations } from '@/data/useConversations'
import type { Agent, AgentId } from '@/data/types'

const { agents } = useAgents()
const { getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

// Per-project tab state: which agents are open and which is active
const projectTabs = reactive(new Map<string, { openIds: AgentId[], activeId: AgentId }>())

function getProjectKey(): string {
  return props.projectId ?? '__global__'
}

function getTabState() {
  const key = getProjectKey()
  if (!projectTabs.has(key)) {
    // Default: start with the assistant tab open
    projectTabs.set(key, { openIds: ['assistant'], activeId: 'assistant' })
  }
  return projectTabs.get(key)!
}

const openTabs = computed<Agent[]>(() => {
  const state = getTabState()
  return state.openIds
    .map(id => agents.find(a => a.id === id))
    .filter((a): a is Agent => !!a)
})

const activeAgentId = computed<AgentId>(() => getTabState().activeId)

function setActiveTab(id: AgentId) {
  getTabState().activeId = id
}

function handleAddTab() {
  const state = getTabState()
  // Find the first agent not already open
  const available = agents.filter(a => !state.openIds.includes(a.id))
  if (available.length === 0) return // all agents already open
  const next = available[0]
  state.openIds.push(next.id)
  state.activeId = next.id
}

function handleCloseTab(id: AgentId) {
  const state = getTabState()
  const idx = state.openIds.indexOf(id)
  if (idx === -1) return
  // Don't close the last tab
  if (state.openIds.length <= 1) return
  state.openIds.splice(idx, 1)
  // If we closed the active tab, activate the nearest neighbor
  if (state.activeId === id) {
    state.activeId = state.openIds[Math.min(idx, state.openIds.length - 1)]
  }
}

const projectIdRef = computed(() => props.projectId ?? null)
const conversation = getConversation(projectIdRef, activeAgentId)
const conversationId = computed(() => conversation.value?.id ?? null)
const msgs = getMessages(conversationId)

function handleSend(text: string) {
  const conv = ensureConversation(props.projectId ?? null, activeAgentId.value)
  sendMessage(conv.id, 'user', text)
}
</script>

<template>
  <div class="agent-panel vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <TabBar :tabs="openTabs" :active-id="activeAgentId" @update:active-id="setActiveTab" @add="handleAddTab" @close="handleCloseTab" />
      </template>
      <template #end>
        <Button variant="tertiary" :icon="sidebar" size="small"
          :active="previewVisible" @click="$emit('toggle-preview')" />
      </template>
    </PanelToolbar>

    <ChatMessageList :messages="msgs" />

    <div class="px-l pb-l shrink-0">
      <InputChat @send="handleSend" />
    </div>
  </div>
</template>
