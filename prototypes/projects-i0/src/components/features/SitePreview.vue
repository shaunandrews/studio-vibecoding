<script setup lang="ts">
import { computed } from 'vue'
import { chevronLeft, chevronRight, rotateRight } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import BrowserBar from '@/components/primitives/BrowserBar.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import Text from '@/components/primitives/Text.vue'
import { mockSites } from '@/data/mock-sites'
import { seedProjects } from '@/data/seed-projects'

const props = defineProps<{
  projectId?: string | null
}>()

const project = computed(() =>
  seedProjects.find((p) => p.id === props.projectId)
)

const url = computed(() => project.value?.url ?? '')

const srcdoc = computed(() => {
  if (!props.projectId) return undefined
  return mockSites[props.projectId]?.homepage
})
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
        <iframe
          v-if="srcdoc"
          :srcdoc="srcdoc"
          class="preview-iframe"
        />
        <div v-else class="preview-placeholder vstack align-center justify-center flex-1">
          <Text variant="body" color="muted">No preview available</Text>
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

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.preview-placeholder {
  height: 100%;
  gap: var(--space-xxxs);
}
</style>
