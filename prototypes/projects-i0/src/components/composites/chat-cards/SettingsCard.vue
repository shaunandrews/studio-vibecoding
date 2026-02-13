<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, SettingsCardData } from '@/data/types'

withDefaults(defineProps<{
  data: SettingsCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const emit = defineEmits<{
  action: [action: ActionButton]
}>()
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <div class="vstack gap-xs">
      <strong>{{ data.label }}</strong>
      <div class="vstack gap-xxxs">
        <div
          v-for="setting in data.settings"
          :key="setting.key"
          class="setting-row hstack justify-between gap-xs"
        >
          <span class="setting-key">{{ setting.key }}</span>
          <span class="setting-arrow">{{ setting.current }} -> {{ setting.proposed }}</span>
        </div>
      </div>
      <div v-if="data.actions?.length" class="hstack gap-xxs">
        <Button
          v-for="action in data.actions"
          :key="action.id"
          :label="action.label"
          :variant="action.variant === 'destructive' ? 'secondary' : (action.variant || 'secondary')"
          :icon="action.icon"
          size="small"
          @click.stop="emit('action', action)"
        />
      </div>
    </div>
  </ChatCard>
</template>

<style scoped>
.setting-row {
  padding: var(--space-xxxs) var(--space-xxs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
}

.setting-key {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.setting-arrow {
  font-size: var(--font-size-xs);
}
</style>
