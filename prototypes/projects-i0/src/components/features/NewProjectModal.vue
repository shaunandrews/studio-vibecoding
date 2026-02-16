<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OnboardingChat from '@/components/composites/OnboardingChat.vue'
import type { ProjectBrief } from '@/data/types'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  created: [brief: ProjectBrief]
}>()

const closing = ref(false)

function closeModal() {
  if (closing.value) return
  closing.value = true
  setTimeout(() => {
    closing.value = false
    emit('close')
  }, 200)
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    closeModal()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

function onComplete(brief: ProjectBrief) {
  closing.value = true
  setTimeout(() => {
    closing.value = false
    emit('created', brief)
  }, 200)
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="modal-backdrop"
        :class="{ 'modal-closing': closing }"
        @click="onBackdropClick"
      >
        <div class="modal-container" :class="{ 'modal-closing': closing }">
          <button class="modal-close" @click="closeModal" aria-label="Close">×</button>
          <OnboardingChat @complete="onComplete" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

.modal-backdrop.modal-closing {
  animation: fadeOut var(--duration-moderate) var(--ease-in);
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: 600px;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-l);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: scaleIn var(--duration-slow) var(--ease-out);
}

.modal-container.modal-closing {
  animation: scaleOut var(--duration-moderate) var(--ease-in);
}

.modal-close {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  z-index: 1;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--radius-s);
  font-size: 18px;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-hover);
}

.modal-close:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Transition hooks for v-if */
.modal-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.modal-leave-active {
  transition: opacity var(--duration-moderate) var(--ease-in);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
