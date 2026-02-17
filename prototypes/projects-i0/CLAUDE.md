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
    features/        # ProjectList, AgentPanel, SitePreview, NewProjectModal, OnboardingEmpty
  layouts/           # MainLayout (app shell), BareLayout (standalone pages)
  pages/             # ProjectPage, DesignSystem, Components, Settings, Architecture
  data/              # State (useProjects, useConversations, useSiteStore, useBuildProgress)
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

## Don't

- Don't rewrite entire files when Shaun has made edits. Surgical edits only.
- Don't use `left`/`right`/`top`/`bottom` in CSS. Use `start`/`end`/`block-start`/`block-end`.
- Don't add spacing values that aren't in the 5px grid system.
- Don't hardcode colors — add to the system first.
