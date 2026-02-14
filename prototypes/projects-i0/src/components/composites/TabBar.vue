<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { plus, closeSmall } from '@wordpress/icons'
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

defineEmits<{
  'update:activeId': [id: string]
  'close': [id: string]
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
        <Tooltip v-for="tab in tabs" :key="tab.id" :text="tab.messageCount ? `${tab.messageCount} messages` : undefined">
          <button
            class="tab-bar__tab hstack gap-xxxs px-xs"
            :class="{ active: tab.id === activeId }"
            @click="$emit('update:activeId', tab.id)"
          >
            <Text :color="tab.id === activeId ? 'default' : 'secondary'">{{ tab.label }}</Text>
            <Button
              v-if="tab.id === activeId"
              variant="tertiary"
              size="small"
              :icon="closeSmall"
              aria-label="Close tab"
              @click.stop="$emit('close', tab.id)"
            />
          </button>
        </Tooltip>
      </div>
      <div class="tab-bar__fade-left" :class="{ visible: canScrollLeft }" />
      <div class="tab-bar__fade-right" :class="{ visible: canScrollRight }" />
    </div>
    <Button class="tab-bar__add" variant="tertiary" :icon="plus" tooltip="New chat" @click="$emit('add')" />
  </div>
</template>

<style scoped>
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
