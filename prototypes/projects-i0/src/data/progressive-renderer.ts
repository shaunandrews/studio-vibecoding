/**
 * Phase 2: Progressive Renderer
 *
 * Renders an in-progress page with skeleton placeholders that get replaced
 * as sections arrive from the pipeline. Distinct from Phase 1's renderPage()
 * which renders complete, finalized pages.
 *
 * Two rendering modes:
 * - Full render (renderProgressivePage): rebuilds entire srcdoc
 * - Incremental update (postMessage): patches individual sections in-place
 */

import type { SiteTheme } from './themes/types'
import type { Section } from './sections/types'
import type { SkeletonSlot } from './ai-pipeline-types'
import { themeToCSS } from './themes/theme-utils'
import { componentCSS } from './sections/components'
import { renderSection } from './sections/section-renderers'

// ---- Skeleton CSS ----

const SKELETON_CSS = `
.section-skeleton {
  background: #f0f0f0;
  border-radius: 8px;
  min-height: 200px;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  margin: 1rem 0;
}

.section-skeleton[data-type="hero-split"],
.section-skeleton[data-type="hero-fullwidth"] {
  min-height: 500px;
}

.section-skeleton[data-type="menu-list"],
.section-skeleton[data-type="order-menu"] {
  min-height: 400px;
}

.section-skeleton[data-type="image-gallery"],
.section-skeleton[data-type="image-strip"] {
  min-height: 300px;
}

.section-skeleton[data-type="team-grid"],
.section-skeleton[data-type="event-list"] {
  min-height: 350px;
}

@keyframes skeleton-shimmer {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.section-error {
  background: #fee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c00;
  font-family: var(--theme-font-body, sans-serif);
  font-size: 0.9rem;
}

.section-enter {
  animation: section-fade-in 200ms ease-out;
}

@keyframes section-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`

// ---- Listener Script (injected into iframe) ----

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
      if (el.dataset && el.dataset.navPage) {
        e.preventDefault();
        window.parent.postMessage({type:'navigate',page:el.dataset.navPage},'*');
        return;
      }
      el = el.parentElement;
    }
  });

  window.addEventListener('message', function(event) {
    var msg = event.data;
    if (!msg || !msg.type) return;

    if (msg.type === 'section-update') {
      var slot = document.querySelector('[data-section-id="' + msg.slotId + '"]');
      if (slot) {
        var wrapper = document.createElement('div');
        wrapper.className = 'section section-enter';
        wrapper.dataset.sectionId = msg.slotId;
        wrapper.innerHTML = msg.html;
        slot.replaceWith(wrapper);

        // Auto-scroll to new section if user hasn't manually scrolled
        if (!userHasScrolled) {
          wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    if (msg.type === 'theme-update') {
      var themeStyle = document.getElementById('theme-css');
      if (themeStyle) {
        themeStyle.textContent = msg.css;
      }
    }

    if (msg.type === 'reset-scroll-tracking') {
      userHasScrolled = false;
    }
  });
})();
</script>
`

// ---- Header/Footer Renderers ----

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderHeader(
  data: Record<string, unknown>,
  _activePage?: string,
): string {
  const navItems = (data.navItems || []) as Array<{ label: string; page: string }>
  const links = navItems.map(item => {
    return `<a href="#" data-nav-page="${escapeAttr(item.page)}">${escapeHtml(item.label)}</a>`
  }).join('\n  ')
  return `<nav class="site-nav">\n  ${links}\n</nav>`
}

function renderFooter(data: Record<string, unknown>): string {
  const parts: string[] = []
  if (data.address) parts.push(`<p>${data.address}</p>`)
  if (data.phone || data.email) {
    const items: string[] = []
    if (data.phone) items.push(String(data.phone))
    if (data.email) items.push(`<a href="#">${data.email}</a>`)
    parts.push(`<p>${items.join(' · ')}</p>`)
  }
  if (data.tagline) parts.push(`<p class="wp">${data.tagline}</p>`)
  return `<footer>\n  ${parts.join('\n  ')}\n</footer>`
}

// ---- Progressive Page Renderer ----

/**
 * Render a page in progressive mode — with skeleton slots for pending sections.
 * Distinct name from Phase 1's renderPage() to avoid confusion.
 */
export function renderProgressivePage(
  theme: SiteTheme | null,
  templateParts: Record<string, Record<string, unknown>>,
  slots: SkeletonSlot[],
): string {
  const parts: string[] = []

  // Document shell
  parts.push('<!DOCTYPE html><html lang="en"><head>')
  parts.push('<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">')

  // Theme CSS
  if (theme) {
    parts.push(`<style id="theme-css">${themeToCSS(theme)}</style>`)
    parts.push(`<style>${componentCSS}</style>`)

    // Google Fonts
    const fonts = [
      theme.settings.typography.fontFamily.heading,
      theme.settings.typography.fontFamily.body,
    ].filter(Boolean)
    if (fonts.length) {
      const fontParams = fonts.map(f => `family=${encodeURIComponent(f)}`).join('&')
      parts.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontParams}&display=swap">`)
    }
  } else {
    parts.push('<style id="theme-css"></style>')
  }

  // Skeleton CSS (always included during progressive rendering)
  parts.push(`<style>${SKELETON_CSS}</style>`)

  parts.push('</head><body>')

  // Header
  if (templateParts.header) {
    parts.push(renderHeader(templateParts.header))
  }

  // Main content — skeleton slots or rendered sections
  parts.push('<main>')
  for (const slot of slots) {
    if (slot.status === 'complete' && slot.section) {
      parts.push(`<div class="section section-enter" data-section-id="${slot.id}">${renderSection(slot.section)}</div>`)
    } else if (slot.status === 'error') {
      parts.push(`<div class="section-skeleton section-error" data-section-id="${slot.id}"><span>${slot.error || 'Failed to generate'}</span></div>`)
    } else {
      parts.push(`<div class="section-skeleton" data-type="${slot.expectedType ?? ''}" data-section-id="${slot.id}"></div>`)
    }
  }
  parts.push('</main>')

  // Footer
  if (templateParts.footer) {
    parts.push(renderFooter(templateParts.footer))
  }

  // Listener script for incremental updates
  parts.push(LISTENER_SCRIPT)

  parts.push('</body></html>')

  return parts.join('\n')
}

// ---- PostMessage Helpers ----

/** Send a section update to the preview iframe via postMessage */
export function sendSectionUpdate(
  iframe: HTMLIFrameElement,
  slotId: string,
  section: Section,
): void {
  const html = renderSection(section)
  iframe.contentWindow?.postMessage(
    { type: 'section-update', slotId, html },
    '*',
  )
}

/** Send a theme update to the preview iframe via postMessage */
export function sendThemeUpdate(
  iframe: HTMLIFrameElement,
  theme: SiteTheme,
): void {
  iframe.contentWindow?.postMessage(
    { type: 'theme-update', css: themeToCSS(theme) },
    '*',
  )
}

/** Reset scroll tracking in the iframe */
export function resetScrollTracking(iframe: HTMLIFrameElement): void {
  iframe.contentWindow?.postMessage(
    { type: 'reset-scroll-tracking' },
    '*',
  )
}

// ---- Slot Helpers ----

/**
 * Create skeleton slots from suggested section types for a page.
 */
export function createSkeletonSlots(suggestedSections: string[], pageSlug: string): SkeletonSlot[] {
  return suggestedSections.map((type, i) => ({
    id: `${pageSlug}-slot-${i}`,
    expectedType: type,
    status: 'pending' as const,
  }))
}

/**
 * Update a slot with a completed section.
 */
export function completeSlot(
  slots: SkeletonSlot[],
  slotIndex: number,
  section: Section,
): SkeletonSlot[] {
  const updated = [...slots]
  if (updated[slotIndex]) {
    updated[slotIndex] = {
      ...updated[slotIndex],
      status: 'complete',
      section,
    }
  }
  return updated
}
