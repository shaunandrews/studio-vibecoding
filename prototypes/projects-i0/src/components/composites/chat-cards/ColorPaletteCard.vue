<script setup lang="ts">
import ChatCard from './ChatCard.vue'
import type { CardUiState, ColorPaletteData } from '@/data/types'

withDefaults(defineProps<{
  data: ColorPaletteData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

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
