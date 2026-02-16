# Phase 1: Section System

The foundation layer. Define the section/template data model, build a renderer, create a component library, and prove it all works by refactoring Downstreet Cafe from monolithic HTML functions into structured section data.

No AI generation. No progressive rendering. No editing. Just the static system that everything else builds on.

> See [SITE-BUILDER-SYSTEM.md](./SITE-BUILDER-SYSTEM.md) for the overarching architecture.

---

## 1. Data Model

### Section

The atomic content block. A section has a type, structured data, and a position.

```ts
// src/data/sections/types.ts

interface Section {
  id: string                        // unique within the page, e.g. "hero-1"
  type: SectionType                 // discriminated union key
  data: SectionDataMap[SectionType] // type-safe data for this section type
}

// All known section types
type SectionType =
  | 'hero-split'
  | 'hero-fullwidth'
  | 'hero-simple'
  | 'image-strip'
  | 'image-gallery'
  | 'menu-list'
  | 'content-prose'
  | 'content-cards'
  | 'team-grid'
  | 'event-list'
  | 'event-recurring'
  | 'contact-info'
  | 'cta-banner'
  | 'order-menu'

// Maps each section type to its data interface
interface SectionDataMap {
  'hero-split': HeroSplitData
  'hero-fullwidth': HeroFullwidthData
  'hero-simple': HeroSimpleData
  'image-strip': ImageStripData
  'image-gallery': ImageGalleryData
  'menu-list': MenuListData
  'content-prose': ContentProseData
  'content-cards': ContentCardsData
  'team-grid': TeamGridData
  'event-list': EventListData
  'event-recurring': EventRecurringData
  'contact-info': ContactInfoData
  'cta-banner': CtaBannerData
  'order-menu': OrderMenuData
}
```

### TemplatePart

Shared chrome rendered on every page — the nav and footer.

```ts
interface TemplatePart {
  id: string        // e.g. "main-nav", "site-footer"
  type: 'header' | 'footer'
  data: HeaderData | FooterData
}

interface HeaderData {
  navItems: Array<{
    label: string
    page: string    // page slug — used for navigation postMessage and active state
  }>
}

interface FooterData {
  address: string
  phone: string
  email: string
  tagline?: string      // e.g. "Made with WordPress"
  social?: Array<{ platform: string; url: string }>
  copyright?: string    // e.g. "© 2025 Downstreet Cafe"
}
```

### PageTemplate

A page is a header + ordered sections + footer.

```ts
interface PageTemplate {
  id: string              // "homepage", "menu", "about", etc.
  title: string           // HTML <title> content (e.g. "Downstreet Cafe", "Menu – Downstreet Cafe")
  slug: string            // used in nav postMessage and URL routing
  sections: Section[]     // ordered top-to-bottom
}
```

Pages don't store header/footer references directly — those come from SiteData and apply to all pages uniformly.

### SiteData

The top-level object that fully describes a site.

```ts
interface SiteData {
  name: string                // "Downstreet Cafe"
  theme: SiteTheme            // existing type from src/data/themes/types.ts
  fonts: FontImport[]         // Google Fonts URLs to load
  header: TemplatePart        // shared nav
  footer: TemplatePart        // shared footer
  pages: PageTemplate[]       // all pages
}

interface FontImport {
  url: string   // full Google Fonts CSS URL
}
```

### How sections reference the component library

They don't — not explicitly. Section renderers produce HTML that uses CSS class names from the component library. The component CSS is injected into the document shell before any section HTML renders, so all class names are available globally. There's no import or dependency declaration per section.

---

## 2. Component Library

### Scope & Generalization

The component library in Phase 1 is **Downstreet Cafe-specific**. Class names like `.menu-card`, `.team-avatar`, and `.order-sidebar` reflect the café domain. This is intentional — Phase 1 proves the architecture with a concrete site.

**Generalization path** (when Phase 2 needs to support multiple site types): Replace domain-specific class names with semantic ones. For example:
- `.menu-card` → `.card-grid` (any card-based layout)
- `.menu-item` → `.item-list` (any name/value list)
- `.team-grid` → `.person-grid` (any people showcase)
- `.event-card` → `.card-with-badge` (any card with a date/label badge)
- Section wrappers use `.section-hero`, `.section-content`, `.section-gallery` etc.

This generalization happens when Phase 2 needs it — not before.

### What it contains

Shared CSS patterns used across multiple section types. These are the building blocks that sections compose:

- **Reset & base** — `*` box-sizing, body font/color/bg, heading font-family
- **Nav** — `.site-nav` horizontal link bar with active state
- **Footer** — `footer` centered text block with border-top
- **Page header** — `.page-header` centered title + subtitle pattern
- **Menu item** — `.menu-line` (dotted leader) and `.menu-item` (space-between) variants
- **Menu card** — `.menu-card` card container with category heading
- **Card** — `.value-card` generic content card (bg, radius, padding)
- **Image** — `.hero-image` full-width cover image
- **Team member** — `.team-member`, `.team-avatar` card with avatar circle
- **Event card** — `.event-card`, `.event-date` badge, `.event-tag` pill
- **Gallery grid** — `.gallery-grid`, `.gallery-item` with `.wide`, `.tall`, `.featured` modifiers
- **Button** — `.add-btn` circle button, `.checkout-btn` full-width CTA, `.category-tab` pill toggle
- **Order layout** — `.order-layout`, `.order-sidebar`, `.order-item` patterns
- **CTA banner** — `.community` / `.cta-banner` centered callout block
- **Section wrapper** — `section` base styles (max-width, margin, padding)

### Structure

A single TypeScript file that exports a CSS string:

```
src/data/sections/components.ts
```

```ts
// src/data/sections/components.ts

export const componentCSS = `
/* ---- Reset & Base ---- */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--theme-font-body);
  color: var(--theme-text);
  background: var(--theme-bg);
  line-height: var(--theme-line-height-normal);
}
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 400; }

/* ---- Nav ---- */
.site-nav { ... }
.site-nav a { ... }
.site-nav a:hover { ... }
.site-nav a.active { ... }

/* ---- Footer ---- */
footer { ... }
footer a { ... }
footer .wp { ... }

/* ... all component classes ... */
`;
```

**Why a single string?** Same pattern as `themeToCSS()` — a function/constant that returns CSS text. Easy to inject, easy to reason about, no build tooling needed. The CSS is ~200 lines for Downstreet Cafe. If it grows unwieldy for future sites, it can be split into per-component modules that get concatenated — but that's a future concern.

### How it's injected

The page renderer inserts it as a `<style>` block in `<head>`, after the theme CSS:

```html
<head>
  <style>/* theme CSS variables */</style>
  <style>/* component CSS */</style>
</head>
```

Every section's HTML can reference any component class. No per-section style blocks needed.

### Specific components for Downstreet Cafe

Here's every CSS class and its markup pattern, organized by component:

#### Nav (`.site-nav`)
```html
<nav class="site-nav">
  <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
  <!-- ... -->
</nav>
```

#### Footer (`footer`)
```html
<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>
```

#### Page Header (`.page-header`)
```html
<div class="page-header">
  <h1>Our Menu</h1>
  <p>Crafted with care, served with love</p>
</div>
```

#### Split Hero (`.split-hero`)
```html
<div class="split-hero">
  <div class="split-hero-img"><img src="..." alt="..."></div>
  <div class="split-hero-text">
    <h1>...</h1>
    <p class="tagline">...</p>
    <div class="hours-brief">...</div>
  </div>
</div>
```

#### Image Strip (`.image-strip`)
```html
<div class="image-strip">
  <figure>
    <img src="..." alt="...">
    <figcaption>...</figcaption>
  </figure>
  <!-- repeat -->
</div>
```

#### Menu Line (`.menu-line`) — dotted-leader style (homepage highlights)
```html
<div class="menu-line">
  <span class="name">Espresso</span>
  <span class="dots"></span>
  <span class="price">$3.50</span>
</div>
```

#### Menu Card (`.menu-card`) — card style (full menu page)
```html
<div class="menu-card">
  <h3>Coffee</h3>
  <div class="menu-item"><span>Espresso</span><span class="price">$3.50</span></div>
  <!-- repeat -->
</div>
```

#### Value Card (`.value-card`)
```html
<div class="value-card">
  <h3>Local Sourcing</h3>
  <p>Our coffee is roasted by...</p>
</div>
```

#### Team Member (`.team-member`, `.team-avatar`)
```html
<div class="team-member">
  <div class="team-avatar">M</div>
  <h3>Maya Chen</h3>
  <div class="role">Co-Owner &amp; Head Roaster</div>
  <p>Obsessed with pour-over technique...</p>
</div>
```

#### Event Card (`.event-card`, `.event-date`, `.event-tag`)
```html
<div class="event-card">
  <div class="event-date">
    <span class="month">Feb</span>
    <span class="day">21</span>
    <span class="dow">Fri</span>
  </div>
  <div class="event-body">
    <span class="event-tag">Live Music</span>
    <h3>The Ponderosa Sessions</h3>
    <div class="meta">7:00 PM – 9:30 PM · Free</div>
    <p>Description...</p>
  </div>
</div>
```

#### Recurring Events (`.recurring`, `.recurring-grid`, `.recurring-item`)
```html
<div class="recurring">
  <h3>Every Week at Downstreet</h3>
  <div class="recurring-grid">
    <div class="recurring-item">
      <strong>Open Mic Fridays</strong>
      <span>Every Friday, 7:00 – 9:30 PM...</span>
    </div>
  </div>
</div>
```

#### Gallery Grid (`.gallery-grid`, `.gallery-item`, `.wide`, `.tall`, `.featured`)
```html
<div class="gallery-grid">
  <div class="gallery-item featured">
    <img src="..." alt="...">
    <span class="caption">...</span>
  </div>
  <div class="gallery-item wide">...</div>
  <div class="gallery-item">...</div>
</div>
```

#### Order Item (`.order-item`, `.add-btn`)
```html
<div class="order-item">
  <div class="order-item-info">
    <h4>Espresso</h4>
    <p>Double shot, rich and bold</p>
  </div>
  <div class="order-item-action">
    <span class="price">$3.50</span>
    <button class="add-btn">+</button>
  </div>
</div>
```

#### Order Sidebar (`.order-sidebar`, `.sidebar-item`, `.checkout-btn`)
```html
<div class="order-sidebar">
  <h3>Your Order</h3>
  <div class="sidebar-items">
    <div class="sidebar-item">
      <span>Cappuccino <span class="qty">× 1</span></span>
      <span>$4.75</span>
    </div>
  </div>
  <div class="sidebar-total"><span>Total</span><span>$18.63</span></div>
  <button class="checkout-btn">Checkout · $18.63</button>
</div>
```

#### CTA / Community Banner (`.community`)
```html
<div class="community">
  <p>Open Mic Fridays · Latte Art Workshops · Neighborhood Book Swaps</p>
  <a href="#">See what's happening →</a>
</div>
```

---

## 3. Section Types

Each section type has: a TypeScript data interface, example data from Downstreet Cafe, and notes on what components it uses.

### `hero-split`

Side-by-side image + text. Used on the homepage.

```ts
interface HeroSplitData {
  heading: string           // can contain <br> for line breaks
  tagline: string
  image: { src: string; alt: string }
  hours?: string[]          // e.g. ["Mon–Fri: 7am–6pm", "Sat–Sun: 8am–4pm"]
}
```

**Example:**
```ts
{
  id: 'hero',
  type: 'hero-split',
  data: {
    heading: 'Downstreet<br>Cafe',
    tagline: 'Your neighborhood coffee spot',
    image: { src: '/images/downstreet/hero-interior.png', alt: 'Downstreet Cafe interior with morning light' },
    hours: ['Mon – Fri: 7 AM – 6 PM', 'Sat – Sun: 8 AM – 4 PM']
  }
}
```

**Components:** `.split-hero`, `.split-hero-img`, `.split-hero-text`, `.tagline`, `.hours-brief`

---

### `hero-fullwidth`

Full-width cover image, typically followed by a page-header. Used on Menu, About pages.

```ts
interface HeroFullwidthData {
  image: { src: string; alt: string }
  height?: string           // CSS height, defaults to '300px'
}
```

**Example:**
```ts
{
  id: 'hero',
  type: 'hero-fullwidth',
  data: {
    image: { src: '/images/downstreet/food-breakfast.png', alt: 'Overhead breakfast spread' },
    height: '300px'
  }
}
```

**Components:** `.hero-image`

---

### `hero-simple`

Text-only centered header — title + optional subtitle. Used on Events, Gallery, Order pages.

```ts
interface HeroSimpleData {
  heading: string
  subtitle?: string
}
```

**Example:**
```ts
{
  id: 'header',
  type: 'hero-simple',
  data: {
    heading: 'Events',
    subtitle: "What's happening at Downstreet"
  }
}
```

**Components:** `.page-header`

---

### `image-strip`

Row of images with captions. Used on the homepage (3 images).

```ts
interface ImageStripData {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
}
```

**Example:**
```ts
{
  id: 'photos',
  type: 'image-strip',
  data: {
    images: [
      { src: '/images/downstreet/latte-art.png', alt: 'Latte art close-up', caption: 'Latte art by Sophie' },
      { src: '/images/downstreet/pastries.png', alt: 'Fresh pastries on wooden board', caption: 'Baked fresh daily' },
      { src: '/images/downstreet/barista-counter.png', alt: 'Barista behind espresso machine', caption: 'The espresso bar' }
    ]
  }
}
```

**Components:** `.image-strip`, `figure`, `figcaption`

---

### `image-gallery`

Grid of images with hover captions and size variants. Used on the Gallery page.

```ts
interface ImageGalleryData {
  heading?: string
  subtitle?: string
  images: Array<{
    src: string
    alt: string
    caption?: string
    size?: 'normal' | 'wide' | 'tall' | 'featured'  // defaults to 'normal'
  }>
}
```

**Example:**
```ts
{
  id: 'space-gallery',
  type: 'image-gallery',
  data: {
    heading: 'The Space',
    subtitle: 'Our corner of Maple Street',
    images: [
      { src: '/images/downstreet/hero-interior.png', alt: 'Morning light', caption: 'Morning light through the front windows', size: 'featured' },
      { src: '/images/downstreet/space-tables.png', alt: 'Wooden tables', caption: 'Communal tables — morning light' },
      { src: '/images/downstreet/space-espresso-machine.png', alt: 'Espresso machine', caption: 'The espresso bar' },
      { src: '/images/downstreet/space-storefront.png', alt: 'Storefront window', caption: 'View from Maple Street', size: 'wide' },
      { src: '/images/downstreet/space-reading-nook.png', alt: 'Reading nook', caption: 'The reading nook' }
    ]
  }
}
```

**Components:** `.gallery-grid`, `.gallery-item`, `.wide`, `.tall`, `.featured`, `.caption`

---

### `menu-list`

Menu items organized by category. Two display variants: dotted-leader (homepage highlights) and card grid (full menu page).

```ts
interface MenuListData {
  heading?: string
  subtitle?: string
  note?: string              // italicized note above the menu (e.g. "All coffee is roasted locally...")
  variant: 'columns' | 'cards'  // columns = dotted leader side-by-side, cards = card grid
  categories: Array<{
    name: string
    items: Array<{
      name: string
      price: string          // formatted string, e.g. "$3.50"
      description?: string   // only shown in order-menu, but kept here for reuse
    }>
  }>
}
```

**Example (homepage highlights, columns variant):**
```ts
{
  id: 'menu-highlights',
  type: 'menu-list',
  data: {
    heading: 'Menu Highlights',
    variant: 'columns',
    categories: [
      {
        name: 'Coffee',
        items: [
          { name: 'Espresso', price: '$3.50' },
          { name: 'Cappuccino', price: '$4.75' },
          { name: 'Pour Over', price: '$5.00' },
          { name: 'Cold Brew', price: '$4.50' }
        ]
      },
      {
        name: 'Pastries',
        items: [
          { name: 'Butter Croissant', price: '$3.25' },
          { name: 'Banana Bread', price: '$3.50' },
          { name: 'Blueberry Muffin', price: '$3.00' },
          { name: 'Cinnamon Roll', price: '$4.25' }
        ]
      }
    ]
  }
}
```

**Components (columns):** `.menu-highlights`, `.menu-columns`, `.menu-col`, `.menu-line`, `.name`, `.dots`, `.price`
**Components (cards):** `.menu-grid`, `.menu-card`, `.menu-item`, `.price`, `.note`

---

### `content-prose`

Long-form text content. Used on the About page (story section, community involvement).

```ts
interface ContentProseData {
  heading?: string
  body: string              // HTML string — paragraphs, lists, links, emphasis
  maxWidth?: string         // CSS max-width, defaults to '700px'
  background?: boolean      // wrap in a card-style container (used for community section)
}
```

**Example:**
```ts
{
  id: 'story',
  type: 'content-prose',
  data: {
    heading: 'How It Started',
    body: `<p>Downstreet Cafe began in 2018 when partners Maya Chen and David Okafor decided that Riverside deserved a coffee shop that felt like a living room — warm, unhurried, and genuinely welcoming.</p>
<p>Maya spent a decade in specialty coffee in Portland, from barista to roaster to café manager. David brought his background in community organizing and a deep belief that small businesses can be neighborhood anchors. Together they found the old bookshop space on Maple Street, kept the original wood floors, and opened the doors.</p>
<p>Six years later, not much has changed about the feeling — just the number of regulars who call it home.</p>`
  }
}
```

**Components:** `.story`, `.community` (when `background: true`)

---

### `content-cards`

Grid of cards, each with a heading and text. Used on the About page (values section).

```ts
interface ContentCardsData {
  heading?: string
  cards: Array<{
    title: string
    body: string
    image?: string          // image URL for the card
  }>
}
```

**Example:**
```ts
{
  id: 'values',
  type: 'content-cards',
  data: {
    heading: 'What We Believe In',
    cards: [
      { title: 'Local Sourcing', body: 'Our coffee is roasted by Timber Ridge Roasters, just 20 miles up the valley...' },
      { title: 'Sustainability', body: 'Compostable cups and packaging, a zero single-use plastic policy...' },
      { title: 'Fair Wages', body: 'Every member of our team earns a living wage with benefits...' }
    ]
  }
}
```

**Components:** `.values-grid`, `.value-card`

---

### `team-grid`

Team member cards with avatars. Used on the About page.

```ts
interface TeamGridData {
  heading?: string
  members: Array<{
    name: string
    role: string
    bio: string
    avatar?: string         // image URL; if absent, use initials
    initials?: string       // fallback when no avatar image (e.g. "M")
  }>
}
```

**Example:**
```ts
{
  id: 'team',
  type: 'team-grid',
  data: {
    heading: 'Meet the Team',
    members: [
      { name: 'Maya Chen', role: 'Co-Owner & Head Roaster', bio: 'Obsessed with pour-over technique...', initials: 'M' },
      { name: 'David Okafor', role: 'Co-Owner & Operations', bio: 'The one who makes sure everything runs smoothly...', initials: 'D' },
      { name: 'Sophie Lam', role: 'Lead Barista', bio: 'Latte art champion...', initials: 'S' },
      { name: 'Jake Moreno', role: 'Kitchen Manager', bio: 'Turned our lunch menu from an afterthought...', initials: 'J' }
    ]
  }
}
```

**Components:** `.team-section`, `.team-grid`, `.team-member`, `.team-avatar`, `.role`

---

### `event-list`

Upcoming events with date badges. Used on the Events page.

```ts
interface EventListData {
  heading?: string
  subtitle?: string
  events: Array<{
    date: { month: string; day: string; dow: string }
    tag?: string            // e.g. "Live Music", "Workshop"
    title: string
    meta: string            // time + price line, e.g. "7:00 PM – 9:30 PM · Free"
    description: string
  }>
}
```

**Example:**
```ts
{
  id: 'upcoming',
  type: 'event-list',
  data: {
    heading: 'Upcoming Events',
    subtitle: "Mark your calendar — we'd love to see you there",
    events: [
      {
        date: { month: 'Feb', day: '21', dow: 'Fri' },
        tag: 'Live Music',
        title: 'The Ponderosa Sessions',
        meta: '7:00 PM – 9:30 PM · Free',
        description: 'Local folk duo The Ponderosa Sessions bring their warm acoustic sound...'
      }
      // ... more events
    ]
  }
}
```

**Components:** `.event-card`, `.event-date`, `.event-body`, `.event-tag`, `.meta`

---

### `event-recurring`

Weekly/recurring events grid. Used on the Events page.

```ts
interface EventRecurringData {
  heading?: string
  events: Array<{
    name: string
    description: string
  }>
}
```

**Example:**
```ts
{
  id: 'recurring',
  type: 'event-recurring',
  data: {
    heading: 'Every Week at Downstreet',
    events: [
      { name: 'Open Mic Fridays', description: 'Every Friday, 7:00 – 9:30 PM. Sign-ups start at 6:30...' },
      { name: 'Study Hall Sundays', description: 'Every Sunday, 10 AM – 4 PM. Free refills on drip coffee...' },
      { name: 'Saturday Morning Vinyl', description: 'Every Saturday, 8 – 11 AM. We spin records...' },
      { name: 'Coffee for a Cause', description: 'First Monday of every month. 100% of proceeds...' }
    ]
  }
}
```

**Components:** `.recurring`, `.recurring-grid`, `.recurring-item`

---

### `contact-info`

Address, phone, email block. Not a standalone section in Downstreet Cafe's current design (this info lives in the footer), but defined as a section type for sites that have a dedicated contact page. The footer TemplatePart handles this for Downstreet.

```ts
interface ContactInfoData {
  heading?: string
  address?: string
  phone?: string
  email?: string
  hours?: Array<{ label: string; value: string }>
  mapEmbed?: string         // iframe src URL for Google Maps embed
}
```

**Components:** Custom contact layout (not yet used in Downstreet, will be defined when needed).

---

### `cta-banner`

Call-to-action banner. Used on the homepage ("community" callout).

```ts
interface CtaBannerData {
  heading?: string          // optional bold heading above the text
  text: string              // main message, can contain HTML
  linkText?: string
  linkPage?: string         // page slug for internal navigation
  linkUrl?: string          // external URL (mutually exclusive with linkPage)
}
```

**Example:**
```ts
{
  id: 'cta',
  type: 'cta-banner',
  data: {
    text: 'Open Mic Fridays · Latte Art Workshops · Neighborhood Book Swaps',
    linkText: 'See what\'s happening →',
    linkPage: 'events'
  }
}
```

**Components:** `.community`

---

### `order-menu`

Interactive order page with category tabs, item list, and cart sidebar. Used on the Order page.

```ts
interface OrderMenuData {
  heading?: string
  subtitle?: string
  pickupInfo?: string       // e.g. "Ordering for pickup · 42 Maple Street · Open until 6:00 PM today"
  pickupTime?: string       // e.g. "Ready for pickup in 15–20 min"
  categories: Array<{
    name: string
    items: Array<{
      name: string
      description?: string
      price: string
    }>
  }>
  // Cart state is presentational/static for Phase 1
  sampleCart?: {
    items: Array<{ name: string; qty: number; price: string }>
    subtotal: string
    tax: string
    total: string
  }
}
```

**Example:**
```ts
{
  id: 'order',
  type: 'order-menu',
  data: {
    heading: 'Order Online',
    subtitle: 'Pickup in 15–20 minutes',
    pickupInfo: 'Ordering for pickup · 42 Maple Street · Open until 6:00 PM today',
    pickupTime: 'Ready for pickup in 15–20 min',
    categories: [
      {
        name: 'Coffee',
        items: [
          { name: 'Espresso', description: 'Double shot, rich and bold', price: '$3.50' },
          { name: 'Americano', description: 'Espresso with hot water, smooth and clean', price: '$3.75' },
          // ...
        ]
      },
      // ... more categories
    ],
    sampleCart: {
      items: [
        { name: 'Cappuccino', qty: 1, price: '$4.75' },
        { name: 'Almond Croissant', qty: 2, price: '$8.00' },
        { name: 'Cold Brew', qty: 1, price: '$4.50' }
      ],
      subtotal: '$17.25',
      tax: '$1.38',
      total: '$18.63'
    }
  }
}
```

**Components:** `.order-layout`, `.category-tabs`, `.category-tab`, `.menu-section-title`, `.order-item`, `.order-item-info`, `.order-item-action`, `.add-btn`, `.order-sidebar`, `.sidebar-items`, `.sidebar-item`, `.sidebar-subtotal`, `.sidebar-total`, `.checkout-btn`, `.pickup-note`, `.order-info`

---

## 4. Page Renderer

### The rendering pipeline

A single function takes a `PageTemplate` + `SiteData` and returns a complete HTML document string:

```ts
// src/data/sections/renderer.ts

function renderPage(page: PageTemplate, site: SiteData, activePage: string): string
```

The output assembles in this order:

1. **Document shell** — `<!DOCTYPE html>`, `<html>`, `<head>`, meta tags
2. **Font imports** — `<link>` tags for Google Fonts from `site.fonts`
3. **Theme CSS** — `<style>` block from `themeToCSS(site.theme)`
4. **Component CSS** — `<style>` block from `componentCSS`
5. **`<body>` open**
6. **Header** — rendered from `site.header`, with `activePage` determining the `.active` nav link
7. **Sections** — each section rendered in order by its type-specific renderer
8. **Footer** — rendered from `site.footer`
9. **`</body></html>`**

```ts
import { themeToCSS } from '../themes/theme-utils'
import { componentCSS } from './components'
import { renderSection } from './section-renderers'

function renderHeader(header: TemplatePart, activePage: string): string {
  const data = header.data as HeaderData
  const links = data.navItems.map(item => {
    const activeClass = item.page === activePage ? ' class="active"' : ''
    return `<a href="#"${activeClass} onclick="window.parent.postMessage({type:'navigate',page:'${item.page}'},'*');return false">${item.label}</a>`
  }).join('\n  ')
  return `<nav class="site-nav">\n  ${links}\n</nav>`
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
```

### Section renderers

A dispatch function that calls the right renderer based on section type:

```ts
// src/data/sections/section-renderers.ts

import type { Section } from './types'

export function renderSection(section: Section): string {
  switch (section.type) {
    case 'hero-split': return renderHeroSplit(section.data)
    case 'hero-fullwidth': return renderHeroFullwidth(section.data)
    case 'hero-simple': return renderHeroSimple(section.data)
    case 'image-strip': return renderImageStrip(section.data)
    case 'image-gallery': return renderImageGallery(section.data)
    case 'menu-list': return renderMenuList(section.data)
    case 'content-prose': return renderContentProse(section.data)
    case 'content-cards': return renderContentCards(section.data)
    case 'team-grid': return renderTeamGrid(section.data)
    case 'event-list': return renderEventList(section.data)
    case 'event-recurring': return renderEventRecurring(section.data)
    case 'contact-info': return renderContactInfo(section.data)
    case 'cta-banner': return renderCtaBanner(section.data)
    case 'order-menu': return renderOrderMenu(section.data)
    default: return `<!-- unknown section type: ${(section as any).type} -->`
  }
}
```

Each renderer is a pure function: data in → HTML string out. Example:

```ts
function renderHeroSplit(data: HeroSplitData): string {
  const hours = data.hours
    ? `<div class="hours-brief">${data.hours.join('<br>')}</div>`
    : ''
  return `<div class="split-hero">
  <div class="split-hero-img">
    <img src="${data.image.src}" alt="${data.image.alt}">
  </div>
  <div class="split-hero-text">
    <h1>${data.heading}</h1>
    <p class="tagline">${data.tagline}</p>
    ${hours}
  </div>
</div>`
}

function renderCtaBanner(data: CtaBannerData): string {
  const link = data.linkText
    ? data.linkPage
      ? `<a href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.linkPage}'},'*');return false">${data.linkText}</a>`
      : `<a href="${data.linkUrl}">${data.linkText}</a>`
    : ''
  return `<div class="community">
  <p>${data.text}</p>
  ${link}
</div>`
}
```

### Replacing the current pattern

**Before (monolithic):**
```ts
// src/data/mock-sites/downstreet-cafe.ts
export function homepage(themeCSS: string): string { return `<!DOCTYPE html>...800 lines...` }
export function menu(themeCSS: string): string { return `<!DOCTYPE html>...` }
// 6 functions, each a complete HTML document with duplicated CSS + nav + footer
```

**After (section system):**
```ts
// src/data/mock-sites/downstreet-cafe.ts
import { renderPage } from '../sections/renderer'
import type { SiteData } from '../sections/types'

export const siteData: SiteData = {
  name: 'Downstreet Cafe',
  theme: downstreetTheme,       // existing theme object
  fonts: [{ url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap' }],
  header: { id: 'main-nav', type: 'header', data: { navItems: [
    { label: 'Home', page: 'homepage' },
    { label: 'Menu', page: 'menu' },
    { label: 'About', page: 'about' },
    { label: 'Events', page: 'events' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Order', page: 'order' }
  ]}},
  footer: { id: 'site-footer', type: 'footer', data: {
    address: '42 Maple Street, Riverside, OR 97201',
    phone: '(503) 555-0142',
    email: 'hello@downstreetcafe.com',
    tagline: 'Made with WordPress'
  }},
  pages: [
    {
      id: 'homepage',
      title: 'Downstreet Cafe',
      slug: 'homepage',
      sections: [
        { id: 'hero', type: 'hero-split', data: { /* ... */ } },
        { id: 'photos', type: 'image-strip', data: { /* ... */ } },
        { id: 'menu-highlights', type: 'menu-list', data: { /* ... */ } },
        { id: 'cta', type: 'cta-banner', data: { /* ... */ } }
      ]
    },
    // ... 5 more pages
  ]
}

// Backward-compatible exports for the existing SitePreview component
export function homepage(themeCSS: string): string {
  return renderPage(siteData.pages[0], siteData, 'homepage')
}
export function menu(themeCSS: string): string {
  return renderPage(siteData.pages[1], siteData, 'menu')
}
// etc.
```

Note: the `themeCSS` parameter becomes unused in the wrapper functions — the renderer calls `themeToCSS()` itself using `siteData.theme`. The wrappers exist purely for backward compatibility during the transition.

---

## 5. Refactoring Plan

### New files to create

```
src/data/sections/
  types.ts              — all interfaces (Section, SiteData, PageTemplate, TemplatePart, all section data types)
  components.ts         — componentCSS string (extracted from current inline <style> blocks)
  renderer.ts           — renderPage(), renderHeader(), renderFooter()
  section-renderers.ts  — renderSection() dispatcher + one render function per section type
```

### Steps

**Step 1: Define types** (`types.ts`)

Create all TypeScript interfaces listed in section 1 and 3 of this doc. No runtime code — just types.

*Effort: Small. Straightforward transcription from this spec.*

**Step 2: Extract component CSS** (`components.ts`)

Go through all 6 page functions in `downstreet-cafe.ts`. Identify every CSS rule. Deduplicate — most are repeated identically across pages. Merge into one `componentCSS` string. Where pages have slight variations of the same component (e.g. `.menu-line` vs `.menu-item`), keep both.

*Effort: Medium. Requires careful diffing of CSS across 6 functions to catch variations.*

**Step 3: Build section renderers** (`section-renderers.ts`)

For each section type, write a pure function that takes data and returns HTML. Extract the HTML patterns from the current monolithic functions. The HTML should be identical to what's currently produced — this is a refactor, not a redesign.

*Effort: Medium-large. 14 section types, each needs a renderer. Most are straightforward template literal functions.*

**Step 4: Build page renderer** (`renderer.ts`)

Implement `renderPage()` — the document shell assembly. This is the function that replaces the monolithic pattern.

*Effort: Small. Mostly string concatenation.*

**Step 5: Create site data** (update `downstreet-cafe.ts`)

Define the `SiteData` object for Downstreet Cafe. This means transcribing all content from the HTML templates into structured data objects. Add backward-compatible wrapper exports.

*Effort: Medium-large. 6 pages of content to transcribe, but it's mechanical.*

**Step 6: Verify visual parity**

Compare the old monolithic output to the new rendered output for all 6 pages. Fix any differences.

*Effort: Small-medium. Debugging CSS and HTML mismatches.*

### Files modified

- `src/data/mock-sites/downstreet-cafe.ts` — rewritten to export `SiteData` + backward-compatible wrappers
- No changes needed to the SitePreview component if backward-compatible wrappers are provided. The component calls `homepage(themeCSS)` etc. and receives an HTML string — that contract doesn't change.

### Seed data structure

The `SiteData` object **is** the seed data. For Downstreet Cafe, it lives directly in the mock-sites file. For AI-generated sites (Phase 2+), it will be built up incrementally as the AI produces theme, template parts, and sections.

---

## 6. Validation

### Visual comparison

1. Capture screenshots of all 6 pages using the current monolithic functions
2. Switch to the section-based rendering (swap exports)
3. Capture screenshots of the same 6 pages
4. Pixel-diff or side-by-side comparison — they should be visually identical

Alternatively: keep both code paths during development. Add a toggle (query param or config flag) that switches between old and new rendering. Compare in the browser.

### What could go wrong

**CSS specificity conflicts.** The monolithic functions have per-page `<style>` blocks. Some pages define the same class name with slightly different rules (e.g. `.page-header` padding varies between Menu and About). The shared component CSS must accommodate these — either by picking one value that works everywhere, or by adding section-specific CSS overrides. The current pages are close enough that most differences are trivial (a few px of padding/height). Document any intentional visual changes.

**CSS ordering.** In the monolithic approach, all CSS is in one `<style>` block. In the new approach, theme CSS comes first, then component CSS. If any component rules inadvertently depend on declaration order with theme rules, they could break. Unlikely given the architecture (components reference `var(--theme-*)`, not raw values), but worth checking.

**Missing styles.** If a section renderer produces HTML that references a class not in `componentCSS`, that section will render unstyled. Catch this by visual comparison.

**HTML entity encoding.** The current templates use `&amp;` in content. The section data stores plain text (`&`). Renderers must handle HTML escaping where content is interpolated into HTML. For Phase 1 (static data, not user input), this is manageable — just ensure the data matches what's currently rendered.

**`themeCSS` parameter goes unused.** The backward-compatible wrappers accept `themeCSS` but ignore it (the renderer uses the theme from `SiteData`). This is fine for the transition but should be cleaned up when the SitePreview component is updated to work with `SiteData` directly.

**Order page interactivity.** The current order page has no real JS — the cart is hardcoded HTML. The section system preserves this. True interactivity is out of scope for Phase 1.
