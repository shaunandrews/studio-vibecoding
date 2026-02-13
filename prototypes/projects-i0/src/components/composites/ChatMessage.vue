<script setup lang="ts">
import { computed, ref } from 'vue'
import { copy, thumbsUp, thumbsDown } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import MarkdownText from '@/components/composites/renderers/MarkdownText.vue'
import PluginCard from '@/components/composites/chat-cards/PluginCard.vue'
import ColorPaletteCard from '@/components/composites/chat-cards/ColorPaletteCard.vue'
import SettingsCard from '@/components/composites/chat-cards/SettingsCard.vue'
import ProgressCard from '@/components/composites/chat-cards/ProgressCard.vue'
import type { ActionButton, ContentBlock, AgentId } from '@/data/types'

const props = defineProps<{
  role: 'user' | 'agent'
  content: string | ContentBlock[]
  agentId?: AgentId
  selected?: boolean
}>()

const emit = defineEmits<{
  select: []
  action: [action: ActionButton]
}>()

const feedback = ref<'up' | 'down' | null>(null)

const normalizedContent = computed<ContentBlock[]>(() =>
  typeof props.content === 'string' ? [{ type: 'text', text: props.content }] : props.content,
)

const messageAsText = computed(() =>
  normalizedContent.value
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('\n'),
)

function copyMessage(content: string) {
  if (!content) return
  navigator.clipboard.writeText(content)
}

function onAction(action: ActionButton) {
  if (props.role !== 'agent') return
  emit('action', action)
}

function buttonVariant(variant?: ActionButton['variant']): 'primary' | 'secondary' {
  if (variant === 'primary') return 'primary'
  return 'secondary'
}
</script>

<template>
  <div
    class="chat-message vstack gap-xxs"
    :class="[`chat-message--${role}`, { 'chat-message--selected': selected }]"
    @click="emit('select')"
  >
    <div class="chat-message-body vstack gap-xxs">
      <div
        v-for="(block, idx) in normalizedContent"
        :key="`${idx}-${block.type}`"
        class="content-block"
      >
        <MarkdownText
          v-if="block.type === 'text'"
          class="chat-message-text"
          :text="block.text"
        />

        <PluginCard
          v-else-if="block.type === 'card' && block.card === 'plugin'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <ColorPaletteCard
          v-else-if="block.type === 'card' && block.card === 'colorPalette'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <SettingsCard
          v-else-if="block.type === 'card' && block.card === 'settings'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <ProgressCard
          v-else-if="block.type === 'card' && block.card === 'progress'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
        />

        <div v-else-if="block.type === 'actions'" class="chat-actions hstack gap-xxs flex-wrap" @click.stop>
          <Button
            v-for="action in block.actions"
            :key="action.id"
            :label="action.label"
            :icon="action.icon"
            :variant="buttonVariant(action.variant)"
            size="small"
            @click="onAction(action)"
          />
        </div>
      </div>
    </div>

    <div v-if="selected" class="chat-message-actions hstack gap-xxxs" @click.stop>
      <Button
        variant="tertiary"
        :icon="copy"
        size="small"
        @click="copyMessage(messageAsText)"
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
  cursor: pointer;
  border-radius: var(--radius-m);
}

.chat-message--selected {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.chat-message-body {
  width: 100%;
}

.chat-message--user .chat-message-body {
  width: fit-content;
  max-width: min(100%, 620px);
  border-radius: var(--radius-m);
  background: var(--color-surface-secondary);
  padding: var(--space-xs) var(--space-s);
}

.chat-message--agent .chat-message-body {
  width: 100%;
  padding: 0 var(--space-s);
}

.chat-message-text {
  color: var(--color-text);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-normal);
}

.content-block {
  opacity: 1;
}

.chat-actions {
  padding-top: var(--space-xxxs);
}

.chat-message-actions {
  animation: actions-in var(--duration-fast) var(--ease-default);
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
