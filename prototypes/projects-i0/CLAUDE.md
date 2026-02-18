# CLAUDE.md — Studio Prototype (projects-i0)

## What is this

Interactive prototype for Studio's AI interface concepts. Vue 3 + Vite + TypeScript.

## Dev server

```bash
npm run dev  # http://localhost:3600
```

## Design system rules

Read `DESIGN-SYSTEM.md` before touching any component. Key rules:

- **Spacing:** 5px grid only. Use `--space-xxxs` through `--space-xxxl`. No magic numbers.
- **Radius:** `--radius-s`, `--radius-m`, `--radius-l`. No custom values.
- **Colors:** All from CSS variables in `styles/colors.css`. No hardcoded hex/rgb.
- **Icons:** `@wordpress/icons` via `WPIcon` component. No inline SVGs.
- **Directions:** Use logical properties (`start`/`end`, `block`/`inline`) not physical (`left`/`right`, `top`/`bottom`). Exception: physical directions for app chrome edges (documented with comments).
- **Dark mode:** Supported via `prefers-color-scheme`. All page styles must use token variables, never hardcode light-only colors.

## Structure

```
src/
  styles/            # Design tokens (colors, space, radius)
  components/
    primitives/      # Button, Tooltip, WPIcon, Text, StatusIndicator, Titlebar, etc.
    composites/      # ChatMessage, InputChat, ProjectItem, TabBar, Panel, chat-cards/
    features/        # ProjectList, AgentPanel, SitePreview, OnboardingEmpty
  layouts/           # MainLayout (app shell), BareLayout (standalone pages)
  pages/             # ProjectPage, DesignSystem, Components, Settings, Architecture
  data/              # State (useProjects, useConversations, useSiteStore, useBuildProgress, useOnboarding, useInputActions, useProjectTransition)
    generation/      # AI prompts and generation loop (useGeneration, design-brief-prompt, etc.)
    seed-sites/      # Hardcoded demo sites (downstreet-cafe, portfolio)
    themes/          # Theme definitions and utilities
  router.ts
```

## Key components

- **Button** — `variant` (primary/secondary/tertiary), `surface` (light/dark), `size` (default/small), `width` (hug/full), `icon`, `label`, `tooltip`, `disabled`
- **Tooltip** — `text`, `placement` (top/bottom/left/right), `delay` (ms, default 600). Smart viewport flipping. Warm state skips delay between consecutive tooltips. Note: wraps content in `span.tooltip-trigger` with `inline-flex` — override to `flex` if parent needs it to fill width.
- **WPIcon** — Vue wrapper for `@wordpress/icons`. Props: `icon`, `size`
- **StatusIndicator** — `status` (stopped/loading/running). Emits `toggle`. Clip-path morph animation on hover.
- **Titlebar** — App titlebar with traffic lights, sidebar toggle, greeting, settings/help
- **ProjectList** — Project list in two modes: `grid` (home view, full width) and `list` (sidebar, 210px). New Project button lives in MainLayout below this component, not inside it.
- **InputChat** — Chat input with model selector and action strip. Props: `surface`, `modelValue`, `placeholder`, `actions` (ActionButton[]). Renders action buttons above the textarea with staggered entrance animation; number keys (1-9, 0 for 10th) trigger actions when input is empty. Enter sends, Cmd+Enter for newline.

## New project flow

No modal. Clicking "New project" creates an untitled project in the sidebar, opens the project view (with chat input auto-focused), and runs onboarding as the first chat messages. The AI assistant is named **Kit** with randomized greetings. The flow: greeting → capabilities overview → type selection (10 options as action buttons) → name (sidebar updates live) → description (skippable) → build starts. Managed by `useOnboarding.ts` (singleton state machine with promise-based input waiting). `useConversations.postMessage()` adds messages without triggering AI responses during onboarding.

## Input actions system

All user-facing action buttons (onboarding chips, skip, brief selection, card actions) render in a strip above the chat textarea—never inline in messages or card footers. Managed by `useInputActions.ts` (singleton composable). Features push actions via `pushActions()`, AgentPanel wires them to InputChat via `getActions()`. Actions clear on click or when the user sends a message. Cards are purely informational (no footer buttons). Number keys 1-9 and 0 (for 10th item) work as keyboard shortcuts when the input is empty. Buttons animate in with a staggered pop effect (30ms delay per button).

## Design brief generation

Each brief includes a `styleName` (1-2 word label like "Punk", "Noir", "Warm Earth") used as the picker button label and displayed on the brief card. The site name, type, and description are threaded through to all section generation prompts so the AI uses the actual site name in content.

## View transitions (home ↔ project)

Navigation between home and project uses the View Transitions API via `useProjectTransition.ts` (singleton composable). The clicked project card morphs into the project frame; the sidebar slides in from the left; other cards shrink away. Reverse mirrors it.

**View transition names:**
- `project-frame` — shared between the clicked card (home) and the frame (project). Dynamically assigned via `:style` in ProjectItem and MainLayout.
- `project-grid` / `sidebar` — the left column switches names between modes for independent entry/exit animations.
- `new-project-btn` — the New Project button, captured independently so it doesn't duplicate during transitions.

**Key rules:**
- Project-to-project navigation (already in project mode) skips view transitions entirely — instant swap.
- `transitionProjectId` ref tracks which card is mid-morph. Only one card gets `view-transition-name` at a time.
- Animation CSS lives in `motion.css` under `::view-transition-*` pseudo-elements with `vt-` prefixed keyframes.

## Don't

- Don't rewrite entire files when Shaun has made edits. Surgical edits only.
- Don't use `left`/`right`/`top`/`bottom` in CSS. Use `start`/`end`/`block-start`/`block-end`.
- Don't add spacing values that aren't in the 5px grid system.
- Don't hardcode colors — add to the system first.
