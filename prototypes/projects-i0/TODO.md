# TODO

## Design Pass
- [ ] Full visual audit of every screen and component — spacing, alignment, typography, color usage
- [ ] Chat message layout and rhythm — how text, cards, and actions flow together
- [ ] Card visual design — borders, shadows, padding, information hierarchy within each card type
- [ ] Chat input area — sizing, placement, relationship to message list
- [ ] Titlebar and toolbar design — icon sizing, spacing, dropdown styling
- [ ] Tab bar — active/inactive states, close button positioning, overflow behavior
- [ ] Sidebar project list — row density, hover/active states, status indicator placement
- [ ] Site preview panel — toolbar balance, iframe loading states, empty/error states
- [ ] Home screen — what the user sees with no project selected (currently bare)
- [ ] Transitions and motion — page transitions, panel resize feel, hover states
- [ ] Responsive behavior — how everything degrades as panels get narrower
- [ ] Dark surface consistency — chrome elements (titlebar, sidebar) vs light surfaces (chat, preview)
- [ ] Mock site quality — do the 4 homepages hold up on close inspection?

## Polish
- [ ] Card entrance animations (fade-in text, staggered card entrance, actions appear last)
- [ ] Smooth scroll-to-bottom on new messages
- [ ] Streaming AI responses (show text as it arrives, cards append after)
- [ ] Thinking indicator design (currently plain "Thinking…" text)

## Bugs / Minor
- [ ] ProgressCard `done` color should use a design token (currently hardcoded `#00a32a`)
- [ ] `ChatCard` wrapper border doesn't adapt on dark surfaces

## Multi-Page Mock Sites
- [ ] Downstreet Cafe: Menu page, About page
- [ ] Shaun's Blog: Single post page, About page
- [ ] UI Portfolio: Case study detail page, About/Contact page
- [ ] Flavor Records: Artist page, Releases page
- [ ] Navigation via postMessage — links in mock HTML send `{ type: 'navigate', page }` to parent
- [ ] SitePreview listens for messages, swaps srcdoc, updates BrowserBar URL
- [ ] Back/forward buttons track page history stack
- [ ] Each mock site module exports `{ homepage, pages: Record<string, string> }`

## Streaming Responses

Currently the user sees "Thinking…" until the full response arrives. Streaming shows text as it arrives, making the UI feel instant.

**The card problem:** Claude's response is a single text stream. Cards arrive as ` ```card:plugin ... ``` ` fenced blocks — you don't know it's a card until you see the opening fence, and you can't parse the JSON until the closing fence. So streaming and card parsing are in tension.

**Approach: stream text, buffer cards.**

1. Switch `client.messages.create()` to `client.messages.stream()` (Anthropic SDK supports this)
2. Accumulate the raw text as chunks arrive
3. On each chunk, run a lightweight scan of the accumulated text:
   - If we're NOT inside a card fence → update the visible text block in real time
   - If we hit ` ```card: ` → stop updating visible text, start buffering silently
   - If we hit the closing ` ``` ` of a card fence → parse the card JSON, append the card block, resume streaming text
4. When the stream ends, do a final parse pass to catch anything the incremental scanner missed

**Message mutation strategy:**
- The "Thinking…" message gets replaced with a single text block on the first chunk
- As text streams in, that text block's content is updated in place (Vue reactivity handles re-render)
- When a card block is detected, it gets appended as a new ContentBlock in the same message
- After the card, a new text block starts for any remaining text
- The message's `content: ContentBlock[]` array grows during streaming

**What the user sees:**
1. They send a message
2. Text starts appearing immediately (~200ms)
3. Text flows in word by word
4. Text pauses briefly (card is being buffered)
5. Card appears with an entrance animation
6. More text may follow after the card
7. Action buttons appear last (if any)

**Edge cases:**
- Malformed card fence (no closing ` ``` `) → flush buffer as text when stream ends
- Multiple cards in one response → each gets buffered and rendered independently
- Network error mid-stream → show whatever text we have + error indicator
- Empty response → show fallback message

**Key files to modify:**
- `ai-service.ts` — add `streamToAI()` that returns an async iterator or takes a callback
- `useConversations.ts` — replace `sendToAI()` call with streaming version, mutate message in place
- `ChatMessage.vue` — no changes needed (already renders ContentBlock[] reactively)
- `ChatMessageList.vue` — scroll-to-bottom needs to fire on content changes, not just message count

**Implementation complexity:** Medium. The Anthropic SDK handles the hard parts (SSE, reconnection). The main work is the incremental card fence scanner and the in-place message mutation. ~half a day.

## Future
- [ ] Theme system for AI-driven preview updates (see THEME-SYSTEM-PLAN.md)
- [ ] Test live AI card rendering end-to-end — verify Claude returns well-formed cards consistently
