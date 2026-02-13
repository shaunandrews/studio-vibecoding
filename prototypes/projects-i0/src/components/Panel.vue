<script setup lang="ts">
import { close } from '@wordpress/icons'
import Button from './Button.vue'
import Text from './Text.vue'

defineProps<{
  title?: string
  closable?: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="panel vstack flex-1 min-w-0">
    <div v-if="title || closable" class="panel-header hstack justify-between px-s py-xxs">
      <Text v-if="title" variant="label" color="muted">{{ title }}</Text>
      <Button
        v-if="closable"
        variant="tertiary"
        :icon="close"
        size="small"
        @click="$emit('close')"
      />
    </div>
    <div class="panel-body vstack flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel {
  border-inline-start: 1px solid var(--color-surface-border);
}

.panel:first-child {
  border-inline-start: none;
}

.panel-header {
  border-block-end: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.panel-body {
  min-height: 0;
}
</style>
