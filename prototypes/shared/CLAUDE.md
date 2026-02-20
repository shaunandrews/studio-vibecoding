# CLAUDE.md — Shared Prototype Library

## What is this

Shared design tokens, components, and data used across prototypes (projects-i0, devkit-i0, and future prototypes). Not a standalone app — consumed via Vite alias.

## How prototypes consume this

Each prototype's `vite.config.ts` must have:

```typescript
resolve: {
  alias: { '@shared': fileURLToPath(new URL('../shared', import.meta.url)) },
  dedupe: ['vue', 'vue-router', '@wordpress/icons'],
},
server: { fs: { allow: ['..'] } },
```

Then import with `@shared/`:
```typescript
import Text from '@shared/primitives/Text.vue'
import { type Site } from '@shared/data/site-types'
```

## Dependency inversion

Some shared components import prototype-specific deps using `@/` (not `@shared/`). This is intentional. The `@/` alias resolves to the consuming prototype's `src/`, so shared components get that prototype's local version of diverged components (Button, FlyoutMenu, ChatMessage, types).

**If you see `@/` imports in shared files, don't "fix" them to `@shared/`.** They're the integration point between shared and local code.

## Structure

```
shared/
  styles/
    colors.css         # Color tokens (merged superset of both prototypes)
    space.css          # 5px grid spacing tokens + utility classes
    radius.css         # Border radius tokens (s/m/l/full)
    typography.css     # Font stacks, sizes, weights, line heights
    layout.css         # Flex utilities (.hstack, .vstack, .gap-*)
    motion.css         # Duration/ease tokens + view transition keyframes
  primitives/
    Avatar.vue
    Badge.vue
    Modal.vue
    StatusIndicator.vue
    Text.vue
    Tooltip.vue
    tooltip-state.ts
    WPIcon.vue
  composites/
    AllChatsModal.vue
    ChatMessageList.vue
    Panel.vue
    chat-cards/
      ChatCard.vue
      PageCard.vue
      PluginCard.vue
      PostDraftCard.vue
      ProgressCard.vue
      SettingsCard.vue
    renderers/
      MarkdownText.vue
  data/
    site-types.ts          # Site, Page, Section, Theme, DesignSystem types
    site-renderer.ts       # Full site HTML renderer (postMessage listener, section/theme updates)
    useProjectTransition.ts  # View Transitions API composable (parameterized route name)
  index.ts               # Barrel export for data modules
```

## Design system rules

Same rules as each prototype — these are the source of truth for tokens:

- **Spacing:** 5px grid. `--space-xxxs` (2px) through `--space-xxxl` (40px).
- **Radius:** `--radius-s` (5px), `--radius-m` (10px), `--radius-l` (15px), `--radius-full` (9999px).
- **Colors:** All from CSS variables. No hardcoded hex/rgb.
- **Icons:** `@wordpress/icons` via WPIcon. No inline SVGs.
- **Directions:** Logical properties (`start`/`end`, `block`/`inline`), not physical.

## Adding to the shared library

Only extract things that are **truly identical** across prototypes. If two prototypes need different behavior, keep separate copies in each prototype. The bar for shared: if you change it, both prototypes should get the change.

## Don't

- Don't change `@/` imports to `@shared/` — they're intentional dependency inversion.
- Don't add prototype-specific logic. If it only applies to one prototype, it belongs there.
- Don't break the implicit contract: shared components expect the consuming prototype to provide Button, FlyoutMenu, ChatMessage, and types via `@/`.
