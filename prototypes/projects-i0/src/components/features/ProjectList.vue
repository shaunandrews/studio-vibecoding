<script setup lang="ts">
import { chevronLeft } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Text from '@shared/primitives/Text.vue'
import Tooltip from '@shared/primitives/Tooltip.vue'
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
    <!-- Back link (list mode only) -->
    <div v-if="mode === 'list'" class="all-projects hstack" :class="{ 'is-collapsed': collapsed }" @click="collapsed ? toggleSidebar() : goHome()">
      <Tooltip :text="collapsed ? 'All projects' : undefined" placement="right">
        <WPIcon :icon="chevronLeft" :size="20" class="back-icon shrink-0" />
      </Tooltip>
      <span v-if="!collapsed" class="back-label flex-1 min-w-0">All projects</span>
      <button
        v-if="!collapsed"
        class="collapse-toggle"
        @click.stop="toggleSidebar()"
      >
        <WPIcon :icon="chevronLeft" :size="16" />
      </button>
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

/* Override Tooltip's inline-flex wrapper so items respect parent width */
.items-stack :deep(.tooltip-trigger) {
  display: flex;
}

.all-projects {
  align-items: center;
  gap: var(--space-xs);
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background var(--transition-hover);
  padding: var(--space-xxs);
}

.all-projects.is-collapsed {
  justify-content: center;
  padding: var(--space-xs) 0;
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

.back-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.collapse-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--color-chrome-text-muted);
  cursor: pointer;
  border-radius: var(--radius-s);
  transition: color var(--transition-hover), background var(--transition-hover);
}

.collapse-toggle:hover {
  color: var(--color-chrome-text);
  background: var(--color-chrome-hover);
}

</style>
