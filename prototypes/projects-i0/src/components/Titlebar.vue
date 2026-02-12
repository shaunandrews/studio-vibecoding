<script setup lang="ts">
import { sidebar, cog, help } from '@wordpress/icons'
import Button from './Button.vue'
</script>

<template>
  <div class="titlebar">
    <div class="titlebar-left">
      <div class="traffic-lights">
        <span class="light close"></span>
        <span class="light minimize"></span>
        <span class="light maximize"></span>
      </div>
      <Button variant="tertiary" surface="dark" :icon="sidebar" size="small" />
    </div>
    <div class="titlebar-right">
      <span class="titlebar-greeting">Howdy, Shaun Andrews</span>
      <span class="titlebar-avatar"></span>
      <Button variant="tertiary" surface="dark" :icon="cog" size="small" />
      <Button variant="tertiary" surface="dark" :icon="help" size="small" />
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  flex-shrink: 0;
  -webkit-app-region: drag;
}

.titlebar-left,
.titlebar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  -webkit-app-region: no-drag;
}

.traffic-lights {
  display: flex;
  gap: 8px;
  margin-right: 8px;
}

.light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.light.close { background: var(--color-light-close); }
.light.minimize { background: var(--color-light-minimize); }
.light.maximize { background: var(--color-light-maximize); }

.titlebar-greeting {
  font-size: 13px;
  color: var(--color-chrome-text-secondary);
}

.titlebar-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-avatar);
  flex-shrink: 0;
}
</style>
