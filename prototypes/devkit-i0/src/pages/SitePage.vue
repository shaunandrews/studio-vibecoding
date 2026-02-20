<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { external } from '@wordpress/icons'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import Text from '@/components/primitives/Text.vue'
import DashboardOverview from '@/components/features/DashboardOverview.vue'
import DashboardTerminal from '@/components/features/DashboardTerminal.vue'
import DashboardDatabase from '@/components/features/DashboardDatabase.vue'
import DashboardMail from '@/components/features/DashboardMail.vue'
import DashboardPerformance from '@/components/features/DashboardPerformance.vue'
import DashboardDocs from '@/components/features/DashboardDocs.vue'
import Tooltip from '@/components/primitives/Tooltip.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import { useProjects } from '@/data/useProjects'
import { useChatPopout } from '@/data/useChatPopout'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const { projects, activeProjectId, setStatus } = useProjects()
const { isPoppedOut, dockBack } = useChatPopout()

const project = computed(() =>
  projects.value.find(p => p.id === projectId.value) ?? null
)

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

// ── Tool panel ──
type ToolTab = 'terminal' | 'database' | 'mail' | 'performance' | 'docs'

const TOOL_TABS: { id: ToolTab; label: string; tooltip: string; badge?: number }[] = [
  { id: 'terminal',    label: 'Terminal',    tooltip: 'WP-CLI and shell commands' },
  { id: 'database',    label: 'Database',    tooltip: 'Browse WordPress tables and run queries' },
  { id: 'mail',        label: 'Mail',        tooltip: 'Catch outgoing emails from WordPress', badge: 3 },
  { id: 'performance', label: 'Performance', tooltip: 'Query monitor and site health' },
  { id: 'docs',        label: 'Docs',        tooltip: 'WordPress APIs, hooks, and block reference' },
]

const ACTIVE_TAB_KEY = 'toolPanelActiveTab'
const panelOpen = ref(false)

function loadActiveTabs(): Record<string, ToolTab> {
  try { return JSON.parse(localStorage.getItem(ACTIVE_TAB_KEY) || '{}') }
  catch { return {} }
}

const activeTabs = ref(loadActiveTabs())

const activeTab = computed<ToolTab>({
  get: () => activeTabs.value[projectId.value] ?? 'terminal',
  set: (v: ToolTab) => {
    activeTabs.value = { ...activeTabs.value, [projectId.value]: v }
    localStorage.setItem(ACTIVE_TAB_KEY, JSON.stringify(activeTabs.value))
  },
})

function onTabClick(tabId: ToolTab) {
  if (isAnimating.value) return
  if (panelOpen.value && activeTab.value === tabId) {
    panelOpen.value = false
  } else {
    activeTab.value = tabId
    if (!panelOpen.value) panelOpen.value = true
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'j' && e.metaKey) {
    e.preventDefault()
    if (isAnimating.value) return
    panelOpen.value = !panelOpen.value
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  activeProjectId.value = null
  document.removeEventListener('keydown', onKeyDown)
})

function toggleStatus() {
  if (!project.value) return
  const next = project.value.status === 'running' ? 'stopped' : 'running'
  setStatus(project.value.id, next)
}

// ── Chat panel resize ──
const WIDTHS_KEY = 'chatPanelWidths'
const DEFAULT_WIDTH = 360
const MIN_WIDTH = 280

function loadWidths(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(WIDTHS_KEY) || '{}') }
  catch { return {} }
}

const panelWidths = ref(loadWidths())

const chatWidth = computed({
  get: () => panelWidths.value[projectId.value] ?? DEFAULT_WIDTH,
  set: (v: number) => {
    panelWidths.value = { ...panelWidths.value, [projectId.value]: v }
    localStorage.setItem(WIDTHS_KEY, JSON.stringify(panelWidths.value))
  },
})

const containerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

function onPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const maxWidth = rect.width * 0.5
  // Chat is on the right, so width = distance from pointer to right edge
  const rawWidth = rect.right - e.clientX
  chatWidth.value = Math.round(Math.min(maxWidth, Math.max(MIN_WIDTH, rawWidth)))
}

function onPointerUp() {
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
}

// ── Tool panel resize ──
const PANEL_HEIGHTS_KEY = 'toolPanelHeights'
const DEFAULT_PANEL_HEIGHT = 200
const MIN_PANEL_HEIGHT = 120

function loadPanelHeights(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(PANEL_HEIGHTS_KEY) || '{}') }
  catch { return {} }
}

const panelHeights = ref(loadPanelHeights())
const dashboardRef = ref<HTMLElement | null>(null)
const isPanelDragging = ref(false)

const panelHeight = computed({
  get: () => panelHeights.value[projectId.value] ?? DEFAULT_PANEL_HEIGHT,
  set: (v: number) => {
    panelHeights.value = { ...panelHeights.value, [projectId.value]: v }
    localStorage.setItem(PANEL_HEIGHTS_KEY, JSON.stringify(panelHeights.value))
  },
})

let cachedToolbarHeight = 40

function onPanelPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isPanelDragging.value = true
  const toolbar = dashboardRef.value?.querySelector('.dashboard__toolbar')
  if (toolbar) cachedToolbarHeight = toolbar.getBoundingClientRect().height
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('pointermove', onPanelPointerMove)
  document.addEventListener('pointerup', onPanelPointerUp)
}

function onPanelPointerMove(e: PointerEvent) {
  if (!isPanelDragging.value || !dashboardRef.value) return
  const rect = dashboardRef.value.getBoundingClientRect()
  const maxHeight = (rect.height - cachedToolbarHeight) * 0.7
  const rawHeight = rect.bottom - e.clientY - cachedToolbarHeight
  panelHeight.value = Math.round(Math.min(maxHeight, Math.max(MIN_PANEL_HEIGHT, rawHeight)))
}

function onPanelPointerUp() {
  isPanelDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.removeEventListener('pointermove', onPanelPointerMove)
  document.removeEventListener('pointerup', onPanelPointerUp)
}

// ── Panel animation ──
const isAnimating = ref(false)
const ANIM_DURATION = 150 // matches --duration-fast
const ANIM_SAFETY = 50

function safeTransitionEnd(el: HTMLElement, done: () => void) {
  let called = false
  const finish = () => { if (!called) { called = true; done() } }
  const fallback = setTimeout(finish, ANIM_DURATION + ANIM_SAFETY)
  el.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'height') return
    clearTimeout(fallback)
    finish()
  }, { once: true })
}

function onPanelBeforeEnter(el: Element) {
  const h = el as HTMLElement
  isAnimating.value = true
  h.style.transition = ''
  h.style.height = '0'
  h.style.overflow = 'hidden'
}

function onPanelEnter(el: Element, done: () => void) {
  const h = el as HTMLElement
  requestAnimationFrame(() => {
    h.style.transition = 'height var(--duration-fast) var(--ease-out)'
    h.style.height = panelHeight.value + 'px'
    safeTransitionEnd(h, done)
  })
}

function onPanelAfterEnter(el: Element) {
  const h = el as HTMLElement
  isAnimating.value = false
  h.style.transition = ''
  h.style.overflow = ''
}

function onPanelLeave(el: Element, done: () => void) {
  const h = el as HTMLElement
  isAnimating.value = true
  h.style.transition = ''
  h.style.height = h.offsetHeight + 'px'
  h.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    h.style.transition = 'height var(--duration-fast) var(--ease-in)'
    h.style.height = '0'
    safeTransitionEnd(h, done)
  })
}

function onPanelAfterLeave() {
  isAnimating.value = false
}
</script>

<template>
  <div
    ref="containerRef"
    class="site-page hstack align-stretch flex-1 min-w-0 min-h-0 overflow-hidden"
    :class="{ 'is-dragging-chat': isDragging, 'is-dragging-panel': isPanelDragging }"
  >
    <!-- Left: dashboard -->
    <div ref="dashboardRef" class="dashboard vstack flex-1 min-w-0">
      <div class="dashboard__content flex-1 min-h-0 overflow-auto">
        <DashboardOverview />
      </div>

      <div v-if="panelOpen" class="panel-resize-handle" @pointerdown="onPanelPointerDown" />

      <div class="dashboard__toolbar hstack">
        <div class="dashboard__tabs hstack">
          <Tooltip v-for="tab in TOOL_TABS" :key="tab.id" :text="tab.tooltip">
            <button
              class="dashboard__tab"
              :class="{ active: panelOpen && activeTab === tab.id }"
              @click="onTabClick(tab.id)"
            >
              {{ tab.label }}
              <span v-if="tab.badge" class="dashboard__tab-badge">{{ tab.badge }}</span>
            </button>
          </Tooltip>
        </div>
        <div class="dashboard__status hstack gap-xxs" v-if="project">
          <StatusIndicator :status="project.status" @toggle="toggleStatus" />
          <Text variant="caption" color="muted">
            {{ project.status === 'running' ? 'Running' : project.status === 'loading' ? 'Starting...' : 'Stopped' }}
          </Text>
        </div>
      </div>

      <Transition
        :css="false"
        @before-enter="onPanelBeforeEnter"
        @enter="onPanelEnter"
        @after-enter="onPanelAfterEnter"
        @leave="onPanelLeave"
        @after-leave="onPanelAfterLeave"
      >
        <div v-if="panelOpen" class="dashboard__panel" :style="{ height: panelHeight + 'px' }">
          <DashboardTerminal     v-if="activeTab === 'terminal'" />
          <DashboardDatabase     v-if="activeTab === 'database'" />
          <DashboardMail         v-if="activeTab === 'mail'" />
          <DashboardPerformance  v-if="activeTab === 'performance'" />
          <DashboardDocs         v-if="activeTab === 'docs'" />
        </div>
      </Transition>
    </div>

    <!-- Resize handle -->
    <div v-if="!isPoppedOut" class="resize-handle" @pointerdown="onPointerDown" />

    <!-- Right: chat panel -->
    <Panel
      v-if="!isPoppedOut"
      class="chat-panel"
      :style="{ width: chatWidth + 'px', flex: 'none', minWidth: MIN_WIDTH + 'px' }"
    >
      <AgentPanel :project-id="activeProjectId" />
    </Panel>

    <!-- Dock-back indicator when chat is popped out -->
    <button v-if="isPoppedOut" class="dock-back" @click="dockBack">
      <WPIcon :icon="external" :size="16" />
      <span>Dock chat</span>
    </button>
  </div>
</template>

<style scoped>
/* ── Layout ── */
.site-page {
  position: relative;
}

/* ── Dashboard column ── */
.dashboard {
  overflow: hidden;
}

/* ── Toolbar ── */
.dashboard__toolbar {
  border-block-start: 1px solid var(--color-surface-border);
  flex-shrink: 0;
  padding-inline: var(--space-xxs);
  justify-content: space-between;
  align-items: center;
  min-block-size: var(--space-xxl);
}

/* ── Tab strip ── */
.dashboard__tabs {
  display: flex;
  gap: var(--space-xxxs);
  align-items: center;
}

.dashboard__tab {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  transition: color var(--transition-hover), background var(--transition-hover);
}

.dashboard__tab:hover {
  color: var(--color-text);
  background: var(--color-surface-secondary);
}

.dashboard__tab.active {
  color: var(--color-surface);
  background: var(--color-text);
}

.dashboard__tab.active:hover {
  background: var(--color-text-secondary);
}

.dashboard__tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 15px;
  block-size: 15px;
  padding-inline: var(--space-xxxs);
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-surface);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  line-height: 1;
}

.dashboard__tab.active .dashboard__tab-badge {
  background: var(--color-surface);
  color: var(--color-text);
}

/* ── Status area ── */
.dashboard__status {
  align-items: center;
  padding-inline-end: var(--space-xxs);
}

/* ── Dashboard content ── */
.dashboard__content {
  background: var(--color-surface);
  container-type: inline-size;
  container-name: dashboard;
}

/* ── Panel resize handle ── */
.panel-resize-handle {
  height: 5px;
  cursor: row-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-block: -2px; /* Expand hitbox over adjacent borders */
}

.panel-resize-handle::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inset-block-start: 50%;
  height: 1px;
  background: var(--color-surface-border);
  transition: background var(--transition-hover), height var(--transition-hover);
}

.panel-resize-handle:hover::after,
.is-dragging-panel .panel-resize-handle::after {
  height: 3px;
  margin-block-start: -1px;
  background: var(--color-primary);
}

/* ── Tool panel ── */
.dashboard__panel {
  display: flex;
  flex-direction: column;
  flex: none;
  overflow: hidden;
}

/* ── Resize handle ── */
.resize-handle {
  width: 5px;
  cursor: col-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin: 0 -2px; /* Physical: app chrome separator — intentional */
}

.resize-handle::after {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 50%;
  width: 1px;
  background: var(--color-surface-border);
  transition: background var(--transition-hover), width var(--transition-hover);
}

.resize-handle:hover::after,
.is-dragging-chat .resize-handle::after {
  width: 3px;
  margin-inline-start: -1px;
  background: var(--color-primary);
}

/* ── Chat panel ── */
.chat-panel {
  flex: none;
}

/* ── Dock-back indicator ── */
.dock-back {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  position: absolute;
  inset-block-end: var(--space-s);
  inset-inline-end: var(--space-s);
  padding: var(--space-xxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  color: var(--color-text-secondary);
  font-family: inherit;
  font-size: var(--font-size-s);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover);
}

.dock-back:hover {
  background: var(--color-surface);
  color: var(--color-text);
}

/* ── Drag state ── */
.is-dragging-chat,
.is-dragging-panel {
  user-select: none;
}
</style>
