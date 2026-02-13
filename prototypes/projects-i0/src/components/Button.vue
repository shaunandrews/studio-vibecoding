<script setup lang="ts">
import WPIcon from './WPIcon.vue'

defineProps<{
  icon?: any
  label?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  surface?: 'light' | 'dark'
  size?: 'small' | 'default'
  width?: 'hug' | 'full'
}>()
</script>

<template>
  <button
    class="btn"
    :class="[
      `btn--${variant || 'secondary'}`,
      `btn--${size || 'default'}`,
      `btn--on-${surface || 'light'}`,
      `btn--${width || 'hug'}`,
      { 'btn--icon-only': icon && !label }
    ]"
  >
    <WPIcon v-if="icon" :icon="icon" :size="size === 'small' ? 16 : 18" />
    <span v-if="label" class="btn__label">{{ label }}</span>
    <slot v-if="!icon && !label" />
  </button>
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
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
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
  font-size: 13px;
}

.btn--small {
  height: 25px; /* 5 units — matches --space-m */
  padding: 0 var(--space-xs);
  font-size: 12px;
}

.btn--icon-only.btn--default {
  width: 35px; /* matches height */
  padding: 0;
}

.btn--icon-only.btn--small {
  width: 25px; /* matches height */
  padding: 0;
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
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.btn--tertiary.btn--on-dark {
  background: transparent;
  color: var(--color-chrome-text-muted);
}

.btn--tertiary.btn--on-dark:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.btn--tertiary.btn--on-dark:focus-visible {
  outline-color: var(--color-chrome-subtle);
}
</style>
