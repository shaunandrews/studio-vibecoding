<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import SitePreview from '@/components/features/SitePreview.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const showPreview = ref(true)
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
      <AgentPanel :preview-visible="showPreview" @toggle-preview="showPreview = !showPreview" />
    </Panel>
    <Panel v-if="showPreview">
      <SitePreview />
    </Panel>
  </div>
</template>
