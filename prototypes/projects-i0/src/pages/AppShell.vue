<script setup lang="ts">
import Titlebar from '../components/Titlebar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="app-shell">
    <Titlebar />
    <div class="app-body">
      <Sidebar />
      <main class="frame">
        <div class="frame-placeholder">
          <span>Main content area</span>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.frame {
  flex: 1;
  background: var(--color-surface);
  border-radius: var(--radius-m);
  margin: 0 var(--space-xs) var(--space-xs) 0; /* physical directions intentional — frame hugs app chrome edges */
  overflow: hidden;
  display: flex;
}

.frame-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 14px;
}
</style>
