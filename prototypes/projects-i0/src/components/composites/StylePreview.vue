<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { DesignBriefCardData } from '@/data/types'

const props = defineProps<{
  data: DesignBriefCardData
  cardRect: DOMRect
}>()

defineEmits<{
  'preview-enter': []
  'preview-leave': []
}>()

const panelRef = ref<HTMLElement | null>(null)
const posStyle = ref<Record<string, string>>({})
const visible = ref(false)

function updatePosition() {
  if (!panelRef.value) return
  const panel = panelRef.value
  const pw = 400
  const ph = panel.offsetHeight || 250

  // Center horizontally over card
  let x = props.cardRect.left + props.cardRect.width / 2 - pw / 2
  // Position above card by default
  let y = props.cardRect.top - ph - 10

  // Viewport clamp — horizontal
  const margin = 10
  if (x < margin) x = margin
  if (x + pw > window.innerWidth - margin) x = window.innerWidth - margin - pw

  // Flip below if no room above
  if (y < margin) {
    y = props.cardRect.bottom + 10
  }

  posStyle.value = {
    position: 'fixed',
    insetBlockStart: `${y}px`,
    insetInlineStart: `${x}px`,
    width: `${pw}px`,
  }
}

watch(() => props.cardRect, () => {
  nextTick(updatePosition)
}, { immediate: true })

onMounted(() => {
  nextTick(() => {
    updatePosition()
    requestAnimationFrame(() => { visible.value = true })
  })
})

onBeforeUnmount(() => {
  visible.value = false
})

// Inject brief's CSS variables into the style tile HTML so var() references work
const tileHtml = computed(() => {
  if (!props.data.styleTile) return null

  const cssVarBlock = props.data.styleTile.includes(':root')
    ? '' // style tile already has its own root vars
    : `<style>.tile { ${cssVarsToInline()} }</style>`

  return cssVarBlock + props.data.styleTile
})

function cssVarsToInline(): string {
  // Build CSS variable declarations from the brief's extracted colors + fonts
  const d = props.data
  const vars = [
    `--color-primary: ${d.accentColor}`,
    `--color-bg: ${d.bgColor}`,
    `--color-text: ${d.textColor}`,
    `--font-heading: '${d.fonts[0]}', sans-serif`,
    `--font-body: '${d.fonts[1] || d.fonts[0]}', sans-serif`,
    // Also set the colors that might be referenced
    ...d.colors.map(c => `--${c.name}: ${c.value}`),
  ]
  return vars.join('; ')
}

// Fallback: simple composition when no styleTile is available
const fallbackVars = computed(() => ({
  '--sp-bg': props.data.bgColor,
  '--sp-text': props.data.textColor,
  '--sp-accent': props.data.accentColor,
  '--sp-font-heading': `'${props.data.fonts[0]}', sans-serif`,
  '--sp-font-body': `'${props.data.fonts[1] || props.data.fonts[0]}', sans-serif`,
}))
</script>

<template>
  <Teleport to="body">
    <div
      ref="panelRef"
      class="style-preview"
      :class="{ 'style-preview--visible': visible }"
      :style="posStyle"
      @pointerenter="$emit('preview-enter')"
      @pointerleave="$emit('preview-leave')"
    >
      <!-- AI-generated style tile -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="tileHtml" class="style-preview__tile" :style="{ background: data.bgColor }" v-html="tileHtml" />

      <!-- Fallback: simple type specimen when no style tile -->
      <div v-else class="style-preview__fallback" :style="fallbackVars">
        <span class="fallback__name">{{ data.siteName }}</span>
        <span class="fallback__direction">{{ data.direction }}</span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.style-preview {
  position: fixed;
  z-index: 9999;
  height: 250px;
  border-radius: var(--radius-m);
  overflow: hidden;
  pointer-events: auto;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.18),
    0 1px 4px rgba(0, 0, 0, 0.12);

  /* Entrance */
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 150ms ease, transform 150ms ease;
}

.style-preview--visible {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.style-preview__tile {
  width: 100%;
  height: 100%;
}

/* AI-generated .tile class fills the container */
.style-preview__tile :deep(.tile) {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Fallback when no style tile from AI */
.style-preview__fallback {
  width: 100%;
  height: 100%;
  background: var(--sp-bg);
  color: var(--sp-text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-l);
  gap: var(--space-xs);
}

.fallback__name {
  font-family: var(--sp-font-heading);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
}

.fallback__direction {
  font-family: var(--sp-font-body);
  font-size: 13px;
  opacity: 0.6;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
