/**
 * Chat Greeting Composable
 *
 * Generates a personality-driven greeting sequence and site-aware suggestions
 * when a user creates a new chat in an existing project.
 */

import type { Site } from './site-types'
import type { ActionButton } from './types'

/**
 * Greeting sequences — each is an array of messages that stream in order.
 * The site name is interpolated into the first message.
 * Last message leads into the suggestion buttons.
 */
const GREETING_SEQUENCES: ((name: string) => string[])[] = [
  (name) => [
    `Hey — back on ${name}.`,
    `I've got the whole site loaded up, so I know what we're working with. Color palette, pages, sections, all of it.`,
    `What do you want to tackle?`,
  ],
  (name) => [
    `${name}, round two. Or three. I've lost count.`,
    `I can see everything that's on the site right now — the layout, the theme, all the pages. So just tell me what to change.`,
    `What are we doing?`,
  ],
  (name) => [
    `Welcome back to ${name}.`,
    `Quick reminder: I can tweak the design, add pages, change colors and fonts, restructure sections — pretty much anything you need.`,
    `What's on the list?`,
  ],
  (name) => [
    `Another chat for ${name} — let's go.`,
    `I've got your full site context, so no need to explain what's already there. Just tell me what you want different.`,
    `What are we changing?`,
  ],
  (name) => [
    `Back for more on ${name}? Good, I was getting bored.`,
    `I can see the whole site — every page, every section, every color. Point me at whatever needs work.`,
    `Where do we start?`,
  ],
]

/** Common page slugs users might want to add */
const MISSING_PAGE_SUGGESTIONS: { slug: string; label: string }[] = [
  { slug: 'contact', label: 'Add a contact page' },
  { slug: 'blog', label: 'Start a blog' },
  { slug: 'gallery', label: 'Add a photo gallery' },
  { slug: 'faq', label: 'Create an FAQ page' },
  { slug: 'pricing', label: 'Add a pricing page' },
  { slug: 'testimonials', label: 'Add a testimonials page' },
  { slug: 'events', label: 'Add an events page' },
  { slug: 'shop', label: 'Set up a shop' },
]

/** Suggestions that reference existing site sections */
function getSectionSuggestions(site: Site): string[] {
  const suggestions: string[] = []
  const roles = new Set<string>()
  for (const section of Object.values(site.sections)) {
    if (section.role) roles.add(section.role)
  }
  if (roles.has('hero')) suggestions.push('Update the hero section')
  if (roles.has('footer')) suggestions.push('Redesign the footer')
  if (roles.has('header')) suggestions.push('Refresh the navigation')
  return suggestions
}

/** Always-available theme suggestions */
const THEME_SUGGESTIONS = [
  'Refresh the color palette',
  'Try different fonts',
]

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export interface ChatGreeting {
  messages: string[]
  actions: ActionButton[]
}

export function useChatGreeting() {
  function generateGreeting(site: Site): ChatGreeting {
    const messages = pickOne(GREETING_SEQUENCES)(site.name)

    // Build suggestion pool
    const existingSlugs = new Set(site.pages.map(p => p.slug))
    const missingPages = MISSING_PAGE_SUGGESTIONS
      .filter(s => !existingSlugs.has(s.slug))
      .map(s => s.label)

    const sectionSuggestions = getSectionSuggestions(site)

    // Prioritize: missing pages > section tweaks > theme changes
    const pool = [
      ...pick(missingPages, 2),
      ...pick(sectionSuggestions, 1),
      ...pick(THEME_SUGGESTIONS, 1),
    ]

    // Take 3-4 unique suggestions
    const selected = pool.slice(0, 4)

    // If we somehow got fewer than 3, pad with theme suggestions
    while (selected.length < 3) {
      const fallback = THEME_SUGGESTIONS.find(s => !selected.includes(s))
      if (fallback) selected.push(fallback)
      else break
    }

    const actions: ActionButton[] = selected.map((label, i) => ({
      id: `greeting-${i}`,
      label,
      action: {
        type: 'send-message' as const,
        message: label,
      },
    }))

    return { messages, actions }
  }

  return { generateGreeting }
}
