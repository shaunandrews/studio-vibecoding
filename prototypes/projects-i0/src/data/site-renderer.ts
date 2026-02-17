/**
 * Phase B: Simple Site Renderer
 * 
 * Renders complete sites using the new simple Site data model.
 * Replaces the complex pipeline progressive renderer with a clean,
 * straightforward HTML document generator.
 */

import type { Site } from './site-types'

// ---- Listener Script (reused from progressive-renderer) ----

const LISTENER_SCRIPT = `
<script>
(function() {
  var userHasScrolled = false;

  window.addEventListener('scroll', function() {
    userHasScrolled = true;
  });

  document.addEventListener('click', function(e) {
    var el = e.target;
    while (el && el !== document.body) {
      // Handle data-nav-page attributes
      if (el.dataset && el.dataset.navPage) {
        e.preventDefault();
        window.parent.postMessage({type:'navigate',page:el.dataset.navPage},'*');
        return;
      }
      // Handle regular internal links
      if (el.tagName === 'A' && el.getAttribute('href')) {
        var href = el.getAttribute('href');
        if (href.charAt(0) === '/' && href.indexOf('//') !== 0) {
          e.preventDefault();
          window.parent.postMessage({type:'navigate',page:href},'*');
          return;
        }
      }
      el = el.parentElement;
    }
  });

  window.addEventListener('message', function(event) {
    var msg = event.data;
    if (!msg || !msg.type) return;

    if (msg.type === 'section-update') {
      var section = document.querySelector('[data-section="' + msg.sectionId + '"]');
      if (section) {
        section.innerHTML = msg.html;
        
        // Update section CSS
        var sectionStyle = document.getElementById('section-' + msg.sectionId);
        if (sectionStyle) {
          sectionStyle.textContent = msg.css;
        }

        // Auto-scroll if user hasn't manually scrolled
        if (!userHasScrolled) {
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    if (msg.type === 'theme-update') {
      var themeStyle = document.getElementById('theme');
      if (themeStyle) {
        var newRootVars = ':root {' + Object.entries(msg.variables).map(function(entry) {
          return entry[0] + ':' + entry[1] + ';';
        }).join('') + '}';
        themeStyle.textContent = newRootVars;
      }
    }

    if (msg.type === 'page-update') {
      // Swap all sections without reloading the document (preserves fonts)
      var head = document.head;
      var body = document.body;

      // Remove old section styles
      var oldStyles = head.querySelectorAll('style[id^="section-"]');
      for (var i = 0; i < oldStyles.length; i++) oldStyles[i].remove();

      // Add new section styles
      msg.sections.forEach(function(s) {
        if (s.css && s.css.trim()) {
          var style = document.createElement('style');
          style.id = 'section-' + s.id;
          style.textContent = s.css;
          head.appendChild(style);
        }
      });

      // Replace body content (keep script tag)
      var scriptTag = body.querySelector('script');
      while (body.firstChild) body.removeChild(body.firstChild);
      msg.sections.forEach(function(s) {
        var div = document.createElement('div');
        div.setAttribute('data-section', s.id);
        if (s.role) div.setAttribute('data-role', s.role);
        div.innerHTML = s.html;
        body.appendChild(div);
      });
      if (scriptTag) body.appendChild(scriptTag);

      // Update title
      if (msg.title) document.title = msg.title;

      // Scroll to top
      window.scrollTo(0, 0);
      userHasScrolled = false;
    }

    if (msg.type === 'reset-scroll-tracking') {
      userHasScrolled = false;
    }
  });
})();
</script>
`

// ---- Utility Functions ----

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ---- Main Renderer ----

/**
 * Render a complete HTML document for a site page.
 * 
 * This produces a full HTML document by:
 * 1. Creating the document shell
 * 2. Adding Google Fonts links from theme.fonts
 * 3. Adding theme CSS variables as :root styles
 * 4. Adding individual section CSS styles
 * 5. Creating the body with section HTML wrapped in data-section divs
 * 6. Injecting the postMessage listener script
 */
export function renderSite(site: Site, pageSlug: string): string {
  // Normalize slug: strip leading slash, treat "/" as empty string
  const normalizedSlug = pageSlug === '/' ? '' : pageSlug.replace(/^\//, '')
  const page = site.pages.find(p => {
    const pSlug = p.slug === '/' ? '' : p.slug.replace(/^\//, '')
    return pSlug === normalizedSlug
  })
  if (!page) {
    return createErrorDocument(`Page "${pageSlug}" not found`)
  }

  const parts: string[] = []

  // Document shell
  parts.push('<!DOCTYPE html>')
  parts.push('<html lang="en">')
  parts.push('<head>')
  parts.push('<meta charset="utf-8">')
  parts.push('<meta name="viewport" content="width=device-width, initial-scale=1">')
  parts.push(`<title>${escapeHtml(page.title)} - ${escapeHtml(site.name)}</title>`)

  // Google Fonts
  if (site.theme.fonts.length > 0) {
    const fontParams = site.theme.fonts
      .map(font => `family=${encodeURIComponent(font)}`)
      .join('&')
    parts.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontParams}&display=swap">`)
  }

  // Theme CSS (:root variables)
  if (Object.keys(site.theme.variables).length > 0) {
    const rootVariables = Object.entries(site.theme.variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')
    parts.push(`<style id="theme">`)
    parts.push(`:root {`)
    parts.push(rootVariables)
    parts.push(`}`)
    parts.push(`</style>`)
  }

  // Section CSS - one style block per section on this page
  for (const sectionId of page.sections) {
    const section = site.sections[sectionId]
    if (section && section.css.trim()) {
      parts.push(`<style id="section-${escapeAttr(sectionId)}">${section.css}</style>`)
    }
  }

  parts.push('<style>body { margin: 0; }</style>')
  parts.push('</head>')

  // Body with sections
  parts.push('<body>')
  
  for (const sectionId of page.sections) {
    const section = site.sections[sectionId]
    if (section) {
      const roleAttr = section.role ? ` data-role="${escapeAttr(section.role)}"` : ''
      parts.push(`<div data-section="${escapeAttr(sectionId)}"${roleAttr}>`)
      parts.push(section.html)
      parts.push('</div>')
    }
  }

  // PostMessage listener script
  parts.push(LISTENER_SCRIPT)
  
  parts.push('</body>')
  parts.push('</html>')

  return parts.join('\n')
}

// ---- PostMessage Helper Functions ----

/**
 * Send a section update to the preview iframe via postMessage.
 */
export function sendSectionUpdate(
  iframe: HTMLIFrameElement,
  sectionId: string,
  html: string,
  css: string,
): void {
  iframe.contentWindow?.postMessage(
    { type: 'section-update', sectionId, html, css },
    '*',
  )
}

/**
 * Send a theme update to the preview iframe via postMessage.
 */
export function sendThemeUpdate(
  iframe: HTMLIFrameElement,
  variables: Record<string, string>,
): void {
  iframe.contentWindow?.postMessage(
    { type: 'theme-update', variables },
    '*',
  )
}

/**
 * Get the section data for a page, suitable for postMessage page-update.
 * Returns null if the page isn't found.
 */
export function getPageData(site: Site, pageSlug: string): {
  title: string
  sections: { id: string; html: string; css: string; role?: string }[]
} | null {
  const normalizedSlug = pageSlug === '/' ? '' : pageSlug.replace(/^\//, '')
  const page = site.pages.find(p => {
    const pSlug = p.slug === '/' ? '' : p.slug.replace(/^\//, '')
    return pSlug === normalizedSlug
  })
  if (!page) return null

  const sections = page.sections
    .map(id => site.sections[id])
    .filter(Boolean)
    .map(s => ({ id: s.id, html: s.html, css: s.css, role: s.role }))

  return { title: `${page.title} - ${site.name}`, sections }
}

/**
 * Send a page-update to the preview iframe via postMessage.
 * Swaps sections in-place without reloading the document.
 */
export function sendPageUpdate(
  iframe: HTMLIFrameElement,
  site: Site,
  pageSlug: string,
): boolean {
  const data = getPageData(site, pageSlug)
  if (!data) return false
  iframe.contentWindow?.postMessage(
    { type: 'page-update', title: data.title, sections: data.sections },
    '*',
  )
  return true
}

// ---- Error Handling ----

function createErrorDocument(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Preview Error</title>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2rem;
  background: #fef2f2;
  color: #991b1b;
}
</style>
</head>
<body>
<h1>Preview Error</h1>
<p>${escapeHtml(message)}</p>
</body>
</html>`
}