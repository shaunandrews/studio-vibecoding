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
</script>

<template>
  <ChatCard :compact="compact" :state="state" :title="data.label">
    <ol class="progress-list vstack">
      <li v-for="step in data.steps" :key="step.name" class="progress-item hstack justify-between gap-xs">
        <span>{{ step.name }}</span>
        <span class="progress-status" :class="`progress-status--${step.status}`">
          <svg v-if="step.status === 'running'" class="progress-spinner" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="20 12" />
          </svg>
          <template v-else-if="step.status === 'done'">done</template>
          <template v-else-if="step.status === 'error'">error</template>
          <template v-else>pending</template>
        </span>
      </li>
    </ol>
  </ChatCard>
</template>

<style scoped>
.progress-list {
  list-style: none;
}

.progress-item {
  padding: var(--space-xxxs) 0;
  border-block-end: 1px solid var(--color-surface-border);
}

.progress-item:last-child {
  border-block-end: none;
}

.progress-status {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
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

.progress-spinner {
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
