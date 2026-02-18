import type { Site } from './site-types'

/**
 * Build a site context string for the AI system prompt.
 * Gives the AI awareness of the current theme variables,
 * page structure, and section layout.
 */
export function buildSiteContext(site: Site): string {
  const lines: string[] = []

  lines.push('## Your Current Site')
  lines.push('')
  lines.push(`Name: ${site.name}`)
  if (site.description) {
    lines.push(`Description: ${site.description}`)
  }

  // Theme variables
  lines.push('')
  lines.push('### Theme (CSS Custom Properties)')
  lines.push('These are the actual variable names used in the site. When proposing color changes via card:themeUpdate, use palette slugs that match these variable suffixes (e.g. --color-primary → slug "primary").')
  lines.push('')
  for (const [key, value] of Object.entries(site.theme.variables)) {
    lines.push(`${key}: ${value}`)
  }

  // Fonts
  if (site.theme.fonts.length > 0) {
    lines.push('')
    lines.push(`Fonts: ${site.theme.fonts.join(', ')}`)
  }

  // Dark mode
  if (site.theme.darkVariables) {
    lines.push('')
    lines.push('This site has dark mode support.')
  }

  // Pages and sections
  lines.push('')
  lines.push('### Pages & Sections')
  for (const page of site.pages) {
    const sectionList = page.sections
      .map(id => {
        const section = site.sections[id]
        return section?.role ? `${id} (${section.role})` : id
      })
      .join(', ')
    lines.push(`${page.slug} (${page.title}): ${sectionList}`)
  }

  return lines.join('\n')
}
