<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <div class="browser-bar">
    <span class="browser-bar__url">{{ url }}</span>
  </div>
</template>

<style scoped>
.browser-bar {
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 var(--space-xs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  min-width: 0;
}

.browser-bar__url {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
</style>
