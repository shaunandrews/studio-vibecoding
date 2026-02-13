<script setup lang="ts">
import Text from '@/components/primitives/Text.vue'
import type { Agent, AgentId } from '@/data/types'

defineProps<{
  tabs: Agent[]
  activeId: AgentId
}>()

defineEmits<{
  'update:activeId': [id: AgentId]
}>()
</script>

<template>
  <div class="tab-bar hstack gap-xxxs overflow-auto">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-bar__tab px-xs py-xxxs"
      :class="{ active: tab.id === activeId }"
      @click="$emit('update:activeId', tab.id)"
    >
      <Text variant="caption" :color="tab.id === activeId ? 'default' : 'muted'">{{ tab.label }}</Text>
    </button>
  </div>
</template>

<style scoped>
.tab-bar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-bar__tab {
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 120ms ease;
}

.tab-bar__tab:hover {
  background: var(--color-surface-secondary);
}

.tab-bar__tab.active {
  background: var(--color-surface-secondary);
}
</style>
