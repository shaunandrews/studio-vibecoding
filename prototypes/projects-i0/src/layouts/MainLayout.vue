<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Titlebar from '@/components/primitives/Titlebar.vue'
import Sidebar from '@/components/features/Sidebar.vue'

const route = useRoute()
const mode = computed(() => (route.meta.mode as string) || 'home')
</script>

<template>
  <div class="main-layout vstack">
    <Titlebar />
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0 p-xs">
      <Sidebar />
      <main class="main-content flex-1 min-h-0 overflow-hidden">
        <transition name="frame-slide" mode="out-in">
          <div v-if="mode === 'project'" class="frame vstack flex-1 overflow-hidden min-h-0" key="project">
            <router-view />
          </div>
          <div v-else class="home-area vstack flex-1 min-h-0" key="home">
            <router-view />
          </div>
        </transition>
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
}

.main-content {
  display: flex;
  position: relative;
}

.frame {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
}

.home-area {
  display: flex;
}

/* Frame slides in from right */
.frame-slide-enter-active {
  transition: transform 250ms ease, opacity 250ms ease;
}
.frame-slide-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}
.frame-slide-enter-from {
  transform: translateX(30%);
  opacity: 0;
}
.frame-slide-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
