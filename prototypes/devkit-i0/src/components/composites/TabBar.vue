<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { chevronDown } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
export interface Tab {
  id: string
  label: string
  messageCount?: number
}

const props = defineProps<{
  tabs: Tab[]
  activeId: string
}>()

const emit = defineEmits<{
  'update:activeId': [id: string]
}>()

const activeLabel = computed(() => {
  const tab = props.tabs.find(t => t.id === props.activeId)
  return tab?.label || 'New chat'
})

const dropdownOpen = ref(false)
const dropdownTriggerRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selectFromDropdown(id: string) {
  emit('update:activeId', id)
  dropdownOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (dropdownTriggerRef.value && !dropdownTriggerRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="tab-bar hstack min-w-0 flex-1">
    <div class="tab-bar__switcher" ref="dropdownTriggerRef">
      <button class="tab-bar__trigger hstack gap-xxxs" @click="toggleDropdown">
        <Text variant="label" color="secondary">{{ activeLabel }}</Text>
        <WPIcon :icon="chevronDown" :size="16" class="tab-bar__chevron" :class="{ open: dropdownOpen }" />
      </button>
      <Transition name="dropdown">
        <div v-if="dropdownOpen" class="tab-bar__dropdown vstack">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-bar__dropdown-item hstack gap-xxs"
            :class="{ active: tab.id === activeId }"
            @click="selectFromDropdown(tab.id)"
          >
            <span class="tab-bar__dropdown-label">{{ tab.label }}</span>
            <Text v-if="tab.messageCount" variant="caption" color="muted">{{ tab.messageCount }}</Text>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tab-bar__switcher {
  position: relative;
  flex-shrink: 0;
}

.tab-bar__trigger {
  height: 35px;
  padding: 0 var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  align-items: center;
  color: var(--color-text-secondary);
  transition: background var(--duration-instant) var(--ease-default);
}

.tab-bar__trigger:hover {
  background: var(--color-surface-secondary);
}

.tab-bar__chevron {
  color: var(--color-text-muted);
  transition: transform var(--duration-fast) var(--ease-default);
}

.tab-bar__chevron.open {
  transform: rotate(180deg);
}

.tab-bar__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  inset-inline-start: 0;
  min-width: 200px;
  max-width: 300px;
  max-height: 320px;
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: var(--space-xxxs);
}

.tab-bar__dropdown-item {
  display: flex;
  width: 100%;
  padding: var(--space-xs) var(--space-s);
  gap: var(--space-s);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
  text-align: start;
  align-items: center;
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
}

.tab-bar__dropdown-item:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.tab-bar__dropdown-item.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.tab-bar__dropdown-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--duration-instant) var(--ease-default), transform var(--duration-instant) var(--ease-default);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
