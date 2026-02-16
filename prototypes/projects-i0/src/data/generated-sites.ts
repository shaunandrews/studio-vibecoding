/**
 * Reactive store for AI-generated site data.
 * Persists generated sites so they survive navigation.
 */

import { reactive } from 'vue'
import type { SiteData, PageTemplate, Section } from './sections/types'
import type { PipelineState } from './ai-pipeline-types'

/** Reactive map of projectId → SiteData for generated sites */
export const generatedSites: Record<string, SiteData> = reactive({})

/**
 * Convert completed pipeline state into a SiteData object and store it.
 */
export function persistPipelineResult(
  projectId: string,
  state: PipelineState,
): SiteData | null {
  if (!state.theme || state.status !== 'complete') return null

  const brief = state.brief
  const theme = state.theme

  // Build font imports from theme
  const fontFamilies = [
    theme.settings.typography.fontFamily.heading,
    theme.settings.typography.fontFamily.body,
  ].filter(Boolean)
  const uniqueFonts = [...new Set(fontFamilies)]
  const fonts = uniqueFonts.map(f => ({
    url: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}&display=swap`,
  }))

  // Convert pages
  const pages: PageTemplate[] = Object.entries(state.pages).map(([slug, sections], i) => ({
    id: `page-${i}`,
    title: slug === '/' ? 'Home' : slug.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    slug,
    sections: sections as Section[],
  }))

  const siteData: SiteData = {
    name: brief.siteName,
    theme,
    fonts,
    pages,
  }

  generatedSites[projectId] = siteData
  return siteData
}
