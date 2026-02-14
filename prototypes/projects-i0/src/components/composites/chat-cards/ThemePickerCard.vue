<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, ThemePickerCardData } from '@/data/types'

withDefaults(defineProps<{
  data: ThemePickerCardData
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
    <div class="theme-picker vstack gap-xs">
      <div class="theme-grid" :class="{ 'theme-grid--compact': compact }">
        <div v-for="theme in data.themes" :key="theme.slug" class="theme-item vstack gap-xxxs">
          <div class="theme-thumbnail" :style="{ backgroundColor: theme.colors?.[0] || '#e0e0e0' }">
            <div class="theme-thumbnail-swatches hstack">
              <span
                v-for="(color, i) in (theme.colors || []).slice(0, 5)"
                :key="i"
                class="theme-swatch"
                :style="{ backgroundColor: color }"
              />
            </div>
          </div>
          <strong class="theme-name">{{ theme.name }}</strong>
          <p v-if="!compact && theme.description" class="theme-description">{{ theme.description }}</p>
        </div>
      </div>
      <div v-if="data.actions?.length" class="hstack gap-xxs flex-wrap">
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
    </div>
  </ChatCard>
</template>

<style scoped>
.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xs);
}

.theme-grid--compact {
  grid-template-columns: 1fr;
}

.theme-thumbnail {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-s);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid var(--color-surface-border);
}

.theme-thumbnail-swatches {
  width: 100%;
  gap: 0;
}

.theme-swatch {
  flex: 1;
  height: 20px;
}

.theme-name {
  font-size: var(--font-size-s);
  line-height: var(--line-height-tight);
}

.theme-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
}
</style>
