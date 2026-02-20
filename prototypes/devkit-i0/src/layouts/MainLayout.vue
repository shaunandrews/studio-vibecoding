<script setup lang="ts">
import { computed, ref } from 'vue'
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

const cardSizes = [
  { label: 'S', value: 200, aspect: '9 / 16' },
  { label: 'M', value: 300, aspect: '4 / 3' },
  { label: 'L', value: 450, aspect: '16 / 10' },
] as const

const cardSize = ref(300)
const activeSize = computed(() => cardSizes.find(s => s.value === cardSize.value) ?? cardSizes[1])

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
        :style="{ viewTransitionName: 'project-grid', '--card-width': cardSize + 'px', '--card-aspect': activeSize.aspect }"
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
          <div class="segmented-control hstack">
            <button
              v-for="size in cardSizes"
              :key="size.value"
              class="segmented-control__btn"
              :class="{ active: cardSize === size.value }"
              @click="cardSize = size.value"
            >{{ size.label }}</button>
          </div>
          <div />
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
}

/* Home: grid fills all available space */
.home-view {
  width: 100%;
  height: 100%;
}

.new-project-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.segmented-control {
  background: rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-s);
  padding: 2px;
}

.segmented-control__btn {
  padding: var(--space-xxxs) var(--space-s);
  background: none;
  border: none;
  border-radius: calc(var(--radius-s) - 1px);
  color: var(--color-chrome-text-muted);
  font-family: inherit;
  font-size: var(--font-size-s);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--duration-instant) var(--ease-default),
              color var(--duration-instant) var(--ease-default);
}

.segmented-control__btn:hover {
  color: var(--color-chrome-text);
}

.segmented-control__btn.active {
  background: rgba(255, 255, 255, 0.12);
  color: var(--color-chrome-text);
}

/* Project: frame fills all available space */
.frame {
  width: 100%;
  height: 100%;
  background: var(--color-surface);
  color: var(--color-text);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
