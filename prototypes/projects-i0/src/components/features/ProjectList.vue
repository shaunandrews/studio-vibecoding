<script setup lang="ts">
import { chevronLeft, drawerLeft } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectItem from '@/components/composites/ProjectItem.vue'
import { useProjects } from '@/data/useProjects'
import { useProjectTransition } from '@shared/data/useProjectTransition'
import { useSidebarCollapse } from '@/data/useSidebarCollapse'

const props = withDefaults(defineProps<{
  mode: 'grid' | 'list'
  collapsed?: boolean
}>(), {
  collapsed: false,
})

const emit = defineEmits<{
  'new-project': []
}>()

const { projects, activeProjectId, setStatus } = useProjects()
const { navigateToProject, navigateHome } = useProjectTransition('project')
const { toggle: toggleSidebar } = useSidebarCollapse()

function selectProject(id: string) {
  navigateToProject(id)
}

function goHome() {
  navigateHome()
}

function toggleStatus(id: string) {
  const p = projects.value.find(p => p.id === id)
  if (p) setStatus(id, p.status === 'running' ? 'stopped' : 'running')
}
</script>

<template>
  <div class="project-list vstack" :class="`mode-${mode}`">
    <!-- Sidebar header (list mode only) -->
    <div v-if="mode === 'list'" class="sidebar-header" :class="{ 'is-collapsed': collapsed }">
      <template v-if="!collapsed">
        <button class="all-projects hstack" @click="goHome()">
          <WPIcon :icon="chevronLeft" :size="20" class="back-icon shrink-0" />
          <span class="back-label">All projects</span>
        </button>
        <Button
          variant="tertiary"
          surface="dark"
          :icon="drawerLeft"
          tooltip="Collapse sidebar"
          @click="toggleSidebar()"
        />
      </template>
      <template v-else>
        <Button
          variant="tertiary"
          surface="dark"
          :icon="drawerLeft"
          tooltip="Expand sidebar"
          tooltipPlacement="right"
          @click="toggleSidebar()"
        />
        <Button
          variant="tertiary"
          surface="dark"
          :icon="chevronLeft"
          tooltip="All projects"
          tooltipPlacement="right"
          @click="goHome()"
        />
      </template>
    </div>

    <!-- Items -->
    <div class="items-container" :class="mode === 'grid' ? 'items-grid' : 'items-stack'">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :mode="mode === 'grid' ? 'card' : 'row'"
        :active="project.id === activeProjectId"
        :collapsed="collapsed"
        @select="selectProject"
        @toggle-status="toggleStatus"
      />
    </div>

  </div>
</template>

<style scoped>
.project-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.project-list.mode-grid {
  padding: var(--space-m);
  gap: var(--space-s);
}

.project-list.mode-list {
  gap: var(--space-xxs);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--space-m);
  width: 100%;
}

.items-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

/* Override Tooltip's inline-flex wrapper so items fill parent width */
.items-container :deep(.tooltip-trigger) {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header.is-collapsed {
  flex-direction: column;
  align-items: center;
  gap: var(--space-xxs);
}

.all-projects {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  border: none;
  background: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: color var(--transition-hover);
  padding: 0;
}

.all-projects:hover {
  color: var(--color-chrome-text);
}

.back-icon {
  opacity: 0.6;
  transition: opacity var(--transition-hover);
}

.all-projects:hover .back-icon {
  opacity: 1;
}

.back-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


</style>
