<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'

const route = useRoute()
const mode = computed(() => (route.meta.mode as string) || 'home')
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body flex-1 min-w-0 p-xs">
      <!-- Left column: full width on home, 210px on project -->
      <div class="left-column" :class="{ 'is-sidebar': mode === 'project' }">
        <Transition name="crossfade" mode="out-in">
          <router-view name="left" />
        </Transition>
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
  transition: width 300ms ease;
  overflow: hidden;
}

.left-column.is-sidebar {
  width: 210px;
}

/* Crossfade for left column content swap */
.crossfade-enter-active {
  transition: opacity 150ms ease 100ms; /* slight delay so shrink starts first */
}
.crossfade-leave-active {
  transition: opacity 100ms ease;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
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
  transition: transform 300ms ease, opacity 200ms ease;
  pointer-events: none;
}

.frame.frame-visible {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
</style>
