<script setup lang="ts">
import ChatCard from './ChatCard.vue'
import type { CardUiState, DesignBriefCardData } from '@/data/types'

withDefaults(defineProps<{
  data: DesignBriefCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})
</script>

<template>
  <ChatCard :compact="compact" :state="state" title="Design Brief">
    <div class="brief vstack gap-s">
      <div class="brief__direction">
        {{ data.direction }}
      </div>

      <div class="brief__section">
        <div class="brief__label">Fonts</div>
        <div class="brief__fonts hstack gap-xs">
          <span v-for="font in data.fonts" :key="font" class="brief__font-tag">{{ font }}</span>
        </div>
      </div>

      <div v-if="data.colors.length > 0" class="brief__section">
        <div class="brief__label">Colors</div>
        <div class="brief__colors hstack gap-xxxs">
          <div
            v-for="color in data.colors"
            :key="color.name"
            class="brief__swatch"
            :style="{ background: color.value }"
            :title="`${color.name}: ${color.value}`"
          />
        </div>
      </div>
    </div>
  </ChatCard>
</template>

<style scoped>
.brief__direction {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

.brief__label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-block-end: var(--space-xxxs);
}

.brief__font-tag {
  font-size: var(--font-size-s);
  padding: var(--space-xxxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
}

.brief__colors {
  flex-wrap: wrap;
}

.brief__swatch {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
}
</style>
