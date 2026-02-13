<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="panel vstack flex-1 min-w-0 overflow-hidden">
    <slot />
  </div>
</template>

<style scoped>
.panel {
  border-inline-start: 1px solid var(--color-surface-border);
}

.panel:first-child {
  border-inline-start: none;
}
</style>
