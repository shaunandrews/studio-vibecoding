# Chat System

The AI assistant shows inline UI cards right in the conversation. Installing a plugin? A plugin card with an install button. Changing colors? A palette card with swatches. This is what makes it a workspace, not a chatbot.

## Architecture

**Message content model:** Each message contains an array of `ContentBlock[]` — text blocks (rendered as markdown), card blocks (typed UI components), and action blocks (clickable buttons).

**AI integration:** Messages go to Claude (Sonnet) via the Anthropic SDK (client-side, API key in localStorage). Claude's system prompt documents all card types with JSON schemas. When Claude wants to show a card, it embeds a `card:TYPE` fenced JSON block in its response. The AI service parser splits responses into text and card blocks.

**No scripted flows.** All responses come from the AI. Seed conversations provide static starter content but don't have interactive flows.

## Card Types (7)

| Card | Data Type | Purpose |
|------|-----------|---------|
| PluginCard | `PluginCardData` | Plugin recommendation, install status |
| ColorPaletteCard | `ColorPaletteData` | Color palette proposal with swatches |
| SettingsCard | `SettingsCardData` | Current → proposed settings comparison |
| ProgressCard | `ProgressCardData` | Multi-step operation progress |
| ThemePickerCard | `ThemePickerCardData` | Theme options grid |
| PageCard | `PageCardData` | Page with title, slug, status, actions |
| PostDraftCard | `PostDraftCardData` | Blog post draft with excerpt, categories, tags |

All cards use the `ChatCard` wrapper for consistent chrome. All accept `compact` and `state` (CardUiState) props.

## Design Decisions

- **Cards are snapshots.** They show state at time of message. Old cards never mutate.
- **Action buttons insert user messages** with structured metadata (actionId, cardRef, payload).
- **Actions are one-way.** Undo = say "undo that" and the AI responds.
- **Max card width: 520px.** Fluid down to 360px (panel minimum).
- **Text rendered as markdown** via MarkdownText component (bold, italic, code, links, lists, fenced blocks).
- **Destructive actions map to tertiary** button variant.

## Key Files

```
src/data/types.ts              — ContentBlock, CardBlock, all card data interfaces
src/data/ai-service.ts         — Anthropic SDK, card-aware response parser
src/data/ai-system-prompt.ts   — System prompt with card schemas
src/data/useConversations.ts   — Message state, AI integration, thinking indicator
src/data/seed-conversations.ts — Static starter conversations

src/components/composites/chat-cards/   — 7 card components + ChatCard wrapper
src/components/composites/renderers/    — MarkdownText
src/components/composites/ChatMessage.vue      — Renders ContentBlock array
src/components/composites/ChatMessageList.vue  — Scrolling message list
src/components/features/AgentPanel.vue         — Chat panel with tabs + input
```
