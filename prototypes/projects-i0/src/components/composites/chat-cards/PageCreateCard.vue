<script setup lang="ts">
import { computed } from 'vue'
import ChatCard from '@shared/composites/chat-cards/ChatCard.vue'
import type { CardUiState, PageCreateCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: PageCreateCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const newSections = computed(() => props.data.sections.filter(s => !s.reuse))
const reusedCount = computed(() => props.data.sections.length - newSections.value.length)
</script>

<template>
  <ChatCard :compact="compact" :state="state">
    <template #header>
      <div class="page-header">
        <div class="page-title-row hstack gap-xs">
          <strong class="page-title">{{ data.title }}</strong>
          <span class="page-slug">{{ data.slug }}</span>
        </div>
        <p class="page-desc">{{ data.description }}</p>
      </div>
    </template>

    <div class="blueprint">
      <!-- Browser chrome hint -->
      <div class="blueprint-chrome">
        <span class="chrome-dot" />
        <span class="chrome-dot" />
        <span class="chrome-dot" />
        <span class="chrome-url">{{ data.slug }}</span>
      </div>

      <!-- Stacked section wireframes -->
      <div class="blueprint-page">
        <div
          v-for="section in data.sections"
          :key="section.role"
          class="blueprint-section"
          :class="{ 'blueprint-section--reuse': !!section.reuse }"
        >
          <div class="section-label hstack gap-xxs">
            <span class="section-role">{{ section.reuse ? section.role : section.description }}</span>
            <span v-if="section.reuse" class="reuse-badge">reuse</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-meta hstack gap-xs">
      <span class="meta-item">{{ newSections.length }} new section{{ newSections.length !== 1 ? 's' : '' }}</span>
      <span v-if="reusedCount > 0" class="meta-sep">&middot;</span>
      <span v-if="reusedCount > 0" class="meta-item">{{ reusedCount }} reused</span>
    </div>
  </ChatCard>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

.page-title-row {
  align-items: baseline;
}

.page-title {
  font-size: var(--font-size-l);
}

.page-slug {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxs);
  border-radius: var(--radius-s);
}

.page-desc {
  margin: 0;
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* Blueprint wireframe */
.blueprint {
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
  overflow: hidden;
}

.blueprint-chrome {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border-block-end: 1px solid var(--color-surface-border);
}

.chrome-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-text-muted);
  opacity: 0.4;
}

.chrome-url {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-inline-start: var(--space-xxs);
}

.blueprint-page {
  display: flex;
  flex-direction: column;
  padding: var(--space-xxs);
  gap: var(--space-xxxs);
}

/* Individual section block */
.blueprint-section {
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  padding: var(--space-xs) var(--space-xs);
}

/* Reused sections: compact, dashed, muted */
.blueprint-section--reuse {
  border-style: dashed;
  padding: var(--space-xxs) var(--space-xs);
}

.section-label {
  align-items: center;
}

.section-role {
  font-size: var(--font-size-s);
  color: var(--color-text);
}

.blueprint-section--reuse .section-role {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.reuse-badge {
  font-size: 9px;
  color: var(--color-text-muted);
  border: 1px solid var(--color-surface-border);
  padding: 0 var(--space-xxxs);
  border-radius: var(--radius-s);
  line-height: 1.5;
}

/* Summary line below the blueprint */
.page-meta {
  padding-block-start: var(--space-xxs);
}

.meta-item {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.meta-sep {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
