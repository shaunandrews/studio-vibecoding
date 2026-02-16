/**
 * Phase B: Simple Site Store
 * 
 * A reactive store for managing Site objects using the new simple data model.
 * This replaces the complex pipeline and build progress systems.
 */

import { reactive } from 'vue'
import type { Site, Section, Theme } from './site-types'
import { seedSites } from './seed-sites'

// ---- Reactive Store ----

const sites: Record<string, Site> = reactive({ ...seedSites })

// ---- Store Interface ----

export function useSiteStore() {
  return {
    /**
     * Get a site by project ID
     */
    getSite(projectId: string): Site | undefined {
      return sites[projectId]
    },

    /**
     * Set a complete site for a project
     */
    setSite(projectId: string, site: Site): void {
      sites[projectId] = site
    },

    /**
     * Update a specific section in a site
     */
    updateSection(projectId: string, sectionId: string, html: string, css: string): void {
      const site = sites[projectId]
      if (!site) return

      if (site.sections[sectionId]) {
        // Update existing section
        site.sections[sectionId].html = html
        site.sections[sectionId].css = css
      } else {
        // Create new section
        site.sections[sectionId] = {
          id: sectionId,
          html,
          css,
        }
      }
    },

    /**
     * Update the theme for a site
     */
    updateTheme(projectId: string, theme: Theme): void {
      const site = sites[projectId]
      if (site) {
        site.theme = theme
      }
    },

    /**
     * Add a section to a page
     */
    addSectionToPage(projectId: string, pageSlug: string, sectionId: string, position?: number): void {
      const site = sites[projectId]
      if (!site) return

      const page = site.pages.find(p => p.slug === pageSlug)
      if (!page) return

      if (typeof position === 'number') {
        page.sections.splice(position, 0, sectionId)
      } else {
        page.sections.push(sectionId)
      }
    },

    /**
     * Remove a section from a page
     */
    removeSectionFromPage(projectId: string, pageSlug: string, sectionId: string): void {
      const site = sites[projectId]
      if (!site) return

      const page = site.pages.find(p => p.slug === pageSlug)
      if (!page) return

      const index = page.sections.indexOf(sectionId)
      if (index !== -1) {
        page.sections.splice(index, 1)
      }
    },

    /**
     * Delete a section completely from a site
     */
    deleteSection(projectId: string, sectionId: string): void {
      const site = sites[projectId]
      if (!site) return

      // Remove from all pages
      for (const page of site.pages) {
        const index = page.sections.indexOf(sectionId)
        if (index !== -1) {
          page.sections.splice(index, 1)
        }
      }

      // Delete the section itself
      delete site.sections[sectionId]
    },

    /**
     * Get all sites (for debugging)
     */
    getAllSites(): Record<string, Site> {
      return sites
    },

    /**
     * Clear all sites (for debugging/testing)
     */
    clearAll(): void {
      Object.keys(sites).forEach(key => delete sites[key])
    }
  }
}