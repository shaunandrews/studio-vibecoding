<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
import type { ActionButton } from '@/data/types'

const selectedModel = ref('Sonnet 4.5')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const models = [
  { label: 'Anthropic', options: ['Opus 4.6', 'Sonnet 4.5', 'Haiku 4.5'] },
  { label: 'OpenAI', options: ['GPT-4.5', 'GPT-4', 'GPT-3.5'] },
]

const props = withDefaults(defineProps<{
  surface?: 'light' | 'dark'
  modelValue?: string
  placeholder?: string
  actions?: ActionButton[]
}>(), {
  surface: 'light',
  modelValue: '',
  placeholder: 'Ask anything...',
  actions: () => [],
})

const emit = defineEmits<{
  send: [message: string, model: string]
  'update:modelValue': [value: string]
  action: [action: ActionButton]
}>()

const message = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

function send() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text, selectedModel.value)
  message.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
    e.preventDefault()
    send()
    return
  }

  // Number keys (1-9) trigger actions when the input is empty
  if (props.actions.length && !message.value.trim() && e.key >= '1' && e.key <= '9') {
    const idx = Number(e.key) - 1
    const action = props.actions[idx]
    if (action) {
      e.preventDefault()
      emit('action', action)
    }
  }
}

function focus() {
  textareaRef.value?.focus()
}

defineExpose({ focus })

function focusInput(e: MouseEvent) {
  // Don't steal focus from buttons inside the component
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  textareaRef.value?.focus()
}

function buttonVariant(variant?: ActionButton['variant']): 'primary' | 'secondary' | 'tertiary' {
  if (variant === 'primary') return 'primary'
  if (variant === 'destructive') return 'tertiary'
  return 'secondary'
}
</script>

<template>
  <div class="input-chat p-xs" :class="[`surface-${props.surface}`, { 'has-content': message.trim().length > 0 }]" @click="focusInput">
    <div v-if="actions.length" class="input-actions hstack gap-xxs flex-wrap pb-xxs">
      <Button
        v-for="(action, idx) in actions"
        :key="action.id"
        :label="`${idx + 1}. ${action.label}`"
        :icon="action.icon"
        :variant="buttonVariant(action.variant)"
        size="small"
        @click="$emit('action', action)"
      />
    </div>
    <textarea
      ref="textareaRef"
      v-model="message"
      class="input-textarea flex-1 px-xxs py-xxxs"
      :placeholder="props.placeholder"
      rows="1"
      @keydown="onKeydown"
    />
    <div class="input-toolbar hstack justify-between pt-xxs">
      <Dropdown v-model="selectedModel" :groups="models" placement="above" :surface="props.surface" tooltip="Model" />
      <Button
        variant="primary"
        label="Send"
        size="small"
        @click="send"
      />
    </div>
  </div>
</template>

<style scoped>
.input-chat {
  width: 100%;
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  cursor: text;
  transition: border-color var(--transition-focus), box-shadow var(--transition-focus);
}

.input-chat:hover {
  border-color: var(--color-text-muted);
}

.input-chat:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary); /* Double-ring focus — intentional */
}

.input-textarea {
  display: block;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: var(--font-size-l);
  color: var(--color-text);
  resize: none;
  line-height: var(--line-height-normal);
  field-sizing: content;
  min-height: 0;
  max-height: 150px; /* ~7 lines — intentional cap */
}

/* Dark surface variant */
.input-chat.surface-dark {
  background: var(--color-chrome-secondary);
  border-color: var(--color-chrome-border);
}

.input-chat.surface-dark:hover {
  border-color: var(--color-chrome-text-muted);
}

.input-chat.surface-dark .input-textarea {
  color: var(--color-chrome-text);
}

.input-textarea::placeholder {
  color: var(--color-text-muted);
}

.input-chat.surface-dark .input-textarea::placeholder {
  color: var(--color-chrome-text-muted);
}

.input-toolbar {
  /* padding via .pt-xxs utility */
}

</style>
