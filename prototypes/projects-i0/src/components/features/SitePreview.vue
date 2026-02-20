<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { chevronLeft, chevronRight, rotateRight, external, styles } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import BrowserBar from '@/components/primitives/BrowserBar.vue'
import PanelToolbar from '@/components/composites/PanelToolbar.vue'
import Text from '@/components/primitives/Text.vue'
import { renderSite, sendPageUpdate, sendSectionUpdate, sendThemeUpdate } from '@/data/site-renderer'
import { useSiteStore } from '@/data/useSiteStore'
import { usePreviewState } from '@/data/usePreviewState'

const props = defineProps<{
  projectId?: string | null
}>()

const siteStore = useSiteStore()
const { navTarget } = usePreviewState()

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
  srcdoc.value = renderSite(site.value, currentPage.value, colorMode.value)
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

// Check if theme has dark mode variables
const hasDarkMode = computed(() => {
  if (!site.value) return false
  return !!site.value.theme.darkVariables
})

// Iframe ref for postMessage communication
const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeReady = ref(false)

// srcdoc only updates on initial load or project change (not page navigation)
const srcdoc = ref<string | undefined>(undefined)

// Track which sections have been rendered into the iframe (for diff-based updates)
const renderedSections = ref(new Set<string>())

// Full srcdoc reload when project changes — loads theme/fonts/shell
watch(() => props.projectId, () => {
  iframeReady.value = false
  renderedSections.value = new Set()
  if (!site.value) {
    srcdoc.value = undefined
    return
  }
  srcdoc.value = renderSite(site.value, currentPage.value, colorMode.value)
}, { immediate: true })

// Diff-based section rendering: on site mutation, compare against rendered
// set and send individual section updates. New sections fade in via the
// iframe listener; existing sections update in place.
watch(site, () => {
  if (!site.value) return
  if (!iframeRef.value || !iframeReady.value) {
    srcdoc.value = renderSite(site.value, currentPage.value, colorMode.value)
    return
  }

  // Find the current page's section list
  const normalizedSlug = currentPage.value === '/' ? '' : currentPage.value.replace(/^\//, '')
  const page = site.value.pages.find(p => {
    const pSlug = p.slug === '/' ? '' : p.slug.replace(/^\//, '')
    return pSlug === normalizedSlug
  })
  if (!page) return

  for (let i = 0; i < page.sections.length; i++) {
    const sectionId = page.sections[i]!
    const section = site.value.sections[sectionId]
    if (!section) continue

    // Send update whether new or existing — the iframe listener
    // creates-with-fade-in if missing, updates-in-place if present.
    // Pass order index so sections insert in the right position
    // even when they arrive out of order (parallel generation).
    sendSectionUpdate(iframeRef.value!, sectionId, section.html, section.css, i)
    renderedSections.value.add(sectionId)
  }
}, { deep: true })

// Push theme variable changes to the iframe live (triggered by AI apply actions)
watch(
  () => {
    if (!site.value) return undefined
    // Return a shallow copy so Vue detects changes to individual vars
    return { ...site.value.theme.variables }
  },
  (newVars) => {
    if (!newVars || !iframeRef.value || !iframeReady.value) return
    // Only push light mode changes when in light mode
    if (colorMode.value !== 'dark') {
      sendThemeUpdate(iframeRef.value, newVars)
    }
  },
)

// Push dark mode variable changes when in dark mode
watch(
  () => {
    if (!site.value?.theme.darkVariables) return undefined
    return { ...site.value.theme.darkVariables }
  },
  (newDarkVars) => {
    if (!newDarkVars || !iframeRef.value || !iframeReady.value) return
    // Only push dark mode changes when in dark mode
    if (colorMode.value === 'dark') {
      sendThemeUpdate(iframeRef.value, newDarkVars)
    }
  },
)

// When the iframe loads, mark it ready for postMessage
function onIframeLoad() {
  iframeReady.value = true
}

// On page navigation (within the same site), swap via postMessage
watch(currentPage, (newPage) => {
  // Reset rendered set — the new page has different sections
  renderedSections.value = new Set()

  if (!site.value || !iframeRef.value || !iframeReady.value) {
    if (site.value) srcdoc.value = renderSite(site.value, newPage, colorMode.value)
    return
  }
  const sent = sendPageUpdate(iframeRef.value, site.value, newPage)
  if (!sent) {
    srcdoc.value = renderSite(site.value, newPage, colorMode.value)
  }
})

// External navigation requests (e.g. buildPage navigating to new page)
watch(
  () => props.projectId ? navTarget.value[props.projectId] : undefined,
  (slug) => {
    if (slug && props.projectId) {
      navigateTo(slug)
      // Clear the request
      const { [props.projectId]: _, ...rest } = navTarget.value
      navTarget.value = rest
    }
  },
)

function applyColorMode(mode: 'light' | 'dark') {
  if (!site.value || !iframeRef.value || !iframeReady.value) return
  const vars = mode === 'dark' && site.value.theme.darkVariables
    ? site.value.theme.darkVariables
    : site.value.theme.variables
  sendThemeUpdate(iframeRef.value, { ...vars })
}

function toggleColorMode() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
  applyColorMode(colorMode.value)
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