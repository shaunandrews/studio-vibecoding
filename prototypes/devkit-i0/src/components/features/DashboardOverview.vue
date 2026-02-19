<script setup lang="ts">
import AgentsCard from './dashboard/AgentsCard.vue'
import WorkspaceCard from './dashboard/WorkspaceCard.vue'
import SkillsCard from './dashboard/SkillsCard.vue'
</script>

<template>
  <div class="dashboard-overview p-m">
    <AgentsCard />
    <WorkspaceCard />
    <SkillsCard />
  </div>
</template>

<style scoped>
.dashboard-overview {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}
</style>
