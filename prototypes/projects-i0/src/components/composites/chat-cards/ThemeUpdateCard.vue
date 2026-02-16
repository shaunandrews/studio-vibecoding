<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import { useSiteThemes } from '@/data/themes/useSiteThemes'
import type { ActionButton, CardUiState, ThemeUpdateCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: ThemeUpdateCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const emit = defineEmits<{
  action: [action: ActionButton]
}>()

const route = useRoute()
const { getTheme } = useSiteThemes()

const projectId = computed(() => route.params.id as string)
const currentTheme = computed(() => getTheme(projectId.value))

const currentPalette = computed(() => currentTheme.value?.settings.color.palette ?? [])
const proposedPalette = computed(() => props.data.changes.color?.palette ?? [])

const hasColorChanges = computed(() => !!props.data.changes.color)
const hasTypographyChanges = computed(() => !!props.data.changes.typography)
</script>

<template>
  <ChatCard :compact="compact" :state="state" :title="data.label">
    <!-- Color palette before/after -->
    <div v-if="hasColorChanges && proposedPalette.length" class="palette-comparison vstack gap-xxs">
      <div class="palette-row hstack gap-xxs">
        <span class="palette-label">Current</span>
        <div class="palette-bar hstack">
          <span
            v-for="color in currentPalette"
            :key="color.slug"
            class="palette-swatch"
            :style="{ backgroundColor: color.hex }"
          />
        </div>
      </div>
      <div class="palette-row hstack gap-xxs">
        <span class="palette-label">Proposed</span>
        <div class="palette-bar hstack">
          <span
            v-for="color in proposedPalette"
            :key="color.slug"
            class="palette-swatch"
            :style="{ backgroundColor: color.hex }"
          />
        </div>
      </div>
    </div>

    <!-- Background/text color changes -->
    <div v-if="hasColorChanges && (data.changes.color?.background || data.changes.color?.text)" class="settings-list vstack">
      <div v-if="data.changes.color?.background" class="setting-row hstack justify-between gap-xs">
        <span class="setting-key">background</span>
        <span class="setting-arrow">{{ currentTheme?.settings.color.background ?? '—' }} → {{ data.changes.color.background }}</span>
      </div>
      <div v-if="data.changes.color?.text" class="setting-row hstack justify-between gap-xs">
        <span class="setting-key">text</span>
        <span class="setting-arrow">{{ currentTheme?.settings.color.text ?? '—' }} → {{ data.changes.color.text }}</span>
      </div>
    </div>

    <!-- Typography changes -->
    <div v-if="hasTypographyChanges" class="settings-list vstack">
      <div v-if="data.changes.typography?.fontFamily?.heading" class="setting-row hstack justify-between gap-xs">
        <span class="setting-key">heading font</span>
        <span class="setting-arrow">{{ currentTheme?.settings.typography.fontFamily.heading ?? '—' }} → {{ data.changes.typography.fontFamily.heading }}</span>
      </div>
      <div v-if="data.changes.typography?.fontFamily?.body" class="setting-row hstack justify-between gap-xs">
        <span class="setting-key">body font</span>
        <span class="setting-arrow">{{ currentTheme?.settings.typography.fontFamily.body ?? '—' }} → {{ data.changes.typography.fontFamily.body }}</span>
      </div>
    </div>

    <template v-if="data.action" #footer>
      <Button
        :label="data.action.label"
        :variant="data.action.variant === 'destructive' ? 'tertiary' : (data.action.variant || 'primary')"
        :icon="data.action.icon"
        size="small"
        @click.stop="emit('action', data.action)"
      />
    </template>
  </ChatCard>
</template>

<style scoped>
.palette-comparison {
  margin-block-end: var(--space-xxs);
}

.palette-row {
  align-items: center;
}

.palette-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  width: 60px; /* optical alignment — fixed label width */
  flex-shrink: 0;
}

.palette-bar {
  flex: 1;
  height: 30px; /* 6 grid units */
  border-radius: var(--radius-s);
  overflow: hidden;
  gap: 0;
}

.palette-swatch {
  flex: 1;
  height: 100%;
}

.settings-list + .settings-list {
  margin-block-start: var(--space-xxs);
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
