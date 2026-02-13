<script setup lang="ts">
import { ref, computed } from 'vue'
import { sidebar } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import TabBar from '@/components/composites/TabBar.vue'
import ChatMessageList from '@/components/composites/ChatMessageList.vue'
import InputChat from '@/components/composites/InputChat.vue'
import { useAgents } from '@/data/useAgents'
import { useConversations } from '@/data/useConversations'
import type { AgentId } from '@/data/types'

const { agents } = useAgents()
const { getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const activeAgentId = ref<AgentId>('assistant')

function handleAddTab() {
  console.log('Add tab')
}

function handleCloseTab(id: AgentId) {
  console.log('Close tab', id)
}

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

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
        <TabBar :tabs="agents" :active-id="activeAgentId" @update:active-id="activeAgentId = $event" @add="handleAddTab" @close="handleCloseTab" />
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
