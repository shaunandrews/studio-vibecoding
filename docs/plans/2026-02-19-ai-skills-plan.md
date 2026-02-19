# AI Skills Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an AI Skills system to the projects-i0 prototype with a Skills Hub (browse, install, manage, create), per-project skill toggling, slash command autocomplete in chat, and skill banner cards when Kit invokes a skill.

**Architecture:** Skills are a layered concept: prompt template + optional structured capabilities (slash commands, card types). A `useSkills()` singleton composable manages the skill library. The home view gets a Projects|Skills tab switch. Chat gets `/` autocomplete and a `card:skillBanner` card type. Skills are injected into Kit's system prompt per-project.

**Tech Stack:** Vue 3, TypeScript, existing design token system, @wordpress/icons

---

### Task 1: Skill Types & Data Model

**Files:**
- Modify: `src/data/types.ts`

**Step 1: Add skill types to types.ts**

Add after `DesignBriefPickerCardData` interface (after line 204):

```typescript
// --- AI Skills ---

export type SkillCategory = 'content' | 'design' | 'commerce' | 'performance' | 'security' | 'developer'

export interface Skill {
  id: string
  name: string
  description: string
  icon: string
  category: SkillCategory
  author: string
  source: 'built-in' | 'directory' | 'custom'
  systemPrompt: string
  slashCommand?: string
  installed: boolean
  activeProjectIds: string[]
}

export interface SkillBannerCardData {
  skillId: string
  skillName: string
  skillIcon: string
  category: SkillCategory
}
```

**Step 2: Add skillBanner to CardBlock union**

In the `CardBlock` type union (line 85-96), add a new member:

```typescript
  | (BaseCardBlock & { card: 'skillBanner'; data: SkillBannerCardData })
```

**Step 3: Verify build**

Run: `cd /Users/shaun/Developer/Projects/studio-vibecoding/prototypes/projects-i0 && npx vue-tsc --noEmit 2>&1 | head -20`

Note: Build may have existing TS noise — just confirm no new errors from our types.

**Step 4: Commit**

```bash
git add -f prototypes/projects-i0/src/data/types.ts
git commit -m "feat(skills): add Skill and SkillBannerCardData types"
```

---

### Task 2: Seed Skills Data

**Files:**
- Create: `src/data/seed-skills.ts`

**Step 1: Create seed skills file**

```typescript
import type { Skill } from './types'

export const seedSkills: Skill[] = [
  {
    id: 'seo-audit',
    name: 'SEO Audit',
    description: 'Analyze pages for SEO issues, meta tags, and site structure',
    icon: 'search',
    category: 'performance',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are an SEO expert. When the user asks about SEO or you detect SEO-related questions, analyze the site for: title tags, meta descriptions, heading hierarchy, image alt text, internal linking, URL structure, and Core Web Vitals implications. Provide actionable recommendations with priority levels.`,
    slashCommand: '/seo',
    installed: true,
    activeProjectIds: [],
  },
  {
    id: 'a11y-check',
    name: 'Accessibility Check',
    description: 'WCAG compliance review and accessibility recommendations',
    icon: 'universal-access-alt',
    category: 'performance',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are an accessibility expert. Analyze the site for WCAG 2.1 AA compliance: color contrast ratios, keyboard navigation, ARIA labels, semantic HTML, focus management, and screen reader compatibility. Flag issues with severity and provide fixes.`,
    slashCommand: '/a11y',
    installed: true,
    activeProjectIds: [],
  },
  {
    id: 'woo-setup',
    name: 'WooCommerce Setup',
    description: 'Product pages, cart, checkout, and store configuration',
    icon: 'store',
    category: 'commerce',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a WooCommerce expert. Help set up and configure WooCommerce: product types, categories, payment gateways, shipping zones, tax settings, checkout flow, and storefront customization. Reference WooCommerce best practices.`,
    slashCommand: '/woo',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'blog-writer',
    name: 'Blog Writer',
    description: "Draft posts matching the site's voice and tone",
    icon: 'edit',
    category: 'content',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a blog writing assistant. Help draft, edit, and improve blog posts. Match the site's existing tone and style. Suggest headlines, structure content with proper headings, and optimize for readability. Include meta descriptions and suggested tags.`,
    slashCommand: '/blog',
    installed: true,
    activeProjectIds: [],
  },
  {
    id: 'alt-text',
    name: 'Image Alt Text',
    description: 'Generate descriptive alt text for images',
    icon: 'format-image',
    category: 'content',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are an image accessibility specialist. Generate descriptive, concise alt text for images following best practices: describe content and function, keep under 125 characters when possible, avoid "image of" or "picture of" prefixes, and consider context.`,
    slashCommand: '/alt-text',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'color-contrast',
    name: 'Color Contrast',
    description: 'Auto-checks contrast ratios when editing colors',
    icon: 'color-picker',
    category: 'design',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a color accessibility expert. When the user discusses colors or theme changes, automatically check WCAG contrast ratios. Report AA and AAA compliance for text/background combinations. Suggest fixes for failing pairs while maintaining design intent.`,
    installed: true,
    activeProjectIds: [],
  },
  {
    id: 'typography-advisor',
    name: 'Typography Advisor',
    description: 'Font pairing and typographic scale recommendations',
    icon: 'heading',
    category: 'design',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a typography expert grounded in Bringhurst and Butterick. Advise on font pairing, typographic scale, line height, measure, and vertical rhythm. Consider web font loading performance. Suggest Google Fonts pairings with rationale.`,
    slashCommand: '/type',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'perf-audit',
    name: 'Performance Audit',
    description: 'Core Web Vitals and performance analysis',
    icon: 'dashboard',
    category: 'performance',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a web performance expert. Analyze the site for Core Web Vitals (LCP, FID, CLS), asset optimization, caching strategy, code splitting, and loading performance. Provide actionable improvements with estimated impact.`,
    slashCommand: '/perf',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'security-hardening',
    name: 'Security Hardening',
    description: 'WordPress security best practices and hardening',
    icon: 'lock',
    category: 'security',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a WordPress security expert. Advise on security hardening: file permissions, authentication, brute force protection, database security, SSL, security headers, plugin vetting, and update management. Reference OWASP guidelines.`,
    slashCommand: '/secure',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Contact forms, signup forms, and form design',
    icon: 'forms',
    category: 'content',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a form design expert. Help build contact forms, signup forms, surveys, and other form types. Consider UX best practices: progressive disclosure, validation, error messages, accessibility, and spam prevention.`,
    slashCommand: '/form',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'social-media-kit',
    name: 'Social Media Kit',
    description: 'Open Graph tags, social card previews, sharing optimization',
    icon: 'share',
    category: 'content',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a social media optimization expert. Help configure Open Graph tags, Twitter cards, social sharing images, and platform-specific metadata. Preview how links will appear on different platforms.`,
    slashCommand: '/social',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'translation-helper',
    name: 'Translation Helper',
    description: 'i18n guidance and RTL layout support',
    icon: 'translation',
    category: 'content',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are an internationalization expert. Help with translation workflows, locale setup, RTL layout considerations, string extraction, and multilingual content strategy. Reference WordPress i18n best practices.`,
    slashCommand: '/translate',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'analytics-setup',
    name: 'Analytics Setup',
    description: 'GA4, Jetpack Stats, and analytics integration',
    icon: 'chart-bar',
    category: 'performance',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are an analytics expert. Help set up Google Analytics 4, Jetpack Stats, or other analytics tools. Configure goals, events, conversions, and dashboards. Advise on privacy compliance (GDPR, cookie consent).`,
    slashCommand: '/analytics',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'backup-strategy',
    name: 'Backup Strategy',
    description: 'Backup schedules, restore plans, and disaster recovery',
    icon: 'backup',
    category: 'security',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a backup and disaster recovery expert. Help configure backup schedules, retention policies, offsite storage, and restore procedures. Test restore plans and document recovery steps.`,
    slashCommand: '/backup',
    installed: false,
    activeProjectIds: [],
  },
  {
    id: 'dev-mode',
    name: 'Dev Mode',
    description: 'Code snippets, hooks, filters, and PHP development',
    icon: 'code',
    category: 'developer',
    author: 'Kit',
    source: 'built-in',
    systemPrompt: `You are a WordPress developer expert. Help with PHP code snippets, action/filter hooks, custom post types, REST API endpoints, Gutenberg blocks, and theme/plugin development. Follow WordPress coding standards.`,
    slashCommand: '/dev',
    installed: false,
    activeProjectIds: [],
  },
]
```

**Step 2: Commit**

```bash
git add -f prototypes/projects-i0/src/data/seed-skills.ts
git commit -m "feat(skills): add seed skills catalog with 15 skills"
```

---

### Task 3: useSkills() Composable

**Files:**
- Create: `src/data/useSkills.ts`

**Step 1: Create the composable**

```typescript
import { ref, computed } from 'vue'
import type { Skill } from './types'
import { seedSkills } from './seed-skills'

const skills = ref<Skill[]>(structuredClone(seedSkills))

export function useSkills() {
  const installedSkills = computed(() =>
    skills.value.filter(s => s.installed)
  )

  const directorySkills = computed(() =>
    skills.value.filter(s => !s.installed)
  )

  function getSkill(id: string): Skill | undefined {
    return skills.value.find(s => s.id === id)
  }

  function getActiveSkills(projectId: string): Skill[] {
    return skills.value.filter(s => s.installed && s.activeProjectIds.includes(projectId))
  }

  function getSkillPrompt(projectId: string): string {
    const active = getActiveSkills(projectId)
    if (active.length === 0) return ''

    const skillBlocks = active.map(s => {
      const cmd = s.slashCommand ? ` (user can invoke with ${s.slashCommand})` : ' (auto-invoke when relevant)'
      return `### ${s.name}${cmd}\n${s.systemPrompt}`
    }).join('\n\n')

    return `\n\n## Active Skills\n\nYou have the following skills enabled for this project. Use them when relevant. When you use a skill, output a \`card:skillBanner\` fence FIRST, then continue your response.\n\n\`\`\`card:skillBanner\n{ "skillId": "id", "skillName": "Name", "skillIcon": "icon", "category": "category" }\n\`\`\`\n\n${skillBlocks}`
  }

  function installSkill(id: string) {
    const skill = skills.value.find(s => s.id === id)
    if (skill) skill.installed = true
  }

  function uninstallSkill(id: string) {
    const skill = skills.value.find(s => s.id === id)
    if (skill) {
      skill.installed = false
      skill.activeProjectIds = []
    }
  }

  function toggleSkillForProject(skillId: string, projectId: string) {
    const skill = skills.value.find(s => s.id === skillId)
    if (!skill || !skill.installed) return
    const idx = skill.activeProjectIds.indexOf(projectId)
    if (idx >= 0) {
      skill.activeProjectIds.splice(idx, 1)
    } else {
      skill.activeProjectIds.push(projectId)
    }
  }

  function isSkillActiveForProject(skillId: string, projectId: string): boolean {
    const skill = skills.value.find(s => s.id === skillId)
    return !!skill?.activeProjectIds.includes(projectId)
  }

  function createSkill(partial: Omit<Skill, 'installed' | 'activeProjectIds' | 'source'>): Skill {
    const skill: Skill = {
      ...partial,
      source: 'custom',
      installed: true,
      activeProjectIds: [],
    }
    skills.value.push(skill)
    return skill
  }

  function matchSlashCommand(input: string, projectId: string): Skill[] {
    if (!input.startsWith('/')) return []
    const query = input.slice(1).toLowerCase()
    return getActiveSkills(projectId).filter(s =>
      s.slashCommand && s.slashCommand.slice(1).toLowerCase().startsWith(query)
    )
  }

  function getSkillsByCategory(category?: string): Skill[] {
    if (!category) return skills.value
    return skills.value.filter(s => s.category === category)
  }

  return {
    skills,
    installedSkills,
    directorySkills,
    getSkill,
    getActiveSkills,
    getSkillPrompt,
    installSkill,
    uninstallSkill,
    toggleSkillForProject,
    isSkillActiveForProject,
    createSkill,
    matchSlashCommand,
    getSkillsByCategory,
  }
}
```

**Step 2: Commit**

```bash
git add -f prototypes/projects-i0/src/data/useSkills.ts
git commit -m "feat(skills): add useSkills composable with install/toggle/match"
```

---

### Task 4: SkillBannerCard Chat Card

**Files:**
- Create: `src/components/composites/chat-cards/SkillBannerCard.vue`
- Modify: `src/components/composites/ChatMessage.vue`
- Modify: `src/data/ai-service.ts`

**Step 1: Create SkillBannerCard component**

```vue
<script setup lang="ts">
import type { SkillBannerCardData, CardUiState } from '@/data/types'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  data: SkillBannerCardData
  state?: CardUiState
}>()

const CATEGORY_COLORS: Record<string, string> = {
  content: 'var(--color-primary)',
  design: '#8b5cf6',
  commerce: '#059669',
  performance: '#d97706',
  security: '#dc2626',
  developer: '#6366f1',
}

const accentColor = CATEGORY_COLORS[props.data.category] ?? 'var(--color-primary)'

// Resolve WordPress icon by name
const resolvedIcon = wpIcons[props.data.skillIcon as keyof typeof wpIcons] ?? wpIcons.plugins
</script>

<template>
  <div class="skill-banner" :style="{ '--skill-accent': accentColor }">
    <div class="skill-banner__icon">
      <WPIcon :icon="resolvedIcon" :size="16" />
    </div>
    <Text variant="label" class="skill-banner__label">Using {{ data.skillName }}</Text>
  </div>
</template>

<style scoped>
.skill-banner {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xxs) var(--space-s);
  border-radius: var(--radius-s);
  background: color-mix(in srgb, var(--skill-accent) 8%, transparent);
  border-inline-start: 3px solid var(--skill-accent);
  margin-block: var(--space-xxs);
}

.skill-banner__icon {
  color: var(--skill-accent);
  display: flex;
  align-items: center;
}

.skill-banner__label {
  color: var(--skill-accent);
  font-weight: var(--font-weight-medium);
}
</style>
```

**Step 2: Register skillBanner in CARD_TYPES array in ai-service.ts**

In `src/data/ai-service.ts`, line 22, add `'skillBanner'` to the array:

```typescript
const CARD_TYPES = ['plugin', 'colorPalette', 'settings', 'progress', 'themePicker', 'page', 'postDraft', 'themeUpdate', 'sectionEdit', 'skillBanner'] as const
```

**Step 3: Add SkillBannerCard to ChatMessage.vue**

Add import at line 14 (after DesignBriefPickerCard import):

```typescript
import SkillBannerCard from '@/components/composites/chat-cards/SkillBannerCard.vue'
```

Add rendering block after the DesignBriefPickerCard block (after line 127):

```vue
        <SkillBannerCard
          v-else-if="block.type === 'card' && block.card === 'skillBanner'"
          :data="block.data"
          :state="block.state"
        />
```

**Step 4: Commit**

```bash
git add -f prototypes/projects-i0/src/components/composites/chat-cards/SkillBannerCard.vue prototypes/projects-i0/src/components/composites/ChatMessage.vue prototypes/projects-i0/src/data/ai-service.ts
git commit -m "feat(skills): add SkillBannerCard and register in chat system"
```

---

### Task 5: Skill Prompt Injection into AI System Prompt

**Files:**
- Modify: `src/data/ai-system-prompt.ts`
- Modify: `src/components/features/AgentPanel.vue`

**Step 1: Add skillBanner card docs to system prompt**

In `ai-system-prompt.ts`, add after the `card:progress` section (after line 96, before `## Guidelines`):

```typescript
### card:skillBanner
When you use one of your active skills, output this card FIRST before your response. This tells the user which skill you're using.

{
  "skillId": "string (the skill ID)",
  "skillName": "string (display name)",
  "skillIcon": "string (WordPress icon name)",
  "category": "'content' | 'design' | 'commerce' | 'performance' | 'security' | 'developer'"
}

Example:
\`\`\`card:skillBanner
{
  "skillId": "seo-audit",
  "skillName": "SEO Audit",
  "skillIcon": "search",
  "category": "performance"
}
\`\`\`
```

**Step 2: Inject skill prompts in AgentPanel**

In `AgentPanel.vue`, add import:

```typescript
import { useSkills } from '@/data/useSkills'
```

Add after `const { getActions, clearActions } = useInputActions()` (line 25):

```typescript
const { getSkillPrompt } = useSkills()
```

Update the `siteContext` computed (line 37-42) to append skill prompts:

```typescript
const siteContext = computed(() => {
  if (!props.projectId) return undefined
  const site = siteStore.getSite(props.projectId)
  const base = site ? buildSiteContext(site) : undefined
  const skillPrompt = props.projectId ? getSkillPrompt(props.projectId) : ''
  if (!base && !skillPrompt) return undefined
  return (base ?? '') + skillPrompt
})
```

**Step 3: Commit**

```bash
git add -f prototypes/projects-i0/src/data/ai-system-prompt.ts prototypes/projects-i0/src/components/features/AgentPanel.vue
git commit -m "feat(skills): inject active skill prompts into AI system prompt"
```

---

### Task 6: SkillCard Component

**Files:**
- Create: `src/components/composites/SkillCard.vue`

**Step 1: Create SkillCard component**

```vue
<script setup lang="ts">
import type { Skill } from '@/data/types'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Badge from '@/components/primitives/Badge.vue'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  skill: Skill
  mode?: 'card' | 'compact'
  showInstall?: boolean
  activeCount?: number
}>()

const emit = defineEmits<{
  select: [id: string]
  install: [id: string]
  uninstall: [id: string]
}>()

const CATEGORY_COLORS: Record<string, string> = {
  content: 'var(--color-primary)',
  design: '#8b5cf6',
  commerce: '#059669',
  performance: '#d97706',
  security: '#dc2626',
  developer: '#6366f1',
}

const CATEGORY_LABELS: Record<string, string> = {
  content: 'Content',
  design: 'Design',
  commerce: 'Commerce',
  performance: 'Performance',
  security: 'Security',
  developer: 'Developer',
}

const resolvedIcon = wpIcons[props.skill.icon as keyof typeof wpIcons] ?? wpIcons.plugins
</script>

<template>
  <div
    class="skill-card"
    :class="[`mode-${mode ?? 'card'}`]"
    @click="emit('select', skill.id)"
  >
    <div class="skill-card__header hstack gap-xs">
      <div class="skill-card__icon" :style="{ color: CATEGORY_COLORS[skill.category] }">
        <WPIcon :icon="resolvedIcon" :size="24" />
      </div>
      <div class="skill-card__meta vstack gap-xxxs flex-1 min-w-0">
        <Text variant="body" weight="medium" class="skill-card__name">{{ skill.name }}</Text>
        <div class="hstack gap-xxs align-center">
          <span class="skill-card__category" :style="{ color: CATEGORY_COLORS[skill.category] }">
            {{ CATEGORY_LABELS[skill.category] }}
          </span>
          <span v-if="skill.slashCommand" class="skill-card__command">{{ skill.slashCommand }}</span>
        </div>
      </div>
      <div v-if="showInstall" class="skill-card__action shrink-0">
        <Button
          v-if="!skill.installed"
          variant="primary"
          size="small"
          label="Install"
          @click.stop="emit('install', skill.id)"
        />
        <Button
          v-else
          variant="tertiary"
          size="small"
          label="Installed"
          @click.stop="emit('uninstall', skill.id)"
        />
      </div>
    </div>
    <Text variant="caption" color="secondary" class="skill-card__desc">
      {{ skill.description }}
    </Text>
    <div v-if="activeCount !== undefined && activeCount > 0" class="skill-card__active">
      <Text variant="caption" color="muted">Active in {{ activeCount }} {{ activeCount === 1 ? 'project' : 'projects' }}</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  cursor: pointer;
  transition: border-color var(--transition-hover), transform 0.15s ease;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.skill-card:hover {
  border-color: var(--color-text-muted);
  transform: translateY(-1px);
}

.skill-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-s);
  background: var(--color-surface-secondary);
  flex-shrink: 0;
}

.skill-card__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-card__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-card__command {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono, monospace);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
}

.skill-card__desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skill-card.mode-compact {
  padding: var(--space-xs);
}

.skill-card.mode-compact .skill-card__icon {
  width: 32px;
  height: 32px;
}
</style>
```

**Step 2: Commit**

```bash
git add -f prototypes/projects-i0/src/components/composites/SkillCard.vue
git commit -m "feat(skills): add SkillCard component with category colors"
```

---

### Task 7: SkillsList Feature Component

**Files:**
- Create: `src/components/features/SkillsList.vue`

**Step 1: Create SkillsList component**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import SkillCard from '@/components/composites/SkillCard.vue'
import { useSkills } from '@/data/useSkills'

const emit = defineEmits<{
  browse: []
  create: []
  'select-skill': [id: string]
}>()

const { installedSkills, uninstallSkill } = useSkills()

const sortedSkills = computed(() =>
  [...installedSkills.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>

<template>
  <div class="skills-list vstack">
    <div class="skills-list__header hstack justify-between align-center px-m pt-m pb-xs">
      <Text variant="title" color="default">My Skills</Text>
      <Text variant="caption" color="muted">{{ sortedSkills.length }} installed</Text>
    </div>

    <div v-if="sortedSkills.length" class="skills-grid px-m">
      <SkillCard
        v-for="skill in sortedSkills"
        :key="skill.id"
        :skill="skill"
        :active-count="skill.activeProjectIds.length"
        @select="emit('select-skill', $event)"
        @uninstall="uninstallSkill"
      />
    </div>

    <div v-else class="skills-empty vstack gap-s align-center justify-center flex-1 px-m">
      <Text variant="body" color="muted">No skills installed yet</Text>
      <Button variant="primary" label="Browse Skills" @click="emit('browse')" />
    </div>
  </div>
</template>

<style scoped>
.skills-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-m);
  padding-block-end: var(--space-m);
}

.skills-empty {
  min-height: 200px;
}
</style>
```

**Step 2: Commit**

```bash
git add -f prototypes/projects-i0/src/components/features/SkillsList.vue
git commit -m "feat(skills): add SkillsList grid component"
```

---

### Task 8: SkillDirectory Feature Component

**Files:**
- Create: `src/components/features/SkillDirectory.vue`

**Step 1: Create SkillDirectory component**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { chevronLeft } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import SkillCard from '@/components/composites/SkillCard.vue'
import { useSkills } from '@/data/useSkills'
import type { SkillCategory } from '@/data/types'

const emit = defineEmits<{
  back: []
}>()

const { skills, installSkill, uninstallSkill } = useSkills()

const activeCategory = ref<SkillCategory | null>(null)
const searchQuery = ref('')

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'content', label: 'Content' },
  { id: 'design', label: 'Design' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'performance', label: 'Performance' },
  { id: 'security', label: 'Security' },
  { id: 'developer', label: 'Developer' },
]

const filteredSkills = computed(() => {
  let result = skills.value
  if (activeCategory.value) {
    result = result.filter(s => s.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.slashCommand && s.slashCommand.toLowerCase().includes(q))
    )
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div class="skill-directory vstack">
    <div class="skill-directory__header vstack gap-xs px-m pt-m pb-xs">
      <div class="hstack gap-xs align-center">
        <button class="back-btn hstack gap-xxxs align-center" @click="emit('back')">
          <WPIcon :icon="chevronLeft" :size="20" />
          <Text variant="label" color="secondary">Back</Text>
        </button>
        <Text variant="title" color="default" class="flex-1">Browse Skills</Text>
      </div>

      <input
        v-model="searchQuery"
        class="skill-directory__search"
        type="text"
        placeholder="Search skills..."
      />

      <div class="skill-directory__filters hstack gap-xxs flex-wrap">
        <button
          class="filter-chip"
          :class="{ active: !activeCategory }"
          @click="activeCategory = null"
        >All</button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="filter-chip"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = activeCategory === cat.id ? null : cat.id"
        >{{ cat.label }}</button>
      </div>
    </div>

    <div class="skill-directory__grid px-m pb-m">
      <SkillCard
        v-for="skill in filteredSkills"
        :key="skill.id"
        :skill="skill"
        :show-install="true"
        @install="installSkill"
        @uninstall="uninstallSkill"
      />
    </div>

    <div v-if="!filteredSkills.length" class="skills-empty vstack gap-s align-center justify-center flex-1">
      <Text variant="body" color="muted">No skills match your search</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-directory {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xxxs);
  border-radius: var(--radius-s);
  color: var(--color-text-secondary);
  transition: background var(--transition-hover);
}

.back-btn:hover {
  background: var(--color-surface-secondary);
}

.skill-directory__search {
  width: 100%;
  padding: var(--space-xs) var(--space-s);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-m);
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition-focus);
}

.skill-directory__search:focus {
  border-color: var(--color-primary);
}

.skill-directory__search::placeholder {
  color: var(--color-text-muted);
}

.filter-chip {
  padding: var(--space-xxxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-l);
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-hover);
}

.filter-chip:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text);
}

.filter-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.skill-directory__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-m);
}

.skills-empty {
  min-height: 200px;
}
</style>
```

**Step 2: Commit**

```bash
git add -f prototypes/projects-i0/src/components/features/SkillDirectory.vue
git commit -m "feat(skills): add SkillDirectory browse page with category filters"
```

---

### Task 9: Home View Tab Switch (Projects | Skills)

**Files:**
- Modify: `src/layouts/MainLayout.vue`

**Step 1: Add tab state and skills components to MainLayout**

Update the `<script setup>` to add:

```typescript
import { ref } from 'vue'
import SkillsList from '@/components/features/SkillsList.vue'
import SkillDirectory from '@/components/features/SkillDirectory.vue'
```

Add state after the existing composable calls:

```typescript
const homeTab = ref<'projects' | 'skills'>('projects')
const showBrowse = ref(false)

function handleBrowse() {
  showBrowse.value = true
}

function handleBackFromBrowse() {
  showBrowse.value = false
}
```

**Step 2: Update template**

Replace the left-column content. The full left-column block (lines 29-38) becomes:

```vue
      <div
        class="left-column vstack"
        :class="{ 'is-sidebar': mode === 'project' }"
        :style="{ viewTransitionName: mode === 'project' ? 'sidebar' : 'project-grid' }"
      >
        <!-- Tab switch (home mode only) -->
        <div v-if="mode === 'home'" class="home-tabs hstack gap-xxs px-m pt-s pb-xxs">
          <button
            class="home-tab"
            :class="{ active: homeTab === 'projects' && !showBrowse }"
            @click="homeTab = 'projects'; showBrowse = false"
          >Projects</button>
          <button
            class="home-tab"
            :class="{ active: homeTab === 'skills' && !showBrowse }"
            @click="homeTab = 'skills'; showBrowse = false"
          >Skills</button>
        </div>

        <!-- Home: Projects or Skills grid -->
        <template v-if="mode === 'home'">
          <SkillDirectory v-if="showBrowse" class="flex-1 min-h-0" @back="handleBackFromBrowse" />
          <ProjectList v-else-if="homeTab === 'projects'" class="flex-1 min-h-0" mode="grid" @new-project="handleNewProject" />
          <SkillsList v-else class="flex-1 min-h-0" @browse="handleBrowse" />
        </template>

        <!-- Project: Sidebar list -->
        <ProjectList v-else class="flex-1 min-h-0" mode="list" @new-project="handleNewProject" />

        <div class="new-project-footer" v-if="mode === 'home' && homeTab === 'projects' && !showBrowse">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
        <div class="new-project-footer" v-else-if="mode === 'home' && homeTab === 'skills' && !showBrowse">
          <div class="hstack gap-xxs">
            <Button variant="secondary" surface="dark" label="Browse skills" width="full" @click="handleBrowse" />
            <Button variant="secondary" surface="dark" label="Create skill" width="full" />
          </div>
        </div>
        <div class="new-project-footer" v-else-if="mode === 'project'">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
      </div>
```

**Step 3: Add tab styles**

Add to the `<style scoped>` section:

```css
.home-tabs {
  flex-shrink: 0;
}

.home-tab {
  padding: var(--space-xxs) var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-chrome-text-secondary);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover);
}

.home-tab:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.home-tab.active {
  color: var(--color-chrome-text);
  background: var(--color-chrome-hover);
}
```

**Step 4: Commit**

```bash
git add -f prototypes/projects-i0/src/layouts/MainLayout.vue
git commit -m "feat(skills): add Projects|Skills tab switch to home view"
```

---

### Task 10: Per-Project Skill Toggle (SkillToggleMenu)

**Files:**
- Create: `src/components/composites/SkillToggleMenu.vue`
- Modify: `src/components/features/AgentPanel.vue`

**Step 1: Create SkillToggleMenu component**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import Text from '@/components/primitives/Text.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import * as wpIcons from '@wordpress/icons'
import { useSkills } from '@/data/useSkills'

const props = defineProps<{
  projectId: string
}>()

const { installedSkills, toggleSkillForProject, isSkillActiveForProject } = useSkills()

const sortedSkills = computed(() =>
  [...installedSkills.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>

<template>
  <div class="skill-toggle-menu vstack">
    <div class="skill-toggle-menu__header px-s py-xs">
      <Text variant="label" color="secondary">Project Skills</Text>
    </div>
    <div v-if="sortedSkills.length" class="skill-toggle-menu__list vstack">
      <label
        v-for="skill in sortedSkills"
        :key="skill.id"
        class="skill-toggle-item hstack gap-xs px-s py-xxs"
      >
        <input
          type="checkbox"
          :checked="isSkillActiveForProject(skill.id, projectId)"
          class="skill-toggle-checkbox"
          @change="toggleSkillForProject(skill.id, projectId)"
        />
        <WPIcon :icon="(wpIcons as any)[skill.icon] ?? wpIcons.plugins" :size="16" class="skill-toggle-icon" />
        <span class="skill-toggle-name flex-1 min-w-0">{{ skill.name }}</span>
        <span v-if="skill.slashCommand" class="skill-toggle-cmd">{{ skill.slashCommand }}</span>
      </label>
    </div>
    <div v-else class="px-s py-xs">
      <Text variant="caption" color="muted">No skills installed. Browse the directory to add some.</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-toggle-menu {
  min-width: 240px;
  max-width: 320px;
  max-height: 400px;
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-toggle-menu__header {
  border-block-end: 1px solid var(--color-surface-border);
}

.skill-toggle-item {
  cursor: pointer;
  transition: background var(--transition-hover);
  align-items: center;
}

.skill-toggle-item:hover {
  background: var(--color-surface-secondary);
}

.skill-toggle-checkbox {
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.skill-toggle-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.skill-toggle-name {
  font-size: var(--font-size-m);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-toggle-cmd {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono, monospace);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
  flex-shrink: 0;
}
</style>
```

**Step 2: Add skill toggle to AgentPanel toolbar**

In `AgentPanel.vue`, add imports:

```typescript
import { plugins } from '@wordpress/icons'
import SkillToggleMenu from '@/components/composites/SkillToggleMenu.vue'
```

Add state:

```typescript
const showSkillMenu = ref(false)
```

Update the PanelToolbar `#end` slot (around line 258) — add the skills button before the preview toggle:

```vue
      <template #end>
        <div class="skill-menu-wrapper" style="position: relative;">
          <Button variant="tertiary" :icon="plugins"
            :active="showSkillMenu" tooltip="Project skills" @click="showSkillMenu = !showSkillMenu" />
          <Teleport to="body">
            <div v-if="showSkillMenu && projectId" class="skill-menu-popover">
              <SkillToggleMenu :project-id="projectId" />
            </div>
          </Teleport>
        </div>
        <Button variant="tertiary" :icon="drawerRight"
          :active="previewVisible" :tooltip="previewVisible ? 'Hide preview' : 'Show preview'" @click="$emit('toggle-preview')" />
      </template>
```

Add click-outside handling — add to the script section:

```typescript
import { onMounted, onBeforeUnmount } from 'vue'

function onClickOutsideSkillMenu(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (showSkillMenu.value && !target.closest('.skill-menu-wrapper') && !target.closest('.skill-menu-popover')) {
    showSkillMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutsideSkillMenu))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutsideSkillMenu))
```

Add the popover positioning style (scoped or in a small inline style block):

```css
.skill-menu-popover {
  position: fixed;
  top: 60px;
  right: 60px;
  z-index: 100;
}
```

Note: The Teleport + fixed positioning is a simple approach. A more precise approach would compute position from the button's bounding rect, but fixed positioning is fine for the prototype.

**Step 3: Commit**

```bash
git add -f prototypes/projects-i0/src/components/composites/SkillToggleMenu.vue prototypes/projects-i0/src/components/features/AgentPanel.vue
git commit -m "feat(skills): add per-project skill toggle in panel toolbar"
```

---

### Task 11: Slash Command Autocomplete

**Files:**
- Create: `src/components/composites/SkillAutocomplete.vue`
- Modify: `src/components/composites/InputChat.vue`
- Modify: `src/components/features/AgentPanel.vue`

**Step 1: Create SkillAutocomplete component**

```vue
<script setup lang="ts">
import type { Skill } from '@/data/types'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  matches: Skill[]
  selectedIndex: number
}>()

const emit = defineEmits<{
  select: [skill: Skill]
}>()
</script>

<template>
  <div v-if="matches.length" class="skill-autocomplete vstack">
    <button
      v-for="(skill, idx) in matches"
      :key="skill.id"
      class="autocomplete-item hstack gap-xs px-s py-xxs"
      :class="{ selected: idx === selectedIndex }"
      @mousedown.prevent="emit('select', skill)"
    >
      <WPIcon :icon="(wpIcons as any)[skill.icon] ?? wpIcons.plugins" :size="16" class="autocomplete-icon" />
      <span class="autocomplete-command">{{ skill.slashCommand }}</span>
      <Text variant="caption" color="muted" class="autocomplete-desc flex-1 min-w-0">{{ skill.name }}</Text>
    </button>
  </div>
</template>

<style scoped>
.skill-autocomplete {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  padding: var(--space-xxxs);
}

.autocomplete-item {
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  text-align: start;
  align-items: center;
  transition: background var(--transition-hover);
}

.autocomplete-item:hover,
.autocomplete-item.selected {
  background: var(--color-surface-secondary);
}

.autocomplete-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.autocomplete-command {
  font-family: var(--font-family-mono, monospace);
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  flex-shrink: 0;
}

.autocomplete-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```

**Step 2: Add autocomplete support to InputChat**

Add new props and imports to InputChat.vue:

Add to imports:
```typescript
import SkillAutocomplete from '@/components/composites/SkillAutocomplete.vue'
import type { Skill } from '@/data/types'
```

Add new props:
```typescript
  slashMatches?: Skill[]
```

Add new emit:
```typescript
  'slash-input': [query: string]
  'slash-select': [skill: Skill]
```

Add state:
```typescript
const slashSelectedIndex = ref(0)
```

Update the `onKeydown` function — add slash command handling before the existing number key block:

```typescript
  // Slash command navigation
  if (props.slashMatches?.length) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      slashSelectedIndex.value = Math.min(slashSelectedIndex.value + 1, props.slashMatches.length - 1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      slashSelectedIndex.value = Math.max(slashSelectedIndex.value - 1, 0)
      return
    }
    if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault()
      const selected = props.slashMatches[slashSelectedIndex.value]
      if (selected) {
        emit('slash-select', selected)
        slashSelectedIndex.value = 0
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      message.value = ''
      slashSelectedIndex.value = 0
      return
    }
  }
```

Add a watcher for slash input detection (add to script):

```typescript
import { watch } from 'vue'

watch(message, (val) => {
  if (val.startsWith('/')) {
    emit('slash-input', val)
    slashSelectedIndex.value = 0
  } else {
    emit('slash-input', '')
  }
})
```

Add the autocomplete dropdown to the template, just before the textarea (before line 206):

```vue
    <!-- Slash command autocomplete -->
    <SkillAutocomplete
      v-if="slashMatches?.length"
      :matches="slashMatches"
      :selected-index="slashSelectedIndex"
      @select="(skill) => { $emit('slash-select', skill); slashSelectedIndex = 0 }"
    />
```

**Step 3: Wire autocomplete in AgentPanel**

In `AgentPanel.vue`, add:

```typescript
const { getSkillPrompt, matchSlashCommand, getSkill } = useSkills()
```

Add state:

```typescript
const slashMatches = ref<Skill[]>([])

function handleSlashInput(query: string) {
  if (!query || !props.projectId) {
    slashMatches.value = []
    return
  }
  slashMatches.value = matchSlashCommand(query, props.projectId)
}

function handleSlashSelect(skill: Skill) {
  if (skill.slashCommand) {
    currentDraft.value = skill.slashCommand + ' '
  }
  slashMatches.value = []
}
```

Update the InputChat in the template:

```vue
<InputChat
  ref="inputChatRef"
  v-model="currentDraft"
  :placeholder="inputPlaceholder"
  :actions="inputActions"
  :slash-matches="slashMatches"
  @send="handleSend"
  @action="handleAction"
  @slash-input="handleSlashInput"
  @slash-select="handleSlashSelect"
/>
```

**Step 4: Commit**

```bash
git add -f prototypes/projects-i0/src/components/composites/SkillAutocomplete.vue prototypes/projects-i0/src/components/composites/InputChat.vue prototypes/projects-i0/src/components/features/AgentPanel.vue
git commit -m "feat(skills): add slash command autocomplete in chat input"
```

---

### Task 12: Verify & Polish

**Step 1: Run dev server and verify**

```bash
cd /Users/shaun/Developer/Projects/studio-vibecoding/prototypes/projects-i0 && npm run dev
```

Manual verification checklist:
- [ ] Home view shows Projects | Skills tabs
- [ ] Skills tab shows installed skills grid
- [ ] Browse Skills page shows all 15 skills with category filters
- [ ] Install/uninstall toggles work
- [ ] Project view: puzzle-piece icon opens skill toggle menu
- [ ] Toggling skills on/off per project works
- [ ] Typing `/` in chat input shows autocomplete for active project skills
- [ ] Arrow keys navigate autocomplete, Tab/Enter selects
- [ ] SkillBannerCard renders when included in AI response

**Step 2: Final commit**

After any fixes:

```bash
git add -f prototypes/projects-i0/src/
git commit -m "feat(skills): polish and verify AI Skills Hub integration"
```
