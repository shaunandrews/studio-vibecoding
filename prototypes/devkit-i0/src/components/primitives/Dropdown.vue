<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { chevronDown } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'
import Text from '@/components/primitives/Text.vue'
import Tooltip from '@/components/primitives/Tooltip.vue'

export interface DropdownOption {
  value: string
  label: string
  icon?: any
}

export interface DropdownGroup {
  label: string
  options: (string | DropdownOption)[]
}

const props = withDefaults(defineProps<{
  modelValue: string
  groups: DropdownGroup[]
  placement?: 'above' | 'below'
  triggerIcon?: any
  showChevron?: boolean
  surface?: 'light' | 'dark'
  tooltip?: string
}>(), {
  showChevron: true,
  surface: 'light',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function normalize(opt: string | DropdownOption): DropdownOption {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt
}

function currentOption(): DropdownOption | undefined {
  for (const g of props.groups) {
    for (const o of g.options) {
      const n = normalize(o)
      if (n.value === props.modelValue) return n
    }
  }
}

const EDGE_PADDING = 8
const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const menuStyle = ref<Record<string, string>>({})
const resolvedPlacement = ref<'above' | 'below'>('below')

function toggle() {
  open.value = !open.value
}

function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}

function positionMenu() {
  const trigger = triggerRef.value
  const menu = menuRef.value
  if (!trigger || !menu) return

  const triggerRect = trigger.getBoundingClientRect()
  const menuRect = menu.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  const gap = 4 // matches --space-xxxs roughly
  const spaceBelow = vh - triggerRect.bottom - gap
  const spaceAbove = triggerRect.top - gap

  // Vertical: prefer props.placement, flip if not enough room
  let placeAbove = props.placement === 'above'
  if (!props.placement) {
    placeAbove = spaceBelow < menuRect.height && spaceAbove > spaceBelow
  } else if (placeAbove && spaceAbove < menuRect.height && spaceBelow > spaceAbove) {
    placeAbove = false
  } else if (!placeAbove && spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
    placeAbove = true
  }

  resolvedPlacement.value = placeAbove ? 'above' : 'below'

  // Fixed positioning relative to viewport (teleported to body)
  const style: Record<string, string> = {
    position: 'fixed',
  }

  // Vertical position
  if (placeAbove) {
    const bottom = vh - triggerRect.top + gap
    const availableHeight = triggerRect.top - gap - EDGE_PADDING
    if (menuRect.height > availableHeight) {
      style.maxHeight = `${availableHeight}px`
      style.overflowY = 'auto'
    }
    style.bottom = `${bottom}px`
    style.top = 'auto'
  } else {
    const top = triggerRect.bottom + gap
    const availableHeight = vh - triggerRect.bottom - gap - EDGE_PADDING
    if (menuRect.height > availableHeight) {
      style.maxHeight = `${availableHeight}px`
      style.overflowY = 'auto'
    }
    style.top = `${top}px`
    style.bottom = 'auto'
  }

  // Horizontal: align left edge to trigger, shift if overflowing
  let left = triggerRect.left
  const menuRight = left + menuRect.width

  if (menuRight > vw - EDGE_PADDING) {
    // Try right-aligning to trigger's right edge
    const rightAligned = triggerRect.right - menuRect.width
    if (rightAligned >= EDGE_PADDING) {
      left = rightAligned
    } else {
      // Pin to right edge of viewport
      left = vw - EDGE_PADDING - menuRect.width
    }
  }
  if (left < EDGE_PADDING) {
    left = EDGE_PADDING
  }

  style.left = `${left}px`

  menuStyle.value = style
}

watch(open, (val) => {
  if (val) {
    nextTick(() => {
      positionMenu()
      // Re-measure after maxHeight constraints might change layout
      nextTick(positionMenu)
    })
  } else {
    menuStyle.value = {}
  }
})

function onScrollOrResize() {
  if (open.value) positionMenu()
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (!triggerRef.value?.contains(target) && !menuRef.value?.contains(target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})
</script>

<template>
  <div class="dropdown" :class="{ 'surface-dark': surface === 'dark' }" ref="triggerRef">
    <Tooltip :text="open ? undefined : tooltip">
      <button class="dropdown-trigger hstack gap-xxxs px-xxs py-xxxs" @click="toggle">
        <WPIcon v-if="triggerIcon" :icon="currentOption()?.icon || triggerIcon" :size="18" />
        <span v-else class="dropdown-label">{{ currentOption()?.label || modelValue }}</span>
        <WPIcon v-if="showChevron" :icon="chevronDown" :size="16" />
      </button>
    </Tooltip>
    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="open"
          ref="menuRef"
          class="dropdown-menu vstack"
          :class="[
            resolvedPlacement === 'below' ? 'dropdown-menu--below' : 'dropdown-menu--above',
            { 'dropdown-menu--dark': surface === 'dark' },
          ]"
          :style="menuStyle"
        >
          <div v-for="group in groups" :key="group.label" class="dropdown-group">
            <Text variant="label" color="muted" class="dropdown-group-label p-xs">{{ group.label }}</Text>
            <button
              v-for="option in group.options"
              :key="normalize(option).value"
              class="dropdown-option hstack gap-xxs p-xs"
              :class="{ active: normalize(option).value === modelValue }"
              @click="select(normalize(option).value)"
            >
              <WPIcon v-if="normalize(option).icon" :icon="normalize(option).icon" :size="18" />
              <span>{{ normalize(option).label }}</span>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-trigger {
  background: none;
  border: none;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
}

.dropdown-trigger:hover {
  background: var(--color-surface);
  color: var(--color-text-secondary);
}

/* Dark surface trigger */
.dropdown.surface-dark .dropdown-trigger {
  color: var(--color-chrome-text-muted);
}

.dropdown.surface-dark .dropdown-trigger:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}
</style>

<!-- Teleported menu styles (unscoped so they apply at body level) -->
<style>
.dropdown-menu {
  width: max-content;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.dropdown-group + .dropdown-group {
  border-block-start: 1px solid var(--color-surface-border);
  margin-block-start: var(--space-xxxs);
  padding-block-start: var(--space-xxxs);
}

.dropdown-group-label {
  display: block;
}

.dropdown-option {
  display: block;
  width: 100%;
  text-align: start;
  background: none;
  border: none;
  font-family: inherit;
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
}

.dropdown-option:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.dropdown-option.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--duration-instant) var(--ease-default), transform var(--duration-instant) var(--ease-default);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.dropdown-menu--above.dropdown-enter-from,
.dropdown-menu--above.dropdown-leave-to {
  transform: translateY(-4px);
}

/* Dark surface variant */
.dropdown-menu--dark {
  background: var(--color-chrome);
  border-color: var(--color-chrome-subtle);
}

.dropdown-menu--dark .dropdown-group + .dropdown-group {
  border-color: var(--color-chrome-border);
}

.dropdown-menu--dark .dropdown-group-label {
  color: var(--color-chrome-text-muted);
}

.dropdown-menu--dark .dropdown-option {
  color: var(--color-chrome-text);
}

.dropdown-menu--dark .dropdown-option:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.dropdown-menu--dark .dropdown-option.active {
  color: var(--color-primary);
}
</style>
