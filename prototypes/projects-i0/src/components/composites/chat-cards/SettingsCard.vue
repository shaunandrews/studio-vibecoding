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
  <ChatCard :compact="compact" :state="state" :title="data.label">
    <div class="settings-list vstack">
      <div
        v-for="setting in data.settings"
        :key="setting.key"
        class="setting-row hstack justify-between gap-xs"
      >
        <span class="setting-key">{{ setting.key }}</span>
        <span class="setting-arrow">{{ setting.current }} → {{ setting.proposed }}</span>
      </div>
    </div>
    <template v-if="data.actions?.length" #footer>
      <div class="hstack gap-xxs">
        <Button
          v-for="action in data.actions"
          :key="action.id"
          :label="action.label"
          :variant="action.variant === 'destructive' ? 'tertiary' : (action.variant || 'secondary')"
          :icon="action.icon"
          size="small"
          @click.stop="emit('action', action)"
        />
      </div>
    </template>
  </ChatCard>
</template>

<style scoped>
.settings-list {
  /* No outer border — card body provides the frame */
}

.setting-row {
  padding: var(--space-xxxs) 0;
  border-block-end: 1px solid var(--color-surface-border);
}

.setting-row:last-child {
  border-block-end: none;
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
