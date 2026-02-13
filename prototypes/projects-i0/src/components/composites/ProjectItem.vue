<script setup lang="ts">
import Text from '@/components/primitives/Text.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import type { Project } from '@/data/types'

defineProps<{
  project: Project
  mode: 'card' | 'row'
  active?: boolean
}>()

defineEmits<{
  select: [id: string]
  'toggle-status': [id: string]
}>()
</script>

<template>
  <div
    class="project-item"
    :class="[`mode-${mode}`, { active }]"
    @click="$emit('select', project.id)"
  >
    <div class="item-header hstack gap-xs">
      <img class="item-favicon shrink-0" :src="project.favicon" alt="" />
      <div class="flex-1 min-w-0">
        <div class="item-name">{{ project.name }}</div>
        <div class="item-url"><Text variant="caption" color="muted">{{ project.url }}</Text></div>
      </div>
      <StatusIndicator :status="project.status" @toggle="$emit('toggle-status', project.id)" />
    </div>
    <div class="item-description">
      <Text v-if="project.description" variant="caption" color="muted">{{ project.description }}</Text>
    </div>
    <div class="item-preview">
      <Text variant="caption" color="muted" class="preview-placeholder">Site preview</Text>
    </div>
  </div>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  color: var(--color-chrome-text);
  transition: padding 300ms ease, border-radius 300ms ease, border-color 300ms ease, background 300ms ease;
}

/* Card mode */
.project-item.mode-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
}

.project-item.mode-card:hover {
  border-color: var(--color-chrome-text-muted);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Row mode */
.project-item.mode-row {
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-s);
  padding: var(--space-xxs);
  color: var(--color-chrome-text-secondary);
}

.project-item.mode-row:hover {
  background: var(--color-chrome-hover);
}

.project-item.mode-row.active {
  background: var(--color-chrome-active);
  color: var(--color-chrome-text);
}

/* Favicon */
.item-favicon {
  border-radius: var(--radius-s);
  transition: width 300ms ease, height 300ms ease;
}

.mode-card .item-favicon {
  width: 32px;
  height: 32px;
}

.mode-row .item-favicon {
  width: 20px;
  height: 20px;
}

/* Name */
.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
}

/* Collapsible: url */
.item-url {
  transition: opacity 300ms ease, max-height 300ms ease;
  overflow: hidden;
}

.mode-card .item-url {
  opacity: 1;
  max-height: 2em;
}

.mode-row .item-url {
  opacity: 0;
  max-height: 0;
}

/* Collapsible: description */
.item-description {
  transition: opacity 300ms ease, max-height 300ms ease, margin-top 300ms ease;
  overflow: hidden;
}

.mode-card .item-description {
  opacity: 1;
  max-height: 4em;
  margin-top: var(--space-xs);
}

.mode-row .item-description {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}

/* Collapsible: preview */
.item-preview {
  transition: opacity 300ms ease, max-height 300ms ease, margin-top 300ms ease;
  overflow: hidden;
}

.mode-card .item-preview {
  opacity: 1;
  max-height: 120px;
  margin-top: var(--space-xs);
}

.mode-card .item-preview .preview-placeholder {
  background: var(--color-chrome-border);
  border-radius: var(--radius-s);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mode-row .item-preview {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}
</style>
