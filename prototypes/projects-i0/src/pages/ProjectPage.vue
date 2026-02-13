<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import SitePreview from '@/components/features/SitePreview.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const STORAGE_KEY = 'previewState'

function loadPreviewState(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

const previewState = ref(loadPreviewState())

const showPreview = computed({
  get: () => previewState.value[route.params.id as string] ?? true,
  set: (v: boolean) => {
    previewState.value = { ...previewState.value, [route.params.id as string]: v }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(previewState.value))
  },
})
const { activeProjectId } = useProjects()

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

onBeforeUnmount(() => {
  activeProjectId.value = null
})
</script>

<template>
  <div class="panels hstack align-stretch flex-1 min-w-0 min-h-0">
    <Panel>
      <AgentPanel :project-id="activeProjectId" :preview-visible="showPreview" @toggle-preview="showPreview = !showPreview" />
    </Panel>
    <Panel v-if="showPreview">
      <SitePreview />
    </Panel>
  </div>
</template>
