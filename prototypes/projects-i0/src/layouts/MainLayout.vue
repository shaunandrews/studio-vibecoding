<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import NewProjectModal from '@/components/features/NewProjectModal.vue'
import { useProjects } from '@/data/useProjects'
import type { ProjectBrief } from '@/data/types'

const route = useRoute()
const router = useRouter()
const { createProject } = useProjects()
const mode = computed(() => (route.meta.mode as string) || 'home')
const transitioning = ref(false)
let transitionTimer: ReturnType<typeof setTimeout> | null = null

watch(mode, () => {
  transitioning.value = true
  if (transitionTimer) clearTimeout(transitionTimer)
  transitionTimer = setTimeout(() => {
    transitioning.value = false
  }, 300) // matches --duration-slow
})

const showNewProjectModal = ref(false)

function onProjectCreated(brief: ProjectBrief) {
  const project = createProject(brief)
  showNewProjectModal.value = false
  router.push({ name: 'project', params: { id: project.id } })
}
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div class="left-column" :class="{ 'is-sidebar': mode === 'project', 'is-transitioning': transitioning }">
        <ProjectList :mode="mode === 'project' ? 'list' : 'grid'" @new-project="showNewProjectModal = true" />
      </div>
      <!-- Frame: slides in from right as a solid block -->
      <main class="frame" :class="{ 'frame-visible': mode === 'project' }">
        <router-view name="main" />
      </main>
    </div>
    <NewProjectModal
      :open="showNewProjectModal"
      @close="showNewProjectModal = false"
      @created="onProjectCreated"
    />
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
  transition: width var(--transition-layout);
  overflow: hidden;
}

.left-column.is-sidebar {
  width: 210px;
}

.left-column.is-transitioning {
  pointer-events: none;
}

/* Frame: positioned at final size, slides in from right */
.frame {
  position: absolute;
  top: var(--space-xs);
  bottom: var(--space-xs);
  right: var(--space-xs);
  left: calc(210px + var(--space-xs) + var(--space-xs)); /* sidebar + gaps */
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateX(calc(100% + var(--space-xs)));
  opacity: 0;
  transition: transform var(--transition-layout), opacity var(--transition-fade);
  pointer-events: none;
}

.frame.frame-visible {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
</style>
