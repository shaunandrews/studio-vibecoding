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
  <div class="project-list-item hstack gap-xs p-xs" :class="{ active }" @click="$emit('select')">
    <img v-if="favicon" class="project-favicon shrink-0" :src="favicon" alt="" />
    <span class="project-name flex-1 min-w-0">{{ name }}</span>
    <StatusIndicator :status="status" @toggle="$emit('toggle')" />
  </div>
</template>

<style scoped>
.project-list-item {
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
}

.project-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
