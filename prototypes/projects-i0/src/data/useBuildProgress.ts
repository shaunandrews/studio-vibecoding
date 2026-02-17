/**
 * Build Progress — bridges project creation to the generation loop.
 *
 * When startBuild() is called, it maps the ProjectBrief to page configs
 * and kicks off useGeneration().generateSite(). Tracks per-project build
 * state and updates project status on completion or error.
 */

import { reactive } from 'vue'
import { useGeneration } from './generation/useGeneration'
import { useProjects } from './useProjects'
import type { ProjectBrief, ProjectType } from './types'

// ---- Page Configs per Project Type ----

const PAGE_CONFIGS: Record<ProjectType, { title: string; slug: string; sectionRoles: string[] }[]> = {
  restaurant: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'menu-preview', 'about-preview', 'footer'] },
    { title: 'Menu', slug: '/menu', sectionRoles: ['header', 'menu-full', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  portfolio: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'work-preview', 'footer'] },
    { title: 'Work', slug: '/work', sectionRoles: ['header', 'work-grid', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  store: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'featured-products', 'testimonials', 'footer'] },
    { title: 'Products', slug: '/products', sectionRoles: ['header', 'product-grid', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  blog: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'recent-posts', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
  custom: [
    { title: 'Home', slug: '/', sectionRoles: ['header', 'hero', 'features', 'cta', 'footer'] },
    { title: 'About', slug: '/about', sectionRoles: ['header', 'about-content', 'footer'] },
  ],
}

// ---- Build State ----

interface BuildState {
  status: 'building' | 'complete' | 'error'
  error?: string
}

const buildStates: Record<string, BuildState> = reactive({})

// ---- Export ----

export function useBuildProgress() {
  const { generateSite, progress, abort } = useGeneration()
  const { setStatus } = useProjects()

  return {
    isBuilding(projectId: string): boolean {
      return buildStates[projectId]?.status === 'building'
    },

    getBuildState(projectId: string): BuildState | undefined {
      return buildStates[projectId]
    },

    progress,

    async startBuild(projectId: string, brief: ProjectBrief): Promise<void> {
      buildStates[projectId] = { status: 'building' }

      const pageConfigs = PAGE_CONFIGS[brief.type] || PAGE_CONFIGS.custom
      const siteType = brief.freeTextType || brief.type

      try {
        await generateSite(projectId, brief.name, siteType, brief.description, pageConfigs)
        buildStates[projectId] = { status: 'complete' }
        setStatus(projectId, 'running')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error(`[Build] Failed for ${projectId}:`, message)
        buildStates[projectId] = { status: 'error', error: message }
        setStatus(projectId, 'stopped')
      }
    },

    stopBuild(projectId: string): void {
      abort()
      buildStates[projectId] = { status: 'error', error: 'Cancelled' }
      setStatus(projectId, 'stopped')
    },
  }
}
