import { check, plus } from '@wordpress/icons'
import type { Conversation, ContentBlock, Message } from './types'

interface SeedMessage extends Omit<Message, 'content'> {
  content: string | ContentBlock[]
}

const asTextBlock = (text: string): ContentBlock[] => [{ type: 'text', text }]

const normalizeMessage = (message: SeedMessage): Message => ({
  ...message,
  content: typeof message.content === 'string' ? asTextBlock(message.content) : message.content,
})

export const seedConversations: Conversation[] = [
  // Global (home screen)
  { id: 'global-1', projectId: null, agentId: 'assistant', title: 'Getting started', createdAt: '2026-02-10T08:00:00Z' },

  // Shaun's Blog
  { id: 'blog-assistant-1', projectId: 'shauns-blog', agentId: 'assistant', title: 'Hero section redesign', createdAt: '2026-02-12T10:00:00Z' },
  { id: 'blog-assistant-design-refresh', projectId: 'shauns-blog', agentId: 'assistant', title: 'Design refresh', createdAt: '2026-02-13T09:00:00Z' },
  { id: 'blog-code-1', projectId: 'shauns-blog', agentId: 'code', title: 'Custom block development', createdAt: '2026-02-11T14:00:00Z' },

  // Downstreet Cafe
  { id: 'cafe-assistant-1', projectId: 'downstreet-cafe', agentId: 'assistant', title: 'Menu page setup', createdAt: '2026-02-09T11:00:00Z' },
  { id: 'cafe-assistant-plugins', projectId: 'downstreet-cafe', agentId: 'assistant', title: 'Plugin discovery', createdAt: '2026-02-13T08:00:00Z' },
  { id: 'cafe-design-1', projectId: 'downstreet-cafe', agentId: 'design', title: 'Color palette refresh', createdAt: '2026-02-10T15:00:00Z' },

  // UI Portfolio
  { id: 'portfolio-assistant-1', projectId: 'ui-portfolio', agentId: 'assistant', title: 'Initial setup', createdAt: '2026-01-20T09:30:00Z' },

  // Flavor Records
  { id: 'records-design-1', projectId: 'flavor-records', agentId: 'design', title: 'Album grid layout', createdAt: '2026-02-05T13:00:00Z' },

  // Phase 2: Theme Browsing (Shaun's Blog)
  { id: 'blog-assistant-themes', projectId: 'shauns-blog', agentId: 'assistant', title: 'Theme browsing', createdAt: '2026-02-13T11:00:00Z' },

  // Phase 2: Content Creation (Downstreet Cafe)
  { id: 'cafe-assistant-content', projectId: 'downstreet-cafe', agentId: 'assistant', title: 'Content creation', createdAt: '2026-02-13T12:00:00Z' },
]

const seedMessagesRaw: SeedMessage[] = [
  // Global conversation
  { id: 'g1-1', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: "Welcome to WordPress Studio! I can help you create a new project, or you can select an existing one from the sidebar. What would you like to do?", timestamp: '2026-02-10T08:00:00Z' },
  { id: 'g1-2', conversationId: 'global-1', role: 'user', content: 'I want to create a new site for a record label.', timestamp: '2026-02-10T08:01:00Z', messageContext: { source: 'typed' } },
  { id: 'g1-3', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: 'Great idea! I\'ll set up a new WordPress project called "Flavor Records." I\'ll pick a starter theme that works well for music and media sites. Give me just a moment…', timestamp: '2026-02-10T08:01:30Z' },

  // Shaun's Blog — assistant
  { id: 'ba1-1', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Hello! I'm your site assistant. I can help you build, customize, and manage your WordPress site. What would you like to work on?", timestamp: '2026-02-12T10:00:00Z' },
  { id: 'ba1-2', conversationId: 'blog-assistant-1', role: 'user', content: 'I want to change the hero section on my homepage to have a gradient background and bigger text.', timestamp: '2026-02-12T10:01:00Z', messageContext: { source: 'typed' } },
  { id: 'ba1-3', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "I'll update your hero section with a gradient background and increase the heading size. Let me make those changes to your theme now.", timestamp: '2026-02-12T10:01:30Z' },
  { id: 'ba1-4', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Done! I've applied a subtle blue-to-purple gradient to the hero background and bumped the heading from 48px to 64px. The subheading is now 20px. Take a look at the preview — does that feel right?", timestamp: '2026-02-12T10:02:00Z' },
  { id: 'ba1-5', conversationId: 'blog-assistant-1', role: 'user', content: "Love the gradient! But can you make the text white so it's easier to read?", timestamp: '2026-02-12T10:03:00Z', messageContext: { source: 'typed' } },
  { id: 'ba1-6', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Of course — I've set all hero text to white with a subtle text shadow for extra contrast. The preview should update in a moment.", timestamp: '2026-02-12T10:03:30Z' },

  // Shaun's Blog — scripted design refresh
  {
    id: 'bdr-1',
    conversationId: 'blog-assistant-design-refresh',
    role: 'agent',
    agentId: 'assistant',
    content: [
      { type: 'text', text: 'Want to run a color refresh? I can propose a warmer palette and apply it.' },
      {
        type: 'actions',
        actions: [
          {
            id: 'palette.request.warm',
            label: 'Make palette warmer',
            variant: 'primary',
            icon: plus,
            action: {
              type: 'send-message',
              message: 'Make the palette warmer',
            },
          },
        ],
      },
    ],
    timestamp: '2026-02-13T09:00:00Z',
  },

  // Shaun's Blog — code
  { id: 'bc1-1', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: "I'm the code agent. I can help you write custom blocks, modify theme templates, or debug PHP/JS issues. What are we building?", timestamp: '2026-02-11T14:00:00Z' },
  { id: 'bc1-2', conversationId: 'blog-code-1', role: 'user', content: "I need a custom 'project showcase' block that displays a grid of portfolio items with images and descriptions.", timestamp: '2026-02-11T14:01:00Z', messageContext: { source: 'typed' } },
  { id: 'bc1-3', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: "I'll scaffold a custom block called `project-showcase`. It'll register with `block.json`, use `InnerBlocks` for each project card, and render as a responsive CSS Grid. Let me generate the files.", timestamp: '2026-02-11T14:01:30Z' },

  // Downstreet Cafe — assistant
  { id: 'ca1-1', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: "Hi there! Let's get your cafe site looking great. What would you like to work on first?", timestamp: '2026-02-09T11:00:00Z' },
  { id: 'ca1-2', conversationId: 'cafe-assistant-1', role: 'user', content: 'I need a menu page with sections for coffee, pastries, and lunch items.', timestamp: '2026-02-09T11:01:00Z', messageContext: { source: 'typed' } },
  { id: 'ca1-3', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: 'I\'ll create a new "Menu" page with three sections. Each section will have a heading, a description, and a list of items with names and prices. Want me to add some placeholder items to start?', timestamp: '2026-02-09T11:01:30Z' },
  { id: 'ca1-4', conversationId: 'cafe-assistant-1', role: 'user', content: 'Yes please!', timestamp: '2026-02-09T11:02:00Z', messageContext: { source: 'typed' } },

  // Downstreet Cafe — scripted plugin discovery
  {
    id: 'cap-1',
    conversationId: 'cafe-assistant-plugins',
    role: 'agent',
    agentId: 'assistant',
    content: [
      { type: 'text', text: 'For Downstreet Cafe, these are strong starter plugins for forms and SEO:' },
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
          {
            id: 'plugin.install.wpforms',
            label: 'Install WPForms',
            variant: 'primary',
            icon: plus,
            action: {
              type: 'send-message',
              message: 'Install WPForms',
              payload: { slug: 'wpforms-lite' },
            },
          },
          {
            id: 'plugin.install.rankmath',
            label: 'Install Rank Math',
            variant: 'secondary',
            icon: plus,
            action: {
              type: 'send-message',
              message: 'Install Rank Math',
              payload: { slug: 'seo-by-rank-math' },
            },
          },
        ],
      },
    ],
    timestamp: '2026-02-13T08:00:00Z',
  },

  // Downstreet Cafe — design
  { id: 'cd1-1', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: "I'm the design agent — I focus on visual styling, layout, and typography. What are we refining?", timestamp: '2026-02-10T15:00:00Z' },
  { id: 'cd1-2', conversationId: 'cafe-design-1', role: 'user', content: 'The color palette feels too corporate. I want something warmer — earthy tones, maybe terracotta and cream.', timestamp: '2026-02-10T15:01:00Z', messageContext: { source: 'typed' } },
  { id: 'cd1-3', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: "Great instinct. I'll swap the palette to: Terracotta (#C2703E) for accents, Cream (#FFF8F0) for backgrounds, Espresso (#3B2314) for text, and Sage (#A8B5A0) as a secondary. Updating your theme.json now.", timestamp: '2026-02-10T15:01:30Z' },

  // UI Portfolio — assistant
  { id: 'pa1-1', conversationId: 'portfolio-assistant-1', role: 'agent', agentId: 'assistant', content: "Your portfolio project is set up. I've applied a minimal starter theme — perfect for showcasing design work. What's your first priority?", timestamp: '2026-01-20T09:30:00Z' },
  { id: 'pa1-2', conversationId: 'portfolio-assistant-1', role: 'user', content: 'I want a clean homepage with a brief intro and then a grid of case studies below.', timestamp: '2026-01-20T09:31:00Z', messageContext: { source: 'typed' } },

  // Shaun's Blog — scripted theme browsing
  {
    id: 'bt-1',
    conversationId: 'blog-assistant-themes',
    role: 'agent',
    agentId: 'assistant',
    content: [
      { type: 'text', text: "Here are some theme options that would work well for your blog. Take a look and let me know which one you'd like to try." },
      {
        type: 'card',
        card: 'themePicker',
        data: {
          themes: [
            { name: 'Twenty Twenty-Five', slug: 'twentytwentyfive', description: 'The latest default theme with flexible block patterns and clean typography.' },
            { name: 'Flavor', slug: 'flavor', description: 'A warm editorial theme with rich color options and magazine-style layouts.' },
            { name: 'Suspended', slug: 'suspended', description: 'A bold, modern theme with dramatic spacing and striking visual hierarchy.' },
            { name: 'Suspended Dark', slug: 'suspended-dark', description: 'Dark variant of Suspended with inverted colors for a sleek nighttime feel.' },
          ],
        },
      },
      {
        type: 'actions',
        actions: [
          { id: 'theme.apply.flavor', label: 'Apply Flavor', variant: 'primary', icon: check, action: { type: 'send-message', message: 'Apply the Flavor theme' } },
          { id: 'theme.apply.twentytwentyfive', label: 'Apply Twenty Twenty-Five', variant: 'secondary', icon: check, action: { type: 'send-message', message: 'Apply Twenty Twenty-Five' } },
          { id: 'theme.apply.suspended', label: 'Apply Suspended', variant: 'secondary', icon: check, action: { type: 'send-message', message: 'Apply Suspended' } },
        ],
      },
    ],
    timestamp: '2026-02-13T11:00:00Z',
  },

  // Downstreet Cafe — scripted content creation
  {
    id: 'cc-1',
    conversationId: 'cafe-assistant-content',
    role: 'agent',
    agentId: 'assistant',
    content: [
      { type: 'text', text: "Hi! I can help you create pages and posts for the cafe site. What would you like to add?" },
    ],
    timestamp: '2026-02-13T12:00:00Z',
  },
  {
    id: 'cc-2',
    conversationId: 'cafe-assistant-content',
    role: 'user',
    content: 'I need an About page for the cafe.',
    timestamp: '2026-02-13T12:01:00Z',
    messageContext: { source: 'typed' },
  },

  // Flavor Records — design
  { id: 'rd1-1', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: "Let's make this record label site look as good as the music sounds. What vibe are we going for?", timestamp: '2026-02-05T13:00:00Z' },
  { id: 'rd1-2', conversationId: 'records-design-1', role: 'user', content: 'Think vinyl-era nostalgia meets modern minimal. Dark backgrounds, bold type, album art as the hero element.', timestamp: '2026-02-05T13:01:00Z', messageContext: { source: 'typed' } },
  { id: 'rd1-3', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: 'Love it. I\'ll set up a dark theme with off-black (#1A1A1A), warm white (#F5F0EB) text, and a large album grid as the centerpiece of the homepage. Typography will be a heavy sans-serif for headings. Let me draft the layout.', timestamp: '2026-02-05T13:01:30Z' },
]

export const seedMessages: Message[] = seedMessagesRaw.map(normalizeMessage)
