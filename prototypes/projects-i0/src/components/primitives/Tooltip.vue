<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}>(), {
  placement: 'top',
  delay: 600,
})

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const position = ref({ top: '0px', left: '0px' })
let showTimeout: ReturnType<typeof setTimeout> | null = null

// Shared warm state: if any tooltip was recently shown, skip the delay
let lastGlobalHide = 0
const WARM_WINDOW = 500

function updatePosition() {
  if (!triggerRef.value || !tooltipRef.value) return
  const trigger = triggerRef.value.getBoundingClientRect()
  const tip = tooltipRef.value.getBoundingClientRect()
  const gap = 6
  const vw = window.innerWidth
  const vh = window.innerHeight

  let top = 0
  let left = 0
  let placement = props.placement

  // Calculate preferred position
  if (placement === 'top') {
    top = trigger.top - tip.height - gap
    left = trigger.left + (trigger.width - tip.width) / 2
  } else if (placement === 'bottom') {
    top = trigger.bottom + gap
    left = trigger.left + (trigger.width - tip.width) / 2
  } else if (placement === 'left') {
    top = trigger.top + (trigger.height - tip.height) / 2
    left = trigger.left - tip.width - gap
  } else if (placement === 'right') {
    top = trigger.top + (trigger.height - tip.height) / 2
    left = trigger.right + gap
  }

  // Flip if off-screen
  if (placement === 'top' && top < 4) {
    top = trigger.bottom + gap
  } else if (placement === 'bottom' && top + tip.height > vh - 4) {
    top = trigger.top - tip.height - gap
  } else if (placement === 'left' && left < 4) {
    left = trigger.right + gap
  } else if (placement === 'right' && left + tip.width > vw - 4) {
    left = trigger.left - tip.width - gap
  }

  // Clamp horizontal
  left = Math.max(4, Math.min(left, vw - tip.width - 4))
  // Clamp vertical
  top = Math.max(4, Math.min(top, vh - tip.height - 4))

  position.value = { top: `${top}px`, left: `${left}px` }
}

async function show() {
  if (!props.text) return
  visible.value = true
  await nextTick()
  updatePosition()
}

function scheduleShow() {
  if (!props.text) return
  const now = Date.now()
  const isWarm = (now - lastGlobalHide) < WARM_WINDOW
  const effectiveDelay = isWarm ? 0 : props.delay
  showTimeout = setTimeout(show, effectiveDelay)
}

function hide() {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  if (visible.value) {
    visible.value = false
    lastGlobalHide = Date.now()
  }
}

onMounted(() => {
  // Hide on scroll anywhere
  window.addEventListener('scroll', hide, true)
})

onUnmounted(() => {
  hide()
  window.removeEventListener('scroll', hide, true)
})
</script>

<template>
  <div
    ref="triggerRef"
    class="tooltip-trigger"
    @pointerenter="scheduleShow"
    @pointerleave="hide"
    @pointerdown="hide"
    @focusin="scheduleShow"
    @focusout="hide"
  >
    <slot />
    <Teleport to="body">
      <Transition name="tooltip">
        <div
          v-if="visible && text"
          ref="tooltipRef"
          class="tooltip"
          role="tooltip"
          :style="position"
        >
          {{ text }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.tooltip-trigger {
  display: contents;
}

.tooltip {
  position: fixed;
  z-index: 9999;
  padding: var(--space-xxxs) var(--space-xxs);
  background: var(--color-text);
  color: var(--color-surface);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  border-radius: var(--radius-s);
  white-space: nowrap;
  pointer-events: none;
  max-width: 240px;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity var(--duration-fast) var(--ease-default);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
