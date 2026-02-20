<script setup lang="ts">
import { computed } from 'vue'
import { chevronDown } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import FlyoutMenu from '@/components/primitives/FlyoutMenu.vue'
import type { FlyoutMenuGroup } from '@/components/primitives/FlyoutMenu.vue'

export interface Tab {
  id: string
  label: string
  messageCount?: number
}

const props = defineProps<{
  tabs: Tab[]
  activeId: string
}>()

const emit = defineEmits<{
  'update:activeId': [id: string]
  'close': [id: string]
  'add': []
  'view-all': []
}>()

const chatMenuGroups = computed<FlyoutMenuGroup[]>(() => [
  {
    items: props.tabs.map(tab => ({
      label: tab.label,
      checked: tab.id === props.activeId,
      action: () => emit('update:activeId', tab.id),
    })),
  },
  {
    items: [{
      label: 'View all chats',
      action: () => emit('view-all'),
    }],
  },
])
</script>

<template>
  <div class="tab-bar hstack min-w-0">
    <FlyoutMenu :groups="chatMenuGroups" align="start" max-width="300px" class="tab-bar__count">
      <template #trigger="{ toggle, open }">
        <button class="tab-bar__count-btn hstack gap-xxxs" @click="toggle">
          <Text variant="label" color="secondary">{{ tabs.length }} {{ tabs.length === 1 ? 'Chat' : 'Chats' }}</Text>
          <WPIcon :icon="chevronDown" :size="16" class="tab-bar__chevron" :class="{ open }" />
        </button>
      </template>
    </FlyoutMenu>
  </div>
</template>

<style scoped>
.tab-bar__count-btn {
  height: 35px;
  padding: 0 var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  align-items: center;
  color: var(--color-text-secondary);
  transition: background var(--duration-instant) var(--ease-default);
}

.tab-bar__count-btn:hover {
  background: var(--color-surface-secondary);
}

.tab-bar__chevron {
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-default);
}

.tab-bar__chevron.open {
  transform: rotate(180deg);
}
</style>
