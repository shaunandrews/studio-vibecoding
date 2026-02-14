# TODO

## Polish
- [ ] Card entrance animations (fade-in text, staggered card entrance, actions appear last)
- [ ] Smooth scroll-to-bottom on new messages
- [ ] Test live AI card rendering end-to-end with real API key
- [ ] Consider streaming responses (show text as it arrives, then cards append)

## Bugs / Minor
- [ ] ProgressCard `done` color should use a design token (currently hardcoded `#00a32a`)
- [ ] `ChatCard` wrapper `--color-surface-border` doesn't adapt on dark surfaces

---

## Site Preview — Mock Sites

The site preview panel currently shows a placeholder. We need real-looking mock WordPress sites rendered inline — one per project — that make the prototype feel alive.

### Approach

Each project gets a static HTML page (or set of pages) rendered inside the preview panel via an iframe with `srcdoc`. No actual WordPress server, no localhost URLs — just self-contained HTML/CSS that looks like a real WordPress site.

The mock sites live in `src/data/mock-sites/` as TypeScript modules that export HTML strings. The SitePreview component receives the current project ID, looks up the corresponding mock site, and renders it.

### Phase 1: Homepages

Build a homepage for each of the 4 projects. Each should feel like a distinct WordPress site with its own personality:

**Downstreet Cafe** — Warm, inviting cafe site
- Hero with cafe name, tagline, and a warm background color
- Hours & location section
- Menu highlights (coffee, pastries, lunch)
- Footer with address and social links
- Palette: Terracotta, Cream, Espresso, Sage (from the seed conversation)

**Shaun's Blog** — Clean personal blog
- Header with site title and nav
- Featured/latest post with title, date, excerpt
- 2-3 more post previews in a grid or list
- Sidebar or footer with about blurb
- Palette: Modern, minimal — blues and grays

**UI Portfolio** — Minimal portfolio showcase
- Large intro heading with name and role
- Grid of 3-4 case study cards with colored placeholders
- Brief about section
- Contact/footer
- Palette: Neutral with a single accent color

**Flavor Records** — Bold, dark record label site
- Dark background, large album art hero (colored placeholder)
- Artist/release grid
- "Now Playing" or featured release section
- Footer with label info
- Palette: Off-black, warm white, heavy sans-serif (from the seed conversation)

Each homepage should:
- Be fully self-contained (inline styles, no external dependencies)
- Be responsive (flex/grid, fluid widths — the preview panel resizes)
- Look like a real WordPress site (proper typography, spacing, sections)
- Use realistic content (real-sounding business names, post titles, menu items)
- Be ~200-400 lines of HTML/CSS each (enough to look real, not a full site)

### Implementation

```
src/data/mock-sites/
  index.ts              — exports a map of projectId → site module
  downstreet-cafe.ts    — exports { homepage: string }
  shauns-blog.ts        — exports { homepage: string, pages?: Record<string, string> }
  ui-portfolio.ts       — exports { homepage: string }
  flavor-records.ts     — exports { homepage: string }
```

**SitePreview changes:**
- Accept `projectId` prop
- Look up mock site HTML from the map
- Render in an iframe via `srcdoc`
- BrowserBar shows the project's `.local` URL
- Back/forward/refresh buttons are decorative for now

**Type for mock sites:**
```ts
interface MockSite {
  homepage: string
  pages?: Record<string, string>  // slug → HTML (Phase 2)
}
```

### Phase 2: Multi-Page Sites

Extend each mock site with 2-3 additional pages and working navigation:

**Downstreet Cafe:** Menu page, About page
**Shaun's Blog:** Single post page, About page
**UI Portfolio:** Case study detail page, About/Contact page
**Flavor Records:** Artist page, Releases page

Navigation links within each mock site use `postMessage` to communicate with the parent SitePreview component, which swaps the `srcdoc` content and updates the BrowserBar URL. This simulates navigation without actual routing.

```ts
// Inside mock site HTML:
document.querySelectorAll('a[data-page]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
    window.parent.postMessage({ type: 'navigate', page: a.dataset.page }, '*')
  })
})
```

The SitePreview listens for these messages and swaps the page content.

### Phase 3: AI-Driven Preview Updates

When the AI makes changes (applies a color palette, creates a page, changes settings), the mock site should reflect those changes. This is the most ambitious phase:

- Maintain a reactive `siteState` per project (colors, pages, settings)
- Mock site templates use CSS custom properties for theming
- AI card actions (like applying a ColorPalette) update the site state
- The mock site re-renders with the new state
- New pages created by the AI get added to the mock site's page map

This phase is optional and complex — only pursue if Phases 1-2 are solid and the demo needs it.
