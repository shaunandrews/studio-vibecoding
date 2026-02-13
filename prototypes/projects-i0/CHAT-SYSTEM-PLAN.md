# Chat System Plan

The AI assistant doesn't just talk about doing things — it shows inline UI right in the conversation. Installing a plugin? A plugin card with an install button appears in the chat. Creating a page? A page preview you can tweak before confirming. This is what makes it a workspace, not a chatbot.

---

## Message Content Model

Currently, messages are plain strings. We need a richer content model where each agent message can contain a mix of **content blocks**:

- **Text** — Markdown-rendered prose, explanations, questions (supports **bold**, *italic*, links, lists, inline code)
- **UI Cards** — Structured, typed components embedded inline
- **Actions** — Buttons the user can click instead of typing

A single agent message might contain: text explaining what it did → a UI card showing the result → action buttons for next steps.

### Message Schema

```ts
interface Message {
  id: string
  conversationId: string
  role: 'user' | 'agent'
  agentId?: AgentId
  content: ContentBlock[]
  messageContext?: MessageContext
  timestamp: string
}

type ContentBlock =
  | { type: 'text'; text: string }  // Rendered as markdown
  | CardBlock
  | { type: 'actions'; actions: ActionButton[] }

// Discriminated union — every card type has its own typed data
type CardBlock =
  | { type: 'card'; card: 'plugin'; data: PluginCardData }
  | { type: 'card'; card: 'colorPalette'; data: ColorPaletteData }
  | { type: 'card'; card: 'settings'; data: SettingsCardData }
  | { type: 'card'; card: 'progress'; data: ProgressCardData }

interface MessageContext {
  source: 'typed' | 'action'
  actionId?: string
  cardRef?: string
  payload?: Record<string, string>
}

interface PluginCardData {
  name: string
  slug: string
  description: string
  icon?: string
  rating?: number
  activeInstalls?: string
  status: 'available' | 'installing' | 'installed' | 'active' | 'error'
}

interface ColorPaletteData {
  label: string
  colors: { name: string; hex: string; usage: string }[]
}

interface SettingsCardData {
  label: string
  settings: { key: string; current: string; proposed: string }[]
}

interface ProgressCardData {
  label: string
  steps: { name: string; status: 'pending' | 'running' | 'done' | 'error' }[]
}

interface ActionButton {
  id: string
  label: string
  variant?: 'primary' | 'secondary' | 'destructive'
  icon?: Component  // Vue component (WordPress icon)
  // Metadata for action handling — not just display text
  action: {
    type: 'send-message'  // Inserts a user message and triggers agent response
    message: string       // Display text for the user bubble
    cardRef?: string      // Which card this action originated from (for disambiguation)
    payload?: Record<string, string>  // Structured data the response handler can use
  }
}
```

User messages stay as plain text (rendered as a single text block internally), but when they come from card actions they include `messageContext` for deterministic response routing.

---

## Card Library (Phase 1 Scope: 4 Cards)

Shipping with four cards. Each one is a Vue component embedded in the chat flow. Cards are interactive but not full-page UIs — inline control surfaces.

### PluginCard
Plugin name, icon, description, star rating, status badge, and an action button (install/activate/deactivate). Status reflects a point-in-time snapshot.

### ColorPalette
Named color swatches with hex values and usage labels (e.g., "Primary," "Background"). Shows a proposed palette the agent is recommending.

### SettingsCard
Key/value rows showing current → proposed values for one or more settings. Confirm/cancel actions. Used for permalinks, typography, site title, reading settings — anything with a before/after.

### ProgressCard
Ordered step list with status indicators (pending/running/done/error). Used during site creation, plugin installation, bulk operations. Static snapshot — represents progress at the time the message was sent.

### Future Cards (not built until proven needed)
These are documented for reference but **not in scope** until the first four are solid:
- ThemePicker, PageCard, PostDraft — next tier, likely Phase 2
- CommentList, RevisionDiff, NavigationEditor, MediaUpload, SiteOverview, BlockPreview — cut until there's a real need

---

## Prototype Interaction Model

This is a prototype. There is no WordPress backend. Every action is scripted.

**How card actions work:**
1. User clicks a button on a card (e.g., "Install" on a PluginCard)
2. A user message is inserted into the conversation (e.g., "Install WPForms")
3. The action's `payload` metadata identifies which card and action triggered it
4. A **scripted agent response** is appended — the next message in the seed sequence
5. That response can contain new cards showing the result (e.g., ProgressCard → then a follow-up with the PluginCard in "installed" state)

**No live API, no backend, no real WordPress operations.** Buttons trigger the next message in a pre-authored conversation flow. This is a choreographed demo, not a working system. The goal is to show *what the interaction feels like*, not to actually install plugins.

**Scripted response engine:** Each seeded conversation defines deterministic transitions. When the user sends a message:
1. If `messageContext.source === 'action'`, route by `messageContext.actionId` (and optional `cardRef`) to the exact next agent response.
2. If typed, run text matching against the current node's allowed inputs.
3. If no match, append a generic fallback.

Action IDs are the source of truth for card-triggered flows. Text matching is only for free-typed input.

**Actions are one-way.** No undo. If a user clicks "Install" and wants to reverse it, they say "Uninstall it" and the agent responds with appropriate UI. The conversation is the undo log.

**Cards are snapshots, always.** They represent state at the time of the message. They never mutate after being sent. A new message with a new card shows updated state. This avoids the complexity of live-updating old cards and keeps the conversation history honest.

---

## Card States

Every card needs to handle these visual states:

- **Default** — Showing data, actions available
- **Loading** — Action has been triggered, waiting for result (e.g., PluginCard shows "Installing..." with a spinner on the button)
- **Complete** — Action succeeded, status updated (e.g., status badge changes to "Installed")
- **Error** — Action failed, shows error text and retry option
- **Disabled** — Actions are unavailable (e.g., card in an old message, already acted upon)

In the prototype, cards are always rendered in their final state (since messages are pre-authored). But the component props should support all states so they're ready for live use later.

---

## Card Sizing

- **Max-width: 520px.** Prevents cards from stretching uncomfortably in wide panels.
- **Min-width: fluid down to 360px.** Matches the chat panel's minimum width.
- **Density:** When a message contains 3+ cards of the same type (e.g., plugin recommendations), render them in a compact variant — smaller padding, single-line descriptions, no ratings. A `compact` prop on each card component handles this.
- **Consistent card chrome:** All cards share a `ChatCard.vue` wrapper providing border, border-radius, padding, and background. Cards don't style their own containers.

---

## Text Rendering

Text blocks are rendered as **markdown** using a lightweight renderer (e.g., `markdown-it` or `marked`). This gives agent messages:
- **Bold**, *italic*, `inline code`
- Links (clickable)
- Bulleted and numbered lists
- Code blocks with syntax highlighting (covers the code diff use case without a dedicated block type)

No dedicated `code` content block type. Code goes in markdown fenced blocks within text. Simpler schema, same visual result.

**Safety requirement:** Disable raw HTML in markdown rendering and sanitize rendered output before mounting to the DOM.

---

## Message Streaming Appearance

When a new agent message appears (after the scripted delay):
1. Text blocks render with a brief fade-in
2. Cards render one by one with a staggered entrance (e.g., 100ms delay between cards)
3. Action buttons appear last, after all content blocks have rendered

This gives the illusion of the agent "building" its response, even though it's pre-authored.

---

## User Stories

Scoped to the four cards we're building. Stories that require other card types are listed under "Future" for reference.

### Plugin Management
| Story | Agent Behavior |
|-------|---------------|
| "I need a contact form" | Text recommending options → 2-3 PluginCards → actions to install |
| "Install WPForms" (via action button) | Text acknowledging → ProgressCard (downloading, installing, activating) |
| "What plugins do I have?" | Text summary → PluginCards showing installed plugins with status |

### Design & Theming
| Story | Agent Behavior |
|-------|---------------|
| "Change my colors to something warmer" | Text explaining the approach → ColorPalette with proposed swatches → action to apply |
| "I don't like the green, make it more blue" | Text → revised ColorPalette → action to apply |

### Settings
| Story | Agent Behavior |
|-------|---------------|
| "Change permalinks to post name" | Text explaining impact → SettingsCard (current: `?p=123` → proposed: `/sample-post/`) → confirm action |
| "Set my site title" | Text → SettingsCard with editable-looking current/proposed values → confirm |

### Site Setup
| Story | Agent Behavior |
|-------|---------------|
| "Create a portfolio site" | Text → ProgressCard (provisioning, installing theme, configuring) |
| "Set up my site for a restaurant" | Text → ProgressCard → follow-up with PluginCards for recommended plugins |

### Future Stories (require cards not yet built)
- Content creation → needs PostDraft card
- Page management → needs PageCard
- Theme browsing → needs ThemePicker
- Navigation editing → needs NavigationEditor (complex, may never be a chat card)
- Comment moderation → needs CommentList
- Revision history → needs RevisionDiff

---

## Seeded Conversations

Two fully-scripted conversations for the prototype. Each is a complete back-and-forth demonstrating the card system.

### Seed 1: Plugin Discovery (Downstreet Cafe project)
User wants a contact form and SEO plugin. Agent recommends options (PluginCards), user picks one (action button), agent installs it (ProgressCard), confirms success (PluginCard in "active" state). ~8 messages.

### Seed 2: Design Refresh (Shaun's Blog project)
User wants warmer colors. Agent proposes a palette (ColorPalette), user asks for a tweak, agent revises (new ColorPalette), user confirms, agent applies and shows the settings that changed (SettingsCard). ~6 messages.

Existing plain-text seed conversations remain as-is — they still work (rendered as single text blocks). New seeds are additive.

---

## Implementation Phases

### Phase 1: Foundation + First Cards (this is the real work)
- Refactor `Message.content` from `string` to `ContentBlock[]`
- Add `Message.messageContext` for action provenance (`source`, `actionId`, `cardRef`, `payload`)
- Add markdown rendering for text blocks
- Build `ChatCard.vue` wrapper (shared card chrome)
- Build 4 cards: PluginCard, ColorPalette, SettingsCard, ProgressCard
- Implement action button handling (click → insert user message → append scripted response)
- Build deterministic scripted response engine for seeded conversations (action-id routing first, typed-text matching second)
- Create Seed 1 and Seed 2 conversations
- Polish: card entrance animations, scroll-to-bottom, message fade-in
- Migrate existing seed data to new format (wrap strings in `[{ type: 'text', text: '...' }]`)
- Add compatibility adapter during migration: if legacy `content: string` is encountered, normalize at read time to one text block so old seeds/UI paths don't break mid-refactor
- Validate chat layout at min panel widths to confirm card min/max constraints (360-520px) behave correctly within current 720px message rail

### Phase 2: Expand (only after Phase 1 is solid)
- Add ThemePicker, PageCard, PostDraft cards
- New seeded conversations for content creation and theme browsing flows
- Compact card variants for dense lists
- Refine typed-message matching and fallback copy (do not fuzz action-id routes)

### Phase 3: Live AI (optional, separate initiative)
- Wire up Claude API
- Structured output → card rendering pipeline
- Tool use for WordPress operations (MCP or local API)
- Graceful fallback when no API key is configured

---

## Design Decisions

**Card interactions insert user messages with metadata.** When a user clicks "Install" on a PluginCard, it inserts a visible user message ("Install WPForms") *and* carries structured metadata (`cardRef`, `payload`) so the response engine knows exactly which card and action triggered it. The visible message keeps the conversation readable; the metadata keeps it unambiguous.
The metadata is stored on the inserted `Message.messageContext` (`source: 'action'`, `actionId`, optional `cardRef`, optional `payload`).

**Cards are snapshots, always.** They show the state at the time the agent sent them. Old cards never mutate. Updated state appears in new messages with new cards. This is both a design principle and a simplification — no reactive card state management, no stale UI bugs.

**Actions are one-way, conversation is the undo log.** No built-in undo. User says "undo that" and the agent responds with appropriate reversal UI. The conversation flow *is* the history.

**Multiple cards per message are fine.** Render in a vertical stack with consistent gap. Cap at ~3-4 per message; if more are needed, the agent should split across messages or use compact variants.

**Max card width: 520px. Fluid down to 360px.** Prevents stretching in wide panels, looks good at minimum panel width.

**No dedicated code block type.** Markdown fenced code blocks in text handle this. One less content block type to maintain, same visual result.

**Prototype-first mindset.** Every feature should make the demo better, not make a production system more complete. If it doesn't improve the scripted conversation experience, it waits.
