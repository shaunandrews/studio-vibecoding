<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/primitives/Button.vue'
import MarkdownText from '@/components/composites/renderers/MarkdownText.vue'
import PluginCard from '@/components/composites/chat-cards/PluginCard.vue'
import ColorPaletteCard from '@/components/composites/chat-cards/ColorPaletteCard.vue'
import SettingsCard from '@/components/composites/chat-cards/SettingsCard.vue'
import ProgressCard from '@/components/composites/chat-cards/ProgressCard.vue'
import ThemePickerCard from '@/components/composites/chat-cards/ThemePickerCard.vue'
import PageCard from '@/components/composites/chat-cards/PageCard.vue'
import PostDraftCard from '@/components/composites/chat-cards/PostDraftCard.vue'
import ThemeUpdateCard from '@/components/composites/chat-cards/ThemeUpdateCard.vue'
import SectionEditCard from '@/components/composites/chat-cards/SectionEditCard.vue'
import ThemeEditCard from '@/components/composites/chat-cards/ThemeEditCard.vue'
import DesignBriefCard from '@/components/composites/chat-cards/DesignBriefCard.vue'
import type { ActionButton, ContentBlock, AgentId } from '@/data/types'

const props = defineProps<{
  role: 'user' | 'agent'
  content: string | ContentBlock[]
  agentId?: AgentId
  projectId?: string
}>()

const emit = defineEmits<{
  action: [action: ActionButton]
}>()

const normalizedContent = computed<ContentBlock[]>(() =>
  typeof props.content === 'string' ? [{ type: 'text', text: props.content }] : props.content,
)

function onAction(action: ActionButton) {
  if (props.role !== 'agent') return
  emit('action', action)
}

function buttonVariant(variant?: ActionButton['variant']): 'primary' | 'secondary' | 'tertiary' {
  if (variant === 'primary') return 'primary'
  if (variant === 'destructive') return 'tertiary'
  return 'secondary'
}
</script>

<template>
  <div
    class="chat-message vstack gap-xxs"
    :class="`chat-message--${role}`"
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

        <ThemePickerCard
          v-else-if="block.type === 'card' && block.card === 'themePicker'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <PageCard
          v-else-if="block.type === 'card' && block.card === 'page'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <PostDraftCard
          v-else-if="block.type === 'card' && block.card === 'postDraft'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <ThemeUpdateCard
          v-else-if="block.type === 'card' && block.card === 'themeUpdate'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
          @action="onAction"
        />

        <SectionEditCard
          v-else-if="block.type === 'card' && block.card === 'sectionEdit'"
          :data="block.data"
          :project-id="projectId || 'demo'"
          :section-id="block.data.sectionId"
          :compact="block.compact"
          :state="block.state"
        />

        <ThemeEditCard
          v-else-if="block.type === 'card' && block.card === 'themeEdit'"
          :data="block.data"
          :project-id="projectId || 'demo'"
          :compact="block.compact"
          :state="block.state"
        />

        <DesignBriefCard
          v-else-if="block.type === 'card' && block.card === 'designBrief'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
        />

        <div v-else-if="block.type === 'actions'" class="chat-actions hstack gap-xxs flex-wrap" style="max-width: 520px;">
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
  </div>
</template>

<style scoped>
.chat-message {
  border-radius: var(--radius-m);
}

.chat-message-body {
  width: 100%;
}

.chat-message--user {
  align-items: flex-end;
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

.chat-actions {
  padding-top: var(--space-xxxs);
}
</style>
