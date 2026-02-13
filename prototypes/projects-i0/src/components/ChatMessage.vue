<script setup lang="ts">
import { ref } from 'vue'
import { copy, thumbsUp, thumbsDown } from '@wordpress/icons'
import Button from './Button.vue'
import Text from './Text.vue'

const props = defineProps<{
  role: 'user' | 'agent'
  content: string
  agentName?: string
  selected?: boolean
}>()

const emit = defineEmits<{
  select: []
}>()

const feedback = ref<'up' | 'down' | null>(null)
const copied = ref(false)

function copyMessage(content: string) {
  navigator.clipboard.writeText(content)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <div
    class="chat-message vstack gap-xxs"
    :class="[`chat-message--${role}`, { 'chat-message--selected': selected }]"
    @click="emit('select')"
  >
    <Text v-if="role === 'agent' && agentName" variant="label" color="muted">{{ agentName }}</Text>
    <Text variant="body-large" tag="div" class="chat-message-content">{{ content }}</Text>
    <div v-if="selected" class="chat-message-actions hstack gap-xxxs">
      <Button
        variant="tertiary"
        :icon="copy"
        size="small"
        @click="copyMessage(content)"
      />
      <template v-if="role === 'agent'">
        <Button
          variant="tertiary"
          :icon="thumbsUp"
          size="small"
          :class="{ 'action-active': feedback === 'up' }"
          @click="feedback = feedback === 'up' ? null : 'up'"
        />
        <Button
          variant="tertiary"
          :icon="thumbsDown"
          size="small"
          :class="{ 'action-active': feedback === 'down' }"
          @click="feedback = feedback === 'down' ? null : 'down'"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  max-width: 640px;
  cursor: pointer;
  border-radius: var(--radius-m);
  border: 2px solid transparent;
  padding: var(--space-xxs);
  margin-inline: calc(-1 * var(--space-xxs));
  transition: border-color 150ms ease;
}

.chat-message--selected {
  border-color: var(--color-primary);
}

.chat-message-content {
  padding: var(--space-xxs) var(--space-xs);

  .chat-message--user & {
    background: var(--color-surface-secondary);
    border-radius: var(--radius-s);
  }
}

.chat-message-actions {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  animation: actions-in 150ms ease;
}

@keyframes actions-in {
  from {
    grid-template-rows: 0fr;
    opacity: 0;
  }
  to {
    grid-template-rows: 1fr;
    opacity: 1;
  }
}

:deep(.action-active) {
  color: var(--color-primary) !important;
  opacity: 1;
}
</style>
