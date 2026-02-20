<script setup lang="ts">
import type { Skill } from '@/data/types'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Text from '@shared/primitives/Text.vue'
import * as wpIcons from '@wordpress/icons'

const props = defineProps<{
  matches: Skill[]
  selectedIndex: number
}>()

const emit = defineEmits<{
  select: [skill: Skill]
}>()
</script>

<template>
  <div v-if="matches.length" class="skill-autocomplete vstack">
    <button
      v-for="(skill, idx) in matches"
      :key="skill.id"
      class="autocomplete-item hstack gap-xs px-s py-xxs"
      :class="{ selected: idx === selectedIndex }"
      @mousedown.prevent="emit('select', skill)"
    >
      <WPIcon :icon="(wpIcons as any)[skill.icon] ?? wpIcons.plugins" :size="16" class="autocomplete-icon" />
      <span class="autocomplete-command">{{ skill.slashCommand }}</span>
      <Text variant="caption" color="muted" class="autocomplete-desc flex-1 min-w-0">{{ skill.name }}</Text>
    </button>
  </div>
</template>

<style scoped>
.skill-autocomplete {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  padding: var(--space-xxxs);
}

.autocomplete-item {
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  text-align: start;
  align-items: center;
  transition: background var(--transition-hover);
}

.autocomplete-item:hover,
.autocomplete-item.selected {
  background: var(--color-surface-secondary);
}

.autocomplete-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.autocomplete-command {
  font-family: var(--font-family-mono, monospace);
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  flex-shrink: 0;
}

.autocomplete-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
