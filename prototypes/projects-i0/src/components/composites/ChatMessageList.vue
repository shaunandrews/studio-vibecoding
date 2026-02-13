<script setup lang="ts">
import { ref } from 'vue'
import ChatMessage from '@/components/composites/ChatMessage.vue'
import type { Message } from '@/data/types'

defineProps<{
  messages: Message[]
}>()

defineEmits<{
  'select-message': [id: string]
}>()

const selectedId = ref<string | null>(null)

function toggleSelect(id: string) {
  selectedId.value = selectedId.value === id ? null : id
}
</script>

<template>
  <div class="messages flex-1 overflow-auto px-m py-l">
    <div class="messages-inner vstack gap-m">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :agent-id="msg.agentId"
        :selected="msg.id === selectedId"
        @select="toggleSelect(msg.id); $emit('select-message', msg.id)"
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
