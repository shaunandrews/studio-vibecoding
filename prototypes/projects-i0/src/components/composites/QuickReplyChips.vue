<script setup lang="ts">
import { ref } from 'vue'

export interface ChipOption {
  label: string
  icon: string
  value: string
}

const props = withDefaults(defineProps<{
  options?: ChipOption[]
}>(), {
  options: () => [
    { label: 'Restaurant', icon: '🍽️', value: 'restaurant' },
    { label: 'Portfolio', icon: '🎨', value: 'portfolio' },
    { label: 'Online Store', icon: '🛍️', value: 'store' },
    { label: 'Blog', icon: '✍️', value: 'blog' },
    { label: 'Something else', icon: '✨', value: 'custom' },
  ],
})

const emit = defineEmits<{
  select: [value: string]
}>()

const selectedValue = ref<string | null>(null)

function select(value: string) {
  if (selectedValue.value) return
  selectedValue.value = value
  emit('select', value)
}
</script>

<template>
  <div class="quick-reply-chips hstack flex-wrap gap-xxs">
    <button
      v-for="option in options"
      :key="option.value"
      class="chip"
      :class="{
        'chip--selected': selectedValue === option.value,
        'chip--dismissed': selectedValue !== null && selectedValue !== option.value,
      }"
      @click="select(option.value)"
    >
      <span class="chip-icon">{{ option.icon }}</span>
      <span class="chip-label">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.quick-reply-chips {
  padding: var(--space-xxs) 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  padding: var(--space-xxxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  font-family: inherit;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-hover);
  white-space: nowrap;
}

.chip:hover:not(.chip--selected):not(.chip--dismissed) {
  border-color: var(--color-primary);
}

.chip--selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-text);
}

.chip--dismissed {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.95);
  transition: all var(--duration-slow) var(--ease-in);
}
</style>
