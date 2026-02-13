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
      <div class="palette-grid" :class="{ 'palette-grid--compact': compact }">
        <div v-for="color in data.colors" :key="`${color.name}-${color.hex}`" class="swatch-item hstack gap-xs">
          <span class="swatch" :style="{ backgroundColor: color.hex }" />
          <span class="swatch-label">{{ color.name }}</span>
          <span v-if="!compact" class="swatch-hex">{{ color.hex }}</span>
          <span v-if="!compact" class="swatch-usage">{{ color.usage }}</span>
        </div>
      </div>
      <Button
        v-if="data.action"
        :label="data.action.label"
        :variant="data.action.variant === 'destructive' ? 'secondary' : (data.action.variant || 'secondary')"
        :icon="data.action.icon"
        size="small"
        @click.stop="emit('action', data.action)"
      />
    </div>
  </ChatCard>
</template>

<style scoped>
.palette-grid {
  display: grid;
  gap: var(--space-xxs);
}

.swatch-item {
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  padding: var(--space-xxs);
  min-width: 0;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.swatch-label {
  font-weight: var(--font-weight-medium);
}

.swatch-hex,
.swatch-usage {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.palette-grid--compact .swatch-item {
  padding: var(--space-xxxs) var(--space-xxs);
}
</style>
