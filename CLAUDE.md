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

Studio uses the Electron 3-process model. See `studio/docs/ai-instructions.md` for detailed architecture, IPC patterns, and conventions.
