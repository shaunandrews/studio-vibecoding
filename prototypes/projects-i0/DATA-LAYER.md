# Data Layer Plan

## Approach: Composables with Reactive State + Seed Data

**No Pinia. No JSON server. No localStorage.** Just Vue composables (`ref`/`reactive`) initialized from typed seed data objects.

### Rationale
- Zero new dependencies — works with what's already in `package.json`
- Instant hot-reload of seed data (just edit the TS files)
- Composables are the idiomatic Vue 3 pattern and the simplest thing that works
- Prototype doesn't need persistence — refreshing back to seed state is a *feature* (always returns to a known good state for demos)

---

## TypeScript Interfaces

```ts
// src/data/types.ts

export type ProjectStatus = 'running' | 'stopped' | 'loading'

export interface Project {
  id: string
  name: string
  favicon: string          // URL (dicebear or local)
  status: ProjectStatus
  url: string              // e.g. "http://localhost:8881"
  createdAt: string        // ISO date
  description?: string
}

export type AgentId = 'assistant' | 'code' | 'design'

export interface Agent {
  id: AgentId
  label: string            // "Site Assistant", "Code Agent", "Design Agent"
  description: string
  avatar?: string
}

export interface Conversation {
  id: string
  projectId: string | null  // null = global (home screen)
  agentId: AgentId
  title?: string            // optional display title
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  role: 'user' | 'agent'
  agentId?: AgentId         // which agent sent it (when role=agent)
  content: string
  timestamp: string         // ISO datetime
}
```

---

## Folder Structure

```
src/data/
  types.ts              # Interfaces above
  agents.ts             # Agent definitions (static, never changes)
  seed-projects.ts      # Project seed data
  seed-conversations.ts # Conversation + Message seed data
  useProjects.ts        # Composable: project CRUD
  useConversations.ts   # Composable: conversations + messages
  useAgents.ts          # Composable: agent list (trivial)
```

---

## Seed Data

### `src/data/agents.ts`

```ts
import type { Agent } from './types'

export const agents: Agent[] = [
  {
    id: 'assistant',
    label: 'Site Assistant',
    description: 'General WordPress help — content, settings, plugins, troubleshooting.',
  },
  {
    id: 'code',
    label: 'Code Agent',
    description: 'Theme and plugin development, custom code, PHP/JS/CSS.',
  },
  {
    id: 'design',
    label: 'Design Agent',
    description: 'Visual design, layout, typography, colors, block styling.',
  },
]
```

### `src/data/seed-projects.ts`

```ts
import type { Project } from './types'

export const seedProjects: Project[] = [
  {
    id: 'downstreet-cafe',
    name: 'Downstreet Cafe',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=cafe',
    status: 'running',
    url: 'http://localhost:8881',
    createdAt: '2025-11-15T10:00:00Z',
    description: 'A cozy neighborhood coffee shop website.',
  },
  {
    id: 'shauns-blog',
    name: "Shaun's Blog",
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=blog',
    status: 'running',
    url: 'http://localhost:8882',
    createdAt: '2025-09-01T14:30:00Z',
    description: 'Personal blog about design and technology.',
  },
  {
    id: 'ui-portfolio',
    name: 'UI Portfolio',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=portfolio',
    status: 'stopped',
    url: 'http://localhost:8883',
    createdAt: '2026-01-20T09:00:00Z',
    description: 'Portfolio showcasing UI/UX design work.',
  },
  {
    id: 'flavor-records',
    name: 'Flavor Records',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=records',
    status: 'running',
    url: 'http://localhost:8884',
    createdAt: '2026-02-01T16:00:00Z',
    description: 'Independent record label and music blog.',
  },
]
```

### `src/data/seed-conversations.ts`

One file exports both conversations and messages. Each project gets 1-2 conversations (one with the assistant, maybe one with another agent). Plus one global conversation for the home screen.

```ts
import type { Conversation, Message } from './types'

export const seedConversations: Conversation[] = [
  // Global (home screen)
  { id: 'global-1', projectId: null, agentId: 'assistant', title: 'Getting started', createdAt: '2026-02-10T08:00:00Z' },

  // Shaun's Blog
  { id: 'blog-assistant-1', projectId: 'shauns-blog', agentId: 'assistant', title: 'Hero section redesign', createdAt: '2026-02-12T10:00:00Z' },
  { id: 'blog-code-1', projectId: 'shauns-blog', agentId: 'code', title: 'Custom block development', createdAt: '2026-02-11T14:00:00Z' },

  // Downstreet Cafe
  { id: 'cafe-assistant-1', projectId: 'downstreet-cafe', agentId: 'assistant', title: 'Menu page setup', createdAt: '2026-02-09T11:00:00Z' },
  { id: 'cafe-design-1', projectId: 'downstreet-cafe', agentId: 'design', title: 'Color palette refresh', createdAt: '2026-02-10T15:00:00Z' },

  // UI Portfolio
  { id: 'portfolio-assistant-1', projectId: 'ui-portfolio', agentId: 'assistant', title: 'Initial setup', createdAt: '2026-01-20T09:30:00Z' },

  // Flavor Records
  { id: 'records-design-1', projectId: 'flavor-records', agentId: 'design', title: 'Album grid layout', createdAt: '2026-02-05T13:00:00Z' },
]

export const seedMessages: Message[] = [
  // Global conversation
  { id: 'g1-1', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: "Welcome to WordPress Studio! I can help you create a new project, or you can select an existing one from the sidebar. What would you like to do?", timestamp: '2026-02-10T08:00:00Z' },
  { id: 'g1-2', conversationId: 'global-1', role: 'user', content: "I want to create a new site for a record label.", timestamp: '2026-02-10T08:01:00Z' },
  { id: 'g1-3', conversationId: 'global-1', role: 'agent', agentId: 'assistant', content: "Great idea! I'll set up a new WordPress project called \"Flavor Records.\" I'll pick a starter theme that works well for music and media sites. Give me just a moment…", timestamp: '2026-02-10T08:01:30Z' },

  // Shaun's Blog — assistant
  { id: 'ba1-1', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Hello! I'm your site assistant. I can help you build, customize, and manage your WordPress site. What would you like to work on?", timestamp: '2026-02-12T10:00:00Z' },
  { id: 'ba1-2', conversationId: 'blog-assistant-1', role: 'user', content: "I want to change the hero section on my homepage to have a gradient background and bigger text.", timestamp: '2026-02-12T10:01:00Z' },
  { id: 'ba1-3', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "I'll update your hero section with a gradient background and increase the heading size. Let me make those changes to your theme now.", timestamp: '2026-02-12T10:01:30Z' },
  { id: 'ba1-4', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Done! I've applied a subtle blue-to-purple gradient to the hero background and bumped the heading from 48px to 64px. The subheading is now 20px. Take a look at the preview — does that feel right?", timestamp: '2026-02-12T10:02:00Z' },
  { id: 'ba1-5', conversationId: 'blog-assistant-1', role: 'user', content: "Love the gradient! But can you make the text white so it's easier to read?", timestamp: '2026-02-12T10:03:00Z' },
  { id: 'ba1-6', conversationId: 'blog-assistant-1', role: 'agent', agentId: 'assistant', content: "Of course — I've set all hero text to white with a subtle text shadow for extra contrast. The preview should update in a moment.", timestamp: '2026-02-12T10:03:30Z' },

  // Shaun's Blog — code
  { id: 'bc1-1', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: "I'm the code agent. I can help you write custom blocks, modify theme templates, or debug PHP/JS issues. What are we building?", timestamp: '2026-02-11T14:00:00Z' },
  { id: 'bc1-2', conversationId: 'blog-code-1', role: 'user', content: "I need a custom 'project showcase' block that displays a grid of portfolio items with images and descriptions.", timestamp: '2026-02-11T14:01:00Z' },
  { id: 'bc1-3', conversationId: 'blog-code-1', role: 'agent', agentId: 'code', content: "I'll scaffold a custom block called `project-showcase`. It'll register with `block.json`, use `InnerBlocks` for each project card, and render as a responsive CSS Grid. Let me generate the files.", timestamp: '2026-02-11T14:01:30Z' },

  // Downstreet Cafe — assistant
  { id: 'ca1-1', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: "Hi there! Let's get your cafe site looking great. What would you like to work on first?", timestamp: '2026-02-09T11:00:00Z' },
  { id: 'ca1-2', conversationId: 'cafe-assistant-1', role: 'user', content: "I need a menu page with sections for coffee, pastries, and lunch items.", timestamp: '2026-02-09T11:01:00Z' },
  { id: 'ca1-3', conversationId: 'cafe-assistant-1', role: 'agent', agentId: 'assistant', content: "I'll create a new \"Menu\" page with three sections. Each section will have a heading, a description, and a list of items with names and prices. Want me to add some placeholder items to start?", timestamp: '2026-02-09T11:01:30Z' },
  { id: 'ca1-4', conversationId: 'cafe-assistant-1', role: 'user', content: "Yes please!", timestamp: '2026-02-09T11:02:00Z' },

  // Downstreet Cafe — design
  { id: 'cd1-1', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: "I'm the design agent — I focus on visual styling, layout, and typography. What are we refining?", timestamp: '2026-02-10T15:00:00Z' },
  { id: 'cd1-2', conversationId: 'cafe-design-1', role: 'user', content: "The color palette feels too corporate. I want something warmer — earthy tones, maybe terracotta and cream.", timestamp: '2026-02-10T15:01:00Z' },
  { id: 'cd1-3', conversationId: 'cafe-design-1', role: 'agent', agentId: 'design', content: "Great instinct. I'll swap the palette to: Terracotta (#C2703E) for accents, Cream (#FFF8F0) for backgrounds, Espresso (#3B2314) for text, and Sage (#A8B5A0) as a secondary. Updating your theme.json now.", timestamp: '2026-02-10T15:01:30Z' },

  // UI Portfolio — assistant
  { id: 'pa1-1', conversationId: 'portfolio-assistant-1', role: 'agent', agentId: 'assistant', content: "Your portfolio project is set up. I've applied a minimal starter theme — perfect for showcasing design work. What's your first priority?", timestamp: '2026-01-20T09:30:00Z' },
  { id: 'pa1-2', conversationId: 'portfolio-assistant-1', role: 'user', content: "I want a clean homepage with a brief intro and then a grid of case studies below.", timestamp: '2026-01-20T09:31:00Z' },

  // Flavor Records — design
  { id: 'rd1-1', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: "Let's make this record label site look as good as the music sounds. What vibe are we going for?", timestamp: '2026-02-05T13:00:00Z' },
  { id: 'rd1-2', conversationId: 'records-design-1', role: 'user', content: "Think vinyl-era nostalgia meets modern minimal. Dark backgrounds, bold type, album art as the hero element.", timestamp: '2026-02-05T13:01:00Z' },
  { id: 'rd1-3', conversationId: 'records-design-1', role: 'agent', agentId: 'design', content: "Love it. I'll set up a dark theme with off-black (#1A1A1A), warm white (#F5F0EB) text, and a large album grid as the centerpiece of the homepage. Typography will be a heavy sans-serif for headings. Let me draft the layout.", timestamp: '2026-02-05T13:01:30Z' },
]
```

---

## Composables

### `src/data/useAgents.ts`

```ts
import { agents } from './agents'
import type { Agent, AgentId } from './types'

export function useAgents() {
  function getAgent(id: AgentId): Agent | undefined {
    return agents.find(a => a.id === id)
  }

  return {
    agents,    // readonly array, no reactivity needed
    getAgent,
  }
}
```

### `src/data/useProjects.ts`

```ts
import { ref, computed } from 'vue'
import { seedProjects } from './seed-projects'
import type { Project, ProjectStatus } from './types'

// Module-level state (singleton — shared across all components)
const projects = ref<Project[]>(structuredClone(seedProjects))
const activeProjectId = ref<string | null>(null)  // ⚠️ Must be module-level for singleton behavior

const activeProject = computed(() =>
  projects.value.find(p => p.id === activeProjectId.value) ?? null
)

export function useProjects() {
  function setStatus(projectId: string, status: ProjectStatus) {
    const p = projects.value.find(p => p.id === projectId)
    if (p) p.status = status
  }

  return {
    projects,
    activeProjectId,
    activeProject,
    setStatus,
  }
}
```

### `src/data/useConversations.ts`

> **Design note:** Avoid calling `getConversations()` etc. inside `computed()` or render —
> each call creates a new `computed`, leaking watchers. Instead, call once in `setup()` and
> store the result. Alternatively, accept a `Ref` parameter and use it inside a single computed.

```ts
import { ref, computed, type Ref, unref } from 'vue'
import { seedConversations, seedMessages } from './seed-conversations'
import type { Conversation, Message, AgentId } from './types'

// Module-level state (singleton)
const conversations = ref<Conversation[]>(structuredClone(seedConversations))
const messages = ref<Message[]>(structuredClone(seedMessages))

export function useConversations() {
  // Get conversations for a project (pass null for global)
  // Accepts a ref so callers can use a reactive projectId without recreating the computed
  function getConversations(projectId: Ref<string | null> | string | null) {
    return computed(() =>
      conversations.value.filter(c => c.projectId === unref(projectId))
    )
  }

  // Get conversation for a specific project + agent combo
  function getConversation(projectId: Ref<string | null> | string | null, agentId: Ref<AgentId> | AgentId) {
    return computed(() =>
      conversations.value.find(c => c.projectId === unref(projectId) && c.agentId === unref(agentId)) ?? null
    )
  }

  // Get messages for a conversation
  function getMessages(conversationId: Ref<string | null> | string | null) {
    return computed(() => {
      const id = unref(conversationId)
      if (!id) return []
      return messages.value
        .filter(m => m.conversationId === id)
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    })
  }

  // Create a conversation on-the-fly (needed when user switches to an agent tab with no prior history)
  function ensureConversation(projectId: string | null, agentId: AgentId): Conversation {
    const existing = conversations.value.find(c => c.projectId === projectId && c.agentId === agentId)
    if (existing) return existing
    const conv: Conversation = {
      id: `conv-${Date.now()}`,
      projectId,
      agentId,
      createdAt: new Date().toISOString(),
    }
    conversations.value.push(conv)
    return conv
  }

  // Send a message (adds to reactive array)
  function sendMessage(conversationId: string, role: 'user' | 'agent', content: string, agentId?: AgentId) {
    messages.value.push({
      id: `msg-${Date.now()}`,
      conversationId,
      role,
      agentId,
      content,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    conversations,
    messages,
    getConversations,
    getConversation,
    getMessages,
    ensureConversation,
    sendMessage,
  }
}
```

---

## Usage Patterns

### Sidebar — listing projects

```vue
<script setup lang="ts">
import { useProjects } from '@/data/useProjects'
const { projects, activeProjectId } = useProjects()
</script>

<template>
  <ProjectListItem
    v-for="p in projects"
    :key="p.id"
    :name="p.name"
    :favicon="p.favicon"
    :status="p.status"
    :active="p.id === activeProjectId"
    @select="activeProjectId = p.id"
  />
</template>
```

### AgentPanel — showing messages for current project + agent tab

```vue
<script setup lang="ts">
import { ref, computed, toRef } from 'vue'
import { useConversations } from '@/data/useConversations'
import { useAgents } from '@/data/useAgents'
import type { AgentId } from '@/data/types'

const props = defineProps<{ projectId: string | null }>()

const { agents } = useAgents()
const { getConversation, getMessages, ensureConversation, sendMessage } = useConversations()

const activeAgentId = ref<AgentId>('assistant')

// Pass refs so these computeds react to prop/ref changes without recreating
const projectIdRef = toRef(props, 'projectId')
const conversation = getConversation(projectIdRef, activeAgentId)

const conversationId = computed(() => conversation.value?.id ?? null)
const msgs = getMessages(conversationId)

function handleSend(text: string) {
  // Lazily create conversation if this agent tab has no history yet
  const conv = ensureConversation(props.projectId, activeAgentId.value)
  sendMessage(conv.id, 'user', text)
}
</script>
```

### Router — project pages

Add a route like `/project/:id` that sets `activeProjectId` and renders `AppShell` with the project context. The composable is a singleton so all components share the same state.

```ts
// suggested route addition
{ path: '/project/:id', component: () => import('./pages/AppShell.vue') }
```

In `AppShell.vue`, read the route param and pass it down:
```ts
const route = useRoute()
const projectId = computed(() => route.params.id as string)
```

---

## Path Alias

Add `@` alias in `vite.config.ts` (if not already present) so imports are clean:

```ts
resolve: {
  alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
}
```

---

## Migration Checklist

1. Create `src/data/` folder with all files above
2. Add `@` alias to vite config + `tsconfig.json`
3. Replace hardcoded project list in `Sidebar.vue` → use `useProjects()`
4. Replace hardcoded agent tabs in `AgentPanel.vue` → use `useAgents()`
5. Replace hardcoded messages in `AgentPanel.vue` → use `useConversations()`
6. Wire up router with `/project/:id` route
7. Pass `projectId` from route into `AgentPanel` to scope conversations

Each step is independent and can be done incrementally. The hardcoded data keeps working until each component is migrated.

---

## Review Findings (2026-02-13)

Issues found and addressed in this doc:

1. **`activeProjectId` was not a singleton.** It was declared inside `useProjects()`, so each component calling the composable got its own independent ref. Moved to module-level scope alongside `projects`.

2. **No way to create conversations.** `sendMessage` assumed a conversation already existed. Added `ensureConversation(projectId, agentId)` which lazily creates one. Without this, switching to an agent tab with no seed data would silently fail.

3. **Computed-factory footgun.** `getConversations()`, `getConversation()`, `getMessages()` each returned a *new* `computed()` on every call. If called inside another `computed` or during render, this leaks watchers and defeats caching. Fixed by accepting `Ref` parameters (via `unref()`) so callers create the computed once in `setup()` and it reacts to ref changes automatically. Added design note warning.

4. **Minor inconsistencies with existing components:**
   - ViewHome has a "Client Project" not in seed data (replaced by "Flavor Records") — intentional; seed data reflects the narrative where the user *created* Flavor Records via chat.
   - ViewHome uses `.local` URLs; seed data uses `localhost:port` — seed data format is correct for Studio's actual behavior.
   - AgentPanel usage example was missing `AgentId` type import and `ensureConversation` call.

5. **Edge case: `getMessages` with null conversationId.** Updated to accept nullable ref and return empty array when null, preventing errors when no conversation exists yet.
