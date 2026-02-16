/**
 * Phase 2: Generation Prompts
 *
 * System prompts and step-specific prompts for the AI generation pipeline.
 * Section schema docs are auto-generated from the canonical Phase 1 types.
 */

import type { SiteTheme } from './themes/types'
import type { CreativeBrief, PageConfig } from './ai-pipeline-types'

// ---- Section Schema Documentation ----
// Auto-generated descriptions of each section type for the AI prompt.
// These mirror the actual TypeScript interfaces in sections/types.ts.

const SECTION_SCHEMAS: Record<string, { description: string; schema: string }> = {
  'hero-split': {
    description: 'Split hero with image on left, text on right. Good for homepage heroes.',
    schema: `{
  "heading": "string (supports <br> for line breaks)",
  "tagline": "string",
  "image": { "src": "string (URL)", "alt": "string" },
  "hours": ["string (optional, e.g. 'Mon–Fri: 7am–6pm')"]
}`,
  },
  'hero-fullwidth': {
    description: 'Full-width cover image hero.',
    schema: `{
  "image": { "src": "string (URL)", "alt": "string" },
  "height": "string? (CSS height, default 300px)"
}`,
  },
  'hero-simple': {
    description: 'Simple centered text header. Good for interior pages.',
    schema: `{
  "heading": "string",
  "subtitle": "string? (optional italic subtitle)"
}`,
  },
  'image-strip': {
    description: 'Three-column image strip with optional captions.',
    schema: `{
  "images": [{ "src": "string", "alt": "string", "caption": "string?" }]
}`,
  },
  'image-gallery': {
    description: 'Grid gallery with optional sizing (normal/wide/tall/featured).',
    schema: `{
  "heading": "string?",
  "subtitle": "string?",
  "images": [{ "src": "string", "alt": "string", "caption": "string?", "size": "'normal'|'wide'|'tall'|'featured' (optional)" }]
}`,
  },
  'menu-list': {
    description: 'Menu/price list. Two variants: "columns" (dotted-leader) or "cards" (card grid).',
    schema: `{
  "heading": "string?",
  "subtitle": "string?",
  "note": "string? (italic note shown above grid, cards variant only)",
  "variant": "'columns' | 'cards'",
  "categories": [{
    "name": "string",
    "items": [{ "name": "string", "price": "string", "description": "string?" }]
  }]
}`,
  },
  'content-prose': {
    description: 'Long-form text content. Set background:true for card-style container.',
    schema: `{
  "heading": "string?",
  "body": "string (HTML supported: <p>, <ul>, <li>, etc.)",
  "maxWidth": "string? (CSS width)",
  "background": "boolean? (if true, renders in card container)"
}`,
  },
  'content-cards': {
    description: 'Grid of content cards with title, body, optional image.',
    schema: `{
  "heading": "string?",
  "cards": [{ "title": "string", "body": "string", "image": "string? (URL)" }]
}`,
  },
  'team-grid': {
    description: 'Team member grid with avatars.',
    schema: `{
  "heading": "string?",
  "members": [{
    "name": "string",
    "role": "string",
    "bio": "string",
    "avatar": "string? (image URL)",
    "initials": "string? (fallback if no avatar)"
  }]
}`,
  },
  'event-list': {
    description: 'List of upcoming events with date badges.',
    schema: `{
  "heading": "string?",
  "subtitle": "string?",
  "events": [{
    "date": { "month": "string (e.g. 'JUN')", "day": "string (e.g. '15')", "dow": "string (e.g. 'SAT')" },
    "tag": "string? (e.g. 'Live Music')",
    "title": "string",
    "meta": "string (e.g. '7:00 PM – 9:00 PM')",
    "description": "string"
  }]
}`,
  },
  'event-recurring': {
    description: 'Recurring weekly events in a grid layout.',
    schema: `{
  "heading": "string?",
  "events": [{ "name": "string", "description": "string" }]
}`,
  },
  'contact-info': {
    description: 'Contact details with address, phone, email, hours.',
    schema: `{
  "heading": "string?",
  "address": "string?",
  "phone": "string?",
  "email": "string?",
  "hours": [{ "label": "string (e.g. 'Monday–Friday')", "value": "string (e.g. '7:00 AM – 6:00 PM')" }],
  "mapEmbed": "string? (Google Maps embed URL)"
}`,
  },
  'cta-banner': {
    description: 'Call-to-action banner with text and optional link.',
    schema: `{
  "heading": "string? (optional heading above text)",
  "text": "string (main message)",
  "linkText": "string? (button/link label)",
  "linkPage": "string? (internal page slug for navigation)",
  "linkUrl": "string? (external URL, use if not internal)"
}`,
  },
  'order-menu': {
    description: 'Interactive order menu with categories, items, and sample cart.',
    schema: `{
  "heading": "string?",
  "subtitle": "string?",
  "pickupInfo": "string?",
  "pickupTime": "string?",
  "categories": [{
    "name": "string",
    "items": [{ "name": "string", "description": "string?", "price": "string" }]
  }],
  "sampleCart": {
    "items": [{ "name": "string", "qty": "number", "price": "string" }],
    "subtotal": "string", "tax": "string", "total": "string"
  }
}`,
  },
}

// ---- Page Presets ----

export const PAGE_PRESETS: Record<string, PageConfig[]> = {
  restaurant: [
    {
      slug: '/',
      title: 'Home',
      description: 'Landing page — hero, highlights, location/hours teaser',
      suggestedSections: ['hero-split', 'content-cards', 'cta-banner', 'contact-info'],
    },
    {
      slug: '/menu',
      title: 'Menu',
      description: 'Full food and drink menu organized by category',
      suggestedSections: ['hero-simple', 'menu-list', 'menu-list', 'cta-banner'],
    },
    {
      slug: '/about',
      title: 'About',
      description: 'Story of the business, team, values',
      suggestedSections: ['hero-fullwidth', 'content-prose', 'team-grid'],
    },
    {
      slug: '/events',
      title: 'Events',
      description: 'Upcoming events and happenings',
      suggestedSections: ['hero-simple', 'event-list', 'cta-banner'],
    },
    {
      slug: '/contact',
      title: 'Contact',
      description: 'Location, hours, contact form',
      suggestedSections: ['hero-simple', 'contact-info'],
    },
  ],
  portfolio: [
    {
      slug: '/',
      title: 'Home',
      description: 'Landing page — hero, featured work, about teaser',
      suggestedSections: ['hero-split', 'content-cards', 'cta-banner'],
    },
    {
      slug: '/work',
      title: 'Work',
      description: 'Portfolio gallery showcasing projects',
      suggestedSections: ['hero-simple', 'image-gallery'],
    },
    {
      slug: '/about',
      title: 'About',
      description: 'Bio, skills, experience',
      suggestedSections: ['hero-fullwidth', 'content-prose', 'content-cards'],
    },
    {
      slug: '/contact',
      title: 'Contact',
      description: 'Contact information and form',
      suggestedSections: ['hero-simple', 'contact-info'],
    },
  ],
}

// ---- Prompt Builders ----

/**
 * Build the generation system prompt with auto-generated section schema docs.
 */
export function buildGenerationSystemPrompt(
  brief: CreativeBrief,
  currentTheme?: SiteTheme,
): string {
  const sectionDocs = Object.entries(SECTION_SCHEMAS)
    .map(([type, info]) => `### section:${type}\n${info.description}\n\`\`\`json\n${info.schema}\n\`\`\``)
    .join('\n\n')

  return `You are a website builder AI. You create websites by generating structured section data.

## Output Format

Return structured data in fenced blocks. Available fence types:

### Theme
\`\`\`theme
{ ... theme JSON ... }
\`\`\`

Theme structure:
\`\`\`json
{
  "color": {
    "palette": [{ "slug": "primary|secondary|base|contrast", "name": "string", "hex": "#RRGGBB" }],
    "background": "#RRGGBB",
    "text": "#RRGGBB"
  },
  "typography": {
    "fontFamily": { "heading": "string (Google Font name)", "body": "string (Google Font name)" },
    "fontSize": { "hero": "rem", "xlarge": "rem", "large": "rem", "medium": "rem", "small": "rem" }
  }
}
\`\`\`

### Template Parts
\`\`\`templatePart:header
{ "navItems": [{ "label": "string", "page": "string (page slug)" }] }
\`\`\`

\`\`\`templatePart:footer
{ "address": "string", "phone": "string", "email": "string", "tagline": "string?" }
\`\`\`

### Sections
\`\`\`section:TYPE
{ ... section data matching the TYPE's schema ... }
\`\`\`

You may include brief conversational text between blocks to explain your creative choices. Keep it short.

## Available Section Types

${sectionDocs}

## Creative Brief

- **Site type:** ${brief.siteType}
- **Name:** ${brief.siteName}
- **Description:** ${brief.description}
${brief.additionalContext ? Object.entries(brief.additionalContext).map(([k, v]) => `- **${k}:** ${v}`).join('\n') : ''}

${currentTheme ? `## Current Theme\n\`\`\`json\n${JSON.stringify(currentTheme.settings, null, 2)}\n\`\`\`` : ''}

## Guidelines

- Generate realistic, specific content — not lorem ipsum. Invent plausible details for the business type.
- Use Unsplash URLs for images: \`https://images.unsplash.com/photo-ID?w=800&h=600&fit=crop\`
- Match the tone and style to the business type.
- Each section's data must conform exactly to its schema above.
- Return sections in the order they should appear on the page (top to bottom).
- For contact-info hours, use { "label": "Day range", "value": "Time range" } format.
- For cta-banner, use "text" (not "heading") for the main message, and "linkText"/"linkPage" for the link.
`
}

/** Build the prompt for theme generation */
export function buildThemePrompt(brief: CreativeBrief): string {
  return `Create a design theme for this website. Return a single \`\`\`theme block.

Choose colors, fonts, and sizing that match the vibe of: "${brief.description}"

For a ${brief.siteType} called "${brief.siteName}", consider what feeling the visitor should have. Pick a cohesive palette — usually 4 colors (primary, secondary, base/background, contrast/text). Choose complementary Google Fonts for headings and body.

Use reasonable font sizes: hero ~3-4rem, xlarge ~2-2.5rem, large ~1.25-1.5rem, medium ~1-1.125rem, small ~0.875rem.`
}

/** Build the prompt for template parts generation */
export function buildTemplatePartsPrompt(brief: CreativeBrief, pages: PageConfig[]): string {
  return `Create the header and footer for this website. Return a \`\`\`templatePart:header block and a \`\`\`templatePart:footer block.

The site has these pages: ${pages.map(p => p.title).join(', ')}.
The navigation should link to all pages. Use page slugs: ${pages.map(p => `"${p.slug}" (${p.title})`).join(', ')}.
${brief.additionalContext?.address ? `Business address: ${brief.additionalContext.address}` : 'Invent a plausible address for the business.'}
${brief.additionalContext?.phone ? `Phone: ${brief.additionalContext.phone}` : 'Invent a plausible phone number.'}
${brief.additionalContext?.email ? `Email: ${brief.additionalContext.email}` : 'Invent a plausible email address.'}`
}

/** Build the prompt for page section generation */
export function buildPagePrompt(page: PageConfig, brief: CreativeBrief): string {
  const contextLines: string[] = []
  if (brief.additionalContext) {
    for (const [k, v] of Object.entries(brief.additionalContext)) {
      contextLines.push(`- ${k}: ${v}`)
    }
  }

  return `Generate all sections for the "${page.title}" page of "${brief.siteName}". Return one \`\`\`section:TYPE block for each section, in top-to-bottom order.

Suggested sections for this page: ${page.suggestedSections.join(', ')}
You may adjust — add, remove, or reorder sections if it makes sense for the content. But stay close to the suggestion.

Page purpose: ${page.description}
${contextLines.length ? `\nKnown business details:\n${contextLines.join('\n')}` : ''}

Remember:
- Each section's JSON must exactly match its schema.
- For contact-info: hours must use { "label": "...", "value": "..." } format.
- For cta-banner: use "text" field for the message, "linkText" and "linkPage" for the link.
- For hero-split: no "cta" field exists. Use "hours" for business hours display.`
}

/**
 * Get page configs for a site type.
 * Falls back to a generic single-page config if the type isn't in presets.
 */
export function getPagesForSiteType(siteType: string): PageConfig[] {
  if (PAGE_PRESETS[siteType]) {
    return PAGE_PRESETS[siteType]
  }
  // Generic fallback
  return [
    {
      slug: '/',
      title: 'Home',
      description: 'Main landing page',
      suggestedSections: ['hero-split', 'content-cards', 'cta-banner', 'contact-info'],
    },
  ]
}
