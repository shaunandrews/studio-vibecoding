<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import ChatMessage from '@/components/composites/ChatMessage.vue'
import type { Message } from '@/data/types'

const props = defineProps<{
  messages: Message[]
  projectId?: string
}>()

const scrollerRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  if (!scrollerRef.value) return
  scrollerRef.value.scrollTop = scrollerRef.value.scrollHeight
}

watch(
  () => {
    // Track both message count and content of the last message for streaming updates
    const last = props.messages[props.messages.length - 1]
    return `${props.messages.length}:${last?.content.length ?? 0}`
  },
  async () => {
    await nextTick()
    scrollToBottom()
  },
  { immediate: true },
)
</script>

<template>
  <div ref="scrollerRef" class="messages vstack flex-1 overflow-auto px-s py-m">
    <div class="messages-inner vstack gap-m">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :agent-id="msg.agentId"
        :project-id="projectId"
      />
    </div>
  </div>
</template>

<style scoped>
.messages-inner {
  max-width: 720px;
  width: 100%;
  margin-block-start: auto;
  margin-inline: auto;
}
</style>
