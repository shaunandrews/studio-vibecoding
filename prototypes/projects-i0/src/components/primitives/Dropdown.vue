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

  const style: Record<string, string> = {}

  // Vertical position
  if (placeAbove) {
    let bottom = triggerRect.height + gap
    // Constrain: menu top shouldn't go above viewport
    const menuTop = triggerRect.top - gap - menuRect.height
    if (menuTop < EDGE_PADDING) {
      style.maxHeight = `${triggerRect.top - gap - EDGE_PADDING}px`
      style.overflowY = 'auto'
      bottom = triggerRect.height + gap
    }
    style.bottom = `${bottom}px`
    style.top = 'auto'
  } else {
    let top = triggerRect.height + gap
    // Constrain: menu bottom shouldn't go below viewport
    const menuBottom = triggerRect.bottom + gap + menuRect.height
    if (menuBottom > vh - EDGE_PADDING) {
      style.maxHeight = `${vh - triggerRect.bottom - gap - EDGE_PADDING}px`
      style.overflowY = 'auto'
    }
    style.top = `${top}px`
    style.bottom = 'auto'
  }

  // Horizontal: start aligned left, shift if overflowing right, or flip to right-align
  let left = 0
  const menuLeft = triggerRect.left + left
  const menuRight = menuLeft + menuRect.width

  if (menuRight > vw - EDGE_PADDING) {
    // Try right-aligning to trigger
    const rightAlignLeft = triggerRect.width - menuRect.width
    const absLeft = triggerRect.left + rightAlignLeft
    if (absLeft >= EDGE_PADDING) {
      left = rightAlignLeft
    } else {
      // Pin to right edge of viewport
      left = (vw - EDGE_PADDING - menuRect.width) - triggerRect.left
    }
  }
  if (triggerRect.left + left < EDGE_PADDING) {
    left = EDGE_PADDING - triggerRect.left
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
  if (!triggerRef.value?.contains(e.target as Node)) {
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
    <Transition name="dropdown">
      <div
        v-if="open"
        ref="menuRef"
        class="dropdown-menu vstack"
        :class="resolvedPlacement === 'below' ? 'dropdown-menu--below' : 'dropdown-menu--above'"
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

.dropdown-menu {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Elevation shadow — intentional */
  z-index: 10;
}

.dropdown-group + .dropdown-group {
  border-top: 1px solid var(--color-surface-border);
  margin-top: var(--space-xxxs);
  padding-top: var(--space-xxxs);
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
  transform: translateY(4px); /* Subtle slide — intentional */
}

.dropdown-menu--above.dropdown-enter-from,
.dropdown-menu--above.dropdown-leave-to {
  transform: translateY(-4px);
}

/* Dark surface variant */
.dropdown.surface-dark .dropdown-trigger {
  color: var(--color-chrome-text-muted);
}

.dropdown.surface-dark .dropdown-trigger:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.dropdown.surface-dark .dropdown-menu {
  background: var(--color-chrome);
  border-color: var(--color-chrome-subtle);
}

.dropdown.surface-dark .dropdown-group + .dropdown-group {
  border-color: var(--color-chrome-border);
}

.dropdown.surface-dark .dropdown-group-label {
  color: var(--color-chrome-text-muted);
}

.dropdown.surface-dark .dropdown-option {
  color: var(--color-chrome-text);
}

.dropdown.surface-dark .dropdown-option:hover {
  background: var(--color-chrome-hover);
  color: var(--color-chrome-text);
}

.dropdown.surface-dark .dropdown-option.active {
  color: var(--color-primary);
}
</style>
