<script setup lang="ts">
import Button from './Button.vue'
import ProjectListItem from './ProjectListItem.vue'
</script>

<template>
  <aside class="sidebar">
    <h2 class="sidebar-heading">Projects</h2>
    <div class="sidebar-projects">
      <ProjectListItem name="Downstreet Cafe" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=cafe" status="running" />
      <ProjectListItem name="Shaun's Blog" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=blog" status="running" :active="true" />
      <ProjectListItem name="UI Portfolio" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=portfolio" status="stopped" />
    </div>
    <div class="sidebar-footer">
      <Button variant="secondary" surface="dark" label="Add project" width="full" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 210px; /* 42 units */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-heading {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-chrome-text-muted);
  margin: 0;
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-xs);
}

.sidebar-projects {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
  overflow-y: auto;
}

</style>
