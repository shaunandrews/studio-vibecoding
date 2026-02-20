<script setup lang="ts">
import { external, wordpress, code, tool, plugins, bug, page, settings } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'

const actions = [
  { label: 'Open Site', icon: external },
  { label: 'WP Admin', icon: wordpress },
  { label: 'Editor', icon: code },
  { label: 'Terminal', icon: tool },
  { label: 'Plugins', icon: plugins },
  { label: 'Debug Log', icon: bug },
  { label: 'Files', icon: page },
  { label: 'Settings', icon: settings },
]
</script>

<template>
  <div class="quick-actions">
    <Button
      v-for="action in actions"
      :key="action.label"
      :icon="action.icon"
      :label="action.label"
      variant="secondary"
    />
  </div>
</template>

<style scoped>
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.quick-actions :deep(.btn) {
  border-radius: var(--radius-s);
  width: 100%;
  justify-content: flex-start;
}
</style>
