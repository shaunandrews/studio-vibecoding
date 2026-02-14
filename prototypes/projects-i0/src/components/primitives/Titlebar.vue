<script setup lang="ts">
import { cog, help } from '@wordpress/icons'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
import Text from '@/components/primitives/Text.vue'
import { useProjects } from '@/data/useProjects'
import { isAIConfigured, getAPIKey, setAPIKey } from '@/data/ai-service'

const router = useRouter()
const route = useRoute()
const { projects } = useProjects()

const title = computed(() => {
  const projectId = route.params.id as string | undefined
  if (projectId) {
    const project = projects.value.find(p => p.id === projectId)
    if (project) return `WordPress Studio • ${project.name}`
  }
  return 'WordPress Studio'
})
watch(title, (t) => { document.title = t }, { immediate: true })

const settingsValue = ref('')

const settingsOptions = [
  { label: 'Settings', options: [
    { label: 'API Key', value: '__api-key__' },
  ]},
  { label: 'Dev Pages', options: [
    { label: 'Components', value: 'components' },
    { label: 'Design System', value: 'design-system' },
    { label: 'Architecture', value: 'architecture' },
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

onMounted(() => document.addEventListener('pointerdown', onClickOutsideKey))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onClickOutsideKey))

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
    </div>
    <div class="titlebar-center hstack">
      <Text variant="body" color="secondary" weight="medium" tag="h1">{{ title }}</Text>
    </div>
    <div class="titlebar-end hstack gap-xxs">
      <Dropdown
        v-model="settingsValue"
        :groups="settingsOptions"
        :trigger-icon="cog"
        :show-chevron="false"
        surface="dark"
        placement="below"
        @update:model-value="onSettingsSelect"
      />
      <Button variant="tertiary" surface="dark" :icon="help" size="small" tooltip="Help" />
    </div>
    <div v-if="showKeySettings" ref="keyPopoverRef" class="key-popover" @click.stop>
      <div class="key-popover__status">
        {{ aiConfigured ? '✅ AI configured' : '⚠️ No API key' }}
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

.titlebar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

/* app title styled via Text component */

.titlebar-start,
.titlebar-end {
  -webkit-app-region: no-drag;
}

.traffic-lights {
  /* margin via .me-xxs utility */
}

.light {
  width: 12px; /* OS-native size, not on grid — intentional */
  height: 12px;
  border-radius: 50%;
}

.light.close { background: var(--color-light-close); }
.light.minimize { background: var(--color-light-minimize); }
.light.maximize { background: var(--color-light-maximize); }

.key-popover {
  position: absolute;
  top: 100%;
  right: var(--space-xs);
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
