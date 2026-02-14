<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, ColorPaletteData } from '@/data/types'

withDefaults(defineProps<{
  data: ColorPaletteData
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
      <div class="palette-row hstack gap-xs">
        <div v-for="color in data.colors" :key="color.hex" class="swatch-item vstack gap-xxxs">
          <span class="swatch" :style="{ backgroundColor: color.hex }" />
          <span class="swatch-name">{{ color.name }}</span>
        </div>
      </div>
      <Button
        v-if="data.action"
        :label="data.action.label"
        :variant="data.action.variant === 'destructive' ? 'tertiary' : (data.action.variant || 'secondary')"
        :icon="data.action.icon"
        size="small"
        @click.stop="emit('action', data.action)"
      />
    </div>
  </ChatCard>
</template>

<style scoped>
.palette-row {
  flex-wrap: wrap;
}

.swatch-item {
  align-items: center;
  min-width: 0;
}

.swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.swatch-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
