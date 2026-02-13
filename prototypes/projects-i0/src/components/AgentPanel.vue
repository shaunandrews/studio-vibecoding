<script setup lang="ts">
import { ref } from 'vue'
import { plus } from '@wordpress/icons'
import Button from './Button.vue'
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
</script>

<template>
  <div class="agent-panel vstack flex-1">
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
      </template>
    </PanelToolbar>
    <div class="messages flex-1 overflow-auto p-s">
      <div class="messages-inner">
        <Text variant="body-large">Hello! I'm your site assistant. How can I help you today?</Text>
      </div>
    </div>
    <InputChat />
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
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}
</style>
