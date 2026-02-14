# Streaming Responses Plan

Currently the user sees "Thinking…" until the full AI response arrives. Streaming shows text word-by-word as Claude generates it, with cards appearing inline once their fenced JSON block completes.

---

## Approach

**Stream text, buffer cards.** Reuse the existing `parseAIResponse` function on the full accumulated text each time a chunk arrives. No custom state machine needed — the regex parser already handles splitting text and card blocks. The only addition is detecting an incomplete card fence at the end of the accumulated text and holding it back until it closes.

---

## How It Works

1. Switch from `client.messages.create()` to `client.messages.stream()`
2. Listen to `stream.on('text', delta => ...)` events (each delta is a small string fragment)
3. Append each delta to an accumulated string
4. On each update (throttled to ~30-50ms via `requestAnimationFrame`):
   - Check if the accumulated text ends with an incomplete card fence
   - If yes: parse everything *before* the opening fence
   - If no: parse the full accumulated text
   - Pass the resulting `ContentBlock[]` to the callback
5. When the stream completes, do a final unthrottled parse of the full text

### Incomplete Fence Detection

```ts
function parseStreamingResponse(accumulated: string): ContentBlock[] {
  const lastFenceOpen = accumulated.lastIndexOf('```card:')
  if (lastFenceOpen !== -1) {
    const afterOpen = accumulated.slice(lastFenceOpen + 8)
    const closingFence = afterOpen.indexOf('```')
    if (closingFence === -1) {
      // Mid-card: only parse text before the opening fence
      return parseAIResponse(accumulated.slice(0, lastFenceOpen))
    }
  }
  return parseAIResponse(accumulated)
}
```

This is ~10 lines. It reuses `parseAIResponse` as-is. No state machine, no scanner class.

---

## What The User Sees

1. They send a message
2. Text starts appearing (~200-500ms for first token)
3. Text flows in smoothly
4. Brief pause while a card is buffered (text before the card is already visible)
5. Card appears (with entrance animation if we add one)
6. More text may follow
7. Stream completes

---

## Message Mutation

The "Thinking…" message is created with a stable ID when streaming starts. As chunks arrive, its `content` array is replaced in place:

```ts
messages.value[messageIndex].content = parseStreamingResponse(accumulated)
```

Vue 3's deep reactivity on `ref<Message[]>` detects property changes on array elements. The computed in `getMessages` re-evaluates. ChatMessage re-renders with the new blocks. No component changes needed.

**The message ID stays the same throughout streaming** — no ID swap at the end. This prevents Vue from unmounting/remounting the component (which would cause a flash since `v-for` keys on `msg.id`).

---

## Files to Modify

### ai-service.ts

Add `streamToAI` alongside existing `sendToAI`:

```ts
export async function streamToAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onUpdate: (blocks: ContentBlock[]) => void,
  signal?: AbortSignal,
  systemPrompt?: string,
): Promise<ContentBlock[]>
```

- Creates stream via `client.messages.stream()` with the abort signal
- Accumulates text from `stream.on('text', delta => ...)`
- Calls `onUpdate` throttled via `requestAnimationFrame`
- Returns final `ContentBlock[]` from `parseAIResponse(fullText)` on stream end
- On error: returns error text block, same pattern as `sendToAI`

Keep `sendToAI` as a non-streaming fallback.

### useConversations.ts

Update `sendToAIWithIndicator`:

- Create an `AbortController` stored per-conversation (so navigation/new messages can abort)
- Create the thinking message with a stable ID (no ID swap later)
- Disable input during streaming (expose a reactive `isStreaming` ref)
- Call `streamToAI` with the `onUpdate` callback that sets `messages.value[idx].content = blocks`
- On completion, do a final content assignment
- On abort/error, append error text to whatever content exists
- Clean up the AbortController

Expose `isStreaming` from `useConversations()` so AgentPanel can disable the input.

### AgentPanel.vue

- Import `isStreaming` from useConversations
- Disable InputChat while streaming (prevent sending during an active stream)

### ChatMessageList.vue

Replace the `watch` on `messages.length` with a `MutationObserver`:

```ts
onMounted(() => {
  if (!scrollerRef.value) return
  const observer = new MutationObserver(() => {
    if (isNearBottom()) scrollToBottom()
  })
  observer.observe(scrollerRef.value, {
    childList: true,
    subtree: true,
    characterData: true,
  })
  onBeforeUnmount(() => observer.disconnect())
})

function isNearBottom(): boolean {
  if (!scrollerRef.value) return true
  const { scrollTop, scrollHeight, clientHeight } = scrollerRef.value
  return scrollHeight - scrollTop - clientHeight < 80
}
```

This fires on any DOM change (text growing, cards appearing) and only auto-scrolls if the user is near the bottom. If they've scrolled up to read history, it doesn't force them down.

### ChatMessage.vue

No changes needed. Already renders `ContentBlock[]` reactively.

---

## Error Handling

- **Network error mid-stream** → append `"⚠️ Response interrupted"` text block to existing content
- **API key invalid** → error on first event, show error text block
- **Stream aborted** (navigation/new message) → silently stop, keep whatever content exists
- **Card JSON parse failure** → `parseAIResponse` already handles this (renders as code block)
- **Empty stream** → show `"I didn't have a response for that. Could you try rephrasing?"`

---

## Throttling

The Anthropic SDK fires text events very rapidly (every few characters). Updating Vue + DOM on every event is wasteful. Throttle with `requestAnimationFrame`:

```ts
let rafId: number | null = null

function throttledUpdate() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    onUpdate(parseStreamingResponse(accumulated))
  })
}
```

This batches updates to the browser's paint cycle (~16ms / 60fps). Final update on stream end bypasses the throttle.

---

## Implementation Order

1. Add `streamToAI` + `parseStreamingResponse` to ai-service.ts (~30 lines)
2. Update `sendToAIWithIndicator` to use streaming with AbortController (~20 lines)
3. Expose `isStreaming`, disable input in AgentPanel (~5 lines)
4. Replace scroll watcher with MutationObserver in ChatMessageList (~15 lines)
5. Test end-to-end

Estimated effort: 2-3 hours.
