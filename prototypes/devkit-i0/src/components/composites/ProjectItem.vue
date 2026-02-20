<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import {
  pencil, copy, trash, download, upload,
  globe, styles, navigation, layout, page, post,
} from '@wordpress/icons'
import Text from '@/components/primitives/Text.vue'
import StatusIndicator from '@/components/primitives/StatusIndicator.vue'
import FlyoutMenu from '@/components/primitives/FlyoutMenu.vue'
import type { FlyoutMenuGroup } from '@/components/primitives/FlyoutMenu.vue'
import type { Project } from '@/data/types'
import { useSiteStore } from '@/data/useSiteStore'
import { renderSite } from '@/data/site-renderer'
import { transitionProjectId } from '@/data/useProjectTransition'

const { getSite } = useSiteStore()

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  select: [id: string]
  'toggle-status': [id: string]
}>()

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemDark = ref(darkQuery.matches)
const onSchemeChange = (e: MediaQueryListEvent) => { systemDark.value = e.matches }
onMounted(() => darkQuery.addEventListener('change', onSchemeChange))
onUnmounted(() => darkQuery.removeEventListener('change', onSchemeChange))

const previewHtml = computed(() => {
  const site = getSite(props.project.id)
  if (!site || site.pages.length === 0) return ''
  const homepage = site.pages[0].slug
  const colorMode = systemDark.value && site.theme.darkVariables ? 'dark' : 'light'
  const html = renderSite(site, homepage, colorMode)
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
})

const menuRef = ref<InstanceType<typeof FlyoutMenu> | null>(null)
const menuOpen = computed(() => menuRef.value?.open ?? false)

const menuGroups = computed<FlyoutMenuGroup[]>(() => {
  const isRunning = props.project.status === 'running'
  const isLoading = props.project.status === 'loading'

  return [
    {
      items: [
        {
          label: isRunning ? 'Stop site' : 'Start site',
          iconUrl: isRunning
            ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Crect x='5' y='5' width='8' height='8' rx='1.5' fill='%23e65054'/%3E%3C/svg%3E"
            : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Cpolygon points='6,4 14,9 6,14' fill='%234ab866'/%3E%3C/svg%3E",
          action: () => { if (!isLoading) emit('toggle-status', props.project.id) },
        },
        { label: 'Rename', icon: pencil, action: () => {} },
        { label: 'Duplicate', icon: copy, action: () => {} },
        { label: 'Import', icon: download, action: () => {} },
        { label: 'Export', icon: upload, action: () => {} },
        { label: 'Delete', icon: trash, destructive: true, action: () => {} },
      ],
    },
    {
      items: [
        {
          label: 'WordPress Admin',
          children: [
            { label: 'WP Admin', icon: globe, action: () => {} },
            { label: 'Styles', icon: styles, action: () => {} },
            { label: 'Navigation', icon: navigation, action: () => {} },
            { label: 'Templates', icon: layout, action: () => {} },
            { label: 'Pages', icon: page, action: () => {} },
            { label: 'Posts', icon: post, action: () => {} },
          ],
        },
        {
          label: 'Open in\u2026',
          children: [
            { label: 'Finder', iconUrl: 'https://symbl.revend.group/img/appicon/Finder.png', action: () => {} },
            { label: 'Cursor', iconUrl: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/cursor-ai-code-icon.svg', action: () => {} },
            { label: 'VS Code', iconUrl: 'https://icon.icepanel.io/Technology/svg/Visual-Studio-Code-%28VS-Code%29.svg', action: () => {} },
            { label: 'Terminal', iconUrl: 'https://symbl.revend.group/img/appicon/Terminal.png', action: () => {} },
          ],
        },
      ],
    },
  ]
})
</script>

<template>
    <div
      class="project-item"
      :style="project.id === transitionProjectId ? { viewTransitionName: 'project-frame' } : {}"
      @click="$emit('select', project.id)"
    >
      <div class="item-preview" v-if="previewHtml">
        <iframe
          :srcdoc="previewHtml"
          class="preview-iframe"
          tabindex="-1"
          loading="lazy"
        />
        <div class="item-more" :class="{ 'item-more--pinned': menuOpen }" @click.stop>
          <FlyoutMenu ref="menuRef" :groups="menuGroups" surface="dark" align="end">
            <template #trigger="{ toggle }">
              <button class="more-btn" @click="toggle" aria-label="More actions">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="3" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="8" cy="13" r="1.5" />
                </svg>
              </button>
            </template>
          </FlyoutMenu>
        </div>
      </div>
      <div class="item-header hstack gap-xs">
        <img class="item-favicon shrink-0" :src="project.favicon" alt="" />
        <div class="flex-1 min-w-0">
          <div class="item-name">{{ project.name }}</div>
          <div class="item-url"><Text variant="caption" color="muted">{{ project.url }}</Text></div>
        </div>
        <div @click.stop>
          <StatusIndicator :status="project.status" @toggle="$emit('toggle-status', project.id)" />
        </div>
      </div>
    </div>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  color: var(--color-chrome-text);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-m);
  overflow: hidden;
  transition: background var(--duration-instant) var(--ease-default),
              border-color var(--duration-instant) var(--ease-default);
}

.project-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--color-chrome-subtle);
}

/* Preview iframe */
.item-preview {
  position: relative;
  aspect-ratio: var(--card-aspect, 4 / 3);
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

/* More button — overlaid on preview */
.item-more {
  position: absolute;
  inset-block-start: var(--space-xs);
  inset-inline-end: var(--space-xs);
  opacity: 0;
  transition: opacity var(--duration-instant) var(--ease-default);
}

.project-item:hover .item-more,
.item-more--pinned {
  opacity: 1;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-s);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background var(--duration-instant) var(--ease-default);
}

.more-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Header */
.item-header {
  padding: var(--space-s);
}

/* Favicon */
.item-favicon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-s);
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

/* URL */
.item-url {
  overflow: hidden;
  max-height: 2em;
}
</style>
