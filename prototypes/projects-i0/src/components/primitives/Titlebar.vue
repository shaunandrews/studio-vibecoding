<script setup lang="ts">
import { cog, help } from '@wordpress/icons'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
import Text from '@/components/primitives/Text.vue'

const router = useRouter()
const settingsValue = ref('')

const settingsOptions = [
  { label: 'Dev Pages', options: [
    { label: 'Components', value: 'components' },
    { label: 'Design System', value: 'design-system' },
    { label: 'Architecture', value: 'architecture' },
  ]},
]

function onSettingsSelect(value: string) {
  settingsValue.value = ''
  router.push({ name: value })
}
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
      <Text variant="body" color="secondary" weight="medium" tag="h1">WordPress Studio</Text>
    </div>
    <div class="titlebar-end hstack gap-xxs">
      <Dropdown
        v-model="settingsValue"
        :groups="settingsOptions"
        :trigger-icon="cog"
        surface="dark"
        placement="below"
        @update:model-value="onSettingsSelect"
      />
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

/* app title styled via Text component */

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
