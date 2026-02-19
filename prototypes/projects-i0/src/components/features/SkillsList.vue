<script setup lang="ts">
import { computed } from 'vue'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import SkillCard from '@/components/composites/SkillCard.vue'
import { useSkills } from '@/data/useSkills'

const emit = defineEmits<{
  browse: []
  create: []
  'select-skill': [id: string]
}>()

const { installedSkills, uninstallSkill } = useSkills()

const sortedSkills = computed(() =>
  [...installedSkills.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>

<template>
  <div class="skills-list vstack">
    <div class="skills-list__header hstack justify-between align-center px-m pt-m pb-xs">
      <Text variant="title" color="default">My Skills</Text>
      <Text variant="caption" color="muted">{{ sortedSkills.length }} installed</Text>
    </div>

    <div v-if="sortedSkills.length" class="skills-grid px-m">
      <SkillCard
        v-for="skill in sortedSkills"
        :key="skill.id"
        :skill="skill"
        :active-count="skill.activeProjectIds.length"
        @select="emit('select-skill', $event)"
        @uninstall="uninstallSkill"
      />
    </div>

    <div v-else class="skills-empty vstack gap-s align-center justify-center flex-1 px-m">
      <Text variant="body" color="muted">No skills installed yet</Text>
      <Button variant="primary" label="Browse Skills" @click="emit('browse')" />
    </div>
  </div>
</template>

<style scoped>
.skills-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-m);
  padding-block-end: var(--space-m);
}

.skills-empty {
  min-height: 200px;
}
</style>
