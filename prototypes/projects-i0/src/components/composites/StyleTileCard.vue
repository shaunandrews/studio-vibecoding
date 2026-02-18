<script setup lang="ts">
import type { DesignBriefCardData } from '@/data/types'

const props = defineProps<{
  data: DesignBriefCardData
  index: number
}>()

const emit = defineEmits<{
  'preview-enter': [rect: DOMRect, data: DesignBriefCardData]
  'preview-leave': []
}>()

function onPointerEnter(e: PointerEvent) {
  const el = (e.currentTarget as HTMLElement)
  emit('preview-enter', el.getBoundingClientRect(), props.data)
}

function onPointerLeave() {
  emit('preview-leave')
}
</script>

<template>
  <button
    class="style-tile-card action-enter"
    :style="{ animationDelay: `${index * 60}ms` }"
    :aria-label="data.styleName"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <span class="style-tile-card__badge">{{ index < 9 ? index + 1 : 0 }}</span>
    <span
      class="style-tile-card__name"
      :style="{ fontFamily: `'${data.fonts[0]}', sans-serif` }"
    >{{ data.styleName }}</span>
    <span
      class="style-tile-card__stripe"
      :style="{ background: data.accentColor }"
    />
  </button>
</template>

<style scoped>
.style-tile-card {
  position: relative;
  flex: 1 1 0;
  min-width: 140px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  padding: var(--space-xs) var(--space-s);
  padding-block-end: calc(var(--space-xs) + 3px); /* room for stripe */
  text-align: start;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
  overflow: hidden;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.style-tile-card:hover {
  transform: scale(1.02);
  border-color: var(--color-text-muted);
}

.style-tile-card:active {
  transform: scale(0.98);
}

.style-tile-card__badge {
  position: absolute;
  inset-block-start: var(--space-xxxs);
  inset-inline-end: var(--space-xxxs);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.4;
}

.style-tile-card__name {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.style-tile-card__stripe {
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  height: 3px;
}
</style>
