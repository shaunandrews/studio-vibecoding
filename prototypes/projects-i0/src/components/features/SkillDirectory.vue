<script setup lang="ts">
import { ref, computed } from 'vue'
import { chevronLeft } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Text from '@shared/primitives/Text.vue'
import SkillCard from '@/components/composites/SkillCard.vue'
import { useSkills } from '@/data/useSkills'
import type { SkillCategory } from '@/data/types'

const emit = defineEmits<{
  back: []
}>()

const { skills, installSkill, uninstallSkill } = useSkills()

const activeCategory = ref<SkillCategory | null>(null)
const searchQuery = ref('')

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'content', label: 'Content' },
  { id: 'design', label: 'Design' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'performance', label: 'Performance' },
  { id: 'security', label: 'Security' },
  { id: 'developer', label: 'Developer' },
]

const filteredSkills = computed(() => {
  let result = skills.value
  if (activeCategory.value) {
    result = result.filter(s => s.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.slashCommand && s.slashCommand.toLowerCase().includes(q))
    )
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div class="skill-directory vstack">
    <div class="skill-directory__header vstack gap-xs px-m pt-m pb-xs">
      <div class="hstack gap-xs align-center">
        <button class="back-btn hstack gap-xxxs align-center" @click="emit('back')">
          <WPIcon :icon="chevronLeft" :size="20" />
          <Text variant="label" color="secondary">Back</Text>
        </button>
        <Text variant="title" color="default" class="flex-1">Browse Skills</Text>
      </div>

      <input
        v-model="searchQuery"
        class="skill-directory__search"
        type="text"
        placeholder="Search skills..."
      />

      <div class="skill-directory__filters hstack gap-xxs flex-wrap">
        <button
          class="filter-chip"
          :class="{ active: !activeCategory }"
          @click="activeCategory = null"
        >All</button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="filter-chip"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = activeCategory === cat.id ? null : cat.id"
        >{{ cat.label }}</button>
      </div>
    </div>

    <div class="skill-directory__grid px-m pb-m">
      <SkillCard
        v-for="skill in filteredSkills"
        :key="skill.id"
        :skill="skill"
        :show-install="true"
        @install="installSkill"
        @uninstall="uninstallSkill"
      />
    </div>

    <div v-if="!filteredSkills.length" class="skills-empty vstack gap-s align-center justify-center flex-1">
      <Text variant="body" color="muted">No skills match your search</Text>
    </div>
  </div>
</template>

<style scoped>
.skill-directory {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xxxs);
  border-radius: var(--radius-s);
  color: var(--color-text-secondary);
  transition: background var(--transition-hover);
}

.back-btn:hover {
  background: var(--color-surface-secondary);
}

.skill-directory__search {
  width: 100%;
  padding: var(--space-xs) var(--space-s);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-m);
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition-focus);
}

.skill-directory__search:focus {
  border-color: var(--color-primary);
}

.skill-directory__search::placeholder {
  color: var(--color-text-muted);
}

.filter-chip {
  padding: var(--space-xxxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-l);
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-hover);
}

.filter-chip:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text);
}

.filter-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.skill-directory__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-m);
}

.skills-empty {
  min-height: 200px;
}
</style>
