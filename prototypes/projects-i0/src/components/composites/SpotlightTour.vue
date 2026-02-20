<script setup lang="ts">
/**
 * SpotlightTour — guided tour overlay with spotlight cutout and tooltip card.
 *
 * Teleported to <body>. Uses useTour() for all state.
 *
 * The "cutout" trick: a transparent div sits at the target's position with a
 * massive box-shadow (9999px) that covers the entire viewport, creating a
 * dimming effect everywhere EXCEPT over the target element.
 */
import { computed, onMounted, onBeforeUnmount } from 'vue'
import Button from '@/components/primitives/Button.vue'
import { useTour } from '@/data/useTour'

const { active, currentStep, currentIndex, totalSteps, targetRect, isFirst, isLast, next, back, stop } = useTour()

const PAD = 8 // px padding around target element

// Cutout position derived from targetRect
const cutoutStyle = computed(() => {
  if (!targetRect.value) return {}
  const r = targetRect.value
  return {
    position: 'fixed' as const,
    top: `${r.top - PAD}px`,
    left: `${r.left - PAD}px`,
    width: `${r.width + PAD * 2}px`,
    height: `${r.height + PAD * 2}px`,
    borderRadius: 'var(--radius-m)',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
    background: 'transparent',
    pointerEvents: 'none' as const,
    zIndex: '10000',
    transition: 'top var(--duration-slow) var(--ease-in-out), left var(--duration-slow) var(--ease-in-out), width var(--duration-slow) var(--ease-in-out), height var(--duration-slow) var(--ease-in-out)',
  }
})

// Tooltip position: below target preferred, above as fallback
const tooltipStyle = computed(() => {
  if (!targetRect.value) return {}
  const r = targetRect.value
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: '10001',
    width: '320px',
  }

  const spaceBelow = window.innerHeight - (r.bottom + PAD)
  const spaceAbove = r.top - PAD

  if (spaceBelow >= 200 || spaceBelow >= spaceAbove) {
    // Place below — 12px gap from cutout edge
    style.top = `${r.bottom + PAD + 12}px`
  } else {
    // Place above
    style.bottom = `${window.innerHeight - r.top + PAD + 12}px`
  }

  // Horizontal: center on target, clamp to viewport edges
  let left = r.left + r.width / 2 - 160
  if (left + 320 > window.innerWidth - 16) left = window.innerWidth - 16 - 320
  if (left < 16) left = 16
  style.left = `${left}px`

  return style
})

function onKeydown(e: KeyboardEvent) {
  if (!active.value) return
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    e.preventDefault()
    next()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    back()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    stop()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="tour">
      <div v-if="active && targetRect" class="tour-overlay" @click.self="stop">
        <div class="tour-cutout" :style="cutoutStyle" />
        <div class="tour-tooltip vstack gap-xs" :style="tooltipStyle">
          <div class="tour-tooltip__title">{{ currentStep?.title }}</div>
          <div class="tour-tooltip__desc">{{ currentStep?.description }}</div>
          <div class="tour-tooltip__footer hstack justify-between align-center">
            <span class="tour-tooltip__step">{{ currentIndex + 1 }} of {{ totalSteps }}</span>
            <div class="hstack gap-xxs">
              <Button v-if="!isFirst" variant="tertiary" label="Back" size="small" @click="back" />
              <Button variant="primary" :label="isLast ? 'Done' : 'Next'" size="small" @click="next" />
            </div>
          </div>
          <button class="tour-skip" @click="stop">Skip tour</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tour-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  /* Overlay is transparent — the cutout's box-shadow IS the dimming effect */
}

.tour-tooltip {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: top var(--duration-slow) var(--ease-in-out),
    left var(--duration-slow) var(--ease-in-out),
    bottom var(--duration-slow) var(--ease-in-out);
}

.tour-tooltip__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.tour-tooltip__desc {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.tour-tooltip__footer {
  padding-block-start: var(--space-xxs);
}

.tour-tooltip__step {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.tour-skip {
  background: none;
  border: none;
  font-family: inherit;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;
  text-align: center;
  transition: color var(--duration-fast) var(--ease-default);
}

.tour-skip:hover {
  color: var(--color-text-secondary);
}

/* Entry/exit transition for the entire overlay */
.tour-enter-active,
.tour-leave-active {
  transition: opacity var(--duration-fast) var(--ease-default);
}

.tour-enter-from,
.tour-leave-to {
  opacity: 0;
}
</style>
