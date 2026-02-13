<script setup lang="ts">
import { chevronLeft } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import ProjectListItem from '@/components/composites/ProjectListItem.vue'
import Text from '@/components/primitives/Text.vue'
import { useProjects } from '@/data/useProjects'
import { useRouter } from 'vue-router'

const { projects, activeProjectId, setStatus } = useProjects()
const router = useRouter()

function goHome() {
  router.push({ name: 'home' })
}

function selectProject(id: string) {
  router.push({ name: 'project', params: { id } })
}
</script>

<template>
  <aside class="sidebar vstack shrink-0 gap-xxs">
    <div class="sidebar-projects vstack gap-xxs flex-1 overflow-auto">
      <div class="all-projects hstack gap-xs p-xxs" @click="goHome">
        <WPIcon :icon="chevronLeft" :size="20" class="back-icon shrink-0" />
        <span class="project-name flex-1 min-w-0">All projects</span>
      </div>
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
  width: 100%;
}

.all-projects {
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background 150ms ease;
}

.all-projects:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.back-icon {
  opacity: 0.6;
}

.all-projects:hover .back-icon {
  opacity: 1;
}
</style>
