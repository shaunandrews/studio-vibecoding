<script setup lang="ts">
import ChatCard from '@shared/composites/chat-cards/ChatCard.vue'
import ColorSwatches from '@/components/primitives/ColorSwatches.vue'
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
    <ColorSwatches
      :colors="data.colors"
      size="medium"
      :border-color="`var(--color-surface-border)`"
    />
  </ChatCard>
</template>
