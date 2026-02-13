# Component Architecture Plan

> WordPress Studio redesign prototype — Vue 3 + Vite + TypeScript

---

## 1. Folder Structure

```
src/
├── components/
│   ├── primitives/          # Atomic design tokens, no business logic
│   │   ├── Button.vue
│   │   ├── Text.vue
│   │   ├── WPIcon.vue
│   │   ├── Dropdown.vue
│   │   ├── StatusIndicator.vue
│   │   ├── Avatar.vue            ← NEW
│   │   └── Badge.vue             ← NEW
│   │
│   ├── composites/          # Multi-primitive combos, still generic
│   │   ├── Panel.vue
│   │   ├── PanelToolbar.vue
│   │   ├── InputChat.vue
│   │   ├── ChatMessage.vue
│   │   ├── ChatMessageList.vue   ← NEW (extracted from AgentPanel)
│   │   ├── TabBar.vue            ← NEW (extracted from AgentPanel)
│   │   ├── ProjectCard.vue       ← NEW
│   │   └── ProjectListItem.vue
│   │
│   ├── features/            # Screen-specific, business-aware
│   │   ├── AgentPanel.vue        (slimmed — composes TabBar + ChatMessageList + InputChat)
│   │   ├── SitePreview.vue
│   │   ├── Sidebar.vue
│   │   ├── ProjectGrid.vue       ← NEW
│   │   ├── HomeChat.vue          ← NEW
│   │   └── OnboardingEmpty.vue   ← NEW
│   │
│   └── layouts/             # Structural wrappers, no visual styling beyond positioning
│       ├── Titlebar.vue
│       ├── AppChrome.vue         ← NEW (titlebar + chrome bg — shared by all screens)
│       └── SplitLayout.vue       ← NEW (generic resizable two-pane)
│
├── data/                    # Types, seed data, composables (see DATA-LAYER.md)
│   ├── types.ts
│   ├── agents.ts
│   ├── seed-projects.ts
│   ├── seed-conversations.ts
│   ├── useProjects.ts
│   ├── useConversations.ts
│   └── useAgents.ts
│
├── pages/
│   ├── Index.vue                 (dev index — keep as-is)
│   ├── HomePage.vue              ← NEW
│   ├── ProjectPage.vue           ← NEW (rename/evolve AppShell)
│   ├── SettingsPage.vue          ← NEW (stub)
│   ├── DesignSystem.vue
│   └── Components.vue
│
└── router.ts
```

### Migration notes

- Move existing files into subfolders. Update all imports.
- Barrel exports optional — direct imports are fine for a prototype.
- Keep `pages/` flat; they're route-level, not reusable.

---

## 2. Shared Types

> **All types live in `src/data/types.ts`** — defined in DATA-LAYER.md. Do not duplicate.
>
> Components import from `@/data/types`. Key types used by components:
> - `Project` — id, name, favicon, status (`ProjectStatus`), url, createdAt, description
> - `Agent` / `AgentId` — id (union: `'assistant' | 'code' | 'design'`), label, description, avatar
> - `Conversation` — id, projectId, agentId, title, createdAt
> - `Message` — id, conversationId, role, agentId, content, timestamp (ISO string)
>
> **No separate `ChatMessageData` or `AgentTab` types.** Use `Message` and `Agent` directly.

---

## 3. Component Tree per Screen

### Home (`HomePage.vue`)

```
AppChrome
├── Titlebar
└── .home-body (hstack)
    ├── Sidebar (same component, different data context)
    └── .home-main (vstack, flex-1)
        ├── OnboardingEmpty          ← shown when projects.length === 0
        │   ├── Text (heading)
        │   ├── Text (description)
        │   └── Button (primary, "Create your first site")
        │
        ├── ProjectGrid              ← shown when projects.length > 0
        │   └── ProjectCard (v-for)
        │       ├── Avatar (favicon)
        │       ├── Text (name)
        │       ├── StatusIndicator
        │       └── Text (url, caption)
        │
        └── HomeChat                 ← global assistant, docked bottom
            ├── ChatMessageList
            │   └── ChatMessage (v-for)
            └── InputChat
```

### Project (`ProjectPage.vue`)

```
AppChrome
├── Titlebar
└── .app-body (hstack)
    ├── Sidebar
    └── .frame (vstack, flex-1)
        └── SplitLayout
            ├── #start → AgentPanel
            │   ├── PanelToolbar
            │   │   ├── TabBar
            │   │   │   └── TabBar.Tab (v-for, scoped)
            │   │   └── Button (add tab, toggle preview)
            │   ├── ChatMessageList
            │   │   └── ChatMessage (v-for)
            │   └── InputChat
            │
            └── #end → SitePreview
                ├── PanelToolbar (nav + url bar + viewport)
                └── iframe / placeholder
```

### Settings (`SettingsPage.vue`)

```
AppChrome
├── Titlebar
└── .settings-body (hstack)
    ├── Sidebar (or nav list)
    └── .settings-main
        └── (stub for now — Text placeholder)
```

---

## 4. New Component Specs

### `TabBar.vue` — `composites/`

Extracted from AgentPanel's inline tab rendering.

```ts
// Props — uses Agent from data layer, not a custom AgentTab type
interface TabBarProps {
  tabs: Agent[]          // Agent[] from @/data/types
  activeId: AgentId
}

// Events
interface TabBarEmits {
  'update:activeId': [id: AgentId]
}
```

```html
<!-- Template sketch -->
<div class="tab-bar hstack gap-xxxs overflow-auto">
  <button
    v-for="tab in tabs" :key="tab.id"
    class="tab-bar__tab px-xs py-xxxs"
    :class="{ active: tab.id === activeId }"
    @click="$emit('update:activeId', tab.id)"
  >
    <Text variant="caption" :color="tab.id === activeId ? 'default' : 'muted'">
      {{ tab.label }}
    </Text>
  </button>
</div>
```

Style: copy `.agent-tab` styles from current AgentPanel.

---

### `ChatMessageList.vue` — `composites/`

Scrollable message container. Handles auto-scroll-to-bottom.

```ts
interface ChatMessageListProps {
  messages: Message[]    // Message from @/data/types
}

interface ChatMessageListEmits {
  'select-message': [id: string]
}
```

```html
<div class="messages flex-1 overflow-auto px-m py-l">
  <div class="messages-inner vstack gap-m">
    <ChatMessage
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :content="msg.content"
      :agent-id="msg.agentId"
      :selected="msg.id === selectedId"
      @select="$emit('select-message', msg.id)"
    />
  </div>
</div>
```

> **Note:** ChatMessage needs updating to accept `agentId?: AgentId` instead of `agentName?: string`.
> It can resolve the display name via `useAgents().getAgent(agentId)` internally.

---

### `ProjectCard.vue` — `composites/`

Grid card for Home screen.

```ts
interface ProjectCardProps {
  project: Project       // Project from @/data/types (includes description, createdAt)
}

interface ProjectCardEmits {
  'open': [id: string]
  'toggle-status': [id: string]
}
```

```html
<div class="project-card vstack gap-xs p-m" @click="$emit('open', project.id)">
  <div class="hstack gap-xs align-center">
    <img class="project-card__favicon" :src="project.favicon" alt="" />
    <div class="vstack gap-xxxs flex-1 min-w-0">
      <Text variant="body" weight="medium">{{ project.name }}</Text>
      <Text variant="caption" color="muted">{{ project.url }}</Text>
    </div>
    <StatusIndicator :status="project.status" @toggle="$emit('toggle-status', project.id)" />
  </div>
  <Text v-if="project.description" variant="caption" color="muted">{{ project.description }}</Text>
</div>
```

Style: `background: var(--color-surface-secondary)`, `border-radius: var(--radius-m)`, hover lift.

---

### `ProjectGrid.vue` — `features/`

```ts
interface ProjectGridProps {
  projects: Project[]
}

interface ProjectGridEmits {
  'open-project': [id: string]
  'toggle-status': [id: string]
}
```

CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`, `gap: var(--space-m)`.

---

### `OnboardingEmpty.vue` — `features/`

```ts
interface OnboardingEmptyProps {
  title?: string       // default: "Welcome to Studio"
  description?: string // default: "Create your first site to get started."
  actionLabel?: string // default: "Create a site"
}

interface OnboardingEmptyEmits {
  'action': []
}
```

Centered layout, illustration slot optional.

---

### `HomeChat.vue` — `features/`

Thin wrapper: composes `ChatMessageList` + `InputChat`, uses `useChat('global')`.

```ts
// No props needed — gets data from useChat composable
```

---

### `AppChrome.vue` — `layouts/`

Replaces the repeated `app-shell` / `vstack` + `Titlebar` pattern.

```html
<div class="app-chrome vstack">
  <Titlebar />
  <div class="app-chrome__body hstack flex-1 min-h-0 p-xs gap-xs">
    <slot />
  </div>
</div>
```

Style: `height: 100vh`, `background: var(--color-chrome)`, etc. (lifted from AppShell.vue).

---

### `SplitLayout.vue` — `layouts/`

Two-pane layout with optional second pane.

```ts
interface SplitLayoutProps {
  showEnd?: boolean  // default true
}
```

```html
<div class="split-layout hstack flex-1 min-w-0 min-h-0">
  <Panel>
    <slot name="start" />
  </Panel>
  <Panel v-if="showEnd">
    <slot name="end" />
  </Panel>
</div>
```

---

### `Avatar.vue` — `primitives/`

```ts
interface AvatarProps {
  src?: string
  alt?: string
  size?: 'small' | 'default' | 'large'  // 20px, 32px, 48px
  fallback?: string  // single char
}
```

---

### `Badge.vue` — `primitives/`

```ts
interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}
```

---

## 5. AgentPanel Decomposition

**Before (current):** AgentPanel owns tab state, message rendering, input, and layout.

**After:**

| Concern | Component | Notes |
|---------|-----------|-------|
| Tab state | `useAgents()` + local `ref<AgentId>` | Agent list from data layer, active tab is local state |
| Tab UI | `TabBar` | Stateless, v-model:activeId, takes Agent[] |
| Messages | `ChatMessageList` | Scrollable, auto-scroll, selection |
| Input | `InputChat` | Already separate ✓ |
| Layout + glue | `AgentPanel` | Composes above, owns toolbar layout |

**Refactored AgentPanel template:**

```html
<!-- Props: projectId: string | null -->
<div class="agent-panel vstack flex-1 overflow-hidden">
  <PanelToolbar>
    <template #start>
      <TabBar :tabs="agents" v-model:active-id="activeAgentId" />
    </template>
    <template #end>
      <Button variant="tertiary" :icon="sidebar" size="small"
        :active="previewVisible" @click="$emit('toggle-preview')" />
    </template>
  </PanelToolbar>

  <ChatMessageList
    :messages="msgs"
    @select-message="selectMessage"
  />

  <div class="px-l pb-l shrink-0">
    <InputChat @send="handleSend" />
  </div>
</div>
```

> **Setup sketch** (mirrors DATA-LAYER.md usage pattern):
> ```ts
> const { agents } = useAgents()
> const { getConversation, getMessages, ensureConversation, sendMessage } = useConversations()
> const activeAgentId = ref<AgentId>('assistant')
> const projectIdRef = toRef(props, 'projectId')
> const conversation = getConversation(projectIdRef, activeAgentId)
> const conversationId = computed(() => conversation.value?.id ?? null)
> const msgs = getMessages(conversationId)
> ```

---

## 6. Composables

> **All composables live in `src/data/`** — defined in DATA-LAYER.md. Components consume these directly.
>
> - `useProjects()` — singleton state: `projects`, `activeProjectId`, `activeProject`, `setStatus()`
> - `useConversations()` — `getConversations(projectId)`, `getMessages(conversationId)`, `ensureConversation()`, `sendMessage()`
> - `useAgents()` — static `agents` array, `getAgent(id)`
>
> **No `useChat` or `useAgentTabs` composables.** The data layer's `useConversations` replaces `useChat`,
> and `useAgents` replaces `useAgentTabs`. Agent tab selection is local UI state in AgentPanel (just a `ref<AgentId>`).

---

## 7. Router Updates

```ts
const routes = [
  { path: '/', component: () => import('./pages/Index.vue') },
  { path: '/home', component: () => import('./pages/HomePage.vue') },
  { path: '/project/:id', component: () => import('./pages/ProjectPage.vue') },
  { path: '/settings', component: () => import('./pages/SettingsPage.vue') },
  { path: '/design-system', component: () => import('./pages/DesignSystem.vue') },
  { path: '/components', component: () => import('./pages/Components.vue') },
]
```

Keep `/` as dev index linking to all screens. `/home` and `/project/:id` are the real app screens.

---

## 8. Implementation Order

1. **Implement data layer** — `src/data/` types, seed data, composables (see DATA-LAYER.md)
2. **Create folder structure** — move existing components into `primitives/`, `composites/`, `features/`, `layouts/`; fix imports
3. **Split AgentPanel** — extract `TabBar`, `ChatMessageList`; slim AgentPanel to compose them
4. **Update ChatMessage** — accept `agentId?: AgentId` instead of `agentName?: string`; resolve name via `useAgents()`
5. **Wire Sidebar to data layer** — replace hardcoded project list with `useProjects()`
6. **Build layouts** — `AppChrome`, `SplitLayout`
7. **Refactor ProjectPage** — evolve AppShell to use new layouts + data layer
8. **Build Home components** — `ProjectCard`, `ProjectGrid`, `OnboardingEmpty`, `HomeChat`
9. **Build HomePage** — compose everything
10. **Stub SettingsPage**
11. **Update router**

Each step should be a commit. Steps 1–7 should not change visible behavior (refactor only). Steps 8–11 add new screens.

---

## 9. Review Findings (2026-02-13)

Issues found and addressed in this revision:

1. **Duplicate types diverging from data layer.** Section 2 defined its own `Project`, `ChatMessageData`, and `AgentTab` types that conflicted with DATA-LAYER.md's `Project`, `Message`, and `Agent`. Removed duplicates — components now import from `@/data/types` exclusively.

2. **Duplicate composables with different APIs.** Section 6 defined `useChat`, `useProjects`, `useAgentTabs` that duplicated and conflicted with the data layer's `useConversations`, `useProjects`, `useAgents`. Removed — components use data layer composables directly.

3. **Folder structure mismatch.** Plan had `src/composables/` and `src/types/` but data layer puts everything in `src/data/`. Updated folder tree to match.

4. **ChatMessage prop mismatch.** Plan passed `agentName: string` but data layer has `agentId: AgentId` on messages. Updated `ChatMessageList` to pass `agentId` and noted that `ChatMessage.vue` needs updating to resolve the display name via `useAgents()`.

5. **TabBar typed to phantom `AgentTab[]`.** Changed to `Agent[]` from data layer. Tabs are agents — no separate tab type needed.

6. **ProjectCard ignored new fields.** Data layer's `Project` has `description` and `createdAt` not in the original card spec. Added optional description display.

7. **AgentPanel "add tab" button was orphaned.** With agents being a fixed list from the data layer (not user-created tabs), the `addTab` action had no backing logic. Removed it from the refactored template.

8. **Implementation order assumed separate type/composable extraction steps.** Consolidated: data layer is step 1, then component restructuring follows. Added explicit step for ChatMessage prop migration.
