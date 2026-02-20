<script setup lang="ts">
import type { Skill } from '@/data/types'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Text from '@shared/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  skill: Skill
  mode?: 'card' | 'compact'
  showInstall?: boolean
  activeCount?: number
}>()

const emit = defineEmits<{
  select: [id: string]
  install: [id: string]
  uninstall: [id: string]
}>()

const CATEGORY_COLORS: Record<string, string> = {
  content: 'var(--color-primary)',
  design: '#8b5cf6',
  commerce: '#059669',
  performance: '#d97706',
  security: '#dc2626',
  developer: '#6366f1',
}

const CATEGORY_LABELS: Record<string, string> = {
  content: 'Content',
  design: 'Design',
  commerce: 'Commerce',
  performance: 'Performance',
  security: 'Security',
  developer: 'Developer',
}

const resolvedIcon = (wpIcons as any)[props.skill.icon] ?? wpIcons.plugins
</script>

<template>
  <div
    class="skill-card"
    :class="[`mode-${mode ?? 'card'}`]"
    @click="emit('select', skill.id)"
  >
    <div class="skill-card__header hstack gap-xs">
      <div class="skill-card__icon" :style="{ color: CATEGORY_COLORS[skill.category] }">
        <WPIcon :icon="resolvedIcon" :size="24" />
      </div>
      <div class="skill-card__meta vstack gap-xxxs flex-1 min-w-0">
        <Text variant="body" weight="medium" class="skill-card__name">{{ skill.name }}</Text>
        <div class="hstack gap-xxs align-center">
          <span class="skill-card__category" :style="{ color: CATEGORY_COLORS[skill.category] }">
            {{ CATEGORY_LABELS[skill.category] }}
          </span>
          <span v-if="skill.slashCommand" class="skill-card__command">{{ skill.slashCommand }}</span>
        </div>
      </div>
      <div v-if="showInstall" class="skill-card__action shrink-0">
        <Button
          v-if="!skill.installed"
          variant="primary"
          size="small"
          label="Install"
          @click.stop="emit('install', skill.id)"
        />
        <Button
          v-else
          variant="tertiary"
          size="small"
          label="Installed"
          @click.stop="emit('uninstall', skill.id)"
        />
      </div>
    </div>
    <Text variant="caption" color="secondary" class="skill-card__desc">
      {{ skill.description }}
    </Text>
    <div v-if="activeCount !== undefined && activeCount > 0" class="skill-card__active">
      <Text variant="caption" color="muted">Active in {{ activeCount }} {{ activeCount === 1 ? 'project' : 'projects' }}</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  cursor: pointer;
  transition: border-color var(--transition-hover), transform 0.15s ease;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.skill-card:hover {
  border-color: var(--color-text-muted);
  transform: translateY(-1px);
}

.skill-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-s);
  background: var(--color-surface-secondary);
  flex-shrink: 0;
}

.skill-card__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-card__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-card__command {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono, monospace);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
}

.skill-card__desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skill-card.mode-compact {
  padding: var(--space-xs);
}

.skill-card.mode-compact .skill-card__icon {
  width: 32px;
  height: 32px;
}
</style>
