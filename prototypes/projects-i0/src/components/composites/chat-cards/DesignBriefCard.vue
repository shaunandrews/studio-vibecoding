<script setup lang="ts">
import { onMounted, computed } from 'vue'
import type { CardUiState, DesignBriefCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: DesignBriefCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

// Load Google Fonts for this brief
onMounted(() => {
  if (props.data.fonts.length === 0) return
  const families = props.data.fonts
    .map(f => `family=${encodeURIComponent(f)}:wght@400;700`)
    .join('&')
  const id = `brief-fonts-${props.data.fonts.join('-').replace(/\s+/g, '-')}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
  document.head.appendChild(link)
})

const headingFont = computed(() =>
  props.data.fonts[0] ? `'${props.data.fonts[0]}', sans-serif` : 'sans-serif'
)
const bodyFont = computed(() =>
  props.data.fonts[1] ? `'${props.data.fonts[1]}', sans-serif` : headingFont.value
)
</script>

<template>
  <div
    class="brief-card"
    :class="[`brief-card--${state}`, { 'brief-card--compact': compact, 'brief-card--disabled': state === 'disabled' }]"
    :style="{
      '--brief-bg': data.bgColor,
      '--brief-text': data.textColor,
      '--brief-accent': data.accentColor,
      '--brief-font-heading': headingFont,
      '--brief-font-body': bodyFont,
    }"
  >
    <div class="brief-card__preview">
      <div class="brief-card__site-name">{{ data.siteName }}</div>
      <div class="brief-card__direction">{{ data.direction }}</div>
      <div class="brief-card__swatches hstack gap-xxxs">
        <div
          v-for="color in data.colors"
          :key="color.name"
          class="brief-card__swatch"
          :style="{ background: color.value }"
          :title="`${color.name}: ${color.value}`"
        />
      </div>
    </div>
    <div class="brief-card__meta hstack gap-xs">
      <span v-for="font in data.fonts" :key="font" class="brief-card__font-tag">{{ font }}</span>
    </div>
  </div>
</template>

<style scoped>
.brief-card {
  width: calc(100% + var(--space-s) * 2);
  min-width: 360px;
  border-radius: var(--radius-m);
  overflow: hidden;
  margin: var(--space-m) 0;
  margin-inline-start: calc(-1 * var(--space-s));
  border: 1px solid color-mix(in srgb, var(--brief-text) 15%, transparent);
}

.brief-card__preview {
  background: var(--brief-bg);
  color: var(--brief-text);
  padding: var(--space-m) var(--space-s);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.brief-card__site-name {
  font-family: var(--brief-font-heading);
  font-size: var(--font-size-xl);
  font-weight: 700;
  line-height: 1.2;
  color: var(--brief-accent);
}

.brief-card__direction {
  font-family: var(--brief-font-body);
  font-size: var(--font-size-s);
  line-height: var(--line-height-relaxed);
  opacity: 0.85;
}

.brief-card__swatches {
  flex-wrap: wrap;
  margin-block-start: var(--space-xxxs);
}

.brief-card__swatch {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-s);
  border: 1px solid color-mix(in srgb, var(--brief-text) 20%, transparent);
}

.brief-card__meta {
  padding: var(--space-xs) var(--space-s);
  background: var(--color-surface);
  border-block-start: 1px solid var(--color-surface-border);
  flex-wrap: wrap;
}

.brief-card__font-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  padding: 2px var(--space-xxs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
}

.brief-card--disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
