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
const { conversations, getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

// Per-project tab state stored as a ref so Vue tracks mutations
const tabStateMap = ref<Record<string, { openIds: AgentId[], activeId: AgentId }>>({})

function getProjectKey(): string {
  return props.projectId ?? '__global__'
}

function ensureTabState(): { openIds: AgentId[], activeId: AgentId } {
  const key = getProjectKey()
  if (!tabStateMap.value[key]) {
    // Initialize with agents that have existing conversations for this project
    const projectConvos = conversations.value.filter(c => c.projectId === props.projectId)
    const agentIdsWithConvos = [...new Set(projectConvos.map(c => c.agentId))] as AgentId[]
    const openIds: AgentId[] = agentIdsWithConvos.length > 0 ? agentIdsWithConvos : ['assistant']
    tabStateMap.value[key] = { openIds, activeId: openIds[0] }
  }
  return tabStateMap.value[key]
}

const openTabs = computed<Agent[]>(() => {
  const state = ensureTabState()
  return state.openIds
    .map(id => agents.find(a => a.id === id))
    .filter((a): a is Agent => !!a)
})

const activeAgentId = computed<AgentId>(() => ensureTabState().activeId)

function setActiveTab(id: AgentId) {
  ensureTabState().activeId = id
  // Force reactivity by reassigning
  tabStateMap.value = { ...tabStateMap.value }
}

function handleAddTab() {
  const state = ensureTabState()
  const available = agents.filter(a => !state.openIds.includes(a.id))
  if (available.length === 0) return
  const next = available[0]
  state.openIds.push(next.id)
  state.activeId = next.id
  tabStateMap.value = { ...tabStateMap.value }
}

function handleCloseTab(id: AgentId) {
  const state = ensureTabState()
  const idx = state.openIds.indexOf(id)
  if (idx === -1 || state.openIds.length <= 1) return
  state.openIds.splice(idx, 1)
  if (state.activeId === id) {
    state.activeId = state.openIds[Math.min(idx, state.openIds.length - 1)]
  }
  tabStateMap.value = { ...tabStateMap.value }
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
