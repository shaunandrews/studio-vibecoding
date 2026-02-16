<script setup lang="ts">
import { computed } from 'vue'
import Text from '@/components/primitives/Text.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import Tooltip from '@/components/primitives/Tooltip.vue'
import type { Project } from '@/data/types'
import { mockSites } from '@/data/mock-sites'
import { useSiteThemes } from '@/data/themes'
import { themeToCSS } from '@/data/themes/theme-utils'

const props = defineProps<{
  project: Project
  mode: 'card' | 'row'
  active?: boolean
}>()

defineEmits<{
  select: [id: string]
  'toggle-status': [id: string]
}>()

const { getTheme } = useSiteThemes()

const previewHtml = computed(() => {
  if (props.mode !== 'card') return ''
  const siteModule = mockSites[props.project.id]
  const theme = getTheme(props.project.id)
  if (!siteModule || !theme) return ''
  const css = themeToCSS(theme, 'light')
  return siteModule.renderSitePage('homepage', css)
})
</script>

<template>
    <div
      class="project-item"
      :class="[`mode-${mode}`, { active }]"
      @click="$emit('select', project.id)"
    >
      <div class="item-preview" v-if="mode === 'card' && previewHtml">
        <iframe
          :srcdoc="previewHtml"
          class="preview-iframe"
          tabindex="-1"
          sandbox="allow-same-origin"
          loading="lazy"
        />
      </div>
      <div class="item-header hstack gap-xs">
        <img class="item-favicon shrink-0" :src="project.favicon" alt="" />
        <div class="flex-1 min-w-0">
          <div class="item-name">{{ project.name }}</div>
          <div class="item-url"><Text variant="caption" color="muted">{{ project.url }}</Text></div>
        </div>
        <Tooltip :text="project.status === 'running' ? 'Running — click to stop' : project.status === 'loading' ? 'Starting…' : 'Stopped — click to start'">
          <StatusIndicator :status="project.status" @toggle.stop="$emit('toggle-status', project.id)" />
        </Tooltip>
      </div>
    </div>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  color: var(--color-chrome-text);
  transition: padding var(--transition-layout), border-radius var(--transition-layout);
}

/* Card mode */
.project-item.mode-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-m);
  overflow: hidden;
}

.project-item.mode-card:hover {
  background: rgba(255, 255, 255, 0.06);
}

.project-item.mode-card .item-header {
  padding: var(--space-s);
}

/* Row mode */
.project-item.mode-row {
  background: transparent;
  border-radius: var(--radius-s);
  padding: var(--space-xs);
  color: var(--color-chrome-text-secondary);
}

.project-item.mode-row:hover {
  background: var(--color-chrome-hover);
}

.project-item.mode-row.active {
  background: var(--color-chrome-active);
  color: var(--color-chrome-text);
}

/* Favicon */
.item-favicon {
  border-radius: var(--radius-s);
  transition: width var(--transition-layout), height var(--transition-layout);
}

.mode-card .item-favicon {
  width: 32px;
  height: 32px;
}

.mode-row .item-favicon {
  width: 20px;
  height: 20px;
}

/* Name */
.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: var(--font-size-l);
  line-height: var(--line-height-body);
}

/* Collapsible: url */
.item-url {
  transition: opacity var(--transition-layout), max-height var(--transition-layout);
  overflow: hidden;
}

.mode-card .item-url {
  opacity: 1;
  max-height: 2em;
}

.mode-row .item-url {
  opacity: 0;
  max-height: 0;
}

/* Preview iframe */
.item-preview {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.preview-iframe {
  width: 200%;
  height: 200%;
  border: none;
  pointer-events: none;
  transform: scale(0.5);
  transform-origin: top left;
}
</style>
