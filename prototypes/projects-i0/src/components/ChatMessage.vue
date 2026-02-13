<script setup lang="ts">
import { ref } from 'vue'
import { copy, thumbsUp, thumbsDown } from '@wordpress/icons'
import Button from './Button.vue'
import Text from './Text.vue'

defineProps<{
  role: 'user' | 'agent'
  content: string
  agentName?: string
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
  <div class="chat-message vstack gap-xxs" :class="`chat-message--${role}`">
    <Text v-if="role === 'agent' && agentName" variant="label" color="muted">{{ agentName }}</Text>
    <Text variant="body-large" tag="div" class="chat-message-content">{{ content }}</Text>
    <div class="chat-message-actions hstack gap-xxxs">
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
  position: relative;
}

.chat-message--user .chat-message-content {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-m);
  padding: var(--space-xs) var(--space-s);
  margin-inline: calc(-1 * var(--space-s)); /* Pull bubble left/right so text stays aligned */
}

.chat-message-actions {
  position: absolute;
  bottom: calc(-1 * var(--space-xxs));
  left: 0;
  opacity: 0;
  transition: opacity 150ms ease;
  z-index: 1;
}

.chat-message:hover .chat-message-actions {
  opacity: 1;
}

:deep(.action-active) {
  color: var(--color-primary) !important;
  opacity: 1;
}
</style>
