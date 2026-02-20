import { reactive } from 'vue'
import type { Site, Theme } from '@shared/data/site-types'
import { seedSites } from './seed-sites'

const sites: Record<string, Site> = reactive({ ...seedSites })

export function useSiteStore() {
  return {
    getSite(projectId: string): Site | undefined {
      return sites[projectId]
    },

    setSite(projectId: string, site: Site): void {
      sites[projectId] = site
    },

    updateSection(projectId: string, sectionId: string, html: string, css: string): void {
      const site = sites[projectId]
      if (!site) return

      if (site.sections[sectionId]) {
        site.sections[sectionId].html = html
        site.sections[sectionId].css = css
      } else {
        site.sections[sectionId] = { id: sectionId, html, css }
      }
    },

    updateTheme(projectId: string, theme: Theme): void {
      const site = sites[projectId]
      if (site) {
        site.theme = theme
      }
    },

    updateThemeVariables(
      projectId: string,
      variableOverrides: Record<string, string>,
      mode: 'light' | 'dark' = 'light',
      newFonts?: string[],
    ): void {
      const site = sites[projectId]
      if (!site) return
      if (mode === 'dark') {
        if (!site.theme.darkVariables) {
          site.theme.darkVariables = { ...site.theme.variables }
        }
        Object.assign(site.theme.darkVariables, variableOverrides)
      } else {
        Object.assign(site.theme.variables, variableOverrides)
      }
      if (newFonts && newFonts.length > 0) {
        site.theme.fonts = newFonts
      }
    },

    getAllSites(): Record<string, Site> {
      return sites
    },
  }
}
