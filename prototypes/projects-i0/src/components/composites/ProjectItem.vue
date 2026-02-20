<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Text from '@shared/primitives/Text.vue'
import StatusIndicator from '@shared/primitives/StatusIndicator.vue'
import Tooltip from '@shared/primitives/Tooltip.vue'
import type { Project } from '@/data/types'
import { useSiteStore } from '@/data/useSiteStore'
import { renderSite } from '@shared/data/site-renderer'
import { transitionProjectId } from '@shared/data/useProjectTransition'

const { getSite } = useSiteStore()

const props = defineProps<{
  project: Project
  mode: 'card' | 'row'
  active?: boolean
  collapsed?: boolean
}>()

defineEmits<{
  select: [id: string]
  'toggle-status': [id: string]
}>()

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemDark = ref(darkQuery.matches)
const onSchemeChange = (e: MediaQueryListEvent) => { systemDark.value = e.matches }
onMounted(() => darkQuery.addEventListener('change', onSchemeChange))
onUnmounted(() => darkQuery.removeEventListener('change', onSchemeChange))

const previewHtml = computed(() => {
  if (props.mode !== 'card') return ''
  const site = getSite(props.project.id)
  if (!site || site.pages.length === 0) return ''
  const homepage = site.pages[0].slug
  const colorMode = systemDark.value && site.theme.darkVariables ? 'dark' : 'light'
  const html = renderSite(site, homepage, colorMode)
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
})
</script>

<template>
  <Tooltip :text="collapsed ? project.name : undefined" placement="right">
    <div
      class="project-item"
      :class="[`mode-${mode}`, { active, collapsed }]"
      :style="mode === 'card' && project.id === transitionProjectId ? { viewTransitionName: 'project-frame' } : {}"
      @click="$emit('select', project.id)"
    >
      <div class="item-preview" v-if="mode === 'card'">
        <iframe
          v-if="previewHtml"
          :srcdoc="previewHtml"
          class="preview-iframe"
          tabindex="-1"
          loading="lazy"
        />
        <div v-else class="preview-placeholder">
          <img :src="project.favicon" alt="" class="placeholder-favicon" />
        </div>
      </div>
      <div class="item-header hstack gap-xs">
        <img class="item-favicon shrink-0" :src="project.favicon" alt="" />
        <template v-if="!collapsed">
          <div class="flex-1 min-w-0">
            <div class="item-name">{{ project.name }}</div>
            <div class="item-url"><Text variant="caption" color="muted">{{ project.url }}</Text></div>
          </div>
          <Tooltip :text="project.status === 'running' ? 'Running — click to stop' : project.status === 'loading' ? 'Starting…' : 'Stopped — click to start'">
            <StatusIndicator :status="project.status" @toggle.stop="$emit('toggle-status', project.id)" />
          </Tooltip>
        </template>
      </div>
    </div>
  </Tooltip>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  color: var(--color-chrome-text);
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

.preview-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--color-chrome-hover);
}

.placeholder-favicon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-m);
  opacity: 0.5;
}

/* Collapsed row — favicon only, centered */
.project-item.mode-row.collapsed {
  display: flex;
  justify-content: center;
  padding: var(--space-xxs);
}

.project-item.mode-row.collapsed .item-header {
  justify-content: center;
  gap: 0;
}

.project-item.mode-row.collapsed .item-favicon {
  width: 28px;
  height: 28px;
}
</style>
