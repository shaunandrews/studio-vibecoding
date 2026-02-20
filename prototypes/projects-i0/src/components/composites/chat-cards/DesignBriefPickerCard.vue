<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { styles } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import ColorSwatches from '@/components/primitives/ColorSwatches.vue'
import type { CardUiState, DesignBriefCardData, DesignBriefPickerCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: DesignBriefPickerCardData
  compact?: boolean
  state?: CardUiState
}>(), {
  compact: false,
  state: 'default',
})

const colorMode = ref<'light' | 'dark'>('light')

function toggleColorMode() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}

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

function headingFont(brief: DesignBriefCardData) {
  return brief.fonts[0] ? `'${brief.fonts[0]}', sans-serif` : 'sans-serif'
}

function bodyFont(brief: DesignBriefCardData) {
  return brief.fonts[1] ? `'${brief.fonts[1]}', sans-serif` : headingFont(brief)
}

/**
 * Resolve preview colors based on the active color mode.
 * In dark mode, swap bg and text to simulate an inverted appearance.
 */
function previewColors(brief: DesignBriefCardData) {
  if (colorMode.value === 'light') {
    return { bg: brief.bgColor, text: brief.textColor, accent: brief.accentColor }
  }
  return { bg: brief.textColor, text: brief.bgColor, accent: brief.accentColor }
}

</script>

<template>
  <div
    class="brief-picker"
    :class="{ 'brief-picker--disabled': state === 'disabled' }"
  >
    <button
      class="brief-picker__mode-toggle"
      :class="{ 'brief-picker__mode-toggle--active': colorMode === 'dark' }"
      :title="colorMode === 'light' ? 'Preview dark mode' : 'Preview light mode'"
      @click="toggleColorMode"
    >
      <WPIcon :icon="styles" :size="14" />
      <span class="brief-picker__mode-label">{{ colorMode === 'light' ? 'Light' : 'Dark' }}</span>
    </button>
    <div class="brief-picker__row">
      <div
        v-for="(brief, i) in data.briefs"
        :key="i"
        class="brief-picker__card"
        :style="{
          '--bp-bg': previewColors(brief).bg,
          '--bp-text': previewColors(brief).text,
          '--bp-accent': previewColors(brief).accent,
          '--bp-font-heading': headingFont(brief),
          '--bp-font-body': bodyFont(brief),
        }"
      >
        <div class="brief-picker__preview">
          <div class="brief-picker__style-name">{{ brief.styleName }}</div>
          <div class="brief-picker__site-name">{{ brief.siteName }}</div>
          <ColorSwatches
            :colors="brief.colors"
            size="small"
            :border-color="`color-mix(in srgb, ${previewColors(brief).text} 20%, transparent)`"
            class="brief-picker__swatches"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brief-picker {
  position: relative;
  width: calc(100% + var(--space-s) * 2);
  min-width: 360px;
  margin-inline-start: calc(-1 * var(--space-s));
  margin-block: var(--space-m) 0;
}

.brief-picker__mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  padding: var(--space-xxxs) var(--space-xxs);
  margin-block-end: var(--space-xxs);
  margin-inline-start: var(--space-xs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  line-height: 1;
}

.brief-picker__mode-toggle:hover {
  color: var(--color-text-secondary);
  border-color: var(--color-text-muted);
}

.brief-picker__mode-toggle--active {
  color: var(--color-text-secondary);
  border-color: var(--color-text-muted);
}

.brief-picker__mode-toggle :deep(svg) {
  transition: transform var(--duration-fast) var(--ease-default);
}

.brief-picker__mode-toggle--active :deep(svg) {
  transform: rotate(180deg);
}

.brief-picker__mode-label {
  user-select: none;
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
  transition: background 0.2s, color 0.2s;
}

.brief-picker__style-name {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.brief-picker__site-name {
  font-family: var(--bp-font-heading);
  font-size: var(--font-size-l);
  font-weight: 700;
  line-height: 1.2;
  color: var(--bp-accent);
}

.brief-picker__swatches {
  margin-block-start: auto;
  padding-block-start: var(--space-xxs);
}

.brief-picker--disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
