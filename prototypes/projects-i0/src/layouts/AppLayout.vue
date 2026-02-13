<script setup lang="ts">
import Titlebar from '@/components/Titlebar.vue'
</script>

<template>
  <div class="app-layout vstack">
    <Titlebar />
    <main class="app-content flex-1 min-h-0">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}
</style>
