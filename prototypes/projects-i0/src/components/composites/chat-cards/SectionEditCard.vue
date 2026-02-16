<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { CardUiState, SectionEditCardData } from '@/data/types'
import type { EditOperation } from '@/data/edit-types'
import { useEditCard } from '@/composables/useEditCard'

const props = withDefaults(defineProps<{
  data: SectionEditCardData
  projectId: string
  sectionId: string
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

// Create the edit operation from the card data
const editOperation = computed<EditOperation>(() => ({
  type: 'section-update',
  projectId: props.projectId,
  sectionId: props.sectionId,
  html: props.data.after.html,
  css: props.data.after.css
}))

const { 
  state: cardState, 
  progressMessage, 
  tryIt, 
  dismiss, 
  apply 
} = useEditCard(editOperation.value, props.projectId)

const isProposed = computed(() => cardState.value === 'proposed')
const isTrying = computed(() => cardState.value === 'trying')
const isApplying = computed(() => cardState.value === 'applying')
const isComplete = computed(() => cardState.value === 'complete')
const isError = computed(() => cardState.value === 'error')

const cardTitle = computed(() => {
  if (isComplete.value) return `✓ ${props.data.label}`
  if (isError.value) return `✗ ${props.data.label}`
  return props.data.label
})

const cardStateClass = computed(() => {
  if (isTrying.value) return 'trying'
  if (isApplying.value) return 'loading'
  if (isComplete.value) return 'complete'
  if (isError.value) return 'error'
  return 'default'
})
</script>

<template>
  <ChatCard 
    :compact="compact" 
    :state="cardStateClass" 
    :title="cardTitle"
    :class="{ 'chat-card--trying': isTrying }"
  >
    <!-- Section name and change summary -->
    <div class="section-info vstack gap-xxs">
      <div class="section-name">
        <strong>{{ data.sectionId }}</strong>
      </div>
      <div class="change-summary">
        {{ data.changeSummary }}
      </div>
    </div>

    <!-- Before/After preview (abbreviated) -->
    <div v-if="!isComplete" class="before-after vstack gap-xs">
      <div class="comparison-row">
        <span class="comparison-label">Before:</span>
        <div class="content-snippet">{{ data.before.html.substring(0, 100) }}...</div>
      </div>
      <div class="comparison-row">
        <span class="comparison-label">After:</span>
        <div class="content-snippet">{{ data.after.html.substring(0, 100) }}...</div>
      </div>
    </div>

    <!-- Progress message during applying -->
    <div v-if="isApplying" class="progress-message">
      {{ progressMessage }}
    </div>

    <!-- Error message -->
    <div v-if="isError" class="error-message">
      {{ progressMessage }}
    </div>

    <template #footer>
      <!-- Proposed state: Try it (secondary) + Apply (primary) -->
      <div v-if="isProposed" class="actions hstack gap-xs">
        <Button
          label="Try it"
          variant="secondary"
          size="small"
          @click="tryIt"
        />
        <Button
          label="Apply"
          variant="primary"
          size="small"
          @click="apply"
        />
      </div>

      <!-- Trying state: Dismiss + Apply -->
      <div v-else-if="isTrying" class="actions hstack gap-xs">
        <Button
          label="Dismiss"
          variant="secondary"
          size="small"
          @click="dismiss"
        />
        <Button
          label="Apply"
          variant="primary"
          size="small"
          @click="apply"
        />
      </div>

      <!-- Error state: Retry -->
      <div v-else-if="isError" class="actions hstack gap-xs">
        <Button
          label="Retry"
          variant="secondary"
          size="small"
          @click="apply"
        />
      </div>

      <!-- Applying and Complete states: no buttons -->
    </template>
  </ChatCard>
</template>

<style scoped>
.chat-card--trying {
  border-color: var(--color-primary);
  animation: pulse-border 2s ease-in-out infinite;
}

@keyframes pulse-border {
  0%, 100% { border-color: var(--color-primary); opacity: 1; }
  50% { border-color: var(--color-primary); opacity: 0.6; }
}

.section-info {
  margin-bottom: var(--space-xs);
}

.section-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.change-summary {
  font-size: var(--font-size-m);
  color: var(--color-text);
}

.before-after {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  padding: var(--space-xs);
}

.comparison-row {
  display: flex;
  gap: var(--space-xs);
  align-items: flex-start;
}

.comparison-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 600;
  min-width: 50px;
  flex-shrink: 0;
}

.content-snippet {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-message {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  padding: var(--space-xs) 0;
}

.error-message {
  font-size: var(--font-size-s);
  color: #d63638;
  padding: var(--space-xs) 0;
}

.actions {
  width: 100%;
  justify-content: flex-end;
}

.chat-card--complete .section-info,
.chat-card--complete .before-after {
  opacity: 0.65;
}
</style>