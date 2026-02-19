<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AgentPanel from '@/components/features/AgentPanel.vue'
import { useProjects } from '@/data/useProjects'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const { activeProjectId } = useProjects()

onMounted(() => {
  activeProjectId.value = projectId.value
  document.title = 'Kit — Chat'
})
</script>

<template>
  <div class="chat-popout">
    <AgentPanel :project-id="projectId" is-popout />
  </div>
</template>

<style scoped>
.chat-popout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family);
}
</style>
