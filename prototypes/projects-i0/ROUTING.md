# Routing Plan

## Overview

The app has two distinct layout modes:
1. **Chrome layout** — Home and Settings: titlebar + full-width content area (no sidebar)
2. **Project layout** — Project view: titlebar + sidebar + panels (the current AppShell)

Dev pages (design-system, components, architecture) are standalone — no app chrome at all.

## Strategy: Layout Components via Route Meta

Use a **layout wrapper pattern** in `App.vue`. Each route declares its layout in `meta.layout`. `App.vue` dynamically renders the correct layout component, which wraps `<router-view>`.

This is simpler than nested routes for our case because:
- We only have 2 real layouts (chrome, project) + bare (dev pages)
- Nested routes add complexity without benefit when layouts don't share sub-routes
- Layout components are explicit and easy to reason about

### Switching projects

**Route change** (`/projects/1` → `/projects/2`). This is the right call because:
- URL reflects state (shareable, back-button works)
- The ProjectLayout component persists across project switches (same layout, different `:id`)
- vue-router reuses the component instance — only the param changes
- Use `watch(() => route.params.id)` to react to project switches

## Route Table

| Path | Page Component | Layout | Notes |
|---|---|---|---|
| `/` | `HomePage.vue` | `AppLayout` | Project grid, global chat, onboarding |
| `/projects/:id` | `ProjectPage.vue` | `ProjectLayout` | Sidebar + agent chat + preview |
| `/settings` | `SettingsPage.vue` | `AppLayout` | App settings |
| `/design-system` | `DesignSystem.vue` | `BareLayout` | Dev page (existing) |
| `/components` | `Components.vue` | `BareLayout` | Dev page (existing) |
| `/architecture` | `ArchitecturePage.vue` | `BareLayout` | New dev page |

## File Structure

```
src/
├── App.vue                    # Layout switcher
├── router.ts                  # Route definitions
├── layouts/
│   ├── AppLayout.vue          # Titlebar + content area (home, settings)
│   ├── ProjectLayout.vue      # Titlebar + sidebar + panels
│   └── BareLayout.vue         # Just <router-view>, no chrome
├── pages/
│   ├── HomePage.vue           # Project grid + global chat
│   ├── ProjectPage.vue        # Agent chat + site preview (panel content only)
│   ├── SettingsPage.vue       # Settings
│   ├── ArchitecturePage.vue   # Architecture docs
│   ├── DesignSystem.vue       # (existing, renamed from pages/)
│   └── Components.vue         # (existing)
├── components/
│   ├── Titlebar.vue           # (existing)
│   ├── Sidebar.vue            # (existing) — used in ProjectLayout
│   ├── AgentPanel.vue         # (existing)
│   ├── SitePreview.vue        # (existing)
│   ├── Panel.vue              # (existing)
│   ├── ProjectCard.vue        # NEW — for home grid
│   ├── GlobalChat.vue         # NEW — chat on home screen
│   └── ...                    # (other existing components)
```

## Code Examples

### `App.vue`

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import ProjectLayout from './layouts/ProjectLayout.vue'
import BareLayout from './layouts/BareLayout.vue'

const route = useRoute()

const layouts: Record<string, any> = {
  app: AppLayout,
  project: ProjectLayout,
  bare: BareLayout,
}

const layout = computed(() => {
  const name = (route.meta.layout as string) || 'bare'
  return layouts[name]
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
```

### `router.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/HomePage.vue'),
      meta: { layout: 'app' },
    },
    {
      path: '/projects/:id',
      component: () => import('./pages/ProjectPage.vue'),
      meta: { layout: 'project' },
    },
    {
      path: '/settings',
      component: () => import('./pages/SettingsPage.vue'),
      meta: { layout: 'app' },
    },
    // Dev pages — bare layout (no app chrome)
    {
      path: '/design-system',
      component: () => import('./pages/DesignSystem.vue'),
      meta: { layout: 'bare' },
    },
    {
      path: '/components',
      component: () => import('./pages/Components.vue'),
      meta: { layout: 'bare' },
    },
    {
      path: '/architecture',
      component: () => import('./pages/ArchitecturePage.vue'),
      meta: { layout: 'bare' },
    },
  ],
})

export default router
```

### `layouts/AppLayout.vue`

The chrome layout for Home and Settings — titlebar, full-width content, no sidebar.

```vue
<script setup lang="ts">
import Titlebar from '../components/Titlebar.vue'
</script>

<template>
  <div class="app-layout vstack">
    <Titlebar />
    <main class="app-content flex-1 min-h-0">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}
</style>
```

### `layouts/ProjectLayout.vue`

Extracted from the current `AppShell.vue`. Titlebar + sidebar + panel area.

```vue
<script setup lang="ts">
import Titlebar from '../components/Titlebar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="project-layout vstack">
    <Titlebar />
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0 p-xs">
      <Sidebar />
      <main class="frame vstack flex-1 overflow-hidden min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.project-layout {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}
.app-body { min-height: 0; }
.frame {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
}
</style>
```

### `layouts/BareLayout.vue`

```vue
<template>
  <slot />
</template>
```

### `pages/ProjectPage.vue`

The panel content that lives inside ProjectLayout. This is what was previously the inner part of AppShell.

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '../components/Panel.vue'
import AgentPanel from '../components/AgentPanel.vue'
import SitePreview from '../components/SitePreview.vue'

const route = useRoute()
const showPreview = ref(true)

// React to project switching
watch(() => route.params.id, (newId) => {
  // Load project data for newId
  // Chat history, site URL, etc.
})
</script>

<template>
  <div class="panels hstack align-stretch flex-1 min-w-0 min-h-0">
    <Panel>
      <AgentPanel
        :preview-visible="showPreview"
        @toggle-preview="showPreview = !showPreview"
      />
    </Panel>
    <Panel v-if="showPreview">
      <SitePreview />
    </Panel>
  </div>
</template>
```

## Navigation Patterns

```ts
import { useRouter } from 'vue-router'
const router = useRouter()

// Home → Project
router.push(`/projects/${projectId}`)

// Project → Project (sidebar click)
router.push(`/projects/${otherProjectId}`)
// Same layout persists, only param changes. Vue reuses the component.

// Project → Settings
router.push('/settings')

// Settings → Back
router.back()

// Any → Home
router.push('/')
```

## Route Transitions

Add transitions in `App.vue` for layout changes. Use `<router-view v-slot>` pattern:

```vue
<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

For project-to-project switches (same layout), Vue reuses the component so no transition fires — which is correct. The panel content updates reactively via the route param watcher.

## Review Findings (2026-02-13)

Issues found and addressed:

### 1. `activeProjectId` not synced from route

**Problem:** `ProjectPage.vue` watches `route.params.id` but never calls `activeProjectId.value = newId` from `useProjects()`. The sidebar, agent panel, and anything else reading `activeProject` would show stale data.

**Fix:** ProjectPage must sync the route param into the data layer:

```vue
// In ProjectPage.vue setup
import { useProjects } from '@/data/useProjects'
const { activeProjectId } = useProjects()

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

// Also clear on unmount (navigating away from project view)
onBeforeUnmount(() => {
  activeProjectId.value = null
})
```

Alternatively, use a **navigation guard** (see #4 below) to set it before the component even renders.

### 2. Route path inconsistency with DATA-LAYER.md

**Problem:** ROUTING.md uses `/projects/:id` (plural). DATA-LAYER.md suggests `/project/:id` (singular). Pick one.

**Decision:** Use `/projects/:id` (plural) — it's the REST convention for resource collections and reads naturally: "show me project X from the projects list."

Updated DATA-LAYER.md's router example references should follow suit.

### 3. No catch-all / 404 route

**Problem:** Navigating to a non-existent path (typo, old bookmark) shows a blank page with no feedback.

**Fix:** Add a catch-all that redirects to home:

```ts
{ path: '/:pathMatch(.*)*', redirect: '/' }
```

### 4. No navigation guard for invalid project IDs

**Problem:** `/projects/nonexistent-id` renders ProjectLayout with no project data. `activeProject` would be `null`, causing downstream errors or empty UI.

**Fix:** Add a `beforeEnter` guard on the project route:

```ts
{
  path: '/projects/:id',
  component: () => import('./pages/ProjectPage.vue'),
  meta: { layout: 'project' },
  beforeEnter: (to) => {
    const { projects } = useProjects()
    const exists = projects.value.some(p => p.id === to.params.id)
    if (!exists) return '/'  // redirect to home
  },
}
```

This also handles browser back/forward to a project that was "deleted" during the session.

### 5. No route names

**Problem:** All navigation uses path strings (`router.push('/projects/...')`). Fragile if paths change.

**Fix:** Add names to all routes:

```ts
{ name: 'home', path: '/', ... },
{ name: 'project', path: '/projects/:id', ... },
{ name: 'settings', path: '/settings', ... },
```

Then navigate with: `router.push({ name: 'project', params: { id } })`

### 6. Layout transition edge case

**Problem:** The transition example wraps `<router-view>` content, but when switching layouts (e.g., home→project), `<component :is="layout">` swaps the entire layout component. This is an abrupt cut — the inner transition only fires for same-layout route changes.

**Acceptable for now:** Layout switches (home↔project) are a major context shift, so a hard cut is fine. If we want to smooth it later, add a `:key` and transition on the layout component itself:

```vue
<transition name="fade" mode="out-in">
  <component :is="layout" :key="route.meta.layout">
    <router-view />
  </component>
</transition>
```

But this destroys and recreates the entire layout on every route change (including project→project), which defeats Vue's component reuse. **Recommendation:** Keep the current approach. Accept the hard cut on layout transitions. The inner `<router-view>` transition handles same-layout changes smoothly.

### 7. ProjectLayout needs the project ID

**Problem:** `ProjectLayout.vue` contains `<Sidebar />`, which needs to know the active project (to highlight it). The layout doesn't receive route params directly.

**Solution already works:** Sidebar reads `activeProjectId` from `useProjects()` (singleton composable). As long as finding #1 is implemented (syncing route param → activeProjectId), the sidebar gets it reactively. No prop drilling needed.

---

## Implementation Order

1. Create `layouts/` directory with the three layout components
2. Update `App.vue` with the layout switcher
3. Update `router.ts` with meta.layout on all routes
4. Create `pages/HomePage.vue` (basic project grid placeholder)
5. Refactor `AppShell.vue` → `ProjectPage.vue` (extract layout parts to `ProjectLayout.vue`)
6. Create `pages/SettingsPage.vue` (placeholder)
7. Create `pages/ArchitecturePage.vue` (placeholder)
8. Delete `pages/Index.vue` and `pages/AppShell.vue`
9. Add route transitions
