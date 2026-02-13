<script setup lang="ts">
import Titlebar from '@/components/primitives/Titlebar.vue'
import Sidebar from '@/components/features/Sidebar.vue'
</script>

<template>
  <div class="project-layout vstack">
    <Titlebar />
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0 p-xs">
      <Sidebar />
      <main class="frame vstack flex-1 overflow-hidden min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.project-layout {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}
.app-body { min-height: 0; }
.frame {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
}
</style>
