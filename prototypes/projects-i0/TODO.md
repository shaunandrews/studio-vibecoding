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

## Next: Phase 2 — AI Generation Pipeline
- [ ] AI output format (fenced section blocks)
- [ ] Generation pipeline orchestration
- [ ] Progressive rendering (skeleton → sections stream in)
- [ ] System prompt for section generation

## Next: Phase 3 — New Project Flow
- [ ] Onboarding modal (conversational mini-chat)
- [ ] Project creation + build-time chat
- [ ] Progressive preview during build

## Next: Phase 4 — Section Editing
- [ ] Edit taxonomy (9 edit types)
- [ ] New card types (SectionUpdate, SectionAdd, etc.)
- [ ] Try-it preview mode
- [ ] Undo/history

## Future
- [ ] Test live AI card rendering end-to-end — verify Claude returns well-formed cards consistently
