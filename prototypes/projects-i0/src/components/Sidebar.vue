<script setup lang="ts">
import Button from './Button.vue'
import ProjectListItem from './ProjectListItem.vue'
import Text from './Text.vue'
</script>

<template>
  <aside class="sidebar vstack shrink-0 gap-xxs">
    <Text variant="label" color="muted" tag="h2" class="p-xxs">Projects</Text>
    <div class="sidebar-projects vstack gap-xxs flex-1 overflow-auto">
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
}
</style>
