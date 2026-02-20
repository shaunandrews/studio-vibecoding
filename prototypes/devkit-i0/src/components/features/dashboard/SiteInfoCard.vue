<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/data/useProjects'
import StatusIndicator from '@shared/primitives/StatusIndicator.vue'

const route = useRoute()
const { projects, setStatus } = useProjects()

const projectId = computed(() => route.params.id as string)

const project = computed(() =>
  projects.value.find(p => p.id === projectId.value) ?? null
)

function toggleStatus() {
  if (!project.value) return
  const next = project.value.status === 'running' ? 'stopped' : 'running'
  setStatus(project.value.id, next)
}
</script>

<template>
  <div v-if="project" class="site-info">
    <div class="site-info__header hstack gap-xs">
      <img class="site-info__favicon" :src="project.favicon" alt="" />
      <div class="flex-1 min-w-0">
        <span class="site-info__name">{{ project.name }}</span>
        <span class="site-info__url">{{ project.url }}</span>
      </div>
      <StatusIndicator :status="project.status" @toggle="toggleStatus" />
    </div>
    <div class="site-info__preview site-info__preview--empty" />
  </div>
</template>

<style scoped>
.site-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.site-info__header {
  align-items: center;
  margin-block-end: var(--space-s);
}

.site-info__favicon {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.site-info__name {
  display: block;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-info__url {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-info__preview {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
}

.site-info__preview--empty {
  background: var(--color-surface-secondary);
}

.site-info__iframe {
  width: 200%;
  height: 200%;
  border: none;
  pointer-events: none;
  transform: scale(0.5);
  transform-origin: top left; /* Physical: iframe scaling — intentional */
}
</style>
