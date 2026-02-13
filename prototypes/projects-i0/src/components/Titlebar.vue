<script setup lang="ts">
import { sidebar, cog, help } from '@wordpress/icons'
import Button from './Button.vue'
</script>

<template>
  <div class="titlebar">
    <div class="titlebar-start hstack gap-xxs">
      <div class="traffic-lights hstack gap-xs me-xxs">
        <span class="light close"></span>
        <span class="light minimize"></span>
        <span class="light maximize"></span>
      </div>
    </div>
    <div class="titlebar-center hstack">
      <h1 class="titlebar-apptitle">WordPress Studio</h1>
    </div>
    <div class="titlebar-end hstack gap-xxs">
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
  -webkit-app-region: no-drag;
}

.traffic-lights {
  /* margin via .me-xxs utility */
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
