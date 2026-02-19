# AI Skills Hub — Design

## Overview

Add an AI Skills system to the projects-i0 prototype. Skills are layered: a prompt template that changes how Kit behaves, plus optional structured capabilities (slash commands, custom card types, input schemas). Users install skills globally from a curated directory, toggle them per-project, and create custom skills through conversation with Kit.

## Data Model

```typescript
interface Skill {
  id: string                    // e.g. 'seo-audit', 'woo-products'
  name: string                  // "SEO Audit"
  description: string           // One-liner
  icon: string                  // WP dashicon name or emoji
  category: SkillCategory
  author: string                // "Kit" for built-in, user name for custom
  source: 'built-in' | 'directory' | 'custom'

  // Prompt layer
  systemPrompt: string          // Injected into Kit's system prompt when active

  // Capability layer (optional)
  slashCommand?: string         // e.g. '/seo' — omit for passive skills
  cardType?: string             // Custom card type this skill can produce
  inputSchema?: object          // Structured input for slash command args

  // State
  installed: boolean
  activeProjectIds: string[]    // Projects with this skill toggled on
}

type SkillCategory = 'content' | 'design' | 'commerce' | 'performance' | 'security' | 'developer'
```

## Composable: `useSkills()`

Singleton composable, same pattern as `useProjects()`.

```
skills: Ref<Skill[]>              All known skills (seed + installed + custom)
installedSkills: computed          Filtered to installed
getActiveSkills(projectId)         Skills toggled on for a project
getSkillPrompt(projectId)          Concatenated system prompt for active skills
installSkill(id)                   Mark as installed
uninstallSkill(id)                 Remove
toggleSkillForProject(id, projId)  Toggle on/off per project
createSkill(definition)            Add custom skill
matchSlashCommand(input)           Autocomplete matching for '/' prefix
```

## Navigation & Routing

Home view gets a tab bar: **Projects** | **Skills**.

| Route | Path | Description |
|-------|------|-------------|
| skills | `/skills` | My Skills grid |
| skills-browse | `/skills/browse` | Curated directory |
| skills-create | `/skills/create` | Chat-based creation |

All use `layout: 'main', mode: 'home'` — same MainLayout as the project grid.

## My Skills Grid (`/skills`)

Same grid layout as ProjectList but with SkillCards.

**SkillCard:** icon + name + category badge + one-line description + active project count. Click opens detail view (full description, prompt preview, project toggles, remove button).

Footer buttons: **Browse Skills** + **Create Skill** (same placement as "New Project").

## Browse Directory (`/skills/browse`)

Category filter chips at top: Content, Design, Commerce, Performance, Security, Developer.

Grid of SkillCards from the curated catalog (~15 seed skills). Search bar. Each card shows Install button; installed skills show a checkmark.

## Seed Skills (~15)

| Skill | Category | Command | Description |
|-------|----------|---------|-------------|
| SEO Audit | performance | `/seo` | Page SEO analysis, meta tags, structure |
| Accessibility Check | performance | `/a11y` | WCAG compliance review |
| WooCommerce Setup | commerce | `/woo` | Products, cart, checkout config |
| Blog Writer | content | `/blog` | Draft posts in site voice/tone |
| Image Alt Text | content | `/alt-text` | Generate descriptive alt text |
| Color Contrast | design | — | Auto-checks contrast when editing colors |
| Typography Advisor | design | `/type` | Font pairing and scale recs |
| Performance Audit | performance | `/perf` | Core Web Vitals analysis |
| Security Hardening | security | `/secure` | WordPress security best practices |
| Form Builder | content | `/form` | Contact/signup forms |
| Social Media Kit | content | `/social` | OG tags, social card previews |
| Translation Helper | content | `/translate` | i18n guidance, RTL support |
| Analytics Setup | performance | `/analytics` | GA4, Jetpack Stats integration |
| Backup Strategy | security | `/backup` | Backup schedules, restore plans |
| Dev Mode | developer | `/dev` | Code snippets, hooks, filters |

## Skill Creation (`/skills/create`)

Opens a special conversation with Kit in "skill builder" mode. Kit asks what the skill should do, what category, whether it needs a slash command, what kind of output. Kit generates the skill definition through conversation (similar to onboarding). At the end, Kit shows a preview card — user confirms, saved to My Skills with `source: 'custom'`.

## Per-Project Toggle

Panel toolbar in project view gets a puzzle-piece icon button. Opens a flyout listing installed skills with on/off toggles per project. Active skills get their `systemPrompt` appended to Kit's system prompt for that project context.

## Chat Integration

### Slash Commands with Autocomplete

User types `/` in the input → dropdown appears above input showing matching active skills for the current project. Filtered as they type. Each row: icon + name + short description. Enter/click selects and inserts `/skill-name`.

### Banner Card

When Kit invokes a skill, it outputs a `card:skillBanner` fence at the top of its response. Compact card: skill icon + "Using [Skill Name]" + subtle category accent. Response flows normally below.

### Kit Auto-Invocation

Active skills are listed in Kit's system prompt with instructions to use them when relevant and output a `card:skillBanner` fence when doing so. Kit decides autonomously based on conversation context.

## Components

| Component | Type | Purpose |
|-----------|------|---------|
| `SkillCard.vue` | composite | Card for grid display |
| `SkillDetail.vue` | composite | Expanded detail view |
| `SkillDirectory.vue` | feature | Browse page with filters + search |
| `SkillBannerCard.vue` | chat-card | "Using [Skill]" banner in messages |
| `SkillAutocomplete.vue` | composite | Slash command dropdown in InputChat |
| `SkillToggleMenu.vue` | composite | Per-project flyout in Panel toolbar |
