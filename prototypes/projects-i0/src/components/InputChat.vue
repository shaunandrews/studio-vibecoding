<script setup lang="ts">
import { ref } from 'vue'
import { arrowUp, chevronDown } from '@wordpress/icons'
import Button from './Button.vue'
import WPIcon from './WPIcon.vue'

const message = ref('')
const selectedModel = ref('Sonnet 4.5')
const showModelPicker = ref(false)

const models = [
  { group: 'Anthropic', options: ['Opus 4.6', 'Sonnet 4.5', 'Haiku 4.5'] },
  { group: 'OpenAI', options: ['GPT-4.5', 'GPT-4', 'GPT-3.5'] },
]

const emit = defineEmits<{
  send: [message: string, model: string]
}>()

function send() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text, selectedModel.value)
  message.value = ''
}

function selectModel(model: string) {
  selectedModel.value = model
  showModelPicker.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="input-chat">
    <div class="input-row hstack gap-xxs">
      <textarea
        v-model="message"
        class="input-textarea flex-1"
        placeholder="Ask anything..."
        rows="1"
        @keydown="onKeydown"
      />
      <Button
        variant="primary"
        :icon="arrowUp"
        size="small"
        :disabled="!message.trim()"
        @click="send"
      />
    </div>
    <div class="input-footer hstack justify-between">
      <div class="model-picker" @click="showModelPicker = !showModelPicker">
        <span class="model-label">{{ selectedModel }}</span>
        <WPIcon :icon="chevronDown" :size="16" />
        <div v-if="showModelPicker" class="model-dropdown vstack" @click.stop>
          <div v-for="group in models" :key="group.group" class="model-group">
            <span class="model-group-label">{{ group.group }}</span>
            <button
              v-for="model in group.options"
              :key="model"
              class="model-option"
              :class="{ active: model === selectedModel }"
              @click="selectModel(model)"
            >
              {{ model }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-chat {
  padding: var(--space-xs);
}

.input-row {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-m);
  padding: var(--space-xxs);
}

.input-textarea {
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text);
  resize: none;
  padding: var(--space-xxxs) var(--space-xxs);
  line-height: 1.4;
  min-height: 0;
  max-height: 120px; /* ~6 lines — intentional cap */
  field-sizing: content;
}

.input-textarea::placeholder {
  color: var(--color-text-muted);
}

.input-footer {
  padding: var(--space-xxxs) var(--space-xxs) 0;
}

/* Model picker */
.model-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  cursor: pointer;
  font-size: 12px;
  color: var(--color-text-muted);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  transition: background 120ms ease, color 120ms ease;
}

.model-picker:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.model-dropdown {
  position: absolute;
  bottom: calc(100% + var(--space-xxs));
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-xxxs);
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Elevation shadow — intentional */
  z-index: 10;
}

.model-group {
  padding: var(--space-xxxs) 0;
}

.model-group + .model-group {
  border-top: 1px solid var(--color-surface-border);
}

.model-group-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: var(--space-xxxs) var(--space-xs);
}

.model-option {
  display: block;
  width: 100%;
  text-align: start;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 13px;
  color: var(--color-text-secondary);
  padding: var(--space-xxxs) var(--space-xs);
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease;
}

.model-option:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.model-option.active {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
