<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import Text from '@/components/primitives/Text.vue'
import DashboardOverview from '@/components/features/DashboardOverview.vue'
import DashboardCode from '@/components/features/DashboardCode.vue'
import DashboardTerminal from '@/components/features/DashboardTerminal.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const { projects, activeProjectId, setStatus } = useProjects()

const project = computed(() =>
  projects.value.find(p => p.id === projectId.value) ?? null
)

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

onBeforeUnmount(() => {
  activeProjectId.value = null
})

// ── Dashboard tabs ──
type DashboardTab = 'overview' | 'code' | 'terminal'

const tabs: { id: DashboardTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'code', label: 'Code' },
  { id: 'terminal', label: 'Terminal' },
]

const activeTab = ref<DashboardTab>('overview')

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
</script>

<template>
  <div
    ref="containerRef"
    class="site-page hstack align-stretch flex-1 min-w-0 min-h-0 overflow-hidden"
    :class="{ 'is-dragging': isDragging }"
  >
    <!-- Left: tabbed dashboard -->
    <div class="dashboard vstack flex-1 min-w-0">
      <div class="dashboard__toolbar hstack">
        <div class="dashboard__tabs hstack">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="dashboard__tab"
            :class="{ active: tab.id === activeTab }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="dashboard__status hstack gap-xxs" v-if="project">
          <StatusIndicator :status="project.status" @toggle="toggleStatus" />
          <Text variant="caption" color="muted">
            {{ project.status === 'running' ? 'Running' : project.status === 'loading' ? 'Starting...' : 'Stopped' }}
          </Text>
          <Text variant="caption" color="muted" class="dashboard__env">PHP 8.2</Text>
        </div>
      </div>

      <div class="dashboard__content flex-1 min-h-0 overflow-auto">
        <DashboardOverview v-if="activeTab === 'overview'" />
        <DashboardCode v-if="activeTab === 'code'" />
        <DashboardTerminal v-if="activeTab === 'terminal'" />
      </div>
    </div>

    <!-- Resize handle -->
    <div class="resize-handle" @pointerdown="onPointerDown" />

    <!-- Right: chat panel -->
    <Panel
      class="chat-panel"
      :style="{ width: chatWidth + 'px', flex: 'none', minWidth: MIN_WIDTH + 'px' }"
    >
      <AgentPanel :project-id="activeProjectId" />
    </Panel>
  </div>
</template>

<style scoped>
/* ── Dashboard column ── */
.dashboard {
  overflow: hidden;
}

/* ── Tab bar ── */
.dashboard__toolbar {
  border-block-end: 1px solid var(--color-surface-border);
  flex-shrink: 0;
  padding-inline: var(--space-xs);
  justify-content: space-between;
  align-items: stretch;
}

.dashboard__tabs {
  gap: var(--space-xxs);
  align-items: stretch;
}

.dashboard__tab {
  position: relative;
  padding: var(--space-xs) var(--space-xs);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
  transition: color var(--duration-instant) var(--ease-default);
}

.dashboard__tab:hover {
  color: var(--color-text);
}

.dashboard__tab.active {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.dashboard__tab.active::after {
  content: '';
  position: absolute;
  inset-inline: var(--space-xs);
  block-size: 2px;
  inset-block-end: -1px;
  background: var(--color-primary);
  border-radius: 1px;
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
  transition: background var(--duration-fast) var(--ease-default), width var(--duration-fast) var(--ease-default);
}

.resize-handle:hover::after,
.is-dragging .resize-handle::after {
  width: 3px;
  margin-inline-start: -1px;
  background: var(--color-primary);
}

/* ── Chat panel ── */
.chat-panel {
  flex: none;
}

/* ── Drag state ── */
.is-dragging {
  user-select: none;
}
</style>
