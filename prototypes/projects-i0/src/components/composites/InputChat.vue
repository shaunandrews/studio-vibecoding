<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Button from '@/components/primitives/Button.vue'
import Dropdown from '@/components/primitives/Dropdown.vue'
import ContextRing from '@/components/primitives/ContextRing.vue'
import StyleTileCard from '@/components/composites/StyleTileCard.vue'
import StylePreview from '@/components/composites/StylePreview.vue'
import SkillAutocomplete from '@/components/composites/SkillAutocomplete.vue'
import { useSkills } from '@/data/useSkills'
import type { ActionButton, DesignBriefCardData, Skill } from '@/data/types'
import type { DropdownGroup } from '@/components/primitives/Dropdown.vue'

const selectedModel = ref('Opus 4.6')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const models = [
  { label: 'Anthropic', options: ['Opus 4.6', 'Sonnet 4.5', 'Haiku 4.5'] },
  { label: 'OpenAI', options: ['GPT-4.5', 'GPT-4', 'GPT-3.5'] },
]

const props = withDefaults(defineProps<{
  surface?: 'light' | 'dark'
  projectId?: string | null
  modelValue?: string
  placeholder?: string
  actions?: ActionButton[]
  slashMatches?: Skill[]
}>(), {
  surface: 'light',
  modelValue: '',
  placeholder: 'Ask anything...',
  actions: () => [],
  slashMatches: () => [],
})

const emit = defineEmits<{
  send: [message: string, model: string]
  'update:modelValue': [value: string]
  action: [action: ActionButton]
  'slash-input': [query: string]
  'slash-select': [skill: Skill]
}>()

const message = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const slashSelectedIndex = ref(0)

const hasCardActions = computed(() => props.actions.some(a => a.card))
const hasBriefCards = computed(() => props.actions.some(a => a.card?.briefData))
const briefActions = computed(() => props.actions.filter(a => a.card?.briefData))
const extraActions = computed(() => hasBriefCards.value ? props.actions.filter(a => !a.card?.briefData) : [])

// --- Preview hover state ---
const previewData = ref<DesignBriefCardData | null>(null)
const previewRect = ref<DOMRect | null>(null)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

function showPreview(rect: DOMRect, data: DesignBriefCardData) {
  if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
  previewData.value = data
  previewRect.value = rect
}

function scheduleHide() {
  if (hideTimeout) clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    previewData.value = null
    previewRect.value = null
    hideTimeout = null
  }, 150)
}

function cancelHide() {
  if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
}

function hidePreviewNow() {
  if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
  previewData.value = null
  previewRect.value = null
}

function onScroll() {
  hidePreviewNow()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { capture: true, passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, { capture: true })
  if (hideTimeout) clearTimeout(hideTimeout)
})

function send() {
  const text = message.value.trim()
  if (!text) return
  emit('send', text, selectedModel.value)
  message.value = ''
}

function onKeydown(e: KeyboardEvent) {
  // Slash command navigation (when autocomplete is open)
  if (props.slashMatches?.length) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      slashSelectedIndex.value = Math.min(slashSelectedIndex.value + 1, props.slashMatches.length - 1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      slashSelectedIndex.value = Math.max(slashSelectedIndex.value - 1, 0)
      return
    }
    if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault()
      const selected = props.slashMatches[slashSelectedIndex.value]
      if (selected) {
        emit('slash-select', selected)
        slashSelectedIndex.value = 0
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      message.value = ''
      slashSelectedIndex.value = 0
      return
    }
  }

  // Enter sends (existing)
  if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
    e.preventDefault()
    send()
    return
  }

  // Number keys (1-9, 0) trigger actions when the input is empty
  if (props.actions.length && !message.value.trim() && e.key >= '0' && e.key <= '9') {
    const idx = e.key === '0' ? 9 : Number(e.key) - 1
    const action = props.actions[idx]
    if (action) {
      e.preventDefault()
      emit('action', action)
    }
  }
}

watch(message, (val) => {
  if (val.startsWith('/')) {
    emit('slash-input', val)
    slashSelectedIndex.value = 0
  } else {
    emit('slash-input', '')
  }
})

// Skills dropdown
const { installedSkills, toggleSkillForProject, isSkillActiveForProject } = useSkills()
const skillDropdownValue = ref('Skills')

const skillDropdownGroups = computed<DropdownGroup[]>(() => {
  if (!props.projectId) return []
  const sorted = [...installedSkills.value].sort((a, b) => a.name.localeCompare(b.name))
  return [{
    label: 'Project Skills',
    options: sorted.map(skill => ({
      value: skill.id,
      label: skill.name,
      checked: isSkillActiveForProject(skill.id, props.projectId!),
    })),
  }]
})

function onSkillSelect(skillId: string) {
  if (props.projectId) toggleSkillForProject(skillId, props.projectId)
  // Reset so Dropdown doesn't "stick" on a single value
  skillDropdownValue.value = 'Skills'
}

function focus() {
  textareaRef.value?.focus()
}

defineExpose({ focus })

function focusInput(e: MouseEvent) {
  // Don't steal focus from buttons inside the component
  const target = e.target as HTMLElement
  if (target.closest('button')) return
  textareaRef.value?.focus()
}

function buttonVariant(variant?: ActionButton['variant']): 'primary' | 'secondary' | 'tertiary' {
  if (variant === 'primary') return 'primary'
  if (variant === 'destructive') return 'tertiary'
  return 'secondary'
}

function actionLabel(idx: number): string {
  return `${idx < 9 ? idx + 1 : 0}`
}
</script>

<template>
  <div class="input-chat p-xs" :class="[`surface-${props.surface}`, { 'has-content': message.trim().length > 0 }]" @click="focusInput">

    <!-- Style tile cards: structured brief data with hover preview -->
    <div v-if="hasBriefCards" class="input-actions-brief vstack gap-xxs pb-xxs">
      <div class="brief-cards-grid">
        <StyleTileCard
          v-for="(action, idx) in briefActions"
          :key="action.id"
          :data="action.card!.briefData!"
          :index="idx"
          @click="$emit('action', action)"
          @preview-enter="(rect, data) => showPreview(rect, data)"
          @preview-leave="scheduleHide"
        />
      </div>
      <div v-if="extraActions.length" class="hstack gap-xxs">
        <span
          v-for="action in extraActions"
          :key="action.id"
          class="action-enter"
          :style="{ animationDelay: `${briefActions.length * 60 + 80}ms` }"
        >
          <Button
            :label="action.label"
            :icon="action.icon"
            variant="tertiary"
            size="small"
            @click="$emit('action', action)"
          />
        </span>
      </div>
    </div>

    <!-- Card actions: caller controls all styling and content -->
    <div v-else-if="hasCardActions" class="input-actions-cards hstack gap-xs pb-xxs">
      <button
        v-for="(action, idx) in actions"
        :key="action.id"
        class="action-card action-enter"
        :style="{ ...action.card?.style, animationDelay: `${idx * 60}ms` }"
        :aria-label="action.label"
        @click="$emit('action', action)"
      >
        <span class="action-card__badge">{{ actionLabel(idx) }}</span>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="action.card" v-html="action.card.content" />
      </button>
    </div>

    <!-- Regular text actions -->
    <div v-else-if="actions.length" class="input-actions hstack gap-xxs flex-wrap pb-xxs">
      <span
        v-for="(action, idx) in actions"
        :key="action.id"
        class="action-enter"
        :style="{ animationDelay: `${idx * 30}ms` }"
      >
        <Button
          :label="`${actionLabel(idx)}. ${action.label}`"
          :icon="action.icon"
          :variant="buttonVariant(action.variant)"
          size="small"
          @click="$emit('action', action)"
        />
      </span>
    </div>

    <!-- Slash command autocomplete -->
    <SkillAutocomplete
      v-if="slashMatches?.length"
      :matches="slashMatches"
      :selected-index="slashSelectedIndex"
      @select="(skill: Skill) => { $emit('slash-select', skill); slashSelectedIndex = 0 }"
    />

    <textarea
      ref="textareaRef"
      v-model="message"
      class="input-textarea flex-1 px-xxs py-xxxs"
      :placeholder="props.placeholder"
      rows="1"
      @keydown="onKeydown"
    />
    <div class="input-toolbar hstack justify-between pt-xxs">
      <div class="hstack gap-xxs align-center">
        <Dropdown v-model="selectedModel" :groups="models" placement="above" :surface="props.surface" tooltip="Model" />
        <Dropdown
          v-if="projectId && skillDropdownGroups.length"
          v-model="skillDropdownValue"
          :groups="skillDropdownGroups"
          placement="above"
          :surface="props.surface"
          tooltip="Project skills"
          @update:model-value="onSkillSelect"
        />
      </div>
      <div class="hstack gap-xxs align-center">
        <ContextRing
          :percent="42"
          model="Claude Sonnet 4.5"
          tokens="42,000 / 100,000"
          cost="$0.12"
          :messages="24"
          :surface="props.surface"
        />
        <Button
          variant="primary"
          label="Send"
          size="small"
          @click="send"
        />
      </div>
    </div>

    <!-- Floating preview for style tiles -->
    <StylePreview
      v-if="previewData && previewRect"
      :data="previewData"
      :card-rect="previewRect"
      @preview-enter="cancelHide"
      @preview-leave="hidePreviewNow"
    />
  </div>
</template>

<style scoped>
.input-chat {
  width: 100%;
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  cursor: text;
  transition: border-color var(--transition-focus), box-shadow var(--transition-focus);
}

.input-chat:hover {
  border-color: var(--color-text-muted);
}

.input-chat:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary); /* Double-ring focus — intentional */
}

.input-textarea {
  display: block;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: var(--font-size-l);
  color: var(--color-text);
  resize: none;
  line-height: var(--line-height-normal);
  field-sizing: content;
  min-height: 0;
  max-height: 150px; /* ~7 lines — intentional cap */
}

/* Dark surface variant */
.input-chat.surface-dark {
  background: var(--color-chrome-secondary);
  border-color: var(--color-chrome-border);
}

.input-chat.surface-dark:hover {
  border-color: var(--color-chrome-text-muted);
}

.input-chat.surface-dark .input-textarea {
  color: var(--color-chrome-text);
}

.input-textarea::placeholder {
  color: var(--color-text-muted);
}

.input-chat.surface-dark .input-textarea::placeholder {
  color: var(--color-chrome-text-muted);
}

.input-toolbar {
  /* padding via .pt-xxs utility */
}

/* Staggered action entrance */
.action-enter {
  animation: action-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes action-pop {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.95);
  }
}

/* Brief cards: wrapping grid, 3 per row */
.brief-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xs);
}

/* Card actions — InputChat provides the container, caller controls everything else */
.input-actions-cards {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  align-items: stretch;
}

.action-card {
  position: relative;
  flex: 1 1 0;
  min-width: 140px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  padding: var(--space-xs) var(--space-s);
  text-align: start;
  cursor: pointer;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  transition: transform 0.15s ease;
}

.action-card:hover {
  transform: scale(1.02);
}

.action-card:active {
  transform: scale(0.98);
}

.action-card__badge {
  position: absolute;
  inset-block-start: var(--space-xxxs);
  inset-inline-end: var(--space-xxxs);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.4;
}

</style>
