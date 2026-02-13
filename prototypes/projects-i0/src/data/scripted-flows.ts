import { check, pencil, plus } from '@wordpress/icons'
import type { ActionButton, ContentBlock, MessageContext } from './types'

export interface ScriptMessageDraft {
  role: 'agent'
  content: ContentBlock[]
}

export interface ScriptTransition {
  from: string
  to: string
  when: {
    actionId?: string
    textIncludes?: string[]
  }
  responses: ScriptMessageDraft[]
}

export interface ScriptFlow {
  conversationId: string
  initialState: string
  transitions: ScriptTransition[]
}

export const SCRIPTED_REPLY_DELAY_MS = 520

function textBlock(text: string): ContentBlock {
  return { type: 'text', text }
}

function action(
  id: string,
  label: string,
  message: string,
  variant: ActionButton['variant'] = 'secondary',
  payload?: Record<string, string>,
  icon?: ActionButton['icon'],
): ActionButton {
  return {
    id,
    label,
    variant,
    icon,
    action: {
      type: 'send-message',
      message,
      payload,
    },
  }
}

export const scriptedFlows: ScriptFlow[] = [
  {
    conversationId: 'cafe-assistant-plugins',
    initialState: 'start',
    transitions: [
      {
        from: 'start',
        to: 'wpforms-installed',
        when: { actionId: 'plugin.install.wpforms' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Installing **WPForms** now.'),
              {
                type: 'card',
                card: 'progress',
                state: 'complete',
                data: {
                  label: 'Plugin installation',
                  steps: [
                    { name: 'Download package', status: 'done' },
                    { name: 'Install plugin', status: 'done' },
                    { name: 'Activate plugin', status: 'done' },
                  ],
                },
              },
            ],
          },
          {
            role: 'agent',
            content: [
              textBlock('WPForms is active. Want me to add SEO next?'),
              {
                type: 'card',
                card: 'plugin',
                state: 'complete',
                data: {
                  name: 'WPForms',
                  slug: 'wpforms-lite',
                  description: 'Beginner-friendly drag-and-drop forms.',
                  rating: 4.8,
                  activeInstalls: '6M+',
                  status: 'active',
                },
              },
              {
                type: 'actions',
                actions: [
                  action('plugin.install.rankmath', 'Install Rank Math', 'Install Rank Math', 'primary', { slug: 'seo-by-rank-math' }, plus),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'rankmath-installed',
        when: { actionId: 'plugin.install.rankmath' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Installing **Rank Math SEO** now.'),
              {
                type: 'card',
                card: 'progress',
                state: 'complete',
                data: {
                  label: 'Plugin installation',
                  steps: [
                    { name: 'Download package', status: 'done' },
                    { name: 'Install plugin', status: 'done' },
                    { name: 'Activate plugin', status: 'done' },
                  ],
                },
              },
            ],
          },
          {
            role: 'agent',
            content: [
              textBlock('Rank Math is active. Want me to add a contact form plugin too?'),
              {
                type: 'card',
                card: 'plugin',
                state: 'complete',
                data: {
                  name: 'Rank Math SEO',
                  slug: 'seo-by-rank-math',
                  description: 'SEO setup, schema, and optimization guidance.',
                  rating: 4.9,
                  activeInstalls: '3M+',
                  status: 'active',
                },
              },
              {
                type: 'actions',
                actions: [
                  action('plugin.install.wpforms', 'Install WPForms', 'Install WPForms', 'primary', { slug: 'wpforms-lite' }, plus),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'start',
        when: { textIncludes: ['contact form', 'seo', 'plugin'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('For this project, I recommend these starters:'),
              {
                type: 'card',
                card: 'plugin',
                compact: true,
                data: {
                  name: 'WPForms',
                  slug: 'wpforms-lite',
                  description: 'Contact forms and basic workflows.',
                  rating: 4.8,
                  activeInstalls: '6M+',
                  status: 'available',
                },
              },
              {
                type: 'card',
                card: 'plugin',
                compact: true,
                data: {
                  name: 'Rank Math SEO',
                  slug: 'seo-by-rank-math',
                  description: 'On-page SEO and schema support.',
                  rating: 4.9,
                  activeInstalls: '3M+',
                  status: 'available',
                },
              },
              {
                type: 'actions',
                actions: [
                  action('plugin.install.wpforms', 'Install WPForms', 'Install WPForms', 'primary', { slug: 'wpforms-lite' }, plus),
                  action('plugin.install.rankmath', 'Install Rank Math', 'Install Rank Math', 'secondary', { slug: 'seo-by-rank-math' }, plus),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'wpforms-installed',
        to: 'done',
        when: { actionId: 'plugin.install.rankmath' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Done. **Rank Math SEO** is installed and active too.'),
              {
                type: 'card',
                card: 'plugin',
                state: 'complete',
                data: {
                  name: 'Rank Math SEO',
                  slug: 'seo-by-rank-math',
                  description: 'SEO setup, schema, and optimization guidance.',
                  rating: 4.9,
                  activeInstalls: '3M+',
                  status: 'active',
                },
              },
            ],
          },
        ],
      },
      {
        from: 'rankmath-installed',
        to: 'done',
        when: { actionId: 'plugin.install.wpforms' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Done. **WPForms** is installed and active too.'),
              {
                type: 'card',
                card: 'plugin',
                state: 'complete',
                data: {
                  name: 'WPForms',
                  slug: 'wpforms-lite',
                  description: 'Beginner-friendly drag-and-drop forms.',
                  rating: 4.8,
                  activeInstalls: '6M+',
                  status: 'active',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    conversationId: 'blog-assistant-design-refresh',
    initialState: 'start',
    transitions: [
      {
        from: 'start',
        to: 'palette-proposed',
        when: { actionId: 'palette.request.warm' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Here is a warmer palette direction for the blog:'),
              {
                type: 'card',
                card: 'colorPalette',
                data: {
                  label: 'Warm editorial palette',
                  colors: [
                    { name: 'Clay', hex: '#C9774A', usage: 'Primary accent' },
                    { name: 'Cream', hex: '#FFF5E9', usage: 'Background' },
                    { name: 'Walnut', hex: '#4B2E23', usage: 'Headings' },
                    { name: 'Olive', hex: '#7A8D67', usage: 'Secondary accent' },
                  ],
                },
              },
              {
                type: 'actions',
                actions: [
                  action('palette.apply.warm', 'Apply palette', 'Apply this palette', 'primary', undefined, check),
                  action('palette.tweak.blue', 'Make it bluer', 'Make it more blue', 'secondary', undefined, pencil),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'palette-proposed',
        when: { textIncludes: ['warm', 'warmer', 'palette', 'color'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('I can do that. Want this warmer palette direction?'),
              {
                type: 'card',
                card: 'colorPalette',
                data: {
                  label: 'Warm editorial palette',
                  colors: [
                    { name: 'Clay', hex: '#C9774A', usage: 'Primary accent' },
                    { name: 'Cream', hex: '#FFF5E9', usage: 'Background' },
                    { name: 'Walnut', hex: '#4B2E23', usage: 'Headings' },
                    { name: 'Olive', hex: '#7A8D67', usage: 'Secondary accent' },
                  ],
                },
              },
              {
                type: 'actions',
                actions: [
                  action('palette.apply.warm', 'Apply palette', 'Apply this palette', 'primary', undefined, check),
                  action('palette.tweak.blue', 'Make it bluer', 'Make it more blue', 'secondary', undefined, pencil),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'palette-proposed',
        to: 'palette-revised',
        when: { actionId: 'palette.tweak.blue' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Updated. I shifted the palette cooler while keeping warmth in the neutrals.'),
              {
                type: 'card',
                card: 'colorPalette',
                data: {
                  label: 'Balanced warm-cool palette',
                  colors: [
                    { name: 'Marine', hex: '#4D6FA3', usage: 'Primary accent' },
                    { name: 'Cloud', hex: '#F2F6FB', usage: 'Background' },
                    { name: 'Slate', hex: '#2F3A4A', usage: 'Headings' },
                    { name: 'Sand', hex: '#C8B59B', usage: 'Secondary accent' },
                  ],
                },
              },
              {
                type: 'actions',
                actions: [
                  action('palette.apply.blue', 'Apply revised palette', 'Apply revised palette', 'primary', undefined, check),
                ],
              },
            ],
          },
        ],
      },
      {
        from: 'palette-proposed',
        to: 'done',
        when: { actionId: 'palette.apply.warm' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Applied. Here are the settings I changed:'),
              {
                type: 'card',
                card: 'settings',
                state: 'complete',
                data: {
                  label: 'Theme settings updated',
                  settings: [
                    { key: 'color.primary', current: '#3858E9', proposed: '#C9774A' },
                    { key: 'color.background', current: '#FFFFFF', proposed: '#FFF5E9' },
                    { key: 'color.headings', current: '#1D2327', proposed: '#4B2E23' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'palette-revised',
        to: 'done',
        when: { actionId: 'palette.apply.blue' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Applied. Here are the settings I changed:'),
              {
                type: 'card',
                card: 'settings',
                state: 'complete',
                data: {
                  label: 'Theme settings updated',
                  settings: [
                    { key: 'color.primary', current: '#3858E9', proposed: '#4D6FA3' },
                    { key: 'color.background', current: '#FFFFFF', proposed: '#F2F6FB' },
                    { key: 'color.headings', current: '#1D2327', proposed: '#2F3A4A' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'palette-proposed',
        to: 'palette-revised',
        when: { textIncludes: ['blue', 'bluer'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Makes sense. I generated a cooler revision with stronger blues.'),
              {
                type: 'card',
                card: 'colorPalette',
                data: {
                  label: 'Balanced warm-cool palette',
                  colors: [
                    { name: 'Marine', hex: '#4D6FA3', usage: 'Primary accent' },
                    { name: 'Cloud', hex: '#F2F6FB', usage: 'Background' },
                    { name: 'Slate', hex: '#2F3A4A', usage: 'Headings' },
                    { name: 'Sand', hex: '#C8B59B', usage: 'Secondary accent' },
                  ],
                },
              },
              {
                type: 'actions',
                actions: [
                  action('palette.apply.blue', 'Apply revised palette', 'Apply revised palette', 'primary', undefined, check),
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // Phase 2: Theme Browsing
  {
    conversationId: 'blog-assistant-themes',
    initialState: 'start',
    transitions: [
      {
        from: 'start',
        to: 'theme-applied',
        when: { actionId: 'theme.apply.flavor' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Switching to **Flavor**. Give me just a moment…'),
              {
                type: 'card',
                card: 'progress',
                state: 'complete',
                data: {
                  label: 'Theme activation',
                  steps: [
                    { name: 'Download theme', status: 'done' },
                    { name: 'Install theme', status: 'done' },
                    { name: 'Activate theme', status: 'done' },
                    { name: 'Apply default settings', status: 'done' },
                  ],
                },
              },
            ],
          },
          {
            role: 'agent',
            content: [
              textBlock('Flavor is now active. Here\'s what changed:'),
              {
                type: 'card',
                card: 'settings',
                state: 'complete',
                data: {
                  label: 'Theme settings updated',
                  settings: [
                    { key: 'theme', current: 'Twenty Twenty-Five', proposed: 'Flavor' },
                    { key: 'color.primary', current: '#3858E9', proposed: '#C9774A' },
                    { key: 'layout.content_width', current: '650px', proposed: '720px' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'theme-applied',
        when: { actionId: 'theme.apply.twentytwentyfive' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Activating **Twenty Twenty-Five** now…'),
              {
                type: 'card',
                card: 'progress',
                state: 'complete',
                data: {
                  label: 'Theme activation',
                  steps: [
                    { name: 'Verify theme files', status: 'done' },
                    { name: 'Activate theme', status: 'done' },
                    { name: 'Apply default settings', status: 'done' },
                  ],
                },
              },
            ],
          },
          {
            role: 'agent',
            content: [
              textBlock('Twenty Twenty-Five is active. Here are the updated settings:'),
              {
                type: 'card',
                card: 'settings',
                state: 'complete',
                data: {
                  label: 'Theme settings updated',
                  settings: [
                    { key: 'theme', current: 'Flavor', proposed: 'Twenty Twenty-Five' },
                    { key: 'color.primary', current: '#C9774A', proposed: '#3858E9' },
                    { key: 'layout.content_width', current: '720px', proposed: '650px' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'theme-applied',
        when: { actionId: 'theme.apply.suspended' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Installing and activating **Suspended**…'),
              {
                type: 'card',
                card: 'progress',
                state: 'complete',
                data: {
                  label: 'Theme activation',
                  steps: [
                    { name: 'Download theme', status: 'done' },
                    { name: 'Install theme', status: 'done' },
                    { name: 'Activate theme', status: 'done' },
                  ],
                },
              },
            ],
          },
          {
            role: 'agent',
            content: [
              textBlock('Suspended is live. Here\'s what I updated:'),
              {
                type: 'card',
                card: 'settings',
                state: 'complete',
                data: {
                  label: 'Theme settings updated',
                  settings: [
                    { key: 'theme', current: 'Twenty Twenty-Five', proposed: 'Suspended' },
                    { key: 'color.primary', current: '#3858E9', proposed: '#1A1A2E' },
                    { key: 'typography.heading', current: 'System Sans', proposed: 'Space Grotesk' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'start',
        to: 'start',
        when: { textIncludes: ['theme', 'change', 'switch', 'browse'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Sure! You can pick any of the themes above, or tell me what style you\'re looking for and I can narrow it down.'),
            ],
          },
        ],
      },
    ],
  },

  // Phase 2: Content Creation
  {
    conversationId: 'cafe-assistant-content',
    initialState: 'start',
    transitions: [
      {
        from: 'start',
        to: 'about-page-created',
        when: { textIncludes: ['about', 'about page'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('I\'ve created an About page for Downstreet Cafe. Here are the details:'),
              {
                type: 'card',
                card: 'page',
                data: {
                  title: 'About Us',
                  slug: 'about',
                  template: 'Full Width',
                  status: 'draft',
                  excerpt: 'Learn about Downstreet Cafe — our story, our team, and our passion for great coffee and community.',
                  actions: [
                    action('page.edit.about', 'Edit', 'Edit the About page', 'secondary', undefined, pencil),
                  ],
                },
              },
              textBlock('The page is in draft mode. You can edit it or let me know when you\'re ready to publish. Need anything else — maybe a blog post?'),
            ],
          },
        ],
      },
      {
        from: 'about-page-created',
        to: 'post-drafted',
        when: { textIncludes: ['blog', 'post', 'grand opening', 'write'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Here\'s a draft post for the grand opening. I\'ve added some suggested categories and tags:'),
              {
                type: 'card',
                card: 'postDraft',
                data: {
                  title: 'Welcome to Downstreet Cafe — We\'re Open!',
                  excerpt: 'After months of preparation, Downstreet Cafe is officially open for business. Stop by for handcrafted espresso drinks, fresh pastries, and a warm community space right in the heart of downtown.',
                  categories: ['Announcements', 'News'],
                  tags: ['grand opening', 'coffee', 'downtown'],
                  status: 'draft',
                  actions: [
                    action('post.edit.opening', 'Edit', 'Edit this post', 'secondary', undefined, pencil),
                    action('post.publish.opening', 'Publish', 'Publish this post', 'primary', undefined, check),
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        from: 'post-drafted',
        to: 'done',
        when: { actionId: 'post.publish.opening' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Published! Your grand opening post is now live.'),
              {
                type: 'card',
                card: 'postDraft',
                state: 'complete',
                data: {
                  title: 'Welcome to Downstreet Cafe — We\'re Open!',
                  excerpt: 'After months of preparation, Downstreet Cafe is officially open for business. Stop by for handcrafted espresso drinks, fresh pastries, and a warm community space right in the heart of downtown.',
                  categories: ['Announcements', 'News'],
                  tags: ['grand opening', 'coffee', 'downtown'],
                  status: 'published',
                },
              },
            ],
          },
        ],
      },
      {
        from: 'post-drafted',
        to: 'post-drafted',
        when: { actionId: 'post.edit.opening' },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Opening the editor for the grand opening post. What would you like to change?'),
            ],
          },
        ],
      },
      {
        from: 'post-drafted',
        to: 'done',
        when: { textIncludes: ['publish', 'go live', 'make it live'] },
        responses: [
          {
            role: 'agent',
            content: [
              textBlock('Done — your grand opening post is now published and live on the site.'),
              {
                type: 'card',
                card: 'postDraft',
                state: 'complete',
                data: {
                  title: 'Welcome to Downstreet Cafe — We\'re Open!',
                  excerpt: 'After months of preparation, Downstreet Cafe is officially open for business. Stop by for handcrafted espresso drinks, fresh pastries, and a warm community space right in the heart of downtown.',
                  categories: ['Announcements', 'News'],
                  tags: ['grand opening', 'coffee', 'downtown'],
                  status: 'published',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

const flowByConversation = new Map(scriptedFlows.map(flow => [flow.conversationId, flow]))

function normalizeText(text: string): string {
  return text.trim().toLowerCase()
}

function matchesText(text: string, includes: string[]): boolean {
  const normalized = normalizeText(text)
  return includes.some(candidate => normalized.includes(candidate))
}

export function resolveScriptTransition(
  conversationId: string,
  state: string,
  userText: string,
  messageContext?: MessageContext,
): ScriptTransition | null {
  const flow = flowByConversation.get(conversationId)
  if (!flow) return null

  const candidates = flow.transitions.filter(transition => transition.from === state)

  if (messageContext?.source === 'action' && messageContext.actionId) {
    return candidates.find(transition => transition.when.actionId === messageContext.actionId) ?? null
  }

  return candidates.find(transition => {
    if (!transition.when.textIncludes || transition.when.textIncludes.length === 0) return false
    return matchesText(userText, transition.when.textIncludes)
  }) ?? null
}

export function getInitialScriptState(conversationId: string): string | null {
  return flowByConversation.get(conversationId)?.initialState ?? null
}

export function buildFallbackAgentMessage(conversationId: string): ScriptMessageDraft | null {
  const flow = flowByConversation.get(conversationId)
  if (!flow) return null

  if (conversationId === 'cafe-assistant-plugins') {
    return {
      role: 'agent',
      content: [
        textBlock("I can help with plugins — would you like me to recommend some options? You can also pick one of the suggestions above to get started."),
      ],
    }
  }

  if (conversationId === 'blog-assistant-design-refresh') {
    return {
      role: 'agent',
      content: [
        textBlock("I can work with that. Want me to propose a warmer palette, or do you have specific colors in mind?"),
      ],
    }
  }

  if (conversationId === 'blog-assistant-themes') {
    return {
      role: 'agent',
      content: [
        textBlock("I can help you find the right theme. Pick one of the options above, or describe the style you're after and I'll suggest something."),
      ],
    }
  }

  if (conversationId === 'cafe-assistant-content') {
    return {
      role: 'agent',
      content: [
        textBlock("I can help with pages and posts — would you like to create an About page, write a blog post, or something else?"),
      ],
    }
  }

  return {
    role: 'agent',
    content: [textBlock("I'm not sure how to help with that yet, but I'm learning. Could you try rephrasing?")],
  }
}
