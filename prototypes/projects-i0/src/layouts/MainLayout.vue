<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import SkillsList from '@/components/features/SkillsList.vue'
import SkillDirectory from '@/components/features/SkillDirectory.vue'
import { useProjects } from '@/data/useProjects'
import { useOnboarding } from '@/data/useOnboarding'
import { useProjectTransition } from '@shared/data/useProjectTransition'
import { useSidebarCollapse } from '@/data/useSidebarCollapse'
import { plus } from '@wordpress/icons'
import ShortcutsModal from '@/components/composites/ShortcutsModal.vue'
import SpotlightTour from '@/components/composites/SpotlightTour.vue'
import { useTour } from '@/data/useTour'
import { usePreviewState } from '@/data/usePreviewState'

const route = useRoute()
const { createUntitledProject, projects } = useProjects()
const { startOnboarding } = useOnboarding()
const { navigateToProject } = useProjectTransition('project')
const { start: startTourFn } = useTour()
const { show: showPreview } = usePreviewState()
const { collapsed, toggle: toggleSidebar } = useSidebarCollapse()
const mode = computed(() => (route.meta.mode as string) || 'home')
const homeTab = ref<'projects' | 'skills'>('projects')
const showBrowse = ref(false)
const showShortcuts = ref(false)

function startTour() {
  if (mode.value === 'home') {
    // Need a project open — navigate to the first seed project
    const firstProject = projects.value[0]
    if (firstProject) {
      navigateToProject(firstProject.id).then(() => {
        // Ensure preview is visible for tour
        showPreview(firstProject.id)
        // Wait for DOM to settle after navigation
        setTimeout(() => startTourFn(), 400)
      })
    }
    return
  }
  // Already in project view
  const projectId = route.params.id as string
  if (projectId) {
    showPreview(projectId)
  }
  startTourFn()
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === '/') {
    e.preventDefault()
    showShortcuts.value = !showShortcuts.value
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'b' && mode.value === 'project') {
    e.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})

function handleBrowse() {
  showBrowse.value = true
}

function handleBackFromBrowse() {
  showBrowse.value = false
}

async function handleNewProject() {
  const project = createUntitledProject()
  await navigateToProject(project.id)
  startOnboarding(project.id)
}
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar @open-shortcuts="showShortcuts = true" @start-tour="startTour" />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div
        class="left-column vstack"
        :class="{ 'is-sidebar': mode === 'project', 'is-collapsed': mode === 'project' && collapsed }"
        :style="{ viewTransitionName: mode === 'project' ? 'sidebar' : 'project-grid' }"
      >
        <!-- Tab switch (home mode only) -->
        <div v-if="mode === 'home'" class="home-tabs hstack gap-xxs px-m pt-s pb-xxs">
          <button
            class="home-tab"
            :class="{ active: homeTab === 'projects' && !showBrowse }"
            @click="homeTab = 'projects'; showBrowse = false"
          >Projects</button>
          <button
            class="home-tab"
            :class="{ active: homeTab === 'skills' && !showBrowse }"
            @click="homeTab = 'skills'; showBrowse = false"
          >Skills</button>
        </div>

        <!-- Home: Projects or Skills grid -->
        <template v-if="mode === 'home'">
          <SkillDirectory v-if="showBrowse" class="flex-1 min-h-0" @back="handleBackFromBrowse" />
          <ProjectList v-else-if="homeTab === 'projects'" class="flex-1 min-h-0" mode="grid" @new-project="handleNewProject" />
          <SkillsList v-else class="flex-1 min-h-0" @browse="handleBrowse" />
        </template>

        <!-- Project: Sidebar list -->
        <ProjectList v-else class="flex-1 min-h-0" mode="list" :collapsed="collapsed" @new-project="handleNewProject" />

        <div class="new-project-footer" v-if="mode === 'home' && homeTab === 'projects' && !showBrowse">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
        <div class="new-project-footer" v-else-if="mode === 'home' && homeTab === 'skills' && !showBrowse">
          <div class="hstack gap-xxs">
            <Button variant="secondary" surface="dark" label="Browse skills" width="full" @click="handleBrowse" />
          </div>
        </div>
        <div class="new-project-footer" v-else-if="mode === 'project'">
          <Button
            v-if="collapsed"
            variant="secondary"
            surface="dark"
            :icon="plus"
            tooltip="New project"
            @click="handleNewProject"
          />
          <Button
            v-else
            variant="secondary"
            surface="dark"
            label="New project"
            width="full"
            @click="handleNewProject"
          />
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
    <ShortcutsModal :open="showShortcuts" @close="showShortcuts = false" />
    <SpotlightTour />
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
  transition: width var(--duration-slow) cubic-bezier(0.4, 0, 0.2, 1);
}

.left-column.is-collapsed {
  width: 35px;
}

.new-project-footer {
  max-width: 210px;
  display: flex;
  view-transition-name: new-project-btn;
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
  left: calc(210px + var(--space-xs) + var(--space-xs)); /* Physical: app chrome edge */
  transition: left var(--duration-slow) cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
}

.app-body:has(.is-collapsed) .frame {
  left: calc(35px + var(--space-xs) + var(--space-xs)); /* Physical: app chrome edge */
}

.frame.frame-visible {
  opacity: 1;
  pointer-events: auto;
}

.is-collapsed .new-project-footer {
  max-width: 35px;
  justify-content: center;
}

.home-tabs {
  flex-shrink: 0;
}

.home-tab {
  padding: var(--space-xxs) var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-chrome-text-secondary);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover);
}

.home-tab:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.home-tab.active {
  color: var(--color-chrome-text);
  background: var(--color-chrome-hover);
}
</style>
