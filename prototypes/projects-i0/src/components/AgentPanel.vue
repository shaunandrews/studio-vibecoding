<script setup lang="ts">
import { ref, computed } from 'vue'
import { plus, sidebar } from '@wordpress/icons'
import Button from '@/components/Button.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import PanelToolbar from '@/components/PanelToolbar.vue'
import InputChat from '@/components/InputChat.vue'
import Text from '@/components/Text.vue'
import { useAgents } from '@/data/useAgents'
import { useConversations } from '@/data/useConversations'
import type { AgentId } from '@/data/types'

const { agents } = useAgents()
const { getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const activeTab = ref<AgentId>('assistant')

const props = defineProps<{
  projectId?: string | null
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()

const projectIdRef = computed(() => props.projectId ?? null)
const conversation = getConversation(projectIdRef, activeTab)
const conversationId = computed(() => conversation.value?.id ?? null)
const msgs = getMessages(conversationId)

const selectedMessage = ref<string | null>(null)

function selectMessage(id: string) {
  selectedMessage.value = selectedMessage.value === id ? null : id
}

function handleSend(text: string) {
  const conv = ensureConversation(props.projectId ?? null, activeTab.value)
  sendMessage(conv.id, 'user', text)
}
</script>

<template>
  <div class="agent-panel vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <div class="agent-tabs hstack gap-xxxs overflow-auto">
          <button
            v-for="agent in agents"
            :key="agent.id"
            class="agent-tab px-xs py-xxxs"
            :class="{ active: agent.id === activeTab }"
            @click="activeTab = agent.id"
          >
            <Text variant="caption" :color="agent.id === activeTab ? 'default' : 'muted'">{{ agent.label }}</Text>
          </button>
        </div>
      </template>
      <template #end>
        <Button variant="tertiary" :icon="plus" size="small" />
        <Button variant="tertiary" :icon="sidebar" size="small" :active="previewVisible" @click="$emit('toggle-preview')" />
      </template>
    </PanelToolbar>
    <div class="messages flex-1 overflow-auto px-m py-l">
      <div class="messages-inner vstack gap-m">
        <ChatMessage
          v-for="msg in msgs"
          :key="msg.id"
          :role="msg.role"
          :content="msg.content"
          :selected="selectedMessage === msg.id"
          @select="selectMessage(msg.id)"
        />
      </div>
    </div>
    <div class="px-l pb-l shrink-0">
      <InputChat @send="handleSend" />
    </div>
  </div>
</template>

<style scoped>
.agent-tabs {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.agent-tabs::-webkit-scrollbar {
  display: none;
}

.agent-tab {
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 120ms ease;
}

.agent-tab:hover {
  background: var(--color-surface-secondary);
}

.agent-tab.active {
  background: var(--color-surface-secondary);
}

.messages-inner {
  max-width: 720px;
  width: 100%;
}
</style>
