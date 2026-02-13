<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import ChatMessage from '@/components/composites/ChatMessage.vue'
import type { ActionButton, Message } from '@/data/types'

const props = defineProps<{
  messages: Message[]
}>()

defineEmits<{
  action: [messageId: string, action: ActionButton]
}>()

const scrollerRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  if (!scrollerRef.value) return
  scrollerRef.value.scrollTop = scrollerRef.value.scrollHeight
}

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    scrollToBottom()
  },
  { immediate: true },
)
</script>

<template>
  <div ref="scrollerRef" class="messages flex-1 overflow-auto px-m py-l">
    <div class="messages-inner vstack gap-m">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :agent-id="msg.agentId"
        @action="$emit('action', msg.id, $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.messages-inner {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}
</style>
