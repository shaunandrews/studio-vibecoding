<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/primitives/Badge.vue'
import ChatCard from './ChatCard.vue'
import type { CardUiState, PluginCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: PluginCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})


const statusLabel = computed(() => {
  const map: Record<PluginCardData['status'], string> = {
    available: 'Available',
    installing: 'Installing',
    installed: 'Installed',
    active: 'Active',
    error: 'Error',
  }
  return map[props.data.status]
})

const statusVariant = computed(() => {
  if (props.data.status === 'active' || props.data.status === 'installed') return 'success'
  if (props.data.status === 'installing') return 'warning'
  if (props.data.status === 'error') return 'error'
  return 'default'
})
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <template #header>
      <div class="hstack justify-between gap-xs">
        <div class="vstack gap-xxxs min-w-0">
          <strong class="plugin-name">{{ data.name }}</strong>
          <span class="plugin-slug">{{ data.slug }}</span>
        </div>
        <Badge :label="statusLabel" :variant="statusVariant" />
      </div>
    </template>

    <div class="vstack gap-xxs">
      <p v-if="!compact" class="plugin-description">{{ data.description }}</p>
      <div v-if="data.rating || data.activeInstalls" class="plugin-meta hstack gap-xs">
        <span v-if="data.rating">{{ data.rating.toFixed(1) }}★</span>
        <span v-if="data.activeInstalls">{{ data.activeInstalls }} installs</span>
      </div>
    </div>

  </ChatCard>
</template>

<style scoped>
.plugin-name {
  line-height: var(--line-height-tight);
}

.plugin-slug {
  color: var(--color-text-muted);
  font-size: var(--font-size-s);
}

.plugin-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
}

.plugin-meta {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}
</style>
