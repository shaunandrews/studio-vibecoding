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
  <ChatCard :compact="compact" :state="state" :title="data.label">
    <div class="palette-bar hstack">
      <span
        v-for="color in data.colors"
        :key="color.hex"
        class="palette-swatch"
        :style="{ backgroundColor: color.hex }"
      />
    </div>
    <template v-if="data.action" #footer>
      <Button
        :label="data.action.label"
        :variant="data.action.variant === 'destructive' ? 'tertiary' : (data.action.variant || 'secondary')"
        :icon="data.action.icon"
        size="small"
        @click.stop="emit('action', data.action)"
      />
    </template>
  </ChatCard>
</template>

<style scoped>
.palette-bar {
  height: 58px;
  border-radius: var(--radius-s);
  overflow: hidden;
  gap: 0;
}

.palette-swatch {
  flex: 1;
  height: 100%;
}
</style>
