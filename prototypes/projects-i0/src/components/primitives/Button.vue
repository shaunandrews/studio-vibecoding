<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Tooltip from '@shared/primitives/Tooltip.vue'

const props = defineProps<{
  icon?: any
  label?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  surface?: 'light' | 'dark'
  size?: 'small' | 'default'
  iconOnly?: boolean
  width?: 'hug' | 'full'
  shortcut?: string
  active?: boolean
  activeRotate?: boolean
  disabled?: boolean
  tooltip?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}>()

// No custom click emit — native click falls through via inheritAttrs

const btnRef = ref<HTMLButtonElement | null>(null)

function formatShortcut(shortcut: string): string {
  const isMac = navigator.platform.includes('Mac')
  return shortcut
    .replace('mod', isMac ? '⌘' : 'Ctrl')
    .replace('shift', isMac ? '⇧' : 'Shift')
    .replace('alt', isMac ? '⌥' : 'Alt')
    .replace('enter', '↵')
    .replace(/\+/g, '')
}

function onKeydown(e: KeyboardEvent) {
  if (!props.shortcut) return
  const parts = props.shortcut.toLowerCase().split('+')
  const needsMod = parts.includes('mod')
  const needsShift = parts.includes('shift')
  const needsAlt = parts.includes('alt')
  const key = parts.filter(p => !['mod', 'shift', 'alt'].includes(p))[0]

  const modPressed = e.metaKey || e.ctrlKey
  if (needsMod && !modPressed) return
  if (needsShift && !e.shiftKey) return
  if (needsAlt && !e.altKey) return
  if (e.key.toLowerCase() !== key) return

  e.preventDefault()
  btnRef.value?.click()
}

onMounted(() => {
  if (props.shortcut) document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  if (props.shortcut) document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Tooltip :text="tooltip" :placement="tooltipPlacement">
    <button
      ref="btnRef"
      class="btn"
      :class="[
        `btn--${variant || 'secondary'}`,
        `btn--${size || 'default'}`,
        `btn--on-${surface || 'light'}`,
        `btn--${width || 'hug'}`,
        { 'btn--icon-only': icon && !label, 'btn--active': active, 'btn--active-rotate': active && activeRotate }
      ]"
      :disabled="disabled"
    >
      <WPIcon v-if="icon" :icon="icon" :size="size === 'small' ? 18 : 18" />
      <span v-if="label" class="btn__label">{{ label }}</span>
      <span v-if="shortcut" class="btn__shortcut">{{ formatShortcut(shortcut) }}</span>
      <slot v-if="!icon && !label && !shortcut" />
    </button>
  </Tooltip>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xxs);
  border: none;
  border-radius: var(--radius-m);
  font-family: inherit;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover), border-color var(--transition-hover);
  white-space: nowrap;
  flex-shrink: 0;
  outline: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Sizes */
.btn--default {
  height: 35px; /* 7 units — intentional, matches Studio's control height */
  padding: 0 var(--space-s);
  font-size: var(--font-size-m);
}

.btn--small {
  height: 25px; /* 5 units — matches --space-m */
  padding: 0 var(--space-xs);
  font-size: var(--font-size-s);
  border-radius: var(--radius-s);
}

.btn--icon-only.btn--default {
  width: 35px; /* matches height */
  padding: 0;
}

.btn--icon-only.btn--small {
  width: 25px; /* matches height */
  padding: 0;
}

.btn__shortcut {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  line-height: 1;
  padding: 2px var(--space-xxxs);
  border-radius: var(--radius-s);
  margin-inline-start: var(--space-xxs);
  flex-shrink: 0;
}

.btn--on-light .btn__shortcut {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: inherit;
  opacity: 0.5;
}

.btn--on-dark .btn__shortcut {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: inherit;
  opacity: 0.5;
}

/* Width */
.btn--hug { width: auto; }

.btn--full { width: 100%; }

/* ============================================
   PRIMARY
   ============================================ */
.btn--primary.btn--on-light {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.btn--primary.btn--on-light:hover {
  background: var(--color-primary-hover);
}

.btn--primary.btn--on-dark {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.btn--primary.btn--on-dark:hover {
  background: var(--color-primary-hover);
}

/* ============================================
   SECONDARY
   ============================================ */
.btn--secondary.btn--on-light {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-surface-border);
}

.btn--secondary.btn--on-light:hover {
  background: var(--color-surface-secondary);
}

.btn--secondary.btn--on-dark {
  background: transparent;
  color: var(--color-chrome-text-secondary);
  border: 1px solid var(--color-chrome-subtle);
}

.btn--secondary.btn--on-dark:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.btn--secondary.btn--on-dark:focus-visible {
  outline-color: var(--color-chrome-subtle);
}

/* ============================================
   TERTIARY
   ============================================ */
.btn--tertiary.btn--on-light {
  background: transparent;
  color: var(--color-text-secondary);
}

.btn--tertiary.btn--on-light:hover {
  background: var(--color-surface);
  color: var(--color-text);
}

.btn--tertiary.btn--on-light.btn--active {
  background: var(--color-text);
  color: var(--color-surface);
}

.btn--tertiary.btn--on-light.btn--active:hover {
  background: var(--color-text-secondary);
}

.btn--tertiary.btn--on-dark {
  background: transparent;
  color: var(--color-chrome-text-muted);
}

.btn--tertiary.btn--on-dark:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.btn--tertiary.btn--on-dark.btn--active {
  background: var(--color-chrome-text);
  color: var(--color-chrome);
}

.btn--tertiary.btn--on-dark.btn--active:hover {
  background: var(--color-chrome-text-secondary);
}

.btn--tertiary.btn--on-dark:focus-visible {
  outline-color: var(--color-chrome-subtle);
}

/* Icon rotation for active state */
.btn :deep(svg) {
  transition: transform var(--duration-fast) var(--ease-default);
}

.btn--active-rotate :deep(svg) {
  transform: rotate(180deg);
}

/* Disabled */
.btn:disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}

.btn:disabled.btn--active {
  background: transparent;
  color: inherit;
  opacity: 0.3;
  pointer-events: none;
}
</style>
