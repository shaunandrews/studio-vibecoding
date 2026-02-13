<script setup lang="ts">
import Titlebar from '../components/Titlebar.vue'
import Sidebar from '../components/Sidebar.vue'
import InputChat from '../components/InputChat.vue'
</script>

<template>
  <div class="app-shell vstack">
    <Titlebar />
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0">
      <Sidebar />
      <main class="frame flex-1 overflow-hidden">
        <div class="site-assistant vstack flex-1">
          <div class="messages flex-1 overflow-auto">
            <div class="message">Hello! I'm your site assistant. How can I help you today?</div>
          </div>
          <InputChat />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

.app-body {
  min-height: 0;
  padding: var(--space-xs);
}

.frame {
  background: var(--color-surface);
  border-radius: var(--radius-m);
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
