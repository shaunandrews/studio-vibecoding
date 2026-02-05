# Studio Vibecoding

Transforming WordPress Studio into a vibe coding workbench with AI agent integration.

## Overview

James LePage's initiative to bring AI-powered development workflows directly into Studio. The vision: developers can use their preferred AI coding agents (Claude Code, OpenCode, Codex) within Studio, with artifact generation and sync to WordPress.com.

## Key Features (Proposed)

- **ACP Integration** — Third-party agent support (Claude Code, OpenCode, Codex CLI)
- **Native Local Agent** — Built-in AI assistance
- **Agents.md + Skills** — Standard agent configuration support
- **Telex CLI** — Artifact generation tooling
- **wpcom Sync** — Monetization via sync to WordPress.com (AI features not gated)

## Team

- **James LePage** — Project lead
- **Eduardo** — Looped in for UI experimentation
- **Shaun** — UI experimentation
- **Riad** — Stakeholder (prioritizes CLI over app)

## References

- **Draft PR:** [Automattic/studio#2511](https://github.com/Automattic/studio/pull/2511)
- **James's P2:** (internal)

## Documentation

| Doc | Description |
|-----|-------------|
| [summary.md](docs/summary.md) | Executive summary of the initiative |
| [james-p2-post.md](docs/james-p2-post.md) | James LePage's original P2 post |
| [pablo-p2-post.md](docs/pablo-p2-post.md) | Pablo Postigo's Claude Cowork + Studio experiment |
| [comments.md](docs/comments.md) | Community feedback compilation |

## Structure

```
studio-vibecoding/
├── docs/          # Documentation
├── logs/          # Development logs (git-ignored)
└── README.md      # This file
```

## Status

Early exploration phase. Shaun's involvement: UI experimentation.

## Open Questions

- CLI vs app priority (Riad leans CLI)
- Overlap with WP Cowork Plugin project
- UI patterns for agent integration
