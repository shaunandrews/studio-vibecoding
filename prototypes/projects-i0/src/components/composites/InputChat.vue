<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'

const message = ref('')
const selectedModel = ref('Sonnet 4.5')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const models = [
  { label: 'Anthropic', options: ['Opus 4.6', 'Sonnet 4.5', 'Haiku 4.5'] },
  { label: 'OpenAI', options: ['GPT-4.5', 'GPT-4', 'GPT-3.5'] },
]

const props = withDefaults(defineProps<{
  surface?: 'light' | 'dark'
}>(), {
  surface: 'light',
})

const emit = defineEmits<{
  send: [message: string, model: string]
}>()

function send() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text, selectedModel.value)
  message.value = ''
}

// Cmd+Enter handled via Button shortcut prop

function focusInput(e: MouseEvent) {
  // Don't steal focus from buttons inside the component
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  textareaRef.value?.focus()
}
</script>

<template>
  <div class="input-chat p-xs" :class="[`surface-${props.surface}`, { 'has-content': message.trim().length > 0 }]" @click="focusInput">
    <textarea
      ref="textareaRef"
      v-model="message"
      class="input-textarea flex-1 px-xxs py-xxxs"
      placeholder="Ask anything..."
      rows="1"
    />
    <div class="input-toolbar hstack justify-between pt-xxs">
      <Dropdown v-model="selectedModel" :groups="models" placement="above" :surface="props.surface" />
      <Button
        variant="primary"
        label="Send"
        size="small"
        shortcut="mod+enter"
        @click="send"
      />
    </div>
  </div>
</template>

<style scoped>
.input-chat {
  max-width: 640px;
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
