<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick } from 'vue'
import { sidebar } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import TabBar from '@/components/composites/TabBar.vue'
import ChatMessageList from '@/components/composites/ChatMessageList.vue'
import InputChat from '@/components/composites/InputChat.vue'
import { useAgents } from '@/data/useAgents'
import { useConversations } from '@/data/useConversations'
import type { Agent, AgentId, Conversation } from '@/data/types'
import type { Tab } from '@/components/composites/TabBar.vue'

const { agents } = useAgents()
const { conversations, getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

// Per-project tab state: tracks open conversation IDs
const tabStateMap = ref<Record<string, { openConvoIds: string[], activeConvoId: string }>>({})

function getProjectKey(): string {
  return props.projectId ?? '__global__'
}

// Get conversations for this project
const projectConvos = computed(() =>
  conversations.value.filter(c => c.projectId === (props.projectId ?? null))
)

function ensureTabState(): { openConvoIds: string[], activeConvoId: string } {
  const key = getProjectKey()
  if (!tabStateMap.value[key]) {
    const convoIds = projectConvos.value.map(c => c.id)
    const openIds = convoIds.length > 0 ? convoIds : []
    // If no convos exist, create one
    if (openIds.length === 0) {
      const conv = ensureConversation(props.projectId ?? null, 'assistant')
      openIds.push(conv.id)
    }
    tabStateMap.value[key] = { openConvoIds: openIds, activeConvoId: openIds[0] }
  }
  return tabStateMap.value[key]
}

const openTabs = computed<Tab[]>(() => {
  const state = ensureTabState()
  return state.openConvoIds
    .map(id => {
      const convo = conversations.value.find(c => c.id === id)
      if (!convo) return null
      const agent = agents.find(a => a.id === convo.agentId)
      return {
        id: convo.id,
        label: convo.title || 'New chat',
      }
    })
    .filter((t): t is Tab => !!t)
})

const activeConvoId = computed(() => ensureTabState().activeConvoId)

const activeAgentId = computed<AgentId>(() => {
  const convo = conversations.value.find(c => c.id === activeConvoId.value)
  return convo?.agentId ?? 'assistant'
})

function setActiveTab(id: string) {
  ensureTabState().activeConvoId = id
  tabStateMap.value = { ...tabStateMap.value }
}

function handleAddTab() {
  const state = ensureTabState()
  const conv: Conversation = {
    id: `conv-${Date.now()}`,
    projectId: props.projectId ?? null,
    agentId: 'assistant',
    createdAt: new Date().toISOString(),
  }
  conversations.value.push(conv)
  state.openConvoIds.push(conv.id)
  state.activeConvoId = conv.id
  tabStateMap.value = { ...tabStateMap.value }
  nextTick(() => inputChatRef.value?.focus())
}

function handleCloseTab(id: string) {
  const state = ensureTabState()
  const idx = state.openConvoIds.indexOf(id)
  if (idx === -1 || state.openConvoIds.length <= 1) return
  state.openConvoIds.splice(idx, 1)
  if (state.activeConvoId === id) {
    state.activeConvoId = state.openConvoIds[Math.min(idx, state.openConvoIds.length - 1)]
  }
  tabStateMap.value = { ...tabStateMap.value }
}

const msgs = getMessages(activeConvoId)
const inputChatRef = ref<InstanceType<typeof InputChat> | null>(null)

// Per-conversation draft text
const drafts = ref<Record<string, string>>({})

const currentDraft = computed({
  get: () => drafts.value[activeConvoId.value] ?? '',
  set: (val: string) => { drafts.value[activeConvoId.value] = val },
})

function handleSend(text: string) {
  sendMessage(activeConvoId.value, 'user', text)
  drafts.value[activeConvoId.value] = ''
}
</script>

<template>
  <div class="agent-panel vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <TabBar :tabs="openTabs" :active-id="activeConvoId" @update:active-id="setActiveTab" @add="handleAddTab" @close="handleCloseTab" />
      </template>
      <template #end>
        <Button variant="tertiary" :icon="sidebar"
          :active="previewVisible" @click="$emit('toggle-preview')" />
      </template>
    </PanelToolbar>

    <div class="agent-panel__content vstack flex-1 overflow-hidden" :class="{ centered: !previewVisible }">
      <ChatMessageList :messages="msgs" />

      <div class="px-l pb-l shrink-0">
        <InputChat ref="inputChatRef" v-model="currentDraft" @send="handleSend" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-panel__content.centered {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
}
</style>
