<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { drawerRight } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import TabBar from '@/components/composites/TabBar.vue'
import ChatMessageList from '@/components/composites/ChatMessageList.vue'
import InputChat from '@/components/composites/InputChat.vue'
import { useConversations } from '@/data/useConversations'
import { useSiteThemes } from '@/data/themes/useSiteThemes'
import { useBuildProgress } from '@/data/useBuildProgress'
import type { ActionButton, Conversation } from '@/data/types'
import type { Tab } from '@/components/composites/TabBar.vue'

const { conversations, messages, getMessages, ensureConversation, sendMessage } = useConversations()
const { updateTheme } = useSiteThemes()
const { isBuilding, progress } = useBuildProgress()

// Build progress for the current project
const building = computed(() => props.projectId ? isBuilding(props.projectId) : false)

const buildLabel = computed(() => {
  if (!building.value) return ''
  const p = progress.value
  const statusLabels: Record<string, string> = {
    brief: 'Creating design brief...',
    generating: p.currentPage ? `Building ${p.currentPage}...` : 'Generating sections...',
    extracting: 'Analyzing design patterns...',
    reviewing: 'Reviewing quality...',
  }
  const label = statusLabels[p.status] || 'Building...'
  if (p.sectionsTotal > 0) {
    return `${label} (${p.sectionsComplete}/${p.sectionsTotal} sections)`
  }
  return label
})

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
  const existing = tabStateMap.value[key]
  if (existing) return existing

  const convoIds = projectConvos.value.map(c => c.id)
  const openIds = convoIds.length > 0 ? convoIds : []
  // If no convos exist, create one
  if (openIds.length === 0) {
    const conv = ensureConversation(props.projectId ?? null, 'assistant')
    openIds.push(conv.id)
  }
  const activeId = openIds[0]
  if (!activeId) {
    throw new Error('Failed to initialize a conversation tab state')
  }
  tabStateMap.value[key] = { openConvoIds: openIds, activeConvoId: activeId }
  return tabStateMap.value[key]!
}

const openTabs = computed<Tab[]>(() => {
  const state = ensureTabState()
  return state.openConvoIds
    .map(id => {
      const convo = conversations.value.find(c => c.id === id)
      if (!convo) return null
      const convoMessages = messages.value
        .filter(m => m.conversationId === convo.id)
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      const tab: Tab = {
        id: convo.id,
        label: convo.title || 'New chat',
      }
      if (convoMessages.length > 0) {
        tab.messageCount = convoMessages.length
      }
      return tab
    })
    .filter((t): t is Tab => !!t)
})

const activeConvoId = computed(() => ensureTabState().activeConvoId)

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
    const nextId = state.openConvoIds[Math.min(idx, state.openConvoIds.length - 1)]
    state.activeConvoId = nextId ?? state.openConvoIds[0] ?? state.activeConvoId
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
  // During build, send through normal AI chat so the user can answer questions.
  // The AI's system prompt handles context extraction via card:context blocks.
  // After the AI responds, we parse any context data and feed it to the pipeline.
  sendMessage(
    activeConvoId.value,
    'user',
    text,
    undefined,
    { source: 'typed' },
  )
  drafts.value[activeConvoId.value] = ''
}

function handleAction(action: ActionButton) {
  if (action.action.payload?.themeChanges && props.projectId) {
    try {
      const changes = JSON.parse(action.action.payload.themeChanges)
      updateTheme(props.projectId, changes)
    } catch { /* ignore parse errors */ }
  }
  sendMessage(
    activeConvoId.value,
    'user',
    action.action.message,
    undefined,
    {
      source: 'action',
      actionId: action.id,
      cardRef: action.action.cardRef,
      payload: action.action.payload,
    },
  )
}
</script>

<template>
  <div class="agent-panel vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <TabBar :tabs="openTabs" :active-id="activeConvoId" @update:active-id="setActiveTab" @add="handleAddTab" @close="handleCloseTab" />
      </template>
      <template #end>
        <Button variant="tertiary" :icon="drawerRight"
          :active="previewVisible" :tooltip="previewVisible ? 'Hide preview' : 'Show preview'" @click="$emit('toggle-preview')" />
      </template>
    </PanelToolbar>

    <div v-if="building" class="build-banner">
      <div class="build-banner__pulse" />
      <span class="build-banner__label">{{ buildLabel }}</span>
    </div>

    <ChatMessageList :messages="msgs" :project-id="projectId" @action="(_, action) => handleAction(action)" />

    <div class="agent-panel__input shrink-0 px-s pb-s">
      <div class="agent-panel__input-inner">
        <InputChat ref="inputChatRef" v-model="currentDraft" @send="handleSend" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.build-banner {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-s);
  background: var(--color-surface-secondary);
  border-block-end: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.build-banner__pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.build-banner__label {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
}

.agent-panel__input-inner {
  max-width: 720px;
  margin: 0 auto;
}
</style>
