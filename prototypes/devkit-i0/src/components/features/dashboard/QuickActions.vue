<script setup lang="ts">
import { external, wordpress, code, tool } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'

const actions = [
  { label: 'Open Site', icon: external },
  { label: 'WP Admin', icon: wordpress },
  { label: 'Editor', icon: code },
  { label: 'Terminal', icon: tool },
]
</script>

<template>
  <div class="quick-actions">
    <button
      v-for="action in actions"
      :key="action.label"
      class="quick-actions__btn"
      type="button"
    >
      <WPIcon :icon="action.icon" :size="16" />
      <span>{{ action.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xxs);
}

.quick-actions__btn {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-xs);
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  transition: background var(--transition-hover), color var(--transition-hover), border-color var(--transition-hover);
}

.quick-actions__btn:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
  border-color: var(--color-text-muted);
}

.quick-actions__btn svg {
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: color var(--transition-hover);
}

.quick-actions__btn:hover svg {
  color: var(--color-text-secondary);
}
</style>
