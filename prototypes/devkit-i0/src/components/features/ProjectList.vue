<script setup lang="ts">
import ProjectItem from '@/components/composites/ProjectItem.vue'
import { useProjects } from '@/data/useProjects'
import { useProjectTransition } from '@/data/useProjectTransition'

const emit = defineEmits<{
  'new-project': []
}>()

const { projects, setStatus } = useProjects()
const { navigateToProject } = useProjectTransition()

function selectProject(id: string) {
  navigateToProject(id)
}

function toggleStatus(id: string) {
  const p = projects.value.find(p => p.id === id)
  if (p) setStatus(id, p.status === 'running' ? 'stopped' : 'running')
}
</script>

<template>
  <div class="project-list">
    <div class="items-grid">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
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
  padding: var(--space-m);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-m);
  width: 100%;
}
</style>
