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
  if (!p || p.status === 'loading') return
  const target = p.status === 'running' ? 'stopped' : 'running'
  setStatus(id, 'loading')
  setTimeout(() => setStatus(id, target), 1200 + Math.random() * 800)
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
  justify-content: center;
  align-content: center;
}

.items-grid > * {
  width: var(--card-width, 300px);
}
</style>
