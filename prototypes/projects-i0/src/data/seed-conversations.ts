import type { Conversation, Message } from './types'

export const seedConversations: Conversation[] = [
  // Global (home screen)
  { id: 'global-1', projectId: null, agentId: 'assistant', title: 'Getting started', createdAt: '2026-02-10T08:00:00Z' },

  // Shaun's Blog
  { id: 'blog-assistant-1', projectId: 'shauns-blog', agentId: 'assistant', title: 'Hero section redesign', createdAt: '2026-02-12T10:00:00Z' },
  { id: 'blog-code-1', projectId: 'shauns-blog', agentId: 'code', title: 'Custom block development', createdAt: '2026-02-11T14:00:00Z' },

  // Downstreet Cafe
  { id: 'cafe-assistant-1', projectId: 'downstreet-cafe', agentId: 'assistant', title: 'Menu page setup', createdAt: '2026-02-09T11:00:00Z' },
  { id: 'cafe-design-1', projectId: 'downstreet-cafe', agentId: 'design', title: 'Color palette refresh', createdAt: '2026-02-10T15:00:00Z' },

  // UI Portfolio
  { id: 'portfolio-assistant-1', projectId: 'ui-portfolio', agentId: 'assistant', title: 'Initial setup', createdAt: '2026-01-20T09:30:00Z' },

  // Flavor Records
  { id: 'records-design-1', projectId: 'flavor-records', agentId: 'design', title: 'Album grid layout', createdAt: '2026-02-05T13:00:00Z' },

  // Mise en Place
  { id: 'mise-assistant-1', projectId: 'mise-en-place', agentId: 'assistant', title: 'Recipe card layout', createdAt: '2026-02-08T11:30:00Z' },

  // Ledger
  { id: 'ledger-assistant-1', projectId: 'ledger', agentId: 'assistant', title: 'Invoice template', createdAt: '2026-02-10T09:30:00Z' },
  { id: 'ledger-code-1', projectId: 'ledger', agentId: 'code', title: 'Payment status API', createdAt: '2026-02-11T10:00:00Z' },
]

export const seedMessages: Message[] = [
  // Global conversation
  { id: 'g1-1', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Welcome to WordPress Studio! I can help you create a new project, or you can select an existing one from the sidebar. What would you like to do?" }], timestamp: '2026-02-10T08:00:00Z' },
  { id: 'g1-2', conversationId: 'global-1', role: 'user', content: [{ type: 'text', text: 'I want to create a new site for a record label.' }], timestamp: '2026-02-10T08:01:00Z', messageContext: { source: 'typed' } },
  { id: 'g1-3', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: 'Great idea! I\'ll set up a new WordPress project called "Flavor Records." I\'ll pick a starter theme that works well for music and media sites. Give me just a moment…' }], timestamp: '2026-02-10T08:01:30Z' },

  // Shaun's Blog — assistant
  { id: 'ba1-1', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Hello! I'm your site assistant. I can help you build, customize, and manage your WordPress site. What would you like to work on?" }], timestamp: '2026-02-12T10:00:00Z' },
  { id: 'ba1-2', conversationId: 'blog-assistant-1', role: 'user', content: [{ type: 'text', text: 'I want to change the hero section on my homepage to have a gradient background and bigger text.' }], timestamp: '2026-02-12T10:01:00Z', messageContext: { source: 'typed' } },
  { id: 'ba1-3', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "I'll update your hero section with a gradient background and increase the heading size. Let me make those changes to your theme now." }], timestamp: '2026-02-12T10:01:30Z' },
  { id: 'ba1-4', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Done! I've applied a subtle blue-to-purple gradient to the hero background and bumped the heading from 48px to 64px. The subheading is now 20px. Take a look at the preview — does that feel right?" }], timestamp: '2026-02-12T10:02:00Z' },
  { id: 'ba1-5', conversationId: 'blog-assistant-1', role: 'user', content: [{ type: 'text', text: "Love the gradient! But can you make the text white so it's easier to read?" }], timestamp: '2026-02-12T10:03:00Z', messageContext: { source: 'typed' } },
  { id: 'ba1-6', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Of course — I've set all hero text to white with a subtle text shadow for extra contrast. The preview should update in a moment." }], timestamp: '2026-02-12T10:03:30Z' },

  // Shaun's Blog — code
  { id: 'bc1-1', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: [{ type: 'text', text: "I'm the code agent. I can help you write custom blocks, modify theme templates, or debug PHP/JS issues. What are we building?" }], timestamp: '2026-02-11T14:00:00Z' },
  { id: 'bc1-2', conversationId: 'blog-code-1', role: 'user', content: [{ type: 'text', text: "I need a custom 'project showcase' block that displays a grid of portfolio items with images and descriptions." }], timestamp: '2026-02-11T14:01:00Z', messageContext: { source: 'typed' } },
  { id: 'bc1-3', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: [{ type: 'text', text: "I'll scaffold a custom block called `project-showcase`. It'll register with `block.json`, use `InnerBlocks` for each project card, and render as a responsive CSS Grid. Let me generate the files." }], timestamp: '2026-02-11T14:01:30Z' },
  { id: 'bc1-4', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: [
    { type: 'card', card: 'progress', data: { label: 'Scaffolding project-showcase block', steps: [
      { name: 'Created block.json with attributes', status: 'done' },
      { name: 'Generated edit.tsx with InnerBlocks', status: 'done' },
      { name: 'Generated save.tsx with grid layout', status: 'done' },
      { name: 'Added block styles (CSS Grid)', status: 'done' },
      { name: 'Registered block in plugin', status: 'done' },
    ] } },
    { type: 'text', text: "All set. The block is registered and ready to use in the editor. It supports 2, 3, or 4 column layouts — you can pick from the block toolbar. Each card inside uses `InnerBlocks` so you can add images, headings, and text freely." },
  ], timestamp: '2026-02-11T14:02:30Z' },

  // Downstreet Cafe — assistant
  { id: 'ca1-1', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Hi there! Let's get your cafe site looking great. What would you like to work on first?" }], timestamp: '2026-02-09T11:00:00Z' },
  { id: 'ca1-2', conversationId: 'cafe-assistant-1', role: 'user', content: [{ type: 'text', text: 'I need a menu page with sections for coffee, pastries, and lunch items.' }], timestamp: '2026-02-09T11:01:00Z', messageContext: { source: 'typed' } },
  { id: 'ca1-3', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: 'I\'ll create a new "Menu" page with three sections. Each section will have a heading, a description, and a list of items with names and prices. Want me to add some placeholder items to start?' }], timestamp: '2026-02-09T11:01:30Z' },
  { id: 'ca1-4', conversationId: 'cafe-assistant-1', role: 'user', content: [{ type: 'text', text: 'Yes please!' }], timestamp: '2026-02-09T11:02:00Z', messageContext: { source: 'typed' } },
  { id: 'ca1-5', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: [
    { type: 'text', text: "Done! I've created your Menu page with placeholder items in each section." },
    { type: 'card', card: 'page', data: { title: 'Menu', slug: '/menu', template: 'page', status: 'published', excerpt: 'Coffee, pastries, and lunch — organized in three sections with prices.' } },
    { type: 'text', text: 'You can click through to the preview to see how it looks. Want me to adjust the layout or add more sections?' },
  ], timestamp: '2026-02-09T11:02:30Z' },

  // Downstreet Cafe — design
  { id: 'cd1-1', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: [{ type: 'text', text: "I'm the design agent — I focus on visual styling, layout, and typography. What are we refining?" }], timestamp: '2026-02-10T15:00:00Z' },
  { id: 'cd1-2', conversationId: 'cafe-design-1', role: 'user', content: [{ type: 'text', text: 'The color palette feels too corporate. I want something warmer — earthy tones, maybe terracotta and cream.' }], timestamp: '2026-02-10T15:01:00Z', messageContext: { source: 'typed' } },
  { id: 'cd1-3', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: [{ type: 'text', text: "Great instinct. I'll swap the palette to: Terracotta (#C2703E) for accents, Cream (#FFF8F0) for backgrounds, Espresso (#3B2314) for text, and Sage (#A8B5A0) as a secondary. Updating your theme.json now." }], timestamp: '2026-02-10T15:01:30Z' },

  // UI Portfolio — assistant
  { id: 'pa1-1', conversationId: 'portfolio-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Your portfolio project is set up. I've applied a minimal starter theme — perfect for showcasing design work. What's your first priority?" }], timestamp: '2026-01-20T09:30:00Z' },
  { id: 'pa1-2', conversationId: 'portfolio-assistant-1', role: 'user', content: [{ type: 'text', text: 'I want a clean homepage with a brief intro and then a grid of case studies below.' }], timestamp: '2026-01-20T09:31:00Z', messageContext: { source: 'typed' } },
  { id: 'pa1-3', conversationId: 'portfolio-assistant-1', role: 'agent', agentId: 'assistant', content: [
    { type: 'text', text: "I've set up your homepage with a greeting section at the top and a \"Selected Work\" grid below it. I added four placeholder case study cards — you can swap in your real projects anytime." },
    { type: 'text', text: "Each card shows a thumbnail, project title, and a short description. Clicking one will open the full case study page. Want me to create the detail page template next?" },
  ], timestamp: '2026-01-20T09:32:00Z' },

  // Flavor Records — design
  { id: 'rd1-1', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: [{ type: 'text', text: "Let's make this record label site look as good as the music sounds. What vibe are we going for?" }], timestamp: '2026-02-05T13:00:00Z' },
  { id: 'rd1-2', conversationId: 'records-design-1', role: 'user', content: [{ type: 'text', text: 'Think vinyl-era nostalgia meets modern minimal. Dark backgrounds, bold type, album art as the hero element.' }], timestamp: '2026-02-05T13:01:00Z', messageContext: { source: 'typed' } },
  { id: 'rd1-3', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: [{ type: 'text', text: 'Love it. I\'ll set up a dark theme with off-black (#1A1A1A), warm white (#F5F0EB) text, and a large album grid as the centerpiece of the homepage. Typography will be a heavy sans-serif for headings. Let me draft the layout.' }], timestamp: '2026-02-05T13:01:30Z' },
  { id: 'rd1-4', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: [
    { type: 'text', text: "Here's the palette I've put together:" },
    { type: 'card', card: 'colorPalette', data: { label: 'Color Palette', colors: [
      { name: 'Charcoal', hex: '#1A1A1A' },
      { name: 'Parchment', hex: '#F5F0EB' },
      { name: 'Electric Red', hex: '#E63946' },
      { name: 'Slate', hex: '#2A2A2A' },
      { name: 'Muted', hex: '#999999' },
    ] } },
    { type: 'text', text: "The homepage leads with a featured release hero, then a grid of recent albums. Bold uppercase headings with weight 900 for that punchy label feel. Check the preview — want to tweak anything?" },
  ], timestamp: '2026-02-05T13:02:30Z' },

  // Mise en Place — assistant
  { id: 'ma1-1', conversationId: 'mise-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Welcome to Mise en Place! I can help you build out your recipe app — pages, layouts, features. What are we cooking up?" }], timestamp: '2026-02-08T11:30:00Z' },
  { id: 'ma1-2', conversationId: 'mise-assistant-1', role: 'user', content: [{ type: 'text', text: 'The recipe cards on the dashboard need a better layout. I want to show the cook time and difficulty more prominently.' }], timestamp: '2026-02-08T11:31:00Z', messageContext: { source: 'typed' } },
  { id: 'ma1-3', conversationId: 'mise-assistant-1', role: 'agent', agentId: 'assistant', content: [
    { type: 'text', text: "I've redesigned the recipe cards. Cook time and difficulty now sit in a meta bar at the bottom of each card with subtle icons, and the cuisine tag is a pill badge overlaying the image. The cards also have a hover lift effect now." },
    { type: 'text', text: "Take a look at the preview. Want me to adjust the spacing or try a different arrangement?" },
  ], timestamp: '2026-02-08T11:32:00Z' },

  // Ledger — assistant
  { id: 'la1-1', conversationId: 'ledger-assistant-1', role: 'agent', agentId: 'assistant', content: [{ type: 'text', text: "Ledger is ready to go. I can help you set up invoice templates, client management, or the dashboard. Where should we start?" }], timestamp: '2026-02-10T09:30:00Z' },
  { id: 'la1-2', conversationId: 'ledger-assistant-1', role: 'user', content: [{ type: 'text', text: 'I need an invoice detail page. Should show line items, totals, and have buttons to send reminders or mark as paid.' }], timestamp: '2026-02-10T09:31:00Z', messageContext: { source: 'typed' } },
  { id: 'la1-3', conversationId: 'ledger-assistant-1', role: 'agent', agentId: 'assistant', content: [
    { type: 'text', text: "Done. I've built the invoice detail page with a clean two-column header (from/to), a line items table with subtotal, tax, and total, plus action buttons for Send Reminder, Mark as Paid, and Download PDF." },
    { type: 'card', card: 'page', data: { title: 'Invoice Detail', slug: '/invoice', template: 'app', status: 'published', excerpt: 'Full invoice view with line items, totals, payment details, and actions.' } },
    { type: 'text', text: "Check the preview — the status badge updates based on payment state. Want to add anything else?" },
  ], timestamp: '2026-02-10T09:32:00Z' },

  // Ledger — code
  { id: 'lc1-1', conversationId: 'ledger-code-1', role: 'agent', agentId: 'code', content: [{ type: 'text', text: "I'm the code agent for Ledger. I can wire up APIs, handle data models, or build custom components. What do you need?" }], timestamp: '2026-02-11T10:00:00Z' },
  { id: 'lc1-2', conversationId: 'ledger-code-1', role: 'user', content: [{ type: 'text', text: 'I need a REST endpoint that returns invoice status — whether it\'s paid, pending, or overdue based on the due date.' }], timestamp: '2026-02-11T10:01:00Z', messageContext: { source: 'typed' } },
  { id: 'lc1-3', conversationId: 'ledger-code-1', role: 'agent', agentId: 'code', content: [
    { type: 'card', card: 'progress', data: { label: 'Building payment status endpoint', steps: [
      { name: 'Created invoice status model', status: 'done' },
      { name: 'Added GET /api/invoices/:id/status route', status: 'done' },
      { name: 'Implemented overdue detection logic', status: 'done' },
      { name: 'Added response schema validation', status: 'done' },
    ] } },
    { type: 'text', text: "The endpoint is live at `GET /api/invoices/:id/status`. It returns `{ status: 'paid' | 'pending' | 'overdue', daysUntilDue: number, amountDue: number }`. Overdue is calculated automatically from the due date. Want me to add webhook notifications for status changes?" },
  ], timestamp: '2026-02-11T10:02:00Z' },
]
