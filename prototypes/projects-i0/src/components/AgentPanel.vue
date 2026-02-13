<script setup lang="ts">
import { ref } from 'vue'
import { plus, sidebar } from '@wordpress/icons'
import Button from './Button.vue'
import ChatMessage from './ChatMessage.vue'
import PanelToolbar from './PanelToolbar.vue'
import InputChat from './InputChat.vue'
import Text from './Text.vue'

interface AgentTab {
  id: string
  label: string
}

const tabs = ref<AgentTab[]>([
  { id: 'assistant', label: 'Site Assistant' },
  { id: 'code', label: 'Code Agent' },
  { id: 'design', label: 'Design Agent' },
])

const activeTab = ref('assistant')

const props = defineProps<{
  previewVisible?: boolean
}>()

const emit = defineEmits<{
  'toggle-preview': []
}>()
</script>

<template>
  <div class="agent-panel vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <div class="agent-tabs hstack gap-xxxs overflow-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="agent-tab px-xs py-xxxs"
            :class="{ active: tab.id === activeTab }"
            @click="activeTab = tab.id"
          >
            <Text variant="caption" :color="tab.id === activeTab ? 'default' : 'muted'">{{ tab.label }}</Text>
          </button>
        </div>
      </template>
      <template #end>
        <Button variant="tertiary" :icon="plus" size="small" />
        <Button variant="tertiary" :icon="sidebar" size="small" :active="previewVisible" @click="$emit('toggle-preview')" />
      </template>
    </PanelToolbar>
    <div class="messages flex-1 overflow-auto p-l">
      <div class="messages-inner vstack gap-m">
        <ChatMessage
          role="agent"
          content="Hello! I'm your site assistant. I can help you build, customize, and manage your WordPress site. What would you like to work on?"
        />
        <ChatMessage
          role="user"
          content="I want to change the hero section on my homepage to have a gradient background and bigger text."
        />
        <ChatMessage
          role="agent"
          content="I'll update your hero section with a gradient background and increase the heading size. Let me make those changes to your theme now."
        />
      </div>
    </div>
    <div class="px-l pb-l shrink-0">
      <InputChat />
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
