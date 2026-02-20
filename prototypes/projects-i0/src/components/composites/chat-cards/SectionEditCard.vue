<script setup lang="ts">
import { computed } from 'vue'
import ChatCard from '@shared/composites/chat-cards/ChatCard.vue'
import type { CardUiState, SectionEditCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: SectionEditCardData
  projectId: string
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <template #header>
      <strong>{{ data.label }}</strong>
    </template>
    <div class="section-info vstack gap-xxs">
      <div class="section-name">{{ data.sectionId }}</div>
      <div class="change-summary">{{ data.changeSummary }}</div>
    </div>
  </ChatCard>
</template>

<style scoped>
.section-name {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.change-summary {
  font-size: var(--font-size-m);
  color: var(--color-text);
}
</style>
