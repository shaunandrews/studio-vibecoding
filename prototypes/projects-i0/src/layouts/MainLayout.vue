<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import { useProjects } from '@/data/useProjects'
import { useOnboarding } from '@/data/useOnboarding'
import { useProjectTransition } from '@/data/useProjectTransition'

const route = useRoute()
const { createUntitledProject } = useProjects()
const { startOnboarding } = useOnboarding()
const { navigateToProject } = useProjectTransition()
const mode = computed(() => (route.meta.mode as string) || 'home')

async function handleNewProject() {
  const project = createUntitledProject()
  await navigateToProject(project.id)
  startOnboarding(project.id)
}
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div
        class="left-column vstack"
        :class="{ 'is-sidebar': mode === 'project' }"
        :style="{ viewTransitionName: mode === 'project' ? 'sidebar' : 'project-grid' }"
      >
        <ProjectList class="flex-1 min-h-0" :mode="mode === 'project' ? 'list' : 'grid'" @new-project="handleNewProject" />
        <div class="new-project-footer">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
      </div>
      <!-- Frame: slides in from right as a solid block -->
      <main
        class="frame"
        :class="{ 'frame-visible': mode === 'project' }"
        :style="mode === 'project' ? { viewTransitionName: 'project-frame' } : {}"
      >
        <router-view name="main" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}

.app-body {
  position: relative;
  min-height: 0;
  overflow: hidden;
}

/* Left column: shrinks from full-width to sidebar width */
.left-column {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.left-column.is-sidebar {
  width: 210px;
}

.new-project-footer {
  max-width: 210px;
  display: flex;
}

.new-project-footer :deep(.tooltip-trigger) {
  display: flex;
  flex: 1;
}

.frame {
  position: absolute;
  top: var(--space-xs);
  bottom: var(--space-xs);
  right: var(--space-xs);
  left: calc(210px + var(--space-xs) + var(--space-xs));
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
}

.frame.frame-visible {
  opacity: 1;
  pointer-events: auto;
}
</style>
