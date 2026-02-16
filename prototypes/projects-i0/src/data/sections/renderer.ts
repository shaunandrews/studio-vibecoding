import type { PageTemplate, SiteData, TemplatePart, HeaderData, FooterData } from './types'
import { themeToCSS } from '../themes/theme-utils'
import { componentCSS } from './components'
import { renderSection } from './section-renderers'

function renderHeader(header: TemplatePart, activePage: string): string {
  const data = header.data as HeaderData
  const links = data.navItems.map(item => {
    const activeClass = item.page === activePage ? ' class="active"' : ''
    return `  <a href="#"${activeClass} onclick="window.parent.postMessage({type:'navigate',page:'${item.page}'},'*');return false">${item.label}</a>`
  }).join('\n')
  return `<nav class="site-nav">\n${links}\n</nav>`
}

function renderFooter(footer: TemplatePart): string {
  const data = footer.data as FooterData
  return `<footer>
  <p>${data.address}</p>
  <p>${data.phone} · <a href="#">${data.email}</a></p>
  ${data.tagline ? `<p class="wp">${data.tagline}</p>` : ''}
</footer>`
}

export function renderPage(page: PageTemplate, site: SiteData, activePage: string): string {
  const themeCSS = themeToCSS(site.theme)
  const fontLinks = site.fonts.map(f => `<link href="${f.url}" rel="stylesheet">`).join('\n')

  const sectionsHTML = page.sections
    .map(section => renderSection(section))
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
</head>
<body>

${renderHeader(site.header, activePage)}

${sectionsHTML}

${renderFooter(site.footer)}

</body>
</html>`
}
