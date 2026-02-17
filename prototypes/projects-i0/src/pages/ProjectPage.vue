<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import SitePreview from '@/components/features/SitePreview.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const STORAGE_KEY = 'previewState'

function loadPreviewState(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

const previewState = ref(loadPreviewState())

const showPreview = computed({
  get: () => previewState.value[route.params.id as string] ?? true,
  set: (v: boolean) => {
    previewState.value = { ...previewState.value, [route.params.id as string]: v }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(previewState.value))
  },
})
// Per-project panel width (fraction 0-1, default 0.5)
const WIDTHS_KEY = 'panelWidths'

function loadWidths(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(WIDTHS_KEY) || '{}') }
  catch { return {} }
}

const panelWidths = ref(loadWidths())
const projectId = computed(() => route.params.id as string)

const chatFraction = computed({
  get: () => panelWidths.value[projectId.value] ?? 0.5,
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

const MIN_CHAT_PX = 360
const MIN_PREVIEW_PX = 400

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const minFraction = MIN_CHAT_PX / rect.width
  const maxFraction = 1 - MIN_PREVIEW_PX / rect.width
  const fraction = Math.min(maxFraction, Math.max(minFraction, (e.clientX - rect.left) / rect.width))
  chatFraction.value = fraction
}

function onPointerUp(e: PointerEvent) {
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
}

const isAnimating = ref(false)
let animationTimeout: ReturnType<typeof setTimeout> | null = null

function togglePreview() {
  isAnimating.value = true
  showPreview.value = !showPreview.value
  if (animationTimeout) clearTimeout(animationTimeout)
  animationTimeout = setTimeout(() => { isAnimating.value = false }, 300)
}

const { activeProjectId } = useProjects()

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

onBeforeUnmount(() => {
  activeProjectId.value = null
})
</script>

<template>
  <div ref="containerRef" class="panels hstack align-stretch flex-1 min-w-0 min-h-0 overflow-hidden" :class="{ 'is-dragging': isDragging, 'is-animating': isAnimating }">
    <Panel class="chat-panel" :style="{ width: showPreview ? (chatFraction * 100) + '%' : '100%', flex: 'none', minWidth: MIN_CHAT_PX + 'px' }">
      <AgentPanel :project-id="activeProjectId" :preview-visible="showPreview" @toggle-preview="togglePreview" />
    </Panel>
    <div class="resize-handle" :class="{ 'resize-handle--hidden': !showPreview }" @pointerdown="onPointerDown" />
    <Panel class="preview-panel" :class="{ 'preview-panel--hidden': !showPreview }">
      <SitePreview :project-id="activeProjectId" />
    </Panel>
  </div>
</template>

<style scoped>
.preview-panel {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.preview-panel--hidden {
  pointer-events: none;
}

/* Only apply transitions during toggle animation, not during drag */
.is-animating .chat-panel {
  transition: width var(--duration-slow) var(--ease-in-out);
}

.resize-handle {
  width: 5px;
  cursor: col-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin: 0 -2px;
}

.resize-handle--hidden {
  opacity: 0;
  pointer-events: none;
  width: 0;
  margin: 0;
}

.resize-handle::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--color-surface-border);
  transition: background var(--duration-fast) var(--ease-default);
}

.resize-handle:hover::after,
.is-dragging .resize-handle::after {
  width: 3px;
  margin-left: -1px;
  background: var(--color-accent);
}

.is-dragging :deep(iframe) {
  pointer-events: none;
}
</style>
