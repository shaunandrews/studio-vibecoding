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
        textBlock("I can help with that. Try one of the action buttons so I can continue this demo flow."),
      ],
    }
  }

  if (conversationId === 'blog-assistant-design-refresh') {
    return {
      role: 'agent',
      content: [
        textBlock("Try 'Make palette warmer' or ask for a bluer revision so I can continue this scripted flow."),
      ],
    }
  }

  return {
    role: 'agent',
    content: [textBlock('I do not have a scripted response for that yet.')],
  }
}
