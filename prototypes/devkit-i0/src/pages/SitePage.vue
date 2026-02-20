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

// ── Terminal panel ──
const terminalOpen = ref(false)

function toggleTerminal() {
  if (isAnimating.value) return
  terminalOpen.value = !terminalOpen.value
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'j' && e.metaKey) {
    e.preventDefault()
    toggleTerminal()
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

// ── Terminal panel resize ──
const TERMINAL_HEIGHTS_KEY = 'terminalPanelHeights'
const DEFAULT_TERMINAL_HEIGHT = 200
const MIN_TERMINAL_HEIGHT = 120

function loadTerminalHeights(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(TERMINAL_HEIGHTS_KEY) || '{}') }
  catch { return {} }
}

const terminalHeights = ref(loadTerminalHeights())
const dashboardRef = ref<HTMLElement | null>(null)
const isTerminalDragging = ref(false)

const terminalHeight = computed({
  get: () => terminalHeights.value[projectId.value] ?? DEFAULT_TERMINAL_HEIGHT,
  set: (v: number) => {
    terminalHeights.value = { ...terminalHeights.value, [projectId.value]: v }
    localStorage.setItem(TERMINAL_HEIGHTS_KEY, JSON.stringify(terminalHeights.value))
  },
})

let cachedToolbarHeight = 40

function onTerminalPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isTerminalDragging.value = true
  const toolbar = dashboardRef.value?.querySelector('.dashboard__toolbar')
  if (toolbar) cachedToolbarHeight = toolbar.getBoundingClientRect().height
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('pointermove', onTerminalPointerMove)
  document.addEventListener('pointerup', onTerminalPointerUp)
}

function onTerminalPointerMove(e: PointerEvent) {
  if (!isTerminalDragging.value || !dashboardRef.value) return
  const rect = dashboardRef.value.getBoundingClientRect()
  const maxHeight = (rect.height - cachedToolbarHeight) * 0.7
  const rawHeight = rect.bottom - e.clientY - cachedToolbarHeight
  terminalHeight.value = Math.round(Math.min(maxHeight, Math.max(MIN_TERMINAL_HEIGHT, rawHeight)))
}

function onTerminalPointerUp() {
  isTerminalDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.removeEventListener('pointermove', onTerminalPointerMove)
  document.removeEventListener('pointerup', onTerminalPointerUp)
}

// ── Terminal animation ──
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

function onTerminalBeforeEnter(el: Element) {
  const h = el as HTMLElement
  isAnimating.value = true
  h.style.transition = ''
  h.style.height = '0'
  h.style.overflow = 'hidden'
}

function onTerminalEnter(el: Element, done: () => void) {
  const h = el as HTMLElement
  requestAnimationFrame(() => {
    h.style.transition = 'height var(--duration-fast) var(--ease-out)'
    h.style.height = terminalHeight.value + 'px'
    safeTransitionEnd(h, done)
  })
}

function onTerminalAfterEnter(el: Element) {
  const h = el as HTMLElement
  isAnimating.value = false
  h.style.transition = ''
  h.style.overflow = ''
}

function onTerminalLeave(el: Element, done: () => void) {
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

function onTerminalAfterLeave() {
  isAnimating.value = false
}
</script>

<template>
  <div
    ref="containerRef"
    class="site-page hstack align-stretch flex-1 min-w-0 min-h-0 overflow-hidden"
    :class="{ 'is-dragging-chat': isDragging, 'is-dragging-terminal': isTerminalDragging }"
  >
    <!-- Left: dashboard -->
    <div ref="dashboardRef" class="dashboard vstack flex-1 min-w-0">
      <div class="dashboard__content flex-1 min-h-0 overflow-auto">
        <DashboardOverview />
      </div>

      <div v-if="terminalOpen" class="terminal-resize-handle" @pointerdown="onTerminalPointerDown" />

      <div class="dashboard__toolbar hstack">
        <div class="dashboard__status hstack gap-xxs" v-if="project">
          <StatusIndicator :status="project.status" @toggle="toggleStatus" />
          <Text variant="caption" color="muted">
            {{ project.status === 'running' ? 'Running' : project.status === 'loading' ? 'Starting...' : 'Stopped' }}
          </Text>
          <Text variant="caption" color="muted" class="dashboard__env">PHP 8.2</Text>
        </div>
        <button
          class="dashboard__terminal-toggle"
          :class="{ active: terminalOpen }"
          @click="toggleTerminal"
        >
          Terminal <kbd>⌘J</kbd>
        </button>
      </div>

      <Transition
        :css="false"
        @before-enter="onTerminalBeforeEnter"
        @enter="onTerminalEnter"
        @after-enter="onTerminalAfterEnter"
        @leave="onTerminalLeave"
        @after-leave="onTerminalAfterLeave"
      >
        <div v-if="terminalOpen" class="dashboard__terminal" :style="{ height: terminalHeight + 'px' }">
          <DashboardTerminal />
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

.dashboard__terminal-toggle {
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

.dashboard__terminal-toggle kbd {
  font-family: inherit;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.dashboard__terminal-toggle:hover {
  color: var(--color-text);
  background: var(--color-surface-secondary);
}

.dashboard__terminal-toggle.active {
  color: var(--color-surface);
  background: var(--color-text);
}

.dashboard__terminal-toggle.active kbd {
  color: inherit;
  opacity: 0.5;
}

.dashboard__terminal-toggle.active:hover {
  background: var(--color-text-secondary);
}

/* ── Status area ── */
.dashboard__status {
  align-items: center;
  padding-inline-end: var(--space-xxs);
}

.dashboard__env {
  padding-inline-start: var(--space-xs);
  border-inline-start: 1px solid var(--color-surface-border);
}

/* ── Dashboard content ── */
.dashboard__content {
  background: var(--color-surface);
}

/* ── Terminal resize handle ── */
.terminal-resize-handle {
  height: 5px;
  cursor: row-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-block: -2px; /* Expand hitbox over adjacent borders */
}

.terminal-resize-handle::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  inset-block-start: 50%;
  height: 1px;
  background: var(--color-surface-border);
  transition: background var(--transition-hover), height var(--transition-hover);
}

.terminal-resize-handle:hover::after,
.is-dragging-terminal .terminal-resize-handle::after {
  height: 3px;
  margin-block-start: -1px;
  background: var(--color-primary);
}

/* ── Terminal panel ── */
.dashboard__terminal {
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
.is-dragging-terminal {
  user-select: none;
}
</style>
