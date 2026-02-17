import { ref, computed } from 'vue'
import { seedProjects } from './seed-projects'
import type { Project, ProjectStatus, ProjectBrief } from './types'

// Module-level state (singleton — shared across all components)
const projects = ref<Project[]>(structuredClone(seedProjects))
const activeProjectId = ref<string | null>(null)

const activeProject = computed(() =>
  projects.value.find(p => p.id === activeProjectId.value) ?? null
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function useProjects() {
  function setStatus(projectId: string, status: ProjectStatus) {
    const p = projects.value.find(p => p.id === projectId)
    if (p) p.status = status
  }

  function createProject(brief: ProjectBrief): Project {
    let baseId = slugify(brief.name) || 'project'
    let id = baseId
    let suffix = 2
    while (projects.value.some(p => p.id === id)) {
      id = `${baseId}-${suffix}`
      suffix++
    }

    const newProject: Project = {
      id,
      name: brief.name,
      favicon: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(brief.name)}`,
      status: 'loading',
      url: '',
      createdAt: new Date().toISOString(),
      description: brief.description,
    }

    projects.value.unshift(newProject)
    return newProject
  }

  function createUntitledProject(): Project {
    const id = `project-${Date.now()}`
    const newProject: Project = {
      id,
      name: 'Untitled project',
      favicon: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(id)}`,
      status: 'stopped',
      url: '',
      createdAt: new Date().toISOString(),
    }
    projects.value.push(newProject)
    return newProject
  }

  function updateProject(id: string, updates: Partial<Pick<Project, 'name' | 'favicon' | 'description'>>) {
    const p = projects.value.find(p => p.id === id)
    if (p) Object.assign(p, updates)
  }

  return {
    projects,
    activeProjectId,
    activeProject,
    setStatus,
    createProject,
    createUntitledProject,
    updateProject,
  }
}
