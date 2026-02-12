<script setup lang="ts">
import Button from './Button.vue'
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-sites">
      <div class="site-item">
        <span class="site-name">Downstreet Cafe</span>
        <span class="site-status running"></span>
      </div>
      <div class="site-item active">
        <span class="site-name">Shaun's Blog</span>
        <span class="site-status running"></span>
      </div>
      <div class="site-item">
        <span class="site-name">UI Portfolio</span>
        <span class="site-status running"></span>
      </div>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-meta">
        <span>3 sites running</span>
        <a href="#">Stop all</a>
      </div>
      <Button variant="secondary" surface="dark" label="Add site" width="full" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 208px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-sites {
  flex: 1;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.site-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  transition: background 150ms ease;
}
.site-item:hover {
  background: var(--color-chrome-hover);
}
.site-item.active {
  background: var(--color-chrome-active);
  color: var(--color-chrome-text);
}

.site-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.site-status.running { background: var(--color-status-running); }
.site-status.stopped { background: var(--color-status-stopped); }

.sidebar-footer {
  padding: 10px;
  border-top: 1px solid var(--color-chrome-border);
}

.sidebar-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--color-chrome-text-muted);
  margin-bottom: 10px;
}
.sidebar-meta a {
  color: var(--color-chrome-text-muted);
  text-decoration: none;
}
.sidebar-meta a:hover {
  color: var(--color-chrome-text);
}
</style>
