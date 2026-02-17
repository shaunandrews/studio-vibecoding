# TODO

## Extract Loop Architecture (Current Direction)

### Done ✅
- [x] Phase A: Extraction proof — messy CSS → clean design system (tested with real API)
- [x] Phase B: New data model (Site/Page/Section/Theme), simple renderer, seed sites, store
- [x] Phase C: Generation loop (design brief → parallel sections → extraction → review)
- [x] Phase D: Editing cards (self-contained lifecycle, undo/redo, SectionEditCard, ThemeEditCard)

### Done (Conversational Build) ✅
- [x] Test seed sites rendering in the preview — fixed slug mismatch, nav links, font flash, body margin
- [x] Wire generation loop into new project flow — useBuildProgress bridges ProjectBrief → generateSite()
- [x] Conversational build UX — agent narrates generation in chat, ProgressCard tracks steps live
- [x] Generation event callbacks — `onEvent` param on `generateSite` fires brief-done/section-done/page-start/complete/error
- [x] Preview auto-open with animation — hidden during brief, slides open when first section lands
- [x] Section fade-in — new sections created with `opacity:0` → CSS transition in iframe listener
- [x] Diff-based section rendering — SitePreview tracks rendered sections in a Set, sends individual updates
- [x] Section ordering — `data-order` attribute ensures sections insert at correct DOM position during parallel gen
- [x] Streaming agent messages — `streamAgentMessage()` types text in over ~400ms like real AI responses
- [x] ProgressCard running state — homepage sections marked `running` immediately (parallel), subsequent pages on `page-start`

### Next: Generation Resilience
- [ ] **Per-section error boundaries** — wrap individual `generateSection()` in try/catch so one failure doesn't kill the page. Use `Promise.allSettled()` instead of `Promise.all()` for parallel batches
- [ ] **Retry with reprompt** — on parse failure, retry once with a simplified prompt ("Return only CSS and HTML, no explanation"). Max 1 retry per section
- [ ] **Skip-and-continue** — if a section fails after retry, mark it as error in ProgressCard and continue building remaining sections. Show a "Retry failed sections" action button in chat after completion
- [ ] **Design brief progress** — show a thinking/loading indicator while the brief is being generated (currently silent gap between opening message and brief-done)
- [ ] **Design brief chat card** — new `designBrief` card type showing fonts, color direction, and CSS variables so the user sees what the AI decided before building starts
- [ ] Graceful API key check — warn user when no Anthropic key is configured instead of silently failing to 'stopped'
- [ ] Graceful API error handling — parse Anthropic error responses and show human-readable messages in chat (e.g. "Your API credits have run out" instead of raw JSON dumps)

### Known Failure: Section Parse Errors
The AI sometimes returns sections in unexpected formats that `parseSectionResponse()` can't parse. Root causes:
- **Token exhaustion** — later sections (especially footer) hit `max_tokens: 3072`, truncating the response mid-format
- **Format drift** — AI returns prose + code instead of the expected `\`\`\`section:role` fenced block
- **Promise.all cascade** — one parse failure rejects the entire parallel batch, killing all in-flight sections

Fix strategy: error boundaries per section + retry + skip-and-continue (see items above).

### Later
- [ ] Design pass on the app UI (chat, cards, preview chrome)
- [ ] Iterate on generation prompt quality (the actual output needs to look good)
- [ ] Test a real AI-generated site end-to-end with all pages completing

---

## Legacy (from rigid section system — archived)

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
- [ ] Thinking indicator design (currently plain "Thinking…" text)

## Bugs / Minor
- [ ] ProgressCard `done` color should use a design token (currently hardcoded `#00a32a`)
- [ ] `ChatCard` wrapper border doesn't adapt on dark surfaces

## Section System (Phase 1 — Complete ✅)
- [x] Define section types and data model
- [x] Extract component CSS library
- [x] Build 14 shared section renderers + page renderer
- [x] Refactor Downstreet Cafe to use section system
- [x] Dark mode support via themeCSSOverride
- [x] Migrate all 7 mock sites to section system (site-specific types, renderers, CSS)
- [x] Remove default header/footer — every site owns its full structure
- [x] Remove backward-compat wrappers — clean SiteData + renderSitePage() API
- [x] Remove all `as any` casts and `display: none` CSS hacks

## AI Theme Integration (Complete ✅)
- [x] Add ThemeUpdateCard type — before/after comparison, "Apply" action
- [x] Update AI system prompt with theme.json schema and themeUpdate card format
- [x] Wire "Apply" action to call updateTheme() → reactive preview update

## Phase 2 — AI Generation Pipeline (Complete ✅)
- [x] AI output format (fenced section blocks) — parser handles section:TYPE, theme, templatePart:TYPE, card:context
- [x] Generation pipeline orchestration — PipelineOrchestrator with theme→parts→parallel pages, retry, abort
- [x] Progressive rendering (skeleton → sections stream in) — renderProgressivePage, postMessage incremental updates
- [x] System prompt for section generation — auto-generated schemas from Phase 1 types, page presets
- [x] Vue composable (usePipeline) — reactive state, skeleton slots, progress card, mock mode
- [x] Generated site persistence — survives navigation via generated-sites store
- [x] Incremental streaming — sections appear as they arrive, not batch-per-page

## Phase 3 — New Project Flow (Complete ✅)
- [x] Onboarding modal (conversational mini-chat) — NewProjectModal, OnboardingChat, QuickReplyChips
- [x] Project creation — slug ID generation, DiceBear favicons, sidebar integration
- [x] Build-time chat — first message, progress updates, completion summary, error handling
- [x] Progressive preview during build — skeleton → theme → header → sections → complete
- [x] Pipeline integration — useBuildProgress composable wires modal → pipeline → preview
- [x] BrowserBar shows planned pages with dimmed unbuilt indicators

## Next: Phase 4 — Section Editing
- [ ] Edit taxonomy (9 edit types)
- [ ] New card types (SectionUpdate, SectionAdd, etc.)
- [ ] Try-it preview mode
- [ ] Undo/history

## Future
- [ ] Test live AI card rendering end-to-end — verify Claude returns well-formed cards consistently
