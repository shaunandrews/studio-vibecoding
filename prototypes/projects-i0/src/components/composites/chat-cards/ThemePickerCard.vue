<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, ThemePickerCardData } from '@/data/types'

const props = withDefaults(defineProps<{
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

const thumbnailColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899']

function colorForTheme(index: number): string {
  return thumbnailColors[index % thumbnailColors.length]
}
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <div class="theme-picker vstack gap-xs">
      <div class="theme-grid" :class="{ 'theme-grid--compact': compact }">
        <div v-for="(theme, idx) in data.themes" :key="theme.slug" class="theme-item vstack gap-xxxs">
          <div class="theme-thumbnail" :style="{ backgroundColor: colorForTheme(idx) }">
            <span class="theme-thumbnail-label">{{ theme.name }}</span>
          </div>
          <strong class="theme-name">{{ theme.name }}</strong>
          <p v-if="!compact" class="theme-description">{{ theme.description }}</p>
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
  align-items: center;
  justify-content: center;
}

.theme-thumbnail-label {
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
