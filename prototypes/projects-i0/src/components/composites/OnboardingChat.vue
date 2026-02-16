<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import ChatMessage from '@/components/composites/ChatMessage.vue'
import QuickReplyChips from '@/components/composites/QuickReplyChips.vue'
import Button from '@/components/primitives/Button.vue'
import type { ProjectBrief, ProjectType } from '@/data/types'

const emit = defineEmits<{
  complete: [brief: ProjectBrief]
}>()

interface ChatMsg {
  role: 'user' | 'agent'
  content: string
}

const messages = ref<ChatMsg[]>([])
const step = ref<'type' | 'name' | 'description' | 'confirm' | 'done'>('type')
const inputValue = ref('')
const inputRef = ref<HTMLTextAreaElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)
const showChips = ref(false)
const showInput = ref(false)

// Collected data
const selectedType = ref<ProjectType>('custom')
const projectName = ref('')
const projectDescription = ref('')
const freeTextType = ref<string | undefined>(undefined)

const inputPlaceholder = computed(() => {
  if (step.value === 'type') return "Or type what you're building..."
  if (step.value === 'name') return 'Give it a name...'
  if (step.value === 'description') return 'A sentence or two (optional)...'
  return ''
})

const nameMessages: Record<ProjectType, string> = {
  restaurant: "Nice — what's the restaurant called?",
  portfolio: "Love it. What's your name, or what should we call the site?",
  store: "Great choice. What's the store called?",
  blog: "Fun. What do you want to call it?",
  custom: "Cool! What's it called?",
}

const descMessages: Record<ProjectType, string> = {
  restaurant: "Last thing — describe it in a sentence. What kind of food, what's the vibe?",
  portfolio: "Almost there. In a sentence — what kind of work do you do?",
  store: "One more — what do you sell, and who's it for?",
  blog: "Last one — what do you write about?",
  custom: "Describe it in a sentence — who's it for and what does it do?",
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

function addMessage(msg: ChatMsg) {
  messages.value.push(msg)
  scrollToBottom()
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function addAgentMessage(text: string) {
  await delay(300)
  addMessage({ role: 'agent', content: text })
}

// Start the flow
async function start() {
  addMessage({ role: 'agent', content: 'Hey! What are you building today?' })
  await delay(100)
  showChips.value = true
  showInput.value = true
  scrollToBottom()
}

start()

async function onChipSelect(value: string) {
  selectedType.value = value as ProjectType
  const chipLabels: Record<string, string> = {
    restaurant: 'Restaurant 🍽️',
    portfolio: 'Portfolio 🎨',
    store: 'Online Store 🛍️',
    blog: 'Blog ✍️',
    custom: 'Something else ✨',
  }
  addMessage({ role: 'user', content: chipLabels[value] || value })
  showChips.value = false
  step.value = 'name'
  await addAgentMessage(nameMessages[selectedType.value])
  focusInput()
}

function focusInput() {
  nextTick(() => inputRef.value?.focus())
}

const shakeInput = ref(false)

async function onSend() {
  const text = inputValue.value.trim()

  if (step.value === 'type') {
    if (!text) return
    freeTextType.value = text
    selectedType.value = 'custom'
    addMessage({ role: 'user', content: text })
    inputValue.value = ''
    step.value = 'name'
    await addAgentMessage(nameMessages.custom)
    focusInput()
    return
  }

  if (step.value === 'name') {
    if (!text) {
      shakeInput.value = true
      setTimeout(() => { shakeInput.value = false }, 500)
      return
    }
    projectName.value = text
    addMessage({ role: 'user', content: text })
    inputValue.value = ''
    step.value = 'description'
    await addAgentMessage(descMessages[selectedType.value])
    focusInput()
    return
  }

  if (step.value === 'description') {
    projectDescription.value = text
    if (text) {
      addMessage({ role: 'user', content: text })
    }
    inputValue.value = ''
    step.value = 'confirm'
    await addAgentMessage("Got it. Let's go.")
    return
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    onSend()
  }
}

function onConfirm() {
  step.value = 'done'
  emit('complete', {
    type: selectedType.value,
    name: projectName.value,
    description: projectDescription.value,
    freeTextType: freeTextType.value,
  })
}
</script>

<template>
  <div class="onboarding-chat vstack flex-1 min-h-0">
    <div ref="messagesRef" class="messages-area vstack gap-xs flex-1 p-s overflow-auto">
      <template v-for="(msg, i) in messages" :key="i">
        <ChatMessage :role="msg.role" :content="msg.content" />
        <QuickReplyChips
          v-if="i === 0 && showChips"
          class="chips-slot"
          @select="onChipSelect"
        />
      </template>
    </div>

    <div v-if="showInput && step !== 'done'" class="input-area p-xs">
      <div v-if="step === 'confirm'" class="confirm-button">
        <Button
          variant="primary"
          label="Let's build it"
          width="full"
          @click="onConfirm"
        />
      </div>
      <div v-else class="input-wrap" :class="{ 'input-shake': shakeInput }">
        <textarea
          ref="inputRef"
          v-model="inputValue"
          class="onboarding-input px-xs py-xxs"
          :placeholder="inputPlaceholder"
          rows="1"
          @keydown="onKeydown"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.chips-slot {
  padding-left: var(--space-s);
}

.input-area {
  border-top: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.input-wrap {
  width: 100%;
}

.onboarding-input {
  display: block;
  width: 100%;
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-l);
  color: var(--color-text);
  resize: none;
  outline: none;
  line-height: var(--line-height-normal);
  field-sizing: content;
  min-height: 0;
  max-height: 100px;
  transition: border-color var(--transition-focus);
}

.onboarding-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.onboarding-input::placeholder {
  color: var(--color-text-muted);
}

.input-shake {
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

.confirm-button {
  width: 100%;
}
</style>
