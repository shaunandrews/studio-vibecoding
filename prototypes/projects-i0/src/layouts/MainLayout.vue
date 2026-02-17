<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Button from '@/components/primitives/Button.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import { useProjects } from '@/data/useProjects'
import { useOnboarding } from '@/data/useOnboarding'

const route = useRoute()
const router = useRouter()
const { createUntitledProject } = useProjects()
const { startOnboarding } = useOnboarding()
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

async function handleNewProject() {
  const project = createUntitledProject()
  await router.push({ name: 'project', params: { id: project.id } })
  startOnboarding(project.id)
}
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div class="left-column vstack" :class="{ 'is-sidebar': mode === 'project', 'is-transitioning': transitioning }">
        <ProjectList class="flex-1 min-h-0" :mode="mode === 'project' ? 'list' : 'grid'" @new-project="handleNewProject" />
        <div class="new-project-footer">
          <Button variant="secondary" surface="dark" label="New project" width="full" @click="handleNewProject" />
        </div>
      </div>
      <!-- Frame: slides in from right as a solid block -->
      <main class="frame" :class="{ 'frame-visible': mode === 'project' }">
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
  transition: width var(--transition-layout);
  overflow: hidden;
}

.left-column.is-sidebar {
  width: 210px;
}

.left-column.is-transitioning {
  pointer-events: none;
}

.new-project-footer {
  max-width: 210px;
  display: flex;
}

.new-project-footer :deep(.tooltip-trigger) {
  display: flex;
  flex: 1;
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
