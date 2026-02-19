<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import { useProjects } from '@/data/useProjects'
import { useProjectTransition } from '@/data/useProjectTransition'
import { useCommandPalette } from '@/data/useCommandPalette'

const route = useRoute()
const { createUntitledProject } = useProjects()
const { navigateToProject } = useProjectTransition()
const { open: openCommandPalette } = useCommandPalette()
const mode = computed(() => (route.meta.mode as string) || 'home')

function onOpenSearch() {
  openCommandPalette()
}

async function handleNewProject() {
  const project = createUntitledProject()
  await navigateToProject(project.id)
}
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar @open-search="onOpenSearch" />
    <div class="app-body flex-1 min-h-0">

      <!-- Home: full-width project grid -->
      <div
        v-if="mode === 'home'"
        class="home-view vstack"
        :style="{ viewTransitionName: 'project-grid' }"
      >
        <ProjectList class="flex-1 min-h-0" @new-project="handleNewProject" />
        <div class="new-project-footer px-m pb-m">
          <Button
            variant="secondary"
            surface="dark"
            label="New project"
            @click="handleNewProject"
            style="view-transition-name: new-project-btn"
          />
        </div>
      </div>

      <!-- Project: full-window frame -->
      <main
        v-else
        class="frame"
        :style="{ viewTransitionName: 'project-frame' }"
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
  overflow: hidden;
  padding: var(--space-xs);
}

/* Home: grid fills all available space */
.home-view {
  width: 100%;
  height: 100%;
}

/* Project: frame fills all available space */
.frame {
  width: 100%;
  height: 100%;
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
