<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/data/useProjects'
import { seedSites } from '@/data/seed-sites'
import { renderSite } from '@/data/site-renderer'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import QuickActions from './dashboard/QuickActions.vue'
import EnvironmentCard from './dashboard/EnvironmentCard.vue'
import TimelineCard from './dashboard/TimelineCard.vue'

const route = useRoute()
const { projects, setStatus } = useProjects()

const projectId = computed(() => route.params.id as string)

const project = computed(() =>
  projects.value.find(p => p.id === projectId.value) ?? null
)

const site = computed(() => seedSites[projectId.value])

const previewHtml = computed(() => {
  const s = site.value
  if (!s || !s.pages || s.pages.length === 0) return ''
  const homepage = s.pages[0].slug
  return renderSite(s, homepage)
})

function toggleStatus() {
  if (!project.value) return
  const next = project.value.status === 'running' ? 'stopped' : 'running'
  setStatus(project.value.id, next)
}

// ── Sidebar resize ──
const WIDTHS_KEY = 'dashboardSidebarWidths'
const DEFAULT_WIDTH = 240
const MIN_WIDTH = 180
const MAX_RATIO = 0.4

function loadWidths(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(WIDTHS_KEY) || '{}') }
  catch { return {} }
}

const savedWidths = ref(loadWidths())
const containerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const sidebarWidth = computed({
  get: () => savedWidths.value[projectId.value] ?? DEFAULT_WIDTH,
  set: (v: number) => {
    savedWidths.value = { ...savedWidths.value, [projectId.value]: v }
    localStorage.setItem(WIDTHS_KEY, JSON.stringify(savedWidths.value))
  },
})

function onPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const maxWidth = rect.width * MAX_RATIO
  const rawWidth = e.clientX - rect.left
  sidebarWidth.value = Math.round(Math.min(maxWidth, Math.max(MIN_WIDTH, rawWidth)))
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
    class="dashboard-overview"
    :class="{ 'is-dragging': isDragging }"
  >
    <div
      class="dashboard-overview__sidebar"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <div class="dashboard-overview__sidebar-scroll">
        <!-- Site info -->
        <div class="site-info">
          <div class="site-info__header hstack gap-xs">
            <img v-if="project?.favicon" class="site-info__favicon" :src="project.favicon" alt="" />
            <div class="flex-1 min-w-0">
              <span class="site-info__name">{{ project?.name ?? 'Loading…' }}</span>
              <span class="site-info__url">{{ project?.url ?? '' }}</span>
            </div>
            <StatusIndicator v-if="project" :status="project.status" @toggle="toggleStatus" />
          </div>
          <div v-if="previewHtml" class="site-info__preview">
            <iframe
              :srcdoc="previewHtml"
              class="site-info__iframe"
              tabindex="-1"
              loading="lazy"
            />
          </div>
          <div v-else class="site-info__preview site-info__preview--empty" />
        </div>

        <QuickActions />
        <EnvironmentCard />
      </div>
    </div>

    <div class="dashboard-overview__handle" @pointerdown="onPointerDown" />

    <div class="dashboard-overview__main">
      <div class="dashboard-overview__main-scroll">
        <TimelineCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.dashboard-overview.is-dragging {
  user-select: none;
}

/* ── Sidebar panel ── */
.dashboard-overview__sidebar {
  flex: none;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-overview__sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

/* ── Resize handle ── */
.dashboard-overview__handle {
  width: 5px;
  cursor: col-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-inline: -2px;
}

.dashboard-overview__handle::after {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 50%;
  width: 1px;
  background: var(--color-surface-border);
  transition: background var(--transition-hover), width var(--transition-hover);
}

.dashboard-overview__handle:hover::after,
.is-dragging .dashboard-overview__handle::after {
  width: 3px;
  margin-inline-start: -1px;
  background: var(--color-primary);
}

/* ── Main panel (timeline) ── */
.dashboard-overview__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-overview__main-scroll {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-m);
}

/* ── Site info ── */
.site-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.site-info__header {
  align-items: center;
  margin-block-end: var(--space-s);
}

.site-info__favicon {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.site-info__name {
  display: block;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-info__url {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-info__preview {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
}

.site-info__preview--empty {
  background: var(--color-surface-secondary);
}

.site-info__iframe {
  width: 200%;
  height: 200%;
  border: none;
  pointer-events: none;
  transform: scale(0.5);
  transform-origin: top left; /* Physical: iframe scaling — intentional */
}
</style>
