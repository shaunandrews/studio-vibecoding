<script setup lang="ts">
import StatusIndicator from './StatusIndicator.vue'

defineProps<{
  name: string
  favicon?: string
  status: 'stopped' | 'loading' | 'running'
  active?: boolean
}>()

defineEmits<{
  select: []
  toggle: []
}>()
</script>

<template>
  <div class="project-list-item" :class="{ active }" @click="$emit('select')">
    <img v-if="favicon" class="project-favicon" :src="favicon" alt="" />
    <span class="project-name">{{ name }}</span>
    <StatusIndicator :status="status" @toggle="$emit('toggle')" />
  </div>
</template>

<style scoped>
.project-list-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background 150ms ease;
}

.project-list-item:hover {
  background: var(--color-chrome-hover);
}

.project-list-item.active {
  background: var(--color-chrome-active);
  color: var(--color-chrome-text);
}

.project-favicon {
  width: 20px; /* Standard favicon size — intentional, not on grid */
  height: 20px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.project-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
