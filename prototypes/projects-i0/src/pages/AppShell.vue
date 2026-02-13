<script setup lang="ts">
import Titlebar from '../components/Titlebar.vue'
import Sidebar from '../components/Sidebar.vue'
import Panel from '../components/Panel.vue'
import AgentPanel from '../components/AgentPanel.vue'
import SitePreview from '../components/SitePreview.vue'
import { ref } from 'vue'

const showPreview = ref(true)
</script>

<template>
  <div class="app-shell vstack">
    <Titlebar />
    <div class="app-body hstack align-stretch gap-xs flex-1 min-w-0 p-xs">
      <Sidebar />
      <main class="frame vstack flex-1 overflow-hidden min-h-0">
        <div class="panels hstack align-stretch flex-1 min-w-0 min-h-0">
          <Panel>
            <AgentPanel :preview-visible="showPreview" @toggle-preview="showPreview = !showPreview" />
          </Panel>
          <Panel v-if="showPreview">
            <SitePreview />
          </Panel>
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
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  -webkit-font-smoothing: antialiased;
}

.app-body {
  min-height: 0;
}

.frame {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  color: var(--color-text);
}

</style>
