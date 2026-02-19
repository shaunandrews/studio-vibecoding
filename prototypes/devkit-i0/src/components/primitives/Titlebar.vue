<script setup lang="ts">
import {
  cog, chevronDown, chevronLeft, search,
} from '@wordpress/icons'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
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

// ── Site switcher (custom lightweight dropdown) ──
const siteSwitcherOpen = ref(false)
const siteSwitcherRef = ref<HTMLElement | null>(null)
const siteSwitcherMenuRef = ref<HTMLElement | null>(null)
const siteSwitcherMenuStyle = ref<Record<string, string>>({})

function toggleSiteSwitcher() {
  siteSwitcherOpen.value = !siteSwitcherOpen.value
  if (siteSwitcherOpen.value) {
    nextTick(positionSiteSwitcherMenu)
  }
}

function positionSiteSwitcherMenu() {
  const trigger = siteSwitcherRef.value
  const menu = siteSwitcherMenuRef.value
  if (!trigger || !menu) return

  const rect = trigger.getBoundingClientRect()
  const menuRect = menu.getBoundingClientRect()
  const vw = window.innerWidth

  let left = rect.left
  if (left + menuRect.width > vw - 8) {
    left = rect.right - menuRect.width
  }
  if (left < 8) left = 8

  siteSwitcherMenuStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${left}px`,
  }
}

function onSiteSelect(projectId: string) {
  siteSwitcherOpen.value = false
  router.push({ name: 'project', params: { id: projectId } })
}

function onClickOutsideSiteSwitcher(e: MouseEvent) {
  const target = e.target as Node
  if (!siteSwitcherRef.value?.contains(target) && !siteSwitcherMenuRef.value?.contains(target)) {
    siteSwitcherOpen.value = false
  }
}

// ── Settings dropdown ──
const settingsValue = ref('')

const settingsOptions = [
  { label: 'Settings', options: [
    { label: 'API Key', value: '__api-key__' },
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
  document.addEventListener('click', onClickOutsideSiteSwitcher)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onClickOutsideKey)
  document.removeEventListener('click', onClickOutsideSiteSwitcher)
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

      <!-- Site mode: back nav + site switcher -->
      <template v-if="currentProject">
        <button class="titlebar-back hstack gap-xxxs" @click="navigateHome()">
          <WPIcon :icon="chevronLeft" :size="16" />
          <Text variant="body" color="secondary">Sites</Text>
        </button>
        <span class="titlebar-sep">/</span>
        <div ref="siteSwitcherRef" class="site-switcher">
          <button class="site-switcher-trigger hstack gap-xxxs" @click="toggleSiteSwitcher">
            <Text variant="body" color="secondary" weight="semibold">{{ currentProject.name }}</Text>
            <WPIcon :icon="chevronDown" :size="14" />
          </button>
        </div>
        <Teleport to="body">
          <Transition name="dropdown">
            <div
              v-if="siteSwitcherOpen"
              ref="siteSwitcherMenuRef"
              class="dropdown-menu dropdown-menu--dark vstack"
              :style="siteSwitcherMenuStyle"
            >
              <div class="dropdown-group">
                <Text variant="label" color="muted" class="dropdown-group-label p-xs">Sites</Text>
                <button
                  v-for="project in projects"
                  :key="project.id"
                  class="dropdown-option hstack gap-xxs p-xs"
                  :class="{ active: project.id === currentProject.id }"
                  @click="onSiteSelect(project.id)"
                >
                  <span>{{ project.name }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </Teleport>
      </template>

      <!-- Home mode: static title -->
      <Text v-else variant="body" color="secondary" weight="semibold" tag="h1" class="titlebar-title">WordPress Studio</Text>
    </div>

    <div class="titlebar-end hstack gap-xxs">
      <button class="search-bar" @click="emit('open-search')">
        <WPIcon :icon="search" :size="14" />
        <span class="search-placeholder">Search…</span>
        <kbd class="search-shortcut">⌘K</kbd>
      </button>
      <Dropdown
        v-model="settingsValue"
        :groups="settingsOptions"
        :trigger-icon="cog"
        :show-chevron="false"
        surface="dark"
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
      <Button :label="keySaved ? 'Saved!' : 'Save'" variant="primary" surface="dark" size="small" width="full" @click="saveKey" />
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xs) 0 var(--space-s);
  flex-shrink: 0;
  -webkit-app-region: drag;
  border-bottom: 1px solid var(--color-chrome-border);
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

/* Static title (home view) — non-interactive */
.titlebar-title {
  pointer-events: none;
}

/* Back button ("◁ Sites") */
.titlebar-back {
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  -webkit-app-region: no-drag;
  transition: background var(--duration-instant) var(--ease-default);
  align-items: center;
  color: var(--color-chrome-text-secondary);
}

.titlebar-back:hover {
  background: var(--color-chrome-hover);
}

.titlebar-back svg {
  color: var(--color-chrome-text-muted);
  transition: color var(--duration-instant) var(--ease-default);
}

.titlebar-back:hover svg {
  color: var(--color-chrome-text-secondary);
}

.titlebar-sep {
  color: var(--color-chrome-text-muted);
  pointer-events: none;
  user-select: none;
  font-size: var(--font-size-m);
  line-height: 1;
}

/* Site switcher */
.site-switcher {
  position: relative;
  -webkit-app-region: no-drag;
}

.site-switcher-trigger {
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  color: var(--color-chrome-text-secondary);
  border-radius: var(--radius-s);
  padding: var(--space-xxxs) var(--space-xxs);
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
  align-items: center;
}

.site-switcher-trigger:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.site-switcher-trigger svg {
  color: var(--color-chrome-text-muted);
  transition: color var(--duration-instant) var(--ease-default);
}

.site-switcher-trigger:hover svg {
  color: var(--color-chrome-text-secondary);
}

/* Search bar button */
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-s);
  padding: var(--space-xxxs) var(--space-xs);
  height: 25px; /* fits in 35px titlebar */
  width: 200px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  transition: background var(--duration-instant) var(--ease-default), border-color var(--duration-instant) var(--ease-default);
}

.search-bar:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.search-bar svg {
  color: var(--color-chrome-text-muted);
  flex-shrink: 0;
}

.search-placeholder {
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-chrome-text-muted);
  flex: 1;
  text-align: start;
}

.search-shortcut {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-chrome-text-faint);
  background: rgba(255, 255, 255, 0.06);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  line-height: 1.3;
  flex-shrink: 0;
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
