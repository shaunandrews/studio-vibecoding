<script setup lang="ts">
import { onMounted } from 'vue'
import Button from '@/components/primitives/Button.vue'
import type { CardUiState, DesignBriefPickerCardData, ActionButton } from '@/data/types'

const props = withDefaults(defineProps<{
  data: DesignBriefPickerCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const emit = defineEmits<{
  action: [action: ActionButton]
}>()

// Load Google Fonts for all briefs
onMounted(() => {
  const allFonts = new Set<string>()
  for (const brief of props.data.briefs) {
    for (const font of brief.fonts) {
      allFonts.add(font)
    }
  }
  if (allFonts.size === 0) return

  const families = [...allFonts]
    .map(f => `family=${encodeURIComponent(f)}:wght@400;700`)
    .join('&')
  const id = `picker-fonts-${[...allFonts].join('-').replace(/\s+/g, '-')}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
  document.head.appendChild(link)
})

function headingFont(brief: DesignBriefPickerCardData['briefs'][0]) {
  return brief.fonts[0] ? `'${brief.fonts[0]}', sans-serif` : 'sans-serif'
}

function bodyFont(brief: DesignBriefPickerCardData['briefs'][0]) {
  return brief.fonts[1] ? `'${brief.fonts[1]}', sans-serif` : headingFont(brief)
}

/** Truncate direction to ~120 chars on a word boundary */
function shortDirection(text: string): string {
  if (text.length <= 120) return text
  const cut = text.lastIndexOf(' ', 120)
  return text.slice(0, cut > 0 ? cut : 120) + '...'
}

/** Show at most 8 color swatches */
function limitedColors(brief: DesignBriefPickerCardData['briefs'][0]) {
  return brief.colors.slice(0, 8)
}

function actionForBrief(index: number): ActionButton | undefined {
  return props.data.actions?.[index]
}
</script>

<template>
  <div
    class="brief-picker"
    :class="{ 'brief-picker--disabled': state === 'disabled' }"
  >
    <div class="brief-picker__row">
      <div
        v-for="(brief, i) in data.briefs"
        :key="i"
        class="brief-picker__card"
        :style="{
          '--bp-bg': brief.bgColor,
          '--bp-text': brief.textColor,
          '--bp-accent': brief.accentColor,
          '--bp-font-heading': headingFont(brief),
          '--bp-font-body': bodyFont(brief),
        }"
      >
        <div class="brief-picker__preview">
          <div class="brief-picker__site-name">{{ brief.siteName }}</div>
          <div class="brief-picker__direction">{{ shortDirection(brief.direction) }}</div>
          <div class="brief-picker__swatches hstack gap-xxxs">
            <div
              v-for="color in limitedColors(brief)"
              :key="color.name"
              class="brief-picker__swatch"
              :style="{ background: color.value }"
              :title="`${color.name}: ${color.value}`"
            />
          </div>
        </div>
        <div class="brief-picker__footer">
          <Button
            v-if="actionForBrief(i)"
            :label="actionForBrief(i)!.label"
            variant="primary"
            size="small"
            width="full"
            @click="emit('action', actionForBrief(i)!)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brief-picker {
  width: calc(100% + var(--space-s) * 2);
  min-width: 360px;
  margin-inline-start: calc(-1 * var(--space-s));
  margin-block: var(--space-m) 0;
}

.brief-picker__row {
  display: flex;
  gap: var(--space-xs);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  /* Equal height cards */
  align-items: stretch;
}

.brief-picker__card {
  flex: 1 1 0;
  min-width: 200px;
  border-radius: var(--radius-m);
  overflow: hidden;
  border: 1px solid var(--color-surface-border);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
}

.brief-picker__preview {
  background: var(--bp-bg);
  color: var(--bp-text);
  padding: var(--space-m) var(--space-s);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  flex: 1;
}

.brief-picker__site-name {
  font-family: var(--bp-font-heading);
  font-size: var(--font-size-l);
  font-weight: 700;
  line-height: 1.2;
  color: var(--bp-accent);
}

.brief-picker__direction {
  font-family: var(--bp-font-body);
  font-size: var(--font-size-s);
  line-height: var(--line-height-relaxed);
  opacity: 0.85;
}

.brief-picker__swatches {
  flex-wrap: wrap;
  margin-block-start: auto;
  padding-block-start: var(--space-xxs);
}

.brief-picker__swatch {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-s);
  border: 1px solid color-mix(in srgb, var(--bp-text) 20%, transparent);
}

.brief-picker__footer {
  padding: var(--space-xs) var(--space-s);
  background: var(--color-surface);
  border-block-start: 1px solid var(--color-surface-border);
}

.brief-picker--disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
