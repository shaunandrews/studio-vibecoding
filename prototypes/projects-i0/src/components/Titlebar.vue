<script setup lang="ts">
import { sidebar, cog, help } from '@wordpress/icons'
import Button from './Button.vue'
</script>

<template>
  <div class="titlebar">
    <div class="titlebar-start">
      <div class="traffic-lights">
        <span class="light close"></span>
        <span class="light minimize"></span>
        <span class="light maximize"></span>
      </div>
    </div>
    <div class="titlebar-center">
      <h1 class="titlebar-apptitle">WordPress Studio</h1>
    </div>
    <div class="titlebar-end">
      <Button variant="tertiary" surface="dark" :icon="cog" size="small" />
      <Button variant="tertiary" surface="dark" :icon="help" size="small" />
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xs) 0 var(--space-s);
  flex-shrink: 0;
  -webkit-app-region: drag;
  border-bottom: 1px solid var(--color-chrome-border);
}

.titlebar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.titlebar-apptitle {
  font-size: 13px;
  color: var(--color-chrome-text-secondary);
  margin: 0;
  white-space: nowrap;
  font-weight: 500;
}

.titlebar-separator {
  margin: 0 var(--space-xxs);
  opacity: 0.4;
}

.titlebar-start,
.titlebar-end {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  -webkit-app-region: no-drag;
}

.traffic-lights {
  display: flex;
  gap: var(--space-xs);
  margin-inline-end: var(--space-xxs);
}

.light {
  width: 12px; /* OS-native size, not on grid — intentional */
  height: 12px;
  border-radius: 50%;
}

.light.close { background: var(--color-light-close); }
.light.minimize { background: var(--color-light-minimize); }
.light.maximize { background: var(--color-light-maximize); }
</style>
