<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/primitives/Button.vue'
import ChatCard from '@shared/composites/chat-cards/ChatCard.vue'
import type { CardUiState, ThemeEditCardData } from '@/data/types'
import type { EditOperation } from '@/data/edit-types'
import { useEditCard } from '@/composables/useEditCard'

const props = withDefaults(defineProps<{
  data: ThemeEditCardData
  projectId: string
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

// Create the edit operation from the card data
const editOperation = computed<EditOperation>(() => ({
  type: 'theme-update',
  projectId: props.projectId,
  variables: props.data.after
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

// Extract color variables for swatches
const colorChanges = computed(() => {
  const changes: Array<{ name: string, before: string, after: string }> = []
  
  Object.keys(props.data.after).forEach(key => {
    if (key.includes('color') && props.data.before[key] !== props.data.after[key]) {
      changes.push({
        name: key,
        before: props.data.before[key] || '—',
        after: props.data.after[key]
      })
    }
  })
  
  return changes
})

// Extract non-color variables
const otherChanges = computed(() => {
  const changes: Array<{ name: string, before: string, after: string }> = []
  
  Object.keys(props.data.after).forEach(key => {
    if (!key.includes('color') && props.data.before[key] !== props.data.after[key]) {
      changes.push({
        name: key,
        before: props.data.before[key] || '—',
        after: props.data.after[key]
      })
    }
  })
  
  return changes
})

function isColorValue(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || 
         /^rgb\(/.test(value) || 
         /^hsl\(/.test(value)
}
</script>

<template>
  <ChatCard 
    :compact="compact" 
    :state="cardStateClass" 
    :title="cardTitle"
    :class="{ 'chat-card--trying': isTrying }"
  >
    <!-- Change summary -->
    <div class="change-summary">
      {{ data.changeSummary }}
    </div>

    <!-- Color changes with swatches -->
    <div v-if="colorChanges.length" class="color-changes vstack gap-xs">
      <h4 class="changes-heading">Colors</h4>
      <div class="color-comparison vstack gap-xxs">
        <div 
          v-for="change in colorChanges" 
          :key="change.name" 
          class="color-change-row hstack gap-xs"
        >
          <span class="variable-name">{{ change.name }}</span>
          <div class="color-swatches hstack gap-xs">
            <div class="swatch-group hstack gap-xxs">
              <div 
                v-if="isColorValue(change.before)" 
                class="color-swatch"
                :style="{ backgroundColor: change.before }"
                :title="change.before"
              />
              <span class="color-value">{{ change.before }}</span>
            </div>
            <span class="arrow">→</span>
            <div class="swatch-group hstack gap-xxs">
              <div 
                v-if="isColorValue(change.after)"
                class="color-swatch"
                :style="{ backgroundColor: change.after }"
                :title="change.after"
              />
              <span class="color-value">{{ change.after }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other variable changes -->
    <div v-if="otherChanges.length" class="other-changes vstack gap-xs">
      <h4 class="changes-heading">Typography & Spacing</h4>
      <div class="variable-comparison vstack gap-xxs">
        <div 
          v-for="change in otherChanges" 
          :key="change.name" 
          class="variable-change-row hstack justify-between gap-xs"
        >
          <span class="variable-name">{{ change.name }}</span>
          <span class="variable-arrow">{{ change.before }} → {{ change.after }}</span>
        </div>
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

.change-summary {
  font-size: var(--font-size-m);
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.changes-heading {
  font-size: var(--font-size-s);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
}

.color-changes,
.other-changes {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  padding: var(--space-xs);
}

.color-changes + .other-changes {
  margin-top: var(--space-xs);
}

.color-change-row {
  align-items: center;
  padding: var(--space-xxs) 0;
}

.variable-change-row {
  align-items: center;
  padding: var(--space-xxs) 0;
  border-bottom: 1px solid var(--color-surface-border);
}

.variable-change-row:last-child {
  border-bottom: none;
}

.variable-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  flex-shrink: 0;
  min-width: 120px;
}

.color-swatches {
  flex: 1;
  justify-content: flex-end;
}

.swatch-group {
  align-items: center;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.color-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.arrow {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.variable-arrow {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
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

.chat-card--complete .color-changes,
.chat-card--complete .other-changes,
.chat-card--complete .change-summary {
  opacity: 0.65;
}
</style>