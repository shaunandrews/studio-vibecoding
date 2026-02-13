<script setup lang="ts">
import ProjectCard from '@/components/composites/ProjectCard.vue'
import type { Project } from '@/data/types'

defineProps<{
  projects: Project[]
}>()

defineEmits<{
  'open-project': [id: string]
  'toggle-status': [id: string]
}>()
</script>

<template>
  <div class="project-grid">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @open="$emit('open-project', $event)"
      @toggle-status="$emit('toggle-status', $event)"
    />
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-m);
}
</style>
