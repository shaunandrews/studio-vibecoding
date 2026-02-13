<script setup lang="ts">
import { ref, computed } from 'vue'
import { copy, thumbsUp, thumbsDown } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import Text from '@/components/primitives/Text.vue'
import { useAgents } from '@/data/useAgents'
import type { AgentId } from '@/data/types'

const { getAgent } = useAgents()

const props = defineProps<{
  role: 'user' | 'agent'
  content: string
  agentId?: AgentId
  selected?: boolean
}>()

const agentName = computed(() => {
  if (!props.agentId) return undefined
  return getAgent(props.agentId)?.label
})

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
}

.chat-message--selected {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.chat-message-content {
  padding: var(--space-xs) var(--space-s);

  .chat-message--user & {
    background: var(--color-surface-secondary);
    border-radius: var(--radius-m);
  }
}

.chat-message-actions {
  animation: actions-in 150ms ease;
}

@keyframes actions-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.action-active) {
  color: var(--color-primary) !important;
  opacity: 1;
}
</style>
