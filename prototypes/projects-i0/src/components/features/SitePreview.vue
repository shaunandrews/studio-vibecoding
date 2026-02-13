<script setup lang="ts">
import { ref } from 'vue'
import { chevronLeft, chevronRight, rotateRight } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import BrowserBar from '@/components/primitives/BrowserBar.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import Text from '@/components/primitives/Text.vue'

const url = ref('https://downstreet-cafe.local')
</script>

<template>
  <div class="site-preview vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <Button variant="tertiary" :icon="chevronLeft" />
        <Button variant="tertiary" :icon="chevronRight" />
        <Button variant="tertiary" :icon="rotateRight" />
      </template>
      <template #center>
        <BrowserBar :url="url" class="flex-1" />
      </template>
    </PanelToolbar>
    <div class="preview-frame flex-1 overflow-auto">
      <div class="preview-viewport-container">
        <div class="preview-placeholder vstack align-center justify-center flex-1">
          <Text variant="body" color="muted">Site preview</Text>
          <Text variant="caption" color="muted">{{ url }}</Text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-frame {
  background: var(--color-surface-secondary);
  min-height: 0;
}

.preview-viewport-container {
  height: 100%;
  background: var(--color-surface);
}

.preview-placeholder {
  height: 100%;
  gap: var(--space-xxxs);
}

</style>
