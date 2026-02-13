import { ref, computed } from 'vue'
import { seedProjects } from './seed-projects'
import type { Project, ProjectStatus } from './types'

// Module-level state (singleton — shared across all components)
const projects = ref<Project[]>(structuredClone(seedProjects))
const activeProjectId = ref<string | null>(null)

const activeProject = computed(() =>
  projects.value.find(p => p.id === activeProjectId.value) ?? null
)

export function useProjects() {
  function setStatus(projectId: string, status: ProjectStatus) {
    const p = projects.value.find(p => p.id === projectId)
    if (p) p.status = status
  }

  return {
    projects,
    activeProjectId,
    activeProject,
    setStatus,
  }
}
