# devkit-i0 — Design Document

A developer-focused WordPress Studio prototype. Dashboard + AI chat workbench for building plugins, themes, and blocks locally.

## Context

The `projects-i0` prototype explored chat-first AI site building with a live preview. `devkit-i0` takes a different angle: Studio as a **developer workbench** — no preview, no site management fluff. The dashboard surfaces dev signals (errors, tests, builds) and AI tooling (agents, skills, plugins). The chat panel is a focused conversation with Kit.

Studio's users are developers building plugins, themes, blocks, and client sites. This prototype leans into that.

---

## Navigation Model

### Home — Site Grid

A grid of site cards. No persistent sidebar, no site list. Just your sites.

Each card shows:
- Site name + favicon/emoji
- Status indicator (running/stopped)
- Thumbnail or placeholder
- Environment summary (PHP version, WP version)

Clicking a card opens that site's dashboard in a full-window view with a fluid view-transition animation (card morphs into the full dashboard frame).

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ☕               │  │ ◈                │  │ 🛒              │
│  ░░░░░░░░░░░░░  │  │  ░░░░░░░░░░░░░  │  │  ░░░░░░░░░░░░░  │
│  ░░ thumbnail ░  │  │  ░░ thumbnail ░  │  │  ░░ thumbnail ░  │
│  ░░░░░░░░░░░░░  │  │  ░░░░░░░░░░░░░  │  │  ░░░░░░░░░░░░░  │
│                  │  │                  │  │                  │
│  Downstreet Café │  │  Studio Meridian │  │  Vinyl & Beans  │
│  ● Running       │  │  ● Running       │  │  ○ Stopped      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

The `[+ New Site]` card sits in the grid as a dashed-border placeholder.

### Titlebar

The titlebar is the navigation spine of the app:

```
● ● ●  ◁ Sites  ╱  ☕ Downstreet Café ▾  ╱  ⌘K Search…         ⧉
```

- **◁ Sites** — back to home grid (reverse transition animation)
- **Site name ▾** — dropdown to switch sites without going home
- **⌘K Search** — command palette (files, commands, skills, plugins, WP-CLI)
- **⧉** — window controls

On the home grid, the titlebar simplifies to just the search bar and window controls.

### Site View — Dashboard + Chat

Two-column layout:
- **Left**: Dashboard (scrollable, tabbed)
- **Right**: Chat panel (resizable, pop-outable)

A tab bar sits below the titlebar:

```
Overview    Code    Terminal                    ● Running  PHP 8.2
```

Status and environment info are right-aligned in the tab bar area.

---

## Dashboard Tabs

### Overview

The default view. Summary cards with links to go deeper — not the full detail of everything, just what you need to know at a glance.

**Agents Card** — status of background AI workers
- Shows agent names with status dots (active/idle/error)
- Highlights if any agent needs attention (e.g., "⚠ 1 fatal found")
- Links to full agent management view

**Workspace Card** — summary of local development artifacts
- Count of plugins, themes, blocks in the workspace
- Each item shows name + status (✓ clean, ⚠ errors, ● new)
- Links to detailed workspace view
- `[+ New Plugin]` and `[+ New Block]` quick actions

**Skills & Plugins Card** — available AI capabilities
- Count of active skills and AI plugins
- Shows a few skill names as a preview
- Links to browse/manage view (opens in a dedicated window or panel)

### Code

Deeper workspace view for active development:
- File tree or structured view of local plugins, themes, blocks
- Detailed status per item (test results, build status, file changes, errors)
- Diff views for recent changes
- Plugin/theme/block metadata (version, dependencies, hooks used)

### Terminal

Full embedded terminal. WP-CLI, PHPUnit, npm, whatever you need.

---

## Chat Panel

Pure conversation with Kit. No skills, no plugins, no tooling — just chat.

### Layout
- Fixed to the right side of the dashboard
- Resizable via drag handle on the left edge
- Default width: ~320px, min ~240px, max ~50% of window

### Pop-out
- `⧉` button in chat header spawns a separate browser window via `window.open()`
- State synced between main window and pop-out via `BroadcastChannel`
- When popped out, dashboard reclaims full width
- Closing the pop-out window docks chat back to the main window

### Conversation
- Reuse chat system from projects-i0 (messages, streaming, content blocks, input actions)
- Kit has context about the current site's workspace (plugins, theme, blocks, errors, test results)
- Kit's suggestions in chat can reference dashboard items (e.g., "Your reservations plugin has a fatal — want me to fix it?")
- Action buttons in chat (▸ Show diff, ▸ Fix it, ▸ Explain) trigger Kit workflows

---

## AI Tooling

### Agents

Background workers that run continuously while a site is open:

| Agent | Purpose |
|-------|---------|
| **Error Watcher** | Tails debug.log, surfaces fatals and deprecations |
| **Test Runner** | Runs PHPUnit/Jest on file changes, reports pass/fail |
| **Code Review** | Watches local plugins for issues (security, performance, WP standards) |
| **Deploy** | Manages staging/production push (configurable) |

Agents report status to the dashboard and can surface findings in chat proactively.

### Skills

One-shot AI capabilities, triggered by the user:

| Skill | Description |
|-------|-------------|
| **Scaffold Block** | Create a new block with edit/save/view, wired to block.json and theme |
| **Generate Tests** | Write PHPUnit + Jest tests from existing code, with fixtures |
| **Code Review** | AI review of staged changes, security + WP standards |
| **WP-CLI Runner** | Natural language → WP-CLI commands |
| **Plugin Wizard** | Full plugin from idea to zip |
| **Theme Builder** | Child theme or block theme scaffolding |

Skills are launched from the dashboard card, the ⌘K palette, or by asking Kit in chat.

### AI Plugins

Extensions that give Kit deeper knowledge of specific tools/domains:

| Plugin | Description |
|--------|-------------|
| **PHPStan** | Static analysis integration — Kit can reference PHPStan findings |
| **i18n Extract** | Translation string generation for plugins/themes |
| **REST Docs** | Auto-document custom REST API endpoints |
| **Block Linter** | Validate block.json, markup, and editor behavior |

AI Plugins are managed via a dedicated browse/install view (like a plugin marketplace for AI capabilities).

---

## Transitions & Animation

### Home → Site View
- View Transitions API (`document.startViewTransition`)
- Clicked card morphs into the dashboard frame (`view-transition-name: site-frame`)
- Grid fades/slides out as dashboard content fades in
- Reverse animation on `◁ Sites` back

### Site Switching
- Via the titlebar dropdown
- Instant swap (no transition animation for site-to-site)

### Chat Panel Resize
- CSS resize via drag handle
- Smooth layout reflow
- Persistent width preference per session

### Chat Pop-out
- `window.open()` with specific dimensions
- Dashboard animates to fill the freed space
- Re-dock animates the panel back in

---

## Reuse from projects-i0

| Component/System | Reuse Strategy |
|-----------------|----------------|
| Chat system (useConversations, streaming, parsing) | Copy + adapt (remove site-building-specific cards) |
| Input actions (useInputActions) | Direct reuse |
| View transitions (useProjectTransition) | Adapt for new grid → dashboard flow |
| Design tokens & primitives | Direct reuse (Button, Icon, Text, Badge, Tooltip) |
| ChatMessage + card components | Reuse base, add new dev-focused card types |
| Site grid layout | Adapt from ProjectList |
| MainLayout shell | Adapt for new titlebar + tab structure |

### New Components Needed
- Dashboard cards (Agents, Workspace, Skills & Plugins)
- Tab bar for dashboard sections
- Resizable panel (drag handle)
- Command palette (⌘K)
- Site switcher dropdown
- Terminal embed
- Agent status indicators
- Pop-out chat window

---

## Tech Stack

Same as projects-i0:
- Vue 3 + TypeScript + Vite
- No Tailwind
- CSS custom properties for design tokens
- Anthropic API client-side (user-provided key)

---

## Open Questions

- **Terminal implementation**: xterm.js in the browser? Or a simulated terminal UI with real WP-CLI output?
- **Code tab depth**: How much of a file browser / code editor do we build, vs. linking out to VS Code?
- **Agent simulation**: For the prototype, agents are simulated — how realistic should the simulation be?
- **Site thumbnails on home grid**: Live screenshots, static images, or placeholder patterns?
