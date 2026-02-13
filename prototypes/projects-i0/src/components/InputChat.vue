<script setup lang="ts">
import { ref } from 'vue'
import { arrowUp } from '@wordpress/icons'
import Button from './Button.vue'

const message = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const emit = defineEmits<{
  send: [message: string]
}>()

function send() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text)
  message.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

function focusInput(e: MouseEvent) {
  // Don't steal focus from buttons inside the component
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  textareaRef.value?.focus()
}
</script>

<template>
  <div class="input-chat" :class="{ 'has-content': message.trim().length > 0 }" @click="focusInput">
    <textarea
      ref="textareaRef"
      v-model="message"
      class="input-textarea flex-1"
      placeholder="Ask anything..."
      rows="1"
      @keydown="onKeydown"
    />
    <div class="input-toolbar hstack justify-between">
      <button class="model-selector">
        Sonnet 4.5
      </button>
      <Button
        variant="primary"
        :icon="arrowUp"
        size="small"
        @click="send"
      />
    </div>
  </div>
</template>

<style scoped>
.input-chat {
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-xxs);
  cursor: text;
  transition: border-color 150ms ease, box-shadow 150ms ease;
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
  font-size: 14px;
  color: var(--color-text);
  resize: none;
  padding: var(--space-xxxs) var(--space-xxs);
  line-height: 1.4;
  field-sizing: content;
  min-height: 0;
  max-height: 150px; /* ~7 lines — intentional cap */
}

.input-textarea::placeholder {
  color: var(--color-text-muted);
}

.input-toolbar {
  padding-block-start: var(--space-xxs);
}

.model-selector {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 12px;
  color: var(--color-text-muted);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}

.model-selector:hover {
  background: var(--color-surface);
  color: var(--color-text-secondary);
}
</style>
