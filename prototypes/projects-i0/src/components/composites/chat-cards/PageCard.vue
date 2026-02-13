<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/primitives/Badge.vue'
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, PageCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: PageCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const emit = defineEmits<{
  action: [action: ActionButton]
}>()

const statusVariant = computed(() => {
  if (props.data.status === 'published') return 'success'
  if (props.data.status === 'scheduled') return 'warning'
  return 'default'
})

const statusLabel = computed(() => {
  const map: Record<PageCardData['status'], string> = {
    draft: 'Draft',
    published: 'Published',
    scheduled: 'Scheduled',
  }
  return map[props.data.status]
})
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <div class="page-card vstack gap-xxs">
      <div class="hstack justify-between gap-xs">
        <div class="vstack gap-xxxs min-w-0">
          <strong class="page-title">{{ data.title }}</strong>
          <span v-if="!compact" class="page-slug">/{{ data.slug }}</span>
        </div>
        <Badge :label="statusLabel" :variant="statusVariant" />
      </div>

      <template v-if="!compact">
        <span v-if="data.template" class="page-meta">Template: {{ data.template }}</span>
        <p v-if="data.excerpt" class="page-excerpt">{{ data.excerpt }}</p>
      </template>

      <div v-if="data.actions?.length" class="hstack gap-xxs pt-xxxs">
        <Button
          v-for="action in data.actions"
          :key="action.id"
          :label="action.label"
          :variant="action.variant === 'destructive' ? 'tertiary' : (action.variant || 'secondary')"
          :icon="action.icon"
          size="small"
          @click.stop="emit('action', action)"
        />
      </div>
    </div>
  </ChatCard>
</template>

<style scoped>
.page-title {
  line-height: var(--line-height-tight);
}

.page-slug {
  color: var(--color-text-muted);
  font-size: var(--font-size-s);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
}

.page-meta {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.page-excerpt {
  color: var(--color-text-secondary);
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
}
</style>
