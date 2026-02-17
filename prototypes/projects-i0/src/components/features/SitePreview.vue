<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { chevronLeft, chevronRight, rotateRight, external, styles } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import BrowserBar from '@/components/primitives/BrowserBar.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import Text from '@/components/primitives/Text.vue'
import { renderSite, sendPageUpdate } from '@/data/site-renderer'
import { useSiteStore } from '@/data/useSiteStore'

const props = defineProps<{
  projectId?: string | null
}>()

const siteStore = useSiteStore()

// Navigation state
const currentPage = ref('/')
const history = ref<string[]>(['/'])
const historyIndex = ref(0)

// Color mode state (persisted per project)
function storedColorMode(): 'light' | 'dark' {
  if (!props.projectId) return 'light'
  const stored = localStorage.getItem(`site-preview-mode:${props.projectId}`)
  if (stored === 'dark' || stored === 'light') return stored
  return 'light'
}
const colorMode = ref<'light' | 'dark'>(storedColorMode())

watch(colorMode, (mode) => {
  if (props.projectId) {
    localStorage.setItem(`site-preview-mode:${props.projectId}`, mode)
  }
})

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
  currentPage.value = history.value[historyIndex.value] ?? '/'
}

function goForward() {
  if (!canGoForward.value) return
  historyIndex.value++
  currentPage.value = history.value[historyIndex.value] ?? '/'
}

function reload() {
  if (!site.value) return
  iframeReady.value = false
  srcdoc.value = renderSite(site.value, currentPage.value)
}

// Reset on project change
watch(() => props.projectId, () => {
  colorMode.value = storedColorMode()
  currentPage.value = '/'
  history.value = ['/']
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

// Get the current site from the store
const site = computed(() => props.projectId ? siteStore.getSite(props.projectId) : undefined)

// Compute the browser URL
const url = computed(() => {
  if (!props.projectId) return ''
  const baseUrl = `https://${props.projectId}.example.com`
  if (currentPage.value === '/') return baseUrl
  return `${baseUrl}${currentPage.value}`
})

// Compute available pages from the site
const pages = computed(() => {
  if (!site.value) return {}
  const result: Record<string, { label: string }> = {}
  for (const page of site.value.pages) {
    const pageKey = (page.slug === '/' || page.slug === '') ? 'homepage' : page.slug.replace(/^\//, '')
    result[pageKey] = { label: page.title }
  }
  return result
})

// Check if theme has dark mode (simplified - just check if theme has dark mode variables)
const hasDarkMode = computed(() => {
  if (!site.value) return false
  const themeVars = site.value.theme.variables
  return Object.keys(themeVars).some(key => key.includes('dark') || key.includes('night'))
})

// Iframe ref for postMessage communication
const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeReady = ref(false)

// srcdoc only updates on initial load or project change (not page navigation)
const srcdoc = ref<string | undefined>(undefined)

// Full srcdoc reload when project changes
watch(() => props.projectId, () => {
  iframeReady.value = false
  if (!site.value) {
    srcdoc.value = undefined
    return
  }
  srcdoc.value = renderSite(site.value, currentPage.value)
}, { immediate: true })

// When site content mutates (e.g. sections added during generation),
// update in-place via postMessage to avoid font flash. Falls back to
// srcdoc if the iframe isn't ready yet.
watch(site, () => {
  if (!site.value) return
  if (iframeRef.value && iframeReady.value) {
    sendPageUpdate(iframeRef.value, site.value, currentPage.value)
  } else {
    srcdoc.value = renderSite(site.value, currentPage.value)
  }
}, { deep: true })

// When the iframe loads, mark it ready for postMessage
function onIframeLoad() {
  iframeReady.value = true
}

// On page navigation (within the same site), swap via postMessage
watch(currentPage, (newPage, oldPage) => {
  if (!site.value || !iframeRef.value || !iframeReady.value) {
    // Iframe not ready — fall back to full srcdoc render
    if (site.value) srcdoc.value = renderSite(site.value, newPage)
    return
  }
  // Send page-update via postMessage (no document reload, fonts stay loaded)
  const sent = sendPageUpdate(iframeRef.value, site.value, newPage)
  if (!sent) {
    // Page not found — fall back to srcdoc for error display
    srcdoc.value = renderSite(site.value, newPage)
  }
})

function toggleColorMode() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
  // TODO: Send theme update via postMessage when we support color mode switching
}
</script>

<template>
  <div class="site-preview vstack flex-1 overflow-hidden">
    <PanelToolbar>
      <template #start>
        <Button variant="tertiary" :icon="chevronLeft" :disabled="!canGoBack" tooltip="Back" @click="goBack" />
        <Button variant="tertiary" :icon="chevronRight" :disabled="!canGoForward" tooltip="Forward" @click="goForward" />
        <Button variant="tertiary" :icon="rotateRight" tooltip="Reload" @click="reload" />
      </template>
      <template #center>
        <BrowserBar
          :url="url"
          :pages="pages"
          :current-page="currentPage === '/' ? 'homepage' : currentPage.replace(/^\//, '')"
          class="flex-1"
          @navigate="(page) => navigateTo(page === 'homepage' ? '/' : `/${page}`)"
        />
      </template>
      <template #end>
        <Button
          variant="tertiary"
          :icon="styles"
          :disabled="!hasDarkMode"
          :active="colorMode === 'dark'"
          :active-rotate="true"
          :tooltip="hasDarkMode ? (colorMode === 'light' ? 'Dark mode' : 'Light mode') : undefined"
          @click="toggleColorMode"
        />
        <Button variant="tertiary" :icon="external" tooltip="Open in browser" @click="openInBrowser" />
      </template>
    </PanelToolbar>
    <div class="preview-frame flex-1 overflow-auto">
      <div class="preview-viewport-container">
        <iframe
          v-if="srcdoc != null"
          ref="iframeRef"
          :srcdoc="srcdoc"
          sandbox="allow-scripts"
          class="preview-iframe"
          @load="onIframeLoad"
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