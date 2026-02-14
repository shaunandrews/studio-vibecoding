<script setup lang="ts">
import type { CardUiState } from '@/data/types'

withDefaults(defineProps<{
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})
</script>

<template>
  <div class="chat-card" :class="[`chat-card--${state}`, { 'chat-card--compact': compact }]">
    <slot />
  </div>
</template>

<style scoped>
.chat-card {
  width: min(100%, 520px);
  min-width: min(100%, 360px);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  background: var(--color-surface);
  padding: var(--space-s);
  margin: var(--space-m) 0;
  margin-inline-start: calc(-1 * var(--space-s));
}

.chat-card--compact {
  padding: var(--space-xs);
}

.chat-card--disabled {
  opacity: 0.65;
}

.chat-card--error {
  border-color: #d63638;
}

.chat-card--loading {
  border-color: var(--color-primary);
}
</style>
