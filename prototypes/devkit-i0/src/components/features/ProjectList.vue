<script setup lang="ts">
import { chevronLeft } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import ProjectItem from '@/components/composites/ProjectItem.vue'
import { useProjects } from '@/data/useProjects'
import { useProjectTransition } from '@/data/useProjectTransition'

const props = defineProps<{
  mode: 'grid' | 'list'
}>()

const emit = defineEmits<{
  'new-project': []
}>()

const { projects, activeProjectId, setStatus } = useProjects()
const { navigateToProject, navigateHome } = useProjectTransition()

function selectProject(id: string) {
  navigateToProject(id)
}

function goHome() {
  navigateHome()
}

function toggleStatus(id: string) {
  const p = projects.value.find(p => p.id === id)
  if (p) setStatus(id, p.status === 'running' ? 'stopped' : 'running')
}
</script>

<template>
  <div class="project-list vstack" :class="`mode-${mode}`">
    <!-- Back link (list mode only) -->
    <div v-if="mode === 'list'" class="all-projects hstack gap-xs p-xxs" @click="goHome">
      <WPIcon :icon="chevronLeft" :size="20" class="back-icon shrink-0" />
      <span class="back-label flex-1 min-w-0">All projects</span>
    </div>

    <!-- Items -->
    <div class="items-container" :class="mode === 'grid' ? 'items-grid' : 'items-stack'">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :mode="mode === 'grid' ? 'card' : 'row'"
        :active="project.id === activeProjectId"
        @select="selectProject"
        @toggle-status="toggleStatus"
      />
    </div>

  </div>
</template>

<style scoped>
.project-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.project-list.mode-grid {
  padding: var(--space-m);
  gap: var(--space-s);
}

.project-list.mode-list {
  gap: var(--space-xxs);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--space-m);
  width: 100%;
}

.items-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.all-projects {
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background var(--transition-hover);
}

.all-projects:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.back-icon {
  opacity: 0.6;
}

.all-projects:hover .back-icon {
  opacity: 1;
}

.back-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
