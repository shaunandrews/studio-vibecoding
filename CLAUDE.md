# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Design exploration for integrating AI coding agents into WordPress Studio. Goal: make Studio a "vibe coding workbench" where developers can use Claude Code, OpenCode, or Codex CLI alongside their WordPress development workflow.

## Context

Design exploration for AI agent integration in WordPress Studio. The actual Studio codebase lives at `Automattic/studio`. This repo contains interactive prototypes and design artifacts.

## Key Concepts

- **ACP (Agent Control Protocol)** — Standard for third-party agent integration
- **Telex CLI** — Artifact generation tooling
- **wpcom Sync** — Connecting local Studio work to WordPress.com

## Working with Studio Source (studio/ subdirectory)

The `studio/` folder contains a clone of `Automattic/studio` for local experimentation. It's git-ignored from this repo.

### Setup

```bash
cd studio
npm install    # Runs extensive postinstall (CLI deps, WP downloads, native rebuilds)
npm start      # Dev server with hot reload
```

Requires Node 22.x, npm 10.x (npm 11 works with warnings).

### Essential Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (renderer hot reloads, main needs restart or `rs`) |
| `npm test` | Run Vitest unit tests |
| `npm run e2e` | Run Playwright e2e tests |
| `npm run lint` | ESLint check |
| `npm run make` | Build installers for current platform |

### Known Issue: Sentry + Electron 39

`@sentry/electron@^6.5.0` preload script crashes with Electron 39:
- Error: `"Electron sandboxed_renderer.bundle.js script failed to run"`
- **Workaround**: Comment out `import '@sentry/electron/preload';` in `src/preload.ts`

### Studio Architecture

Studio uses the Electron 3-process model. See `studio/AGENTS.md` for detailed architecture, IPC patterns, and conventions.

### Studio Interface Anatomy

See `docs/studio-anatomy.html` for a visual reference of Studio's UI composition:

- **Layout**: Dark chrome shell (`bg-chrome`, `rgba(30,30,30,1)`) with white rounded content area. Two-column: sidebar (210px, collapsible) + main content with tab navigation.
- **Components**: Built on `@wordpress/components` (Button, TabPanel, Modal, Icon, Spinner, SelectControl, etc.) — some wrapped with custom variants. ~60 React components total.
- **Design Tokens**: `@automattic/color-studio` (200+ shades) mapped to Tailwind as `a8c-{name}-{shade}`. 15 typography scales via Tailwind plugin (`.a8c-title-large` through `.a8c-section-heading`). System UI font stack.
- **Styling**: Tailwind CSS 3.3 for layout/utilities, WP component overrides in `index.css` targeting `.components-*` classes. No dark mode toggle — sidebar is permanently dark, content permanently white.
- **State**: Redux Toolkit + RTK Query (8 slices, 4+ APIs), 13 React Context providers.
- **Navigation**: Tab-based via `@wordpress/components.TabPanel` — no router. 6 tabs: Overview, Sync, Previews, Import/Export, Settings, Assistant.
- **Key files**: `app.tsx` (layout), `root.tsx` (providers), `tailwind.config.js` (tokens), `ipc-handlers.ts` (IPC), `site-content-tabs.tsx` (navigation).
