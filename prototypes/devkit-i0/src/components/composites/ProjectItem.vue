<script setup lang="ts">
import Text from '@/components/primitives/Text.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import Tooltip from '@/components/primitives/Tooltip.vue'
import type { Project } from '@/data/types'
import { transitionProjectId } from '@/data/useProjectTransition'

const props = defineProps<{
  project: Project
}>()

defineEmits<{
  select: [id: string]
  'toggle-status': [id: string]
}>()
</script>

<template>
    <div
      class="project-item"
      :style="project.id === transitionProjectId ? { viewTransitionName: 'project-frame' } : {}"
      @click="$emit('select', project.id)"
    >
      <div class="item-header hstack gap-xs">
        <img class="item-favicon shrink-0" :src="project.favicon" alt="" />
        <div class="flex-1 min-w-0">
          <div class="item-name">{{ project.name }}</div>
          <div class="item-url"><Text variant="caption" color="muted">{{ project.url }}</Text></div>
        </div>
        <Tooltip :text="project.status === 'running' ? 'Running — click to stop' : project.status === 'loading' ? 'Starting…' : 'Stopped — click to start'">
          <StatusIndicator :status="project.status" @toggle.stop="$emit('toggle-status', project.id)" />
        </Tooltip>
      </div>
    </div>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  color: var(--color-chrome-text);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-m);
  overflow: hidden;
}

.project-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.item-header {
  padding: var(--space-s);
}

/* Favicon */
.item-favicon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-s);
}

/* Name */
.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: var(--font-size-l);
  line-height: var(--line-height-body);
}

/* URL */
.item-url {
  overflow: hidden;
  max-height: 2em;
}
</style>
