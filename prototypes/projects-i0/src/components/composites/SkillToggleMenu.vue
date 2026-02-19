<script setup lang="ts">
import { computed } from 'vue'
import Text from '@/components/primitives/Text.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import * as wpIcons from '@wordpress/icons'
import { useSkills } from '@/data/useSkills'

const props = defineProps<{
  projectId: string
}>()

const { installedSkills, toggleSkillForProject, isSkillActiveForProject } = useSkills()

const sortedSkills = computed(() =>
  [...installedSkills.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>

<template>
  <div class="skill-toggle-menu vstack">
    <div class="skill-toggle-menu__header px-s py-xs">
      <Text variant="label" color="secondary">Project Skills</Text>
    </div>
    <div v-if="sortedSkills.length" class="skill-toggle-menu__list vstack">
      <label
        v-for="skill in sortedSkills"
        :key="skill.id"
        class="skill-toggle-item hstack gap-xs px-s py-xxs"
      >
        <input
          type="checkbox"
          :checked="isSkillActiveForProject(skill.id, projectId)"
          class="skill-toggle-checkbox"
          @change="toggleSkillForProject(skill.id, projectId)"
        />
        <WPIcon :icon="(wpIcons as any)[skill.icon] ?? wpIcons.plugins" :size="16" class="skill-toggle-icon" />
        <span class="skill-toggle-name flex-1 min-w-0">{{ skill.name }}</span>
        <span v-if="skill.slashCommand" class="skill-toggle-cmd">{{ skill.slashCommand }}</span>
      </label>
    </div>
    <div v-else class="px-s py-xs">
      <Text variant="caption" color="muted">No skills installed. Browse the directory to add some.</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-toggle-menu {
  min-width: 240px;
  max-width: 320px;
  max-height: 400px;
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-toggle-menu__header {
  border-block-end: 1px solid var(--color-surface-border);
}

.skill-toggle-item {
  cursor: pointer;
  transition: background var(--transition-hover);
  align-items: center;
}

.skill-toggle-item:hover {
  background: var(--color-surface-secondary);
}

.skill-toggle-checkbox {
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.skill-toggle-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.skill-toggle-name {
  font-size: var(--font-size-m);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-toggle-cmd {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono, monospace);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
  flex-shrink: 0;
}
</style>
