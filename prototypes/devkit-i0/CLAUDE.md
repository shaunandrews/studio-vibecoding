# CLAUDE.md — Studio Prototype (devkit-i0)

## What is this

Interactive prototype for Studio's AI interface concepts. Vue 3 + Vite + TypeScript.

## Shared library (`../shared/`)

This prototype imports shared components, tokens, and data from `prototypes/shared/` via the `@shared` Vite alias. See `shared/CLAUDE.md` for the full inventory.

**Imports:** `import Text from '@shared/primitives/Text.vue'`, `import { type Site } from '@shared/data/site-types'`, etc.

**Overriding shared components:** Some shared composites import prototype-specific deps via `@/` (e.g. Button, FlyoutMenu, ChatMessage). This is intentional dependency inversion — `@/` resolves to *this* prototype's `src/`, so shared components get our local versions. If you need to diverge a shared component, copy it from `shared/` into `src/` and update imports.

**Local overrides (intentionally diverged from projects-i0):**
- Primitives: Button, ContextRing, Dropdown, FlyoutMenu, Titlebar
- Composites: ChatMessage, InputChat, ProjectItem, TabBar

## Dev server

```bash
npm run dev  # http://localhost:3011
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
    composites/      # ChatMessage, InputChat, ProjectItem, TabBar, Panel, StyleTileCard, StylePreview, chat-cards/
    features/        # ProjectList, AgentPanel, SitePreview, OnboardingEmpty
  layouts/           # MainLayout (app shell), BareLayout (standalone pages)
  pages/             # ProjectPage, DesignSystem, Components, Settings, Architecture
  data/              # State (useProjects, useConversations, useSiteStore, useBuildProgress, useOnboarding, useInputActions, useProjectTransition, useSourceControl, useTimeline)
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
- **InputChat** — Chat input with model selector and action strip. Props: `surface`, `modelValue`, `placeholder`, `actions` (ActionButton[]). Three rendering modes: (1) **brief cards** when `ActionButton.card.briefData` is present — 3-column grid of StyleTileCard components with StylePreview hover popups, (2) **card actions** when `ActionButton.card` is present — styled buttons with caller-provided inline styles/content, (3) **text buttons** — default, numbered Button components. Number keys (1-9, 0 for 10th) trigger actions when input is empty. Enter sends, Cmd+Enter for newline.
- **StyleTileCard** — Compact card showing style name in the brief's heading font + accent color stripe. Emits `preview-enter`/`preview-leave` with DOM rect for hover preview positioning.
- **StylePreview** — Floating 400×250px preview panel (teleported to body). Renders AI-generated style tile HTML via `v-html`, or a fallback type specimen if no tile. Viewport-clamped positioning, scale-in animation, scroll-to-dismiss.

## New project flow

No modal. Clicking "New project" creates an untitled project in the sidebar, opens the project view (with chat input auto-focused), and runs onboarding as the first chat messages. The AI assistant is named **Kit** with randomized greetings. The flow: greeting → capabilities overview → type selection (10 options as action buttons) → name (sidebar updates live) → description (skippable) → visual direction (skippable) → inspiration sites (skippable) → style tile selection → build starts. Managed by `useOnboarding.ts` (singleton state machine with promise-based input waiting). `useConversations.postMessage()` adds messages without triggering AI responses during onboarding.

Type selection uses button labels ("Business Site", "Restaurant", etc.) which flow through as `freeTextType` on the `ProjectBrief`. A `labelToType` map in `useOnboarding.ts` resolves labels to `ProjectType` enum values for page config selection, while preserving the human-readable label for the AI prompt.

## Input actions system

All user-facing action buttons render in a strip above the chat textarea—never inline in messages or card footers. Managed by `useInputActions.ts` (singleton composable). Features push actions via `pushActions()`, AgentPanel wires them to InputChat via `getActions()`. Actions clear on click or when the user sends a message.

**Three rendering modes** (priority order in InputChat template):
1. **Brief cards** — when `ActionButton.card.briefData` is present. 3-column grid of `StyleTileCard` components with `StylePreview` hover popups. Extra non-brief actions (e.g. "Show more") render below the grid. Staggered entrance (60ms delay per card).
2. **Card actions** — when `ActionButton.card` is present (`{ style, content }`). Styled `<button>` elements with caller-provided inline styles and HTML content via `v-html`. InputChat provides only the container shell.
3. **Text buttons** — default. Numbered `Button` components with staggered pop animation (30ms delay).

Number keys 1-9 and 0 (for 10th item) work as keyboard shortcuts when the input is empty.

## Design brief generation

**Prompt architecture:** `design-brief-prompt.ts` builds the prompt in 4 layers: (1) design foundations (research-backed typography/color/composition rules), (2) user context (name, type, description, visual direction, inspiration — elevated to top), (3) type-specific overlay (composition vocabulary, typographic character, color mood per site type), (4) output format + style tile instructions. Type overlays stored as `TYPE_OVERLAYS` Record with entries for all 10 onboarding types plus a `DEFAULT_OVERLAY` fallback. `getTypeOverlay()` does exact match → bidirectional fuzzy match → default.

**Algorithmic color anchors:** Instead of asking the LLM to invent colors, `useBuildProgress` generates 3 hex anchor sets using HSL with 120° hue spacing (triadic). Three structural modes (dark, light, saturated) are shuffled randomly. Each anchor includes bg/text/accent colors plus a mood hint. The LLM's job is design narration around the constrained palette.

**Brief flow:** 3 briefs generated in parallel (one per color anchor) → style tile cards shown in input area → user picks → generation starts with chosen brief. "Show more" appends 3 more briefs (additive accumulation). Rejected briefs tracked for avoidance context on regeneration.

Each brief includes a `styleName` (1-2 word label), CSS variables, design direction, font names, and an optional `styleTile` (self-contained HTML+CSS visual composition). The style tile is parsed from a ` ```styleTile ` fenced block in the AI response.

**Brief selection** uses StyleTileCard components in a 3-column grid (via the brief cards rendering mode in InputChat). Hover triggers a floating StylePreview popup showing the AI-generated tile. On selection, the chosen brief is posted as a `DesignBriefPickerCard` in chat history.

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

## AI site editing

The AI chat assistant (Kit) can propose and apply changes to the site preview. Changes flow through a preview-then-confirm pattern using the input actions system.

**Architecture:**
```
User asks for change → AI gets site context in system prompt
→ AI outputs proposal card (card:themeUpdate, card:sectionEdit)
→ Chat shows card as informational preview
→ extractCardActions() auto-pushes "Apply" input action
→ User clicks Apply
→ AgentPanel: settingsToVariables() → siteStore.updateThemeVariables()
→ SitePreview watcher → sendThemeUpdate(iframe, vars)
→ Site preview updates live
```

**Key files:**
- `ai-system-prompt.ts` — what the AI knows about cards and the site
- `ai-site-context.ts` — `buildSiteContext()` builds theme vars + pages + sections for the AI
- `ai-service.ts` — streaming + card fence parsing (`CARD_TYPES` array)
- `themes/settings-to-variables.ts` — converts structured `ThemeUpdateCardData.changes` to flat CSS vars
- `useConversations.ts` — threads `siteContext` to `streamAI()`, runs `extractCardActions()` after AI response

**Theme changes:** `card:themeUpdate` supports a `mode` field (`'light' | 'dark'`). Multiple cards in one response are bundled into a single "Apply" action via `applyType: 'themeBatch'`. Palette slugs must match CSS variable suffixes (e.g. slug `"primary"` → `--color-primary`).

**Section editing (Phase 2):** `card:sectionEdit` is registered in `CARD_TYPES` and the system prompt. The apply handler calls `siteStore.updateSection()` → iframe gets `sendSectionUpdate()`.

**Two theme systems exist:**
- `SiteTheme` (`themes/types.ts`) — structured design data (palette entries, font families). Used by `useSiteThemes.ts` and the theme design UI.
- `Site.theme` (`site-types.ts`) — flat CSS vars (`--color-primary`, `--font-heading`). Used by the iframe. `settingsToVariables()` bridges them.

## Dashboard overview layout

`DashboardOverview` is a two-column layout: sidebar (site info, quick actions, environment) and main area. The main area is vertically stacked into two panes separated by a 1px divider: **Source Control** on top, **Timeline** below. Each pane has its own scrolling container.

## Source control

`SourceControlCard.vue` — VSCode-style git controls above the Timeline. Collapsible via header chevron with animated height transition.

**Structure (top to bottom):**
- **Header:** "Source Control" title (clickable to collapse), branch pill, pull/push icon buttons with ahead/behind counts
- **Commit area:** auto-growing textarea with "AI" button to generate message, full-width "Commit" primary button, ⌘Enter shortcut
- **Staged Changes:** collapsible section (hidden when empty), file rows with monospace paths, colored M/A/D/U badges, hover unstage button
- **Changes (unstaged):** same layout, hover reveals stage (+) and discard (↩) buttons

**Data:** `useSourceControl.ts` singleton composable with reactive seed data (branch, staged/unstaged files, ahead/behind counts) and actions (stage, unstage, commit, push, pull, AI message generation). All prototype-level — no real git.

## Site preview dark mode

Sites support dark/light mode via `theme.darkVariables` on the `Theme` type (same CSS custom property keys, different values). The SitePreview toggle sends a `theme-update` postMessage to swap `:root` variables live. `renderSite()` accepts an optional `colorMode` param for flash-free initial renders.

Home grid thumbnails (ProjectItem) reactively follow `prefers-color-scheme` — system dark = dark thumbnails.

**"Inverted" sections (e.g. dark footers):** Use dedicated variables like `--color-footer-bg`, `--color-footer-text` rather than repurposing `--color-primary`/`--color-background`, which swap meaning between modes.

## Deployment (Vercel)

**Deploy command:** `npm run deploy` — copies `../shared` into `./shared`, runs `vercel --prod`, then cleans up.

**How it works:**
- `vite.config.ts` resolves `@shared` to `./shared` (Vercel) or `../shared` (local dev) via `existsSync` check
- `.vercelignore` excludes build artifacts but keeps `shared/` so Vercel uploads it
- `.gitignore` has `shared` to prevent accidental commit of the deploy copy
- CSS `@import` must use the `@shared` alias (e.g. `@import '@shared/styles/colors.css'`), NOT relative paths like `../../shared/...` — relative paths break on Vercel where the sibling directory doesn't exist

**Important:** When adding new shared CSS imports, always use `@shared/...` not `../../shared/...`.

## Don't

- Don't rewrite entire files when Shaun has made edits. Surgical edits only.
- Don't use `left`/`right`/`top`/`bottom` in CSS. Use `start`/`end`/`block-start`/`block-end`.
- Don't add spacing values that aren't in the 5px grid system.
- Don't hardcode colors — add to the system first.
