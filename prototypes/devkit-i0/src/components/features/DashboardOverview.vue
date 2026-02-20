<script setup lang="ts">
import QuickActions from './dashboard/QuickActions.vue'
import EnvironmentCard from './dashboard/EnvironmentCard.vue'
import ActivityCard from './dashboard/ActivityCard.vue'
</script>

<template>
  <div class="dashboard-overview p-m">
    <QuickActions />
    <div class="dashboard-overview__cards">
      <EnvironmentCard />
      <ActivityCard />
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

.dashboard-overview__cards {
  display: grid;
  gap: var(--space-m);
}

/* Cards fill their grid cells */
.dashboard-overview__cards > :deep(*) {
  min-height: 0;
}

/* Wide: 2 equal columns */
@container dashboard (min-width: 600px) {
  .dashboard-overview__cards {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
