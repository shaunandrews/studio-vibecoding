<script setup lang="ts">
import QuickActions from './dashboard/QuickActions.vue'
import EnvironmentCard from './dashboard/EnvironmentCard.vue'
import TimelineCard from './dashboard/TimelineCard.vue'
</script>

<template>
  <div class="dashboard-overview p-m">
    <QuickActions />
    <div class="dashboard-overview__layout">
      <TimelineCard />
      <EnvironmentCard />
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  padding-block-end: var(--space-xl);
}

.dashboard-overview__layout {
  display: grid;
  gap: var(--space-xl);
}

/* Wide: Timeline takes the lead, Environment is a compact sidebar */
@container dashboard (min-width: 600px) {
  .dashboard-overview__layout {
    grid-template-columns: 3fr minmax(200px, 1fr);
    align-items: start;
  }
}
</style>
