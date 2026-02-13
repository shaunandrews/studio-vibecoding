<script setup lang="ts">
import Button from './Button.vue'
import StatusIndicator from './StatusIndicator.vue'
</script>

<template>
  <aside class="sidebar">
    <h2 class="sidebar-heading">Projects</h2>
    <div class="sidebar-projects">
      <div class="project-item">
        <img class="project-favicon" src="https://api.dicebear.com/9.x/shapes/svg?seed=cafe" alt="" />
        <span class="project-name">Downstreet Cafe</span>
        <StatusIndicator status="running" />
      </div>
      <div class="project-item active">
        <img class="project-favicon" src="https://api.dicebear.com/9.x/shapes/svg?seed=blog" alt="" />
        <span class="project-name">Shaun's Blog</span>
        <StatusIndicator status="running" />
      </div>
      <div class="project-item">
        <img class="project-favicon" src="https://api.dicebear.com/9.x/shapes/svg?seed=portfolio" alt="" />
        <span class="project-name">UI Portfolio</span>
        <StatusIndicator status="stopped" />
      </div>
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

.project-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background 150ms ease;
}

.project-item:hover {
  background: var(--color-chrome-hover);
}

.project-item.active {
  background: var(--color-chrome-active);
  color: var(--color-chrome-text);
}

.project-favicon {
  width: 20px; /* Standard favicon size — intentional, not on grid */
  height: 20px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.project-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
