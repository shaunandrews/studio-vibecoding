<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { chevronDown } from '@wordpress/icons'
import WPIcon from './WPIcon.vue'
import Text from './Text.vue'

export interface DropdownGroup {
  label: string
  options: string[]
}

const props = defineProps<{
  modelValue: string
  groups: DropdownGroup[]
  placement?: 'above' | 'below'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}

function select(option: string) {
  emit('update:modelValue', option)
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (!triggerRef.value?.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="dropdown" ref="triggerRef">
    <button class="dropdown-trigger hstack gap-xxxs px-xxs py-xxxs" @click="toggle">
      <span class="dropdown-label">{{ modelValue }}</span>
      <WPIcon :icon="chevronDown" :size="16" />
    </button>
    <Transition name="dropdown">
      <div
        v-if="open"
        class="dropdown-menu vstack p-xxxs"
        :class="placement === 'below' ? 'dropdown-menu--below' : 'dropdown-menu--above'"
      >
        <div v-for="group in groups" :key="group.label" class="dropdown-group">
          <Text variant="label" color="muted" class="dropdown-group-label px-xs py-xxxs">{{ group.label }}</Text>
          <button
            v-for="option in group.options"
            :key="option"
            class="dropdown-option px-xs py-xxxs"
            :class="{ active: option === modelValue }"
            @click="select(option)"
          >
            {{ option }}
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
  font-size: 12px;
  color: var(--color-text-muted);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}

.dropdown-trigger:hover {
  background: var(--color-surface);
  color: var(--color-text-secondary);
}

.dropdown-menu {
  position: absolute;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Elevation shadow — intentional */
  z-index: 10;
}

.dropdown-menu--above {
  bottom: calc(100% + var(--space-xxxs));
}

.dropdown-menu--below {
  top: calc(100% + var(--space-xxxs));
}

.dropdown-group + .dropdown-group {
  border-top: 1px solid var(--color-surface-border);
  margin-top: var(--space-xxxs); /* separator spacing between groups */
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
  font-size: 13px;
  color: var(--color-text-secondary);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease;
}

.dropdown-option:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.dropdown-option.active {
  color: var(--color-primary);
  font-weight: 500;
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
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
</style>
