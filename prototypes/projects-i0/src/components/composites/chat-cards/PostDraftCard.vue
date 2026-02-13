<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/primitives/Badge.vue'
import Button from '@/components/primitives/Button.vue'
import ChatCard from './ChatCard.vue'
import type { ActionButton, CardUiState, PostDraftCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: PostDraftCardData
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
  if (props.data.status === 'pending') return 'warning'
  return 'default'
})

const statusLabel = computed(() => {
  const map: Record<PostDraftCardData['status'], string> = {
    draft: 'Draft',
    pending: 'Pending Review',
    published: 'Published',
  }
  return map[props.data.status]
})
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <div class="post-draft-card vstack gap-xxs">
      <div class="hstack justify-between gap-xs">
        <strong class="post-title">{{ data.title }}</strong>
        <Badge :label="statusLabel" :variant="statusVariant" />
      </div>

      <template v-if="!compact">
        <p class="post-excerpt">{{ data.excerpt }}</p>

        <div v-if="data.categories?.length || data.tags?.length" class="post-taxonomy hstack gap-xxs flex-wrap">
          <span v-for="cat in data.categories" :key="cat" class="taxonomy-pill taxonomy-pill--category">{{ cat }}</span>
          <span v-for="tag in data.tags" :key="tag" class="taxonomy-pill taxonomy-pill--tag">{{ tag }}</span>
        </div>
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
.post-title {
  line-height: var(--line-height-tight);
}

.post-excerpt {
  color: var(--color-text-secondary);
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
}

.taxonomy-pill {
  font-size: var(--font-size-xs);
  padding: 1px var(--space-xxs);
  border-radius: var(--radius-s);
  line-height: var(--line-height-normal);
}

.taxonomy-pill--category {
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.taxonomy-pill--tag {
  background: transparent;
  border: 1px solid var(--color-surface-border);
  color: var(--color-text-muted);
}
</style>
