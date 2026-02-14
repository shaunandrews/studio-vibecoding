<script setup lang="ts">
import ChatCard from './ChatCard.vue'
import type { CardUiState, ProgressCardData } from '@/data/types'

withDefaults(defineProps<{
  data: ProgressCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

function statusLabel(status: ProgressCardData['steps'][number]['status']): string {
  if (status === 'done') return 'done'
  if (status === 'running') return 'running'
  if (status === 'error') return 'error'
  return 'pending'
}
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <div class="vstack gap-xs">
      <strong>{{ data.label }}</strong>
      <ol class="progress-list vstack">
        <li v-for="step in data.steps" :key="step.name" class="progress-item hstack justify-between gap-xs">
          <span>{{ step.name }}</span>
          <span class="progress-status" :class="`progress-status--${step.status}`">{{ statusLabel(step.status) }}</span>
        </li>
      </ol>
    </div>
  </ChatCard>
</template>

<style scoped>
.progress-list {
  list-style: none;
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  overflow: hidden;
}

.progress-item {
  padding: var(--space-xxxs) var(--space-xxs);
  border-block-end: 1px solid var(--color-surface-border);
}

.progress-item:last-child {
  border-block-end: none;
}

.progress-status {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.progress-status--done {
  color: #00a32a;
}

.progress-status--running {
  color: #b87a00;
}

.progress-status--error {
  color: #d63638;
}

.progress-status--pending {
  color: var(--color-text-muted);
}
</style>
