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

## Future
- [ ] Multi-page mock sites with working navigation (see TODO Phase 2 concept in git history)
- [ ] Theme system for AI-driven preview updates (see THEME-SYSTEM-PLAN.md)
- [ ] Test live AI card rendering end-to-end — verify Claude returns well-formed cards consistently
