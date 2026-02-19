<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import SkillsList from '@/components/features/SkillsList.vue'
import SkillDirectory from '@/components/features/SkillDirectory.vue'
import { useProjects } from '@/data/useProjects'
import { useOnboarding } from '@/data/useOnboarding'
import { useProjectTransition } from '@/data/useProjectTransition'

const route = useRoute()
const { createUntitledProject } = useProjects()
const { startOnboarding } = useOnboarding()
const { navigateToProject } = useProjectTransition()
const mode = computed(() => (route.meta.mode as string) || 'home')
const homeTab = ref<'projects' | 'skills'>('projects')
const showBrowse = ref(false)

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
    <Titlebar />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div
        class="left-column vstack"
        :class="{ 'is-sidebar': mode === 'project' }"
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
        <ProjectList v-else class="flex-1 min-h-0" mode="list" @new-project="handleNewProject" />

        <div class="new-project-footer" v-if="mode === 'home' && homeTab === 'projects' && !showBrowse">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
        <div class="new-project-footer" v-else-if="mode === 'home' && homeTab === 'skills' && !showBrowse">
          <div class="hstack gap-xxs">
            <Button variant="secondary" surface="dark" label="Browse skills" width="full" @click="handleBrowse" />
          </div>
        </div>
        <div class="new-project-footer" v-else-if="mode === 'project'">
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
