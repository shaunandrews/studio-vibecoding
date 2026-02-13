<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
import ProjectListItem from '@/components/composites/ProjectListItem.vue'
import Text from '@/components/primitives/Text.vue'
import { useProjects } from '@/data/useProjects'
import { useRouter } from 'vue-router'

const { projects, activeProjectId, setStatus } = useProjects()
const router = useRouter()

function selectProject(id: string) {
  router.push({ name: 'project', params: { id } })
}
</script>

<template>
  <aside class="sidebar vstack shrink-0 gap-xxs">
    <Text variant="label" color="muted" tag="h2" class="p-xxs">Projects</Text>
    <div class="sidebar-projects vstack gap-xxs flex-1 overflow-auto">
      <ProjectListItem
        v-for="project in projects"
        :key="project.id"
        :name="project.name"
        :favicon="project.favicon"
        :status="project.status"
        :active="project.id === activeProjectId"
        @select="selectProject(project.id)"
        @toggle="setStatus(project.id, project.status === 'running' ? 'stopped' : 'running')"
      />
    </div>
    <div class="sidebar-footer">
      <Button variant="secondary" surface="dark" label="Add project" width="full" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 210px; /* 42 units */
}
</style>
