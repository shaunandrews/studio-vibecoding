<script setup lang="ts">
import Text from '@/components/primitives/Text.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import type { Project } from '@/data/types'

defineProps<{
  project: Project
}>()

defineEmits<{
  'open': [id: string]
  'toggle-status': [id: string]
}>()
</script>

<template>
  <div class="project-card vstack gap-xs" @click="$emit('open', project.id)">
    <div class="project-card-header hstack gap-xs">
      <img class="project-card-favicon" :src="project.favicon" alt="" />
      <div class="flex-1 min-w-0">
        <Text variant="body" weight="medium" tag="div" class="project-card-name" color="inherit">{{ project.name }}</Text>
        <Text variant="caption" color="muted">{{ project.url }}</Text>
      </div>
      <StatusIndicator :status="project.status" @toggle="$emit('toggle-status', project.id)" />
    </div>
    <Text v-if="project.description" variant="caption" color="muted">{{ project.description }}</Text>
    <div class="project-card-preview">
      <Text variant="caption" color="muted" class="preview-placeholder">Site preview</Text>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: var(--color-chrome-secondary);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  text-decoration: none;
  color: var(--color-chrome-text);
}

.project-card:hover {
  border-color: var(--color-chrome-text-muted);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.project-card-favicon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.project-card-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-card-preview {
  background: var(--color-chrome-border);
  border-radius: var(--radius-s);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
