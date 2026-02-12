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
      <Button variant="tertiary" surface="dark" :icon="sidebar" />
    </div>
    <div class="titlebar-right">
      <Button variant="tertiary" surface="dark" :icon="cog" />
      <Button variant="tertiary" surface="dark" :icon="help" />
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 50px; /* 10 units */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xs);
  flex-shrink: 0;
  -webkit-app-region: drag;
}

.titlebar-left,
.titlebar-right {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  -webkit-app-region: no-drag;
}

.traffic-lights {
  display: flex;
  gap: var(--space-xxs);
  margin-right: var(--space-xxs);
}

.light {
  width: 12px; /* OS-native size, not on grid — intentional */
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
  width: var(--space-m);
  height: var(--space-m);
  border-radius: 50%;
  background: var(--color-avatar);
  flex-shrink: 0;
}
</style>
