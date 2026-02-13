<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { plus } from '@wordpress/icons'
import Text from '@/components/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'
import type { Agent, AgentId } from '@/data/types'

const props = defineProps<{
  tabs: Agent[]
  activeId: AgentId
}>()

defineEmits<{
  'update:activeId': [id: AgentId]
  'close': [id: AgentId]
  'add': []
}>()

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
})

onBeforeUnmount(() => {
  ro?.disconnect()
})

watch(() => props.tabs.length, () => {
  nextTick(updateScrollState)
})
</script>

<template>
  <div class="tab-bar hstack min-w-0 flex-1">
    <div class="tab-bar__scroll-wrapper">
      <div
        ref="scrollRef"
        class="tab-bar__scroll hstack gap-xxxs"
        @scroll="updateScrollState"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-bar__tab hstack gap-xxxs px-xs py-xxxs"
          :class="{ active: tab.id === activeId }"
          @click="$emit('update:activeId', tab.id)"
        >
          <Text variant="caption" :color="tab.id === activeId ? 'default' : 'secondary'">{{ tab.label }}</Text>
          <button
            v-if="tab.id === activeId"
            class="tab-bar__close"
            @click.stop="$emit('close', tab.id)"
            aria-label="Close tab"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </button>
      </div>
      <div class="tab-bar__fade-left" :class="{ visible: canScrollLeft }" />
      <div class="tab-bar__fade-right" :class="{ visible: canScrollRight }" />
    </div>
    <Button variant="tertiary" size="small" :icon="plus" @click="$emit('add')" />
  </div>
</template>

<style scoped>
.tab-bar__scroll-wrapper {
  position: relative;
  overflow: clip;
  overflow-clip-margin: 3px; /* room for focus ring */
  min-width: 0;
  flex: 1;
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
}

.tab-bar__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: var(--space-xxxs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-default),
              background var(--duration-fast) var(--ease-default);
}

.tab-bar__close:hover {
  color: var(--color-text);
  background: rgba(0, 0, 0, 0.08);
}
</style>
