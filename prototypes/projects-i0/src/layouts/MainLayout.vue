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
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0 p-xs">
      <div class="left-column" :class="{ 'is-sidebar': mode === 'project' }">
        <router-view name="left" />
      </div>
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
  min-height: 0;
  overflow: hidden;
}

.left-column {
  flex: 1 1 100%;
  transition: flex 300ms ease;
  min-width: 0;
  overflow: hidden;
}

.left-column.is-sidebar {
  flex: 0 0 210px;
}

.frame {
  flex: 1 1 0;
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
  overflow: hidden;
  min-height: 0;
  transform: translateX(30px);
  opacity: 0;
  transition: transform 300ms ease, opacity 250ms ease;
  pointer-events: none;
}

.frame.frame-visible {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
</style>
