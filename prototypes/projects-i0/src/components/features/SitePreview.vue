<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { chevronLeft, chevronRight, rotateRight, external, styles } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import BrowserBar from '@/components/primitives/BrowserBar.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import Text from '@/components/primitives/Text.vue'
import { mockSites } from '@/data/mock-sites'
import type { MockSitePage } from '@/data/mock-sites'
import { seedProjects } from '@/data/seed-projects'
import { useSiteThemes } from '@/data/themes'
import { themeToCSS } from '@/data/themes/theme-utils'

const props = defineProps<{
  projectId?: string | null
}>()

const { getTheme, themeHasDarkMode: checkDarkMode } = useSiteThemes()

const project = computed(() =>
  seedProjects.find((p) => p.id === props.projectId)
)

// Navigation state
const currentPage = ref('homepage')
const history = ref<string[]>(['homepage'])
const historyIndex = ref(0)

// Color mode state
const colorMode = ref<'light' | 'dark'>('light')

const canGoBack = computed(() => historyIndex.value > 0)
const canGoForward = computed(() => historyIndex.value < history.value.length - 1)

function navigateTo(page: string) {
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(page)
  historyIndex.value = history.value.length - 1
  currentPage.value = page
}

function goBack() {
  if (!canGoBack.value) return
  historyIndex.value--
  currentPage.value = history.value[historyIndex.value]
}

function goForward() {
  if (!canGoForward.value) return
  historyIndex.value++
  currentPage.value = history.value[historyIndex.value]
}

function reload() {
  const page = currentPage.value
  currentPage.value = ''
  requestAnimationFrame(() => { currentPage.value = page })
}

// Reset on project change
watch(() => props.projectId, () => {
  const theme = props.projectId ? getTheme(props.projectId) : undefined
  colorMode.value = theme?.settings.color.defaultMode ?? 'light'
  currentPage.value = 'homepage'
  history.value = ['homepage']
  historyIndex.value = 0
})

// Listen for postMessage navigation from iframe
function handleMessage(event: MessageEvent) {
  if (event.data?.type === 'navigate' && typeof event.data.page === 'string') {
    navigateTo(event.data.page)
  }
}

onMounted(() => window.addEventListener('message', handleMessage))
onUnmounted(() => window.removeEventListener('message', handleMessage))

function openInBrowser() {
  if (url.value) window.open(url.value, '_blank')
}

const url = computed(() => {
  const base = project.value?.url ?? ''
  if (!base || currentPage.value === 'homepage') return base
  return `${base}/${currentPage.value}`
})

const site = computed(() => props.projectId ? mockSites[props.projectId] : undefined)

const pages = computed(() => site.value?.pages ?? {})

const currentThemeCSS = computed(() => {
  if (!props.projectId) return ''
  const theme = getTheme(props.projectId)
  if (!theme) return ''
  return themeToCSS(theme, colorMode.value)
})

const srcdoc = computed(() => {
  if (!site.value) return undefined
  const css = currentThemeCSS.value
  if (currentPage.value === 'homepage') return site.value.homepage(css)
  return site.value.pages[currentPage.value]?.html(css) ?? site.value.homepage(css)
})

const hasDarkMode = computed(() => {
  if (!props.projectId) return false
  return checkDarkMode(props.projectId)
})

function toggleColorMode() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="site-preview vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <Button variant="tertiary" :icon="chevronLeft" :disabled="!canGoBack" @click="goBack" />
        <Button variant="tertiary" :icon="chevronRight" :disabled="!canGoForward" @click="goForward" />
        <Button variant="tertiary" :icon="rotateRight" @click="reload" />
      </template>
      <template #center>
        <BrowserBar
          :url="url"
          :pages="pages"
          :current-page="currentPage"
          class="flex-1"
          @navigate="navigateTo"
        />
      </template>
      <template #end>
        <Button
          variant="tertiary"
          :icon="styles"
          :disabled="!hasDarkMode"
          @click="toggleColorMode"
        />
        <Button variant="tertiary" :icon="external" @click="openInBrowser" />
      </template>
    </PanelToolbar>
    <div class="preview-frame flex-1 overflow-auto">
      <div class="preview-viewport-container">
        <iframe
          v-if="srcdoc"
          :srcdoc="srcdoc"
          class="preview-iframe"
        />
        <div v-else class="preview-placeholder vstack align-center justify-center flex-1">
          <Text variant="body" color="muted">No preview available</Text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-frame {
  background: var(--color-surface-secondary);
  min-height: 0;
}

.preview-viewport-container {
  height: 100%;
  background: var(--color-surface);
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.preview-placeholder {
  height: 100%;
  gap: var(--space-xxxs);
}
</style>
