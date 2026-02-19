<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Panel from '@/components/composites/Panel.vue'
import AgentPanel from '@/components/features/AgentPanel.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const projectId = computed(() => route.params.id as string)

const { activeProjectId } = useProjects()

watch(() => route.params.id as string, (newId) => {
  activeProjectId.value = newId
}, { immediate: true })

onBeforeUnmount(() => {
  activeProjectId.value = null
})
</script>

<template>
  <div class="panels hstack align-stretch flex-1 min-w-0 min-h-0 overflow-hidden">
    <Panel class="chat-panel" style="width: 100%; flex: 1;">
      <AgentPanel :project-id="activeProjectId" />
    </Panel>
  </div>
</template>
