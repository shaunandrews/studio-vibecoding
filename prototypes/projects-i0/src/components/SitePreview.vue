<script setup lang="ts">
import { ref } from 'vue'
import { chevronLeft, chevronRight, rotateRight, desktop, tablet, mobile } from '@wordpress/icons'
import Button from './Button.vue'
import Dropdown from './Dropdown.vue'
import PanelToolbar from './PanelToolbar.vue'
import Text from './Text.vue'

const url = ref('https://downstreet-cafe.local')
const viewport = ref('desktop')

const viewportGroups = [
  {
    label: 'Viewport',
    options: [
      { value: 'desktop', label: 'Desktop', icon: desktop },
      { value: 'tablet', label: 'Tablet', icon: tablet },
      { value: 'mobile', label: 'Mobile', icon: mobile },
    ],
  },
]

const viewportWidths: Record<string, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}
</script>

<template>
  <div class="site-preview vstack flex-1">
    <PanelToolbar>
      <template #start>
        <Button variant="tertiary" :icon="chevronLeft" size="small" />
        <Button variant="tertiary" :icon="chevronRight" size="small" />
        <Button variant="tertiary" :icon="rotateRight" size="small" />
      </template>
      <template #center>
        <div class="preview-url-bar hstack flex-1 px-xs py-xxxs">
          <Text variant="caption" color="muted" class="flex-1">{{ url }}</Text>
        </div>
      </template>
      <template #end>
        <Dropdown
          v-model="viewport"
          :groups="viewportGroups"
          :trigger-icon="desktop"
          placement="below"
        />
      </template>
    </PanelToolbar>
    <div class="preview-frame flex-1 overflow-auto">
      <div
        class="preview-viewport-container"
        :style="{ width: viewportWidths[viewport], maxWidth: '100%' }"
      >
        <div class="preview-placeholder vstack align-center justify-center flex-1">
          <Text variant="body" color="muted">Site preview</Text>
          <Text variant="caption" color="muted">{{ url }}</Text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-url-bar {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  min-width: 0;
}

.preview-frame {
  background: var(--color-surface-secondary);
  min-height: 0;
}

.preview-viewport-container {
  height: 100%;
  margin: 0 auto;
  background: var(--color-surface);
  transition: width 200ms ease;
}

.preview-placeholder {
  height: 100%;
  gap: var(--space-xxxs);
}

</style>
