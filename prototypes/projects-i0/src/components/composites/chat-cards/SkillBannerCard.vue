<script setup lang="ts">
import type { SkillBannerCardData, CardUiState } from '@/data/types'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  data: SkillBannerCardData
  state?: CardUiState
}>()

const CATEGORY_COLORS: Record<string, string> = {
  content: 'var(--color-primary)',
  design: '#8b5cf6',
  commerce: '#059669',
  performance: '#d97706',
  security: '#dc2626',
  developer: '#6366f1',
}

const accentColor = CATEGORY_COLORS[props.data.category] ?? 'var(--color-primary)'
const resolvedIcon = (wpIcons as any)[props.data.skillIcon] ?? wpIcons.plugins
</script>

<template>
  <div class="skill-banner" :style="{ '--skill-accent': accentColor }">
    <div class="skill-banner__icon">
      <WPIcon :icon="resolvedIcon" :size="16" />
    </div>
    <Text variant="label" class="skill-banner__label">Using {{ data.skillName }}</Text>
  </div>
</template>

<style scoped>
.skill-banner {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xxs) var(--space-s);
  border-radius: var(--radius-s);
  background: color-mix(in srgb, var(--skill-accent) 8%, transparent);
  border-inline-start: 3px solid var(--skill-accent);
  margin-block: var(--space-xxs);
}

.skill-banner__icon {
  color: var(--skill-accent);
  display: flex;
  align-items: center;
}

.skill-banner__label {
  color: var(--skill-accent);
  font-weight: var(--font-weight-medium);
}
</style>
