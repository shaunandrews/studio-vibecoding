<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { plus, closeSmall, chevronDown } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import Tooltip from '@/components/primitives/Tooltip.vue'
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
  'close': [id: string]
  'add': []
}>()

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

const scrollRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = scrollRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 1
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

let ro: ResizeObserver | null = null

onMounted(() => {
  updateScrollState()
  ro = new ResizeObserver(updateScrollState)
  if (scrollRef.value) ro.observe(scrollRef.value)
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  document.removeEventListener('click', onClickOutside)
})

watch(() => props.tabs.length, () => {
  nextTick(updateScrollState)
})

const FADE_WIDTH = 28

watch(() => props.activeId, () => {
  nextTick(() => {
    const container = scrollRef.value
    if (!container) return
    const btn = container.querySelector('.tab-bar__tab.active') as HTMLElement | null
    if (!btn) return
    const cRect = container.getBoundingClientRect()
    const bRect = btn.getBoundingClientRect()
    // Scroll left if tab is hidden behind the left fade
    if (bRect.left < cRect.left + FADE_WIDTH) {
      container.scrollTo({ left: container.scrollLeft - (cRect.left + FADE_WIDTH - bRect.left), behavior: 'smooth' })
    // Scroll right if tab is hidden behind the right fade
    } else if (bRect.right > cRect.right - FADE_WIDTH) {
      container.scrollTo({ left: container.scrollLeft + (bRect.right - cRect.right + FADE_WIDTH), behavior: 'smooth' })
    }
  })
})
</script>

<template>
  <div class="tab-bar hstack min-w-0 flex-1">
    <div class="tab-bar__count" ref="dropdownTriggerRef">
      <button class="tab-bar__count-btn hstack gap-xxxs" @click="toggleDropdown">
        <Text variant="label" color="secondary">{{ tabs.length }} {{ tabs.length === 1 ? 'Chat' : 'Chats' }}</Text>
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
    <div class="tab-bar__scroll-wrapper">
      <div
        ref="scrollRef"
        class="tab-bar__scroll hstack gap-xxxs"
        @scroll="updateScrollState"
      >
        <Tooltip v-for="tab in tabs" :key="tab.id" :text="tab.messageCount ? `${tab.messageCount} messages` : undefined">
          <button
            class="tab-bar__tab hstack gap-xxxs px-xs"
            :class="{ active: tab.id === activeId }"
            @click="emit('update:activeId', tab.id)"
          >
            <Text :color="tab.id === activeId ? 'default' : 'secondary'">{{ tab.label }}</Text>
            <Button
              v-if="tab.id === activeId"
              variant="tertiary"
              size="small"
              :icon="closeSmall"
              aria-label="Close tab"
              @click.stop="emit('close', tab.id)"
            />
          </button>
        </Tooltip>
      </div>
      <div class="tab-bar__fade-left" :class="{ visible: canScrollLeft }" />
      <div class="tab-bar__fade-right" :class="{ visible: canScrollRight }" />
    </div>
    <Button class="tab-bar__add" variant="tertiary" :icon="plus" tooltip="New chat" @click="emit('add')" />
  </div>
</template>

<style scoped>
.tab-bar__count {
  position: relative;
  flex-shrink: 0;
  margin-inline-end: var(--space-xxs);
}

.tab-bar__count-btn {
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

.tab-bar__count-btn:hover {
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

.tab-bar__scroll-wrapper {
  position: relative;
  overflow: clip;
  overflow-clip-margin: 3px; /* room for focus ring */
  min-width: 0;
  flex: 0 1 auto;
}

.tab-bar__add {
  flex-shrink: 0;
  margin-inline-start: var(--space-xxs);
}

.tab-bar__scroll {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-bar__scroll::-webkit-scrollbar {
  display: none;
}

.tab-bar__fade-left,
.tab-bar__fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.tab-bar__fade-left.visible,
.tab-bar__fade-right.visible {
  opacity: 1;
}

.tab-bar__fade-left {
  left: 0;
  background: linear-gradient(to right, var(--color-surface), transparent);
}

.tab-bar__fade-right {
  right: 0;
  background: linear-gradient(to left, var(--color-surface), transparent);
}

.tab-bar__tab {
  height: 35px;
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background var(--duration-instant) var(--ease-default);
  align-items: center;
}

.tab-bar__tab:hover {
  background: var(--color-surface-secondary);
}

.tab-bar__tab.active {
  background: var(--color-surface-secondary);
  padding-right: var(--space-xxxs);
}
</style>
