<script setup lang="ts">
import { computed } from 'vue'
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
import DesignBriefPickerCard from '@/components/composites/chat-cards/DesignBriefPickerCard.vue'
import type { ContentBlock, AgentId } from '@/data/types'

const props = defineProps<{
  role: 'user' | 'agent'
  content: string | ContentBlock[]
  agentId?: AgentId
  projectId?: string
}>()

const normalizedContent = computed<ContentBlock[]>(() =>
  typeof props.content === 'string' ? [{ type: 'text', text: props.content }] : props.content,
)
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
        <div v-if="block.type === 'text' && block.text === '...'" class="thinking-dots">
          <span class="thinking-dot" />
          <span class="thinking-dot" />
          <span class="thinking-dot" />
        </div>
        <MarkdownText
          v-else-if="block.type === 'text'"
          class="chat-message-text"
          :text="block.text"
        />

        <PluginCard
          v-else-if="block.type === 'card' && block.card === 'plugin'"
          :data="block.data"
          :state="block.state"
        />

        <ColorPaletteCard
          v-else-if="block.type === 'card' && block.card === 'colorPalette'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
        />

        <SettingsCard
          v-else-if="block.type === 'card' && block.card === 'settings'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
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
        />

        <PageCard
          v-else-if="block.type === 'card' && block.card === 'page'"
          :data="block.data"
          :state="block.state"
        />

        <PostDraftCard
          v-else-if="block.type === 'card' && block.card === 'postDraft'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
        />

        <ThemeUpdateCard
          v-else-if="block.type === 'card' && block.card === 'themeUpdate'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
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

        <DesignBriefPickerCard
          v-else-if="block.type === 'card' && block.card === 'designBriefPicker'"
          :data="block.data"
          :compact="block.compact"
          :state="block.state"
        />

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

.thinking-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-xxs) 0;
}

.thinking-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: thinking-pulse 1.4s ease-in-out infinite;
}

.thinking-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.thinking-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes thinking-pulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}
</style>
