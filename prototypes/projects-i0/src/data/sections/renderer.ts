import type { PageTemplate, SiteData, Section } from './types'
import { themeToCSS } from '../themes/theme-utils'
import { componentCSS } from './components'
import { renderSection } from './section-renderers'

export function renderPage(
  page: PageTemplate,
  site: SiteData,
  activePage: string,
  themeCSSOverride?: string,
  customCSS?: string,
  customRenderer?: (section: Section, activePage: string) => string | null
): string {
  const themeCSS = themeCSSOverride || themeToCSS(site.theme)
  const fontLinks = site.fonts.map(f => `<link href="${f.url}" rel="stylesheet">`).join('\n')

  const sectionsHTML = page.sections
    .map(section => {
      if (customRenderer) {
        const custom = customRenderer(section, activePage)
        if (custom !== null) return custom
      }
      return renderSection(section)
    })
    .join('\n\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
${fontLinks}
<style>${themeCSS}</style>
<style>${componentCSS}</style>
${customCSS ? `<style>${customCSS}</style>` : ''}
</head>
<body>

${sectionsHTML}

</body>
</html>`
}
