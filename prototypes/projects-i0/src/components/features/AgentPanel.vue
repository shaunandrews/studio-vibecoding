<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { drawerRight } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import TabBar from '@/components/composites/TabBar.vue'
import ChatMessageList from '@/components/composites/ChatMessageList.vue'
import InputChat from '@/components/composites/InputChat.vue'
import { useConversations } from '@/data/useConversations'
import { useSiteStore } from '@/data/useSiteStore'
import { useSiteThemes } from '@/data/themes/useSiteThemes'
import { useBuildProgress } from '@/data/useBuildProgress'
import { useOnboarding } from '@/data/useOnboarding'
import { useInputActions } from '@/data/useInputActions'
import { settingsToVariables } from '@/data/themes/settings-to-variables'
import { buildSiteContext } from '@/data/ai-site-context'
import { useSkills } from '@/data/useSkills'
import type { ActionButton, Conversation } from '@/data/types'
import type { Tab } from '@/components/composites/TabBar.vue'

const { conversations, messages, getMessages, ensureConversation, sendMessage, postMessage } = useConversations()
const siteStore = useSiteStore()
const { updateTheme } = useSiteThemes()
const { selectBrief, regenerateBriefs } = useBuildProgress()
const { isOnboarding, getOnboardingStep, resolveInput } = useOnboarding()
const { getActions, clearActions } = useInputActions()
const { getSkillPrompt } = useSkills()

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

// Build site context for AI system prompt augmentation
const siteContext = computed(() => {
  if (!props.projectId) return undefined
  const site = siteStore.getSite(props.projectId)
  const base = site ? buildSiteContext(site) : undefined
  const skillPrompt = getSkillPrompt(props.projectId)
  if (!base && !skillPrompt) return undefined
  return (base ?? '') + skillPrompt
})

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
const inputActions = getActions(activeConvoId)

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

onMounted(() => nextTick(() => inputChatRef.value?.focus()))

// Per-conversation draft text
const drafts = ref<Record<string, string>>({})

const currentDraft = computed({
  get: () => drafts.value[activeConvoId.value] ?? '',
  set: (val: string) => { drafts.value[activeConvoId.value] = val },
})

const inputPlaceholder = computed(() => {
  const pid = props.projectId
  if (!pid) return 'Ask anything...'
  const step = getOnboardingStep(pid)
  if (step === 'type') return "Or type what you're building..."
  if (step === 'name') return 'Give it a name...'
  if (step === 'description') return 'A sentence or two (optional)...'
  return 'Ask anything...'
})

function handleSend(text: string) {
  clearActions(activeConvoId.value)

  const pid = props.projectId
  if (pid && isOnboarding(pid)) {
    postMessage(activeConvoId.value, 'user', text, undefined, { source: 'typed' })
    resolveInput(pid, text)
    drafts.value[activeConvoId.value] = ''
    return
  }

  sendMessage(
    activeConvoId.value,
    'user',
    text,
    undefined,
    { source: 'typed' },
    siteContext.value,
  )
  drafts.value[activeConvoId.value] = ''
}

function handleAction(action: ActionButton) {
  const pid = props.projectId

  // Brief regeneration — DON'T clear actions, cards stay visible while generating
  if (action.action.payload?.briefRegenerate && action.action.payload?.projectId) {
    regenerateBriefs(action.action.payload.projectId)
    return
  }

  clearActions(activeConvoId.value)

  // Onboarding: type selection — only valid during the type step
  if (pid && getOnboardingStep(pid) === 'type') {
    postMessage(activeConvoId.value, 'user', action.action.message, undefined, { source: 'action' })
    resolveInput(pid, action.action.message)
    return
  }

  // Onboarding: skip — valid during description, visual, and inspiration steps
  const skipSteps = ['description', 'visual', 'inspiration']
  if (pid && action.action.payload?.onboardingSkip && skipSteps.includes(getOnboardingStep(pid) || '')) {
    postMessage(activeConvoId.value, 'user', action.action.message, undefined, { source: 'action' })
    resolveInput(pid, getOnboardingStep(pid) === 'description' ? '' : 'skip')
    return
  }

  // Brief selection — just resolve the promise, no message needed.
  // The picker card mutates in-place to show the chosen brief.
  if (action.action.payload?.briefSelection && action.action.payload?.projectId) {
    selectBrief(action.action.payload.projectId, Number(action.action.payload.briefSelection))
    return
  }

  // AI-proposed changes: route by applyType
  if (action.action.payload?.applyType && props.projectId) {
    const applyType = action.action.payload.applyType

    if (applyType === 'themeBatch' && action.action.payload.themeChanges) {
      try {
        const batch = JSON.parse(action.action.payload.themeChanges) as { mode: string; changes: any }[]
        for (const entry of batch) {
          const overrides = settingsToVariables(entry.changes)
          const mode = entry.mode === 'dark' ? 'dark' as const : 'light' as const
          siteStore.updateThemeVariables(props.projectId, overrides, mode)
        }
      } catch { /* ignore parse errors */ }
    }

    if (applyType === 'sectionEdit' && action.action.payload.sectionId) {
      siteStore.updateSection(
        props.projectId,
        action.action.payload.sectionId,
        action.action.payload.html ?? '',
        action.action.payload.css ?? '',
      )
    }
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
    siteContext.value,
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

    <ChatMessageList :messages="msgs" :project-id="projectId" />

    <div class="agent-panel__input shrink-0 px-s pb-s">
      <div class="agent-panel__input-inner">
        <InputChat ref="inputChatRef" v-model="currentDraft" :placeholder="inputPlaceholder" :actions="inputActions" @send="handleSend" @action="handleAction" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-panel__input-inner {
  max-width: 720px;
  margin: 0 auto;
}
</style>
