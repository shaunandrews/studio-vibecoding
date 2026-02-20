<script setup lang="ts">
import {
  cog, chevronDown, search, wordpress,
  pencil, copy, trash, download, upload,
  globe, styles, navigation, layout, page, post,
} from '@wordpress/icons'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
import FlyoutMenu from '@/components/primitives/FlyoutMenu.vue'
import type { FlyoutMenuGroup } from '@/components/primitives/FlyoutMenu.vue'
import Text from '@/components/primitives/Text.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import { useProjects } from '@/data/useProjects'
import { useProjectTransition } from '@/data/useProjectTransition'
import { isAIConfigured, getAPIKey, setAPIKey } from '@/data/ai-service'

const router = useRouter()
const route = useRoute()
const { projects } = useProjects()
const { navigateHome } = useProjectTransition()

const emit = defineEmits<{
  'open-search': []
}>()

const currentProject = computed(() => {
  const projectId = route.params.id as string | undefined
  if (projectId) return projects.value.find(p => p.id === projectId) ?? null
  return null
})

const title = computed(() => {
  if (currentProject.value) return `WordPress Studio • ${currentProject.value.name}`
  return 'WordPress Studio'
})
watch(title, (t) => { document.title = t }, { immediate: true })

// ── Project menu ──
const projectMenuGroups = computed<FlyoutMenuGroup[]>(() => [
  {
    items: [
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
  {
    items: [
      {
        label: 'Sites',
        children: projects.value.map(p => ({
          label: p.name,
          iconUrl: p.favicon,
          checked: p.id === currentProject.value?.id,
          action: () => router.push({ name: 'site', params: { id: p.id } }),
        })),
      },
    ],
  },
])

// ── Settings dropdown ──
const settingsValue = ref('')

const settingsOptions = [
  { label: 'Settings', options: [
    { label: 'API Key', value: '__api-key__' },
    { label: 'Design System', value: 'design-system' },
  ]},
]

// API key popover
const showKeySettings = ref(false)
const keyInput = ref('')
const keySaved = ref(false)
const aiConfigured = ref(isAIConfigured())
const keyPopoverRef = ref<HTMLElement | null>(null)

function openKeySettings() {
  showKeySettings.value = true
  keyInput.value = getAPIKey()
  keySaved.value = false
}

function saveKey() {
  setAPIKey(keyInput.value)
  aiConfigured.value = isAIConfigured()
  keySaved.value = true
  setTimeout(() => {
    keySaved.value = false
    showKeySettings.value = false
  }, 1000)
}

function onClickOutsideKey(e: MouseEvent) {
  if (showKeySettings.value && keyPopoverRef.value && !keyPopoverRef.value.contains(e.target as Node)) {
    showKeySettings.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onClickOutsideKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onClickOutsideKey)
})

function onSettingsSelect(value: string) {
  settingsValue.value = ''
  if (value === '__api-key__') {
    openKeySettings()
    return
  }
  router.push({ name: value })
}
</script>

<template>
  <div class="titlebar">
    <div class="titlebar-start hstack gap-xxs">
      <div class="traffic-lights hstack gap-xs me-xxs">
        <span class="light close"></span>
        <span class="light minimize"></span>
        <span class="light maximize"></span>
      </div>

      <!-- App title — always the same element, clickable when in a project -->
      <button
        class="titlebar-home hstack gap-xxs"
        :class="{ 'titlebar-home--active': currentProject, 'titlebar-home--bright': !currentProject }"
        @click="currentProject && navigateHome()"
      >
        <WPIcon :icon="wordpress" :size="24" />
        <Text variant="body" weight="semibold">WordPress Studio</Text>
      </button>

      <!-- Site switcher (project mode only) -->
      <Transition name="breadcrumb">
        <div v-if="currentProject" class="titlebar-breadcrumb hstack gap-xxs">
          <span class="titlebar-sep">/</span>
          <FlyoutMenu :groups="projectMenuGroups" surface="dark" align="start">
            <template #trigger="{ toggle }">
              <button class="site-switcher-trigger hstack gap-xxxs" @click="toggle">
                <Text variant="body" weight="semibold">{{ currentProject.name }}</Text>
                <WPIcon :icon="chevronDown" :size="14" />
              </button>
            </template>
          </FlyoutMenu>
        </div>
      </Transition>
    </div>

    <div class="titlebar-end hstack gap-xxs">
      <Button :icon="search" label="Search" shortcut="mod+k" variant="tertiary" surface="dark" @click="emit('open-search')" />
      <Dropdown
        v-model="settingsValue"
        :groups="settingsOptions"
        :trigger-icon="cog"
        :show-chevron="false"
        surface="dark"
        size="default"
        placement="below"
        tooltip="Settings"
        @update:model-value="onSettingsSelect"
      />
    </div>

    <div v-if="showKeySettings" ref="keyPopoverRef" class="key-popover" @click.stop>
      <div class="key-popover__status">
        {{ aiConfigured ? 'AI configured' : 'No API key' }}
      </div>
      <input
        v-model="keyInput"
        type="password"
        placeholder="sk-ant-..."
        class="key-popover__input"
      />
      <Button :label="keySaved ? 'Saved!' : 'Save'" variant="primary" surface="dark" width="full" @click="saveKey" />
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xxs) 0 var(--space-s);
  flex-shrink: 0;
  -webkit-app-region: drag;
}

.titlebar-start,
.titlebar-end {
  -webkit-app-region: no-drag;
  align-items: center;
}

.titlebar-start {
  flex: 1;
  min-width: 0;
}

.titlebar-end {
  flex-shrink: 0;
}

.traffic-lights {
  /* margin via .me-xxs utility */
}

.light {
  width: 12px; /* OS-native size, not on grid -- intentional */
  height: 12px;
  border-radius: 50%;
}

.light.close { background: var(--color-light-close); }
.light.minimize { background: var(--color-light-minimize); }
.light.maximize { background: var(--color-light-maximize); }

/* App title button — consistent size on both views */
.titlebar-home {
  height: 30px; /* 6 units — consistent titlebar button size */
  background: none;
  border: none;
  font-family: inherit;
  cursor: default;
  padding: 0 var(--space-xxs);
  border-radius: var(--radius-m);
  -webkit-app-region: no-drag;
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
  color: var(--color-chrome-text-muted);
}

/* Home view: bright logo + text */
.titlebar-home--bright {
  color: var(--color-chrome-text);
}

/* Project view: interactive, muted until hovered */
.titlebar-home--active {
  cursor: pointer;
}

.titlebar-home--active:hover {
  background: var(--color-chrome-hover);
}

/* Breadcrumb container for sep + site switcher */
.titlebar-breadcrumb {
  align-items: center;
}

.titlebar-sep {
  color: var(--color-chrome-text-muted);
  pointer-events: none;
  user-select: none;
  font-size: var(--font-size-m);
  line-height: 1;
}

/* Breadcrumb slide-in transition */
.breadcrumb-enter-active {
  transition: opacity var(--duration-moderate) var(--ease-default), transform var(--duration-moderate) var(--ease-default);
}

.breadcrumb-leave-active {
  transition: opacity var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

/* Site switcher */
.site-switcher-trigger {
  -webkit-app-region: no-drag;
  height: 30px; /* 6 units — matches .titlebar-home */
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  color: var(--color-chrome-text);
  border-radius: var(--radius-m);
  padding: 0 var(--space-xxs);
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
  align-items: center;
}

.site-switcher-trigger:hover {
  background: var(--color-chrome-hover);
}

.site-switcher-trigger svg {
  color: var(--color-chrome-text-muted);
  transition: color var(--duration-instant) var(--ease-default);
}

.site-switcher-trigger:hover svg {
  color: var(--color-chrome-text-secondary);
}

/* API key popover */
.key-popover {
  position: absolute;
  top: 100%;
  right: var(--space-xs); /* Physical direction for app chrome edge */
  z-index: 100;
  background: var(--color-chrome);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.key-popover__status {
  font-size: var(--font-size-s);
  color: var(--color-chrome-text-secondary);
}

.key-popover__input {
  font-size: var(--font-size-s);
  padding: var(--space-xxs) var(--space-xs);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-s);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: var(--color-chrome-input, rgba(255, 255, 255, 0.08));
  color: var(--color-chrome-text);
}

.key-popover__input::placeholder {
  color: var(--color-chrome-text-muted);
}
</style>
