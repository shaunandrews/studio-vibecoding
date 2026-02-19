# devkit-i0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a developer-focused WordPress Studio prototype with a dashboard + chat workbench for building plugins, themes, and blocks locally.

**Architecture:** Copy projects-i0 as the base, strip site-building-specific code (preview, onboarding, design briefs, generation, themes), replace the project page with a tabbed dashboard + resizable chat panel, add new titlebar with back navigation / site switcher / command palette, and populate with developer-focused seed data and dashboard widgets.

**Tech Stack:** Vue 3, TypeScript, Vite, CSS custom properties (existing design system from projects-i0), `@wordpress/icons`, `@anthropic-ai/sdk`

---

## Phase 1: Bootstrap — Copy & Strip

### Task 1: Copy projects-i0 to devkit-i0

**Files:**
- Copy: `prototypes/projects-i0/` → `prototypes/devkit-i0/` (excluding `node_modules/`, `dist/`, `.vercel/`, `docs/`, `logs/`, `package-lock.json`)

**Step 1: Copy the prototype**

```bash
# From repo root
rsync -av --exclude='node_modules' --exclude='dist' --exclude='.vercel' --exclude='docs' --exclude='logs' --exclude='package-lock.json' \
  prototypes/projects-i0/ prototypes/devkit-i0/
```

Note: This will merge with the existing `DESIGN.md` already in devkit-i0.

**Step 2: Update package.json**

Change the `name` field to `devkit-i0`.

**Step 3: Update index.html**

Change `<title>` to `DevKit — WordPress Studio`.

**Step 4: Update vite.config.ts**

Change the port to whatever portman assigns. Use `portman request 1 -n "devkit-i0" --json` to get a port.

**Step 5: Install dependencies and verify it runs**

```bash
cd prototypes/devkit-i0
npm install
npm run dev
```

Verify: The app loads in the browser and looks identical to projects-i0.

**Step 6: Commit**

```bash
git add prototypes/devkit-i0/
git commit -m "feat(devkit-i0): bootstrap from projects-i0 copy"
```

---

### Task 2: Strip site-building code

Remove all the site-preview, onboarding, design brief, generation, theme, and seed-site code that doesn't apply to the dev workbench concept.

**Files to delete entirely:**
- `src/components/features/SitePreview.vue`
- `src/components/features/OnboardingEmpty.vue`
- `src/components/features/HomeChat.vue`
- `src/components/composites/StyleTileCard.vue`
- `src/components/composites/StylePreview.vue`
- `src/components/composites/chat-cards/DesignBriefCard.vue`
- `src/components/composites/chat-cards/DesignBriefPickerCard.vue`
- `src/components/composites/chat-cards/ThemeUpdateCard.vue`
- `src/components/composites/chat-cards/ThemeEditCard.vue`
- `src/components/composites/chat-cards/ThemePickerCard.vue`
- `src/components/composites/chat-cards/SectionEditCard.vue`
- `src/components/composites/chat-cards/ColorPaletteCard.vue`
- `src/composables/useEditCard.ts`
- `src/composables/useEditHistory.ts`
- `src/data/generation/` (entire directory)
- `src/data/seed-sites/` (entire directory)
- `src/data/themes/` (entire directory)
- `src/data/useOnboarding.ts`
- `src/data/useBuildProgress.ts`
- `src/data/usePreviewState.ts`
- `src/data/usePipeline.ts`
- `src/data/useSiteStore.ts`
- `src/data/site-renderer.ts`
- `src/data/site-types.ts`
- `src/data/ai-pipeline-types.ts`
- `src/data/ai-site-context.ts`
- `src/data/edit-types.ts`
- `src/data/seed-conversations.ts`
- `src/pages/DesignSystem.vue`
- `src/pages/Components.vue`
- `src/pages/ArchitecturePage.vue`
- `src/pages/SettingsPage.vue`
- `src/pages/components/` (entire directory)
- `src/layouts/BareLayout.vue`
- `public/images/` (entire directory — site thumbnails we won't use)

**Files to keep but will modify later:**
- `src/data/types.ts` — strip site-building types, add dev types
- `src/data/useConversations.ts` — strip site context, keep core chat
- `src/data/ai-service.ts` — strip site-specific parsing, keep core streaming
- `src/data/ai-system-prompt.ts` — rewrite for dev assistant
- `src/data/seed-projects.ts` — rewrite with dev-focused projects
- `src/data/agents.ts` / `src/data/useAgents.ts` — repurpose for background agents

**Step 1: Delete the files listed above**

Use `rm -rf` for directories, `rm` for individual files.

**Step 2: Fix imports that now break**

The key files that reference deleted code:

- `src/router.ts` — remove dev page routes (design-system, components, architecture), keep home + project
- `src/components/composites/ChatMessage.vue` — remove card type imports for deleted cards
- `src/components/composites/chat-cards/ChatCard.vue` — remove deleted card component imports from the switch
- `src/components/composites/InputChat.vue` — remove StyleTileCard/StylePreview imports and brief-cards rendering mode
- `src/components/features/AgentPanel.vue` — remove SitePreview, onboarding, buildProgress, siteStore, theme imports
- `src/components/composites/ProjectItem.vue` — remove site-renderer and useSiteStore imports, remove preview HTML generation
- `src/pages/ProjectPage.vue` — remove SitePreview import and preview panel (this gets rewritten in Phase 2)
- `src/layouts/MainLayout.vue` — remove onboarding import
- `src/components/primitives/Titlebar.vue` — remove dev page navigation from settings dropdown

**Step 3: Stub out broken references**

For files that reference deleted composables, either remove the usage or stub with minimal placeholders so the app compiles. The goal is to get to a running state, even if it's sparse.

- `AgentPanel.vue`: Remove all onboarding/build/preview/siteStore logic. Keep the basic conversation display and input.
- `ProjectItem.vue`: Remove preview iframe. Show just favicon + name + status (row and card modes).
- `ProjectPage.vue`: Temporarily just show AgentPanel full-width (no preview).
- `ChatCard.vue`: Remove branches for deleted card types. Keep `plugin`, `progress`, `settings`, `page`, `postDraft`.

**Step 4: Verify it compiles and runs**

```bash
npm run dev
```

The app should load. Home grid shows project cards (without thumbnails). Clicking a project opens just the chat panel. It'll look sparse — that's fine.

**Step 5: Commit**

```bash
git commit -m "refactor(devkit-i0): strip site-building code, keep chat core"
```

---

## Phase 2: Layout Overhaul

### Task 3: New home layout — full-width grid

The home grid in projects-i0 shares space with a sidebar. In devkit-i0, the home IS the full window — no sidebar, just a grid of site cards.

**Files:**
- Modify: `src/layouts/MainLayout.vue`
- Modify: `src/components/features/ProjectList.vue`
- Modify: `src/components/composites/ProjectItem.vue`

**Step 1: Rewrite MainLayout for two distinct modes**

Home mode: Full-window grid (no sidebar, no frame).
Site mode: Full-window dashboard (no sidebar).

The key change: remove the `left-column` / `is-sidebar` pattern. In home mode, ProjectList is full-width. In site mode, the `<router-view name="main">` takes the full window.

```vue
<!-- MainLayout.vue simplified structure -->
<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body flex-1 min-w-0">
      <!-- Home: full-width grid -->
      <ProjectList
        v-if="mode === 'home'"
        class="flex-1"
        mode="grid"
        :style="{ viewTransitionName: 'project-grid' }"
        @new-project="handleNewProject"
      />
      <!-- Site: full-width dashboard -->
      <main
        v-else
        class="frame"
        :style="{ viewTransitionName: 'project-frame' }"
      >
        <router-view name="main" />
      </main>
    </div>
  </div>
</template>
```

Remove `is-sidebar`, `left-column`, the 210px sidebar width, and the sidebar-mode ProjectList.

**Step 2: Update ProjectItem card mode**

Remove the site preview iframe (already stubbed in Task 2). Add developer info to cards:
- PHP version, WP version (from new project fields)
- Plugin/theme count summary

For now, use placeholder text until we add the new seed data in Phase 6.

**Step 3: Update view transition names**

The transition now morphs a grid card into the full-window frame. Update `useProjectTransition.ts` if needed — the core logic is the same, just the CSS changes.

Update `motion.css`: remove `sidebar` transition name. The `project-grid` → disappear and `project-frame` → expand transitions remain.

**Step 4: Verify the grid fills the window**

```bash
npm run dev
```

Home shows full-width grid. Clicking a card opens full-window view. Back works.

**Step 5: Commit**

```bash
git commit -m "feat(devkit-i0): full-width home grid, no sidebar"
```

---

### Task 4: New titlebar

**Files:**
- Modify: `src/components/primitives/Titlebar.vue`

**Step 1: Redesign the titlebar**

The titlebar has different states for home vs. site mode:

**Home mode:**
```
● ● ●     WordPress Studio                    ⌘K Search…     ⚙
```

**Site mode:**
```
● ● ●  ◁ Sites  /  ☕ Downstreet Café ▾      ⌘K Search…     ⚙
```

Key elements:
- Traffic lights (keep existing)
- **◁ Sites** back button — only in site mode, triggers `navigateHome()`
- **Site name ▾** — dropdown to switch sites (use existing `Dropdown` primitive)
- **⌘K Search** — styled input placeholder in titlebar center (the actual palette comes in Phase 5)
- Settings gear (keep existing, simplified)

The back button and site switcher replace the current breadcrumb pattern. The ⌘K search bar replaces the static title text.

**Step 2: Add the search bar placeholder**

A styled `<button>` that looks like a search input but just shows "⌘K Search..." as placeholder text. Clicking it will eventually open the command palette. For now it's inert.

```vue
<button class="search-bar" @click="openCommandPalette">
  <WPIcon :icon="search" :size="14" />
  <span class="search-placeholder">Search…</span>
  <kbd class="search-shortcut">⌘K</kbd>
</button>
```

Style it as a rounded, subtle input-like element in the titlebar.

**Step 3: Add site switcher dropdown**

In site mode, the site name is a `Dropdown` that lists all projects. Selecting one navigates to that project (instant swap, no transition — matching existing project-to-project behavior).

**Step 4: Verify**

Home shows "WordPress Studio" + search bar. Site view shows back + site name + search bar.

**Step 5: Commit**

```bash
git commit -m "feat(devkit-i0): new titlebar with back nav, site switcher, search bar"
```

---

### Task 5: Dashboard page with tabs

**Files:**
- Rewrite: `src/pages/ProjectPage.vue` → `src/pages/SitePage.vue`
- Modify: `src/router.ts` — update route component

**Step 1: Create the tabbed dashboard + chat layout**

SitePage replaces ProjectPage. Two-column layout: dashboard (left, scrollable) + chat panel (right, resizable).

```vue
<!-- SitePage.vue structure -->
<template>
  <div class="site-page hstack">
    <!-- Dashboard -->
    <div class="dashboard-column flex-1 vstack min-w-0">
      <!-- Tab bar + status -->
      <div class="dashboard-tabs hstack">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.label }}</button>
        <div class="tab-spacer flex-1" />
        <StatusIndicator :status="project.status" />
        <span class="env-info">PHP 8.2</span>
      </div>
      <!-- Tab content -->
      <div class="dashboard-content flex-1 min-h-0 overflow-auto">
        <DashboardOverview v-if="activeTab === 'overview'" />
        <DashboardCode v-if="activeTab === 'code'" />
        <DashboardTerminal v-if="activeTab === 'terminal'" />
      </div>
    </div>
    <!-- Resize handle -->
    <div class="resize-handle" @pointerdown="onResizeStart" />
    <!-- Chat panel -->
    <div class="chat-column vstack" :style="{ width: chatWidth + 'px' }">
      <AgentPanel :project-id="projectId" />
    </div>
  </div>
</template>
```

Tabs: Overview, Code, Terminal. Default to Overview.

**Step 2: Implement resize logic**

Port the resize handle from the old ProjectPage.vue. The chat panel has:
- Default width: 360px
- Min width: 280px
- Max width: 50% of window
- Persisted per session (localStorage)

**Step 3: Create placeholder tab components**

Create three stub components:
- `src/components/features/DashboardOverview.vue` — "Overview" placeholder
- `src/components/features/DashboardCode.vue` — "Code" placeholder
- `src/components/features/DashboardTerminal.vue` — "Terminal" placeholder

Each just shows a centered label for now.

**Step 4: Update router**

Rename the route from `project` to `site`, update the component import to `SitePage.vue`.

**Step 5: Verify**

Clicking a site from the grid opens the dashboard with tabs on the left and chat on the right. Tabs switch content. Resize handle works. Chat panel shows the existing Kit conversation UI.

**Step 6: Commit**

```bash
git commit -m "feat(devkit-i0): tabbed dashboard + resizable chat panel"
```

---

## Phase 3: Dashboard Content

### Task 6: Agents card

**Files:**
- Create: `src/components/features/dashboard/AgentsCard.vue`
- Create: `src/data/useDevAgents.ts`
- Modify: `src/components/features/DashboardOverview.vue`

**Step 1: Define agent types**

In `useDevAgents.ts`, define the background agent model:

```typescript
interface DevAgent {
  id: string
  name: string
  icon: any  // @wordpress/icons
  status: 'active' | 'idle' | 'error' | 'off'
  summary: string  // "watching 3 plugins", "12/12 pass", etc.
  lastEvent?: string  // "⚠ 1 fatal found 2m ago"
}
```

Seed with 4 agents: Error Watcher, Test Runner, Code Review, Deploy. Static data for the prototype.

**Step 2: Build AgentsCard**

A dashboard card component showing agent rows with status dots and summaries. "View all agents" link at the bottom (inert for now).

Use the design system: `--color-surface` background, `--radius-m` border-radius, `--space-m` padding. Status dots reuse the StatusIndicator pattern (green=active, yellow=idle, red=error, gray=off).

**Step 3: Wire into DashboardOverview**

Add AgentsCard as the first section.

**Step 4: Commit**

```bash
git commit -m "feat(devkit-i0): agents card on dashboard overview"
```

---

### Task 7: Workspace card

**Files:**
- Create: `src/components/features/dashboard/WorkspaceCard.vue`
- Create: `src/data/useWorkspace.ts`
- Modify: `src/components/features/DashboardOverview.vue`

**Step 1: Define workspace model**

```typescript
interface WorkspacePlugin {
  name: string
  slug: string
  version: string
  status: 'clean' | 'error' | 'new'
  summary: string  // "✓ 12/12 tests", "⚠ 1 fatal", "new · no tests"
}

interface WorkspaceTheme {
  name: string
  slug: string
  parent?: string
  summary: string
}

interface WorkspaceBlock {
  name: string
  slug: string
  version: string
  status: 'clean' | 'error' | 'new'
  summary: string
}
```

Populate with static seed data matching the Downstreet Café dev scenario (3 plugins, 1 child theme, 2 blocks).

**Step 2: Build WorkspaceCard**

Shows three sections (Plugins, Theme, Blocks) with item name + status + summary per row. "[Open workspace]" and "[+ New]" buttons at the bottom (inert).

**Step 3: Wire into DashboardOverview**

Add as second section below AgentsCard.

**Step 4: Commit**

```bash
git commit -m "feat(devkit-i0): workspace card on dashboard overview"
```

---

### Task 8: Skills & Plugins card

**Files:**
- Create: `src/components/features/dashboard/SkillsCard.vue`
- Create: `src/data/useSkills.ts`
- Modify: `src/components/features/DashboardOverview.vue`

**Step 1: Define skills and AI plugins model**

```typescript
interface Skill {
  id: string
  name: string
  description: string
  icon: any
}

interface AIPlugin {
  id: string
  name: string
  description: string
  active: boolean
}
```

Seed with 6 skills (Scaffold Block, Generate Tests, Code Review, WP-CLI Runner, Plugin Wizard, Theme Builder) and 4 AI plugins (PHPStan, i18n Extract, REST Docs, Block Linter).

**Step 2: Build SkillsCard**

Summary line: "6 skills · 4 AI plugins active". Shows a 2-column mini-grid of skill names (first 4-6). "[Browse & manage ↗]" link at bottom.

**Step 3: Wire into DashboardOverview**

Add as third section. The Overview tab now has all three cards: Agents, Workspace, Skills & Plugins.

**Step 4: Commit**

```bash
git commit -m "feat(devkit-i0): skills & plugins card on dashboard overview"
```

---

## Phase 4: Chat Integration

### Task 9: Chat panel pop-out

**Files:**
- Create: `src/data/useChatPopout.ts`
- Modify: `src/pages/SitePage.vue`
- Modify: `src/components/features/AgentPanel.vue`
- Create: `src/pages/ChatPopout.vue`
- Modify: `src/router.ts`

**Step 1: Create the pop-out composable**

`useChatPopout.ts` manages the pop-out state:
- `isPoppedOut` ref
- `popOut()` — opens `window.open('/chat-popout/:projectId', ...)` with specific dimensions
- `dockBack()` — closes the popup window
- `BroadcastChannel('devkit-chat')` for syncing messages between windows

**Step 2: Create ChatPopout page**

A minimal page that renders just `AgentPanel` with no dashboard. Registered as a bare-layout route at `/chat-popout/:id`.

**Step 3: Add pop-out button to AgentPanel**

Add a `⧉` button in the chat header that triggers `popOut()`. When popped out, the main window's chat panel hides and the dashboard takes full width.

**Step 4: Sync state**

Messages sent in either window broadcast to the other via `BroadcastChannel`. When the pop-out window closes (`beforeunload`), the main window docks the chat back.

**Step 5: Verify**

Click ⧉ → chat opens in new browser window. Send a message in either window → appears in both. Close popup → chat returns to main window.

**Step 6: Commit**

```bash
git commit -m "feat(devkit-i0): chat panel pop-out with BroadcastChannel sync"
```

---

### Task 10: Update AI system prompt for dev context

**Files:**
- Modify: `src/data/ai-system-prompt.ts`
- Modify: `src/data/ai-service.ts`

**Step 1: Rewrite system prompt**

Kit is now a WordPress development assistant, not a site builder. The system prompt should establish:
- Kit helps with plugin, theme, and block development
- Kit knows the workspace (which plugins/themes/blocks exist, their status)
- Kit can suggest code fixes, explain WordPress hooks, help debug
- Kit can use skills (scaffold, test generation, etc.)
- Card types: `plugin` (install/recommend), `progress` (build steps), `settings` (config changes)

Strip all site-building, design brief, and theme editing card types from the system prompt.

**Step 2: Simplify card parsing**

In `ai-service.ts`, reduce `CARD_TYPES` to the ones we're keeping: `plugin`, `progress`, `settings`, `page`, `postDraft`. Remove theme/section/design-brief parsing.

**Step 3: Commit**

```bash
git commit -m "feat(devkit-i0): rewrite AI system prompt for dev assistant"
```

---

## Phase 5: Additional Tabs

### Task 11: Code tab

**Files:**
- Rewrite: `src/components/features/DashboardCode.vue`

**Step 1: Build the Code tab**

A more detailed view of the workspace. For the prototype, this is a structured list (not a real file browser):

- Each plugin/theme/block gets an expanded card showing:
  - Name, version, path
  - File count, last modified
  - Test results (if applicable)
  - Recent errors/warnings
  - Quick action buttons: "Open in editor", "Run tests", "View logs"

All buttons are inert (this is a prototype), but styled correctly.

**Step 2: Commit**

```bash
git commit -m "feat(devkit-i0): code tab with detailed workspace view"
```

---

### Task 12: Terminal tab

**Files:**
- Rewrite: `src/components/features/DashboardTerminal.vue`

**Step 1: Build a simulated terminal**

Not a real terminal — a styled `<pre>` block with monospace font that displays pre-seeded command history. Includes a fake input prompt at the bottom.

Style with dark background (`--color-chrome` or similar), green/white text on dark, proper monospace font. Looks like a real terminal but is entirely static.

Seed with 5-6 realistic WP-CLI commands and their output:
```
$ wp plugin list --status=active
$ wp scaffold block cafe-hours --plugin=downstreet-events
$ phpunit --filter=ReservationTest
```

**Step 2: Commit**

```bash
git commit -m "feat(devkit-i0): terminal tab with simulated output"
```

---

## Phase 6: Command Palette

### Task 13: ⌘K command palette

**Files:**
- Create: `src/components/features/CommandPalette.vue`
- Create: `src/data/useCommandPalette.ts`
- Modify: `src/components/primitives/Titlebar.vue`
- Modify: `src/App.vue`

**Step 1: Build the command palette composable**

```typescript
interface Command {
  id: string
  label: string
  category: string  // 'Skills', 'Navigation', 'WP-CLI', etc.
  icon?: any
  action: () => void
}
```

`useCommandPalette.ts` exports:
- `isOpen` ref
- `toggle()`, `open()`, `close()`
- `commands` computed — filterable list of all available commands

Populate with static commands:
- Navigation: "Go to Sites", "Overview", "Code", "Terminal"
- Skills: "Scaffold Block", "Generate Tests", "Code Review", "Plugin Wizard"
- WP-CLI: "Run WP-CLI command..."

**Step 2: Build CommandPalette component**

Modal overlay with search input + filtered command list. Keyboard-navigable (arrow keys, Enter to select, Escape to close).

Style as a centered floating panel — similar to VS Code's command palette or Raycast. Dark surface, large search input at top, grouped results below.

**Step 3: Wire ⌘K shortcut**

In `App.vue`, add a global `keydown` listener for `Cmd+K` (Mac) / `Ctrl+K` (other) that toggles the palette. Also wire the titlebar search bar click.

**Step 4: Commit**

```bash
git commit -m "feat(devkit-i0): command palette with ⌘K shortcut"
```

---

## Phase 7: Seed Data & Polish

### Task 14: Developer-focused seed projects

**Files:**
- Rewrite: `src/data/seed-projects.ts`
- Modify: `src/data/types.ts`

**Step 1: Update types**

Add dev-focused fields to `Project`:

```typescript
interface Project {
  id: string
  name: string
  favicon: string
  status: ProjectStatus
  url: string
  createdAt: string
  description?: string
  // Dev fields
  phpVersion?: string
  wpVersion?: string
  pluginCount?: number
  themeSlug?: string
}
```

**Step 2: Create seed projects**

3-4 developer-focused projects:

1. **Downstreet Café** — Restaurant client site with custom plugins (reservations, events, loyalty card), child theme, custom blocks. Running. The "active development" scenario.
2. **Studio Meridian** — Portfolio site with a custom theme. Running. The "theme development" scenario.
3. **Jetpack Feature** — A Jetpack module development environment. Running. The "plugin contribution" scenario.
4. **Block Playground** — Experimental block development sandbox. Stopped.

**Step 3: Commit**

```bash
git commit -m "feat(devkit-i0): developer-focused seed projects"
```

---

### Task 15: Seed conversations for dev context

**Files:**
- Create: `src/data/seed-conversations.ts`

**Step 1: Write dev-focused seed conversations**

2-3 pre-seeded conversations that demonstrate Kit as a dev assistant:

1. **Downstreet Café — "Fix the reservation REST endpoint"** — Kit found a fatal via Error Watcher, shows the issue, proposes a fix, user approves.
2. **Downstreet Café — "Scaffold the hours block"** — Kit walks through scaffolding a new Gutenberg block for displaying cafe hours.
3. **Jetpack Feature — "Debug the sync module"** — Kit helps trace a bug in a Jetpack module.

Keep them short (4-6 messages each). Include `plugin` and `progress` card types where appropriate.

**Step 2: Wire seed conversations into useConversations**

Ensure they load on app init, associated with the correct project IDs.

**Step 3: Commit**

```bash
git commit -m "feat(devkit-i0): seed dev conversations with Kit"
```

---

### Task 16: Polish & visual cleanup

**Files:**
- Various component tweaks

**Step 1: Dashboard Overview spacing and visual hierarchy**

Ensure the three overview cards (Agents, Workspace, Skills) have consistent spacing, proper card styling (border, radius, background), and clear section headers.

**Step 2: Chat panel header**

Add a proper header to the chat panel showing "Kit" with the pop-out `⧉` button and a collapse `◀` button.

**Step 3: Tab bar styling**

Style the dashboard tabs to match the design system — active tab indicator, hover states, proper font sizing.

**Step 4: Responsive behavior**

Ensure the dashboard scrolls properly when content overflows. The chat panel should have a minimum width below which it hides (and can be toggled back).

**Step 5: Verify the full flow**

1. App loads → home grid with 3-4 dev project cards
2. Click a card → fluid transition to dashboard + chat
3. Overview tab shows Agents, Workspace, Skills cards
4. Code tab shows detailed workspace
5. Terminal tab shows simulated terminal
6. Chat works (send messages, Kit responds)
7. ⌘K opens command palette
8. ◁ Sites returns to home grid
9. Site switcher dropdown works
10. Chat pop-out works

**Step 6: Final commit**

```bash
git commit -m "feat(devkit-i0): polish dashboard layout and visual cleanup"
```

---

## File Summary

### New files to create:
| File | Purpose |
|------|---------|
| `src/pages/SitePage.vue` | Dashboard + chat layout (replaces ProjectPage) |
| `src/pages/ChatPopout.vue` | Pop-out chat window |
| `src/components/features/DashboardOverview.vue` | Overview tab content |
| `src/components/features/DashboardCode.vue` | Code tab content |
| `src/components/features/DashboardTerminal.vue` | Terminal tab content |
| `src/components/features/dashboard/AgentsCard.vue` | Background agents widget |
| `src/components/features/dashboard/WorkspaceCard.vue` | Local dev workspace widget |
| `src/components/features/dashboard/SkillsCard.vue` | Skills & AI plugins widget |
| `src/components/features/CommandPalette.vue` | ⌘K command palette |
| `src/data/useDevAgents.ts` | Background agent state |
| `src/data/useWorkspace.ts` | Workspace items state |
| `src/data/useSkills.ts` | Skills & plugins state |
| `src/data/useChatPopout.ts` | Chat pop-out state |
| `src/data/useCommandPalette.ts` | Command palette state |
| `src/data/seed-conversations.ts` | Dev-focused seed chats |

### Files to delete:
~30 files related to site building, design briefs, themes, generation, preview (see Task 2)

### Files to modify:
| File | Changes |
|------|---------|
| `src/router.ts` | New routes, remove dev pages |
| `src/layouts/MainLayout.vue` | Full-width modes, no sidebar |
| `src/components/primitives/Titlebar.vue` | Back nav, site switcher, search bar |
| `src/components/features/AgentPanel.vue` | Strip site-building logic |
| `src/components/features/ProjectList.vue` | Grid-only mode |
| `src/components/composites/ProjectItem.vue` | Remove preview, add dev info |
| `src/components/composites/ChatMessage.vue` | Remove deleted card types |
| `src/components/composites/chat-cards/ChatCard.vue` | Remove deleted card branches |
| `src/components/composites/InputChat.vue` | Remove style tile rendering |
| `src/data/types.ts` | New dev types, strip site-building types |
| `src/data/seed-projects.ts` | Dev-focused projects |
| `src/data/useConversations.ts` | Strip site context |
| `src/data/ai-system-prompt.ts` | Dev assistant prompt |
| `src/data/ai-service.ts` | Simplified card parsing |
| `src/data/useProjectTransition.ts` | Adapt for full-width layout |
| `src/styles/motion.css` | Update view transition CSS |
| `src/App.vue` | Add ⌘K listener, command palette |
