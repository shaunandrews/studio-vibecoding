<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { chevronRight, chevronDown, arrowUp, arrowDown, plus, undo, cloud } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Tooltip from '@shared/primitives/Tooltip.vue'
import Button from '@/components/primitives/Button.vue'
import { useSourceControl, type FileStatus } from '@/data/useSourceControl'

const collapsed = ref(false)

const {
  state,
  stagedOpen,
  unstagedOpen,
  stageFile,
  unstageFile,
  stageAll,
  unstageAll,
  discardFile,
  commit,
  generateCommitMessage,
  push,
  pull,
} = useSourceControl()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function onCommit() {
  commit()
  nextTick(autoResize)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && e.metaKey) {
    e.preventDefault()
    onCommit()
  }
}

function statusLabel(s: FileStatus) {
  return { M: 'Modified', A: 'Added', D: 'Deleted', U: 'Untracked' }[s]
}

function fileName(path: string) {
  return path.split('/').pop() ?? path
}

function fileDir(path: string) {
  const parts = path.split('/')
  return parts.length > 1 ? parts.slice(0, -1).join('/') + '/' : ''
}

// ── Collapse animation ──
const ANIM_DURATION = 150
const ANIM_SAFETY = 50

function safeTransitionEnd(el: HTMLElement, done: () => void) {
  let called = false
  const finish = () => { if (!called) { called = true; done() } }
  const fallback = setTimeout(finish, ANIM_DURATION + ANIM_SAFETY)
  el.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'height') return
    clearTimeout(fallback)
    finish()
  }, { once: true })
}

function onBeforeEnter(el: Element) {
  const h = el as HTMLElement
  h.style.transition = ''
  h.style.height = '0'
  h.style.overflow = 'hidden'
}

function onEnter(el: Element, done: () => void) {
  const h = el as HTMLElement
  const target = h.scrollHeight
  requestAnimationFrame(() => {
    h.style.transition = 'height var(--duration-fast) var(--ease-out)'
    h.style.height = target + 'px'
    safeTransitionEnd(h, done)
  })
}

function onAfterEnter(el: Element) {
  const h = el as HTMLElement
  h.style.transition = ''
  h.style.height = ''
  h.style.overflow = ''
}

function onLeave(el: Element, done: () => void) {
  const h = el as HTMLElement
  h.style.transition = ''
  h.style.height = h.offsetHeight + 'px'
  h.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    h.style.transition = 'height var(--duration-fast) var(--ease-in)'
    h.style.height = '0'
    safeTransitionEnd(h, done)
  })
}

</script>

<template>
  <div class="sc">
    <!-- Header -->
    <div class="sc__header">
      <button class="sc__title-btn" @click="collapsed = !collapsed">
        <WPIcon :icon="collapsed ? chevronRight : chevronDown" :size="16" class="sc__chevron" />
        <span class="sc__title">Source Control</span>
      </button>
      <div v-if="!collapsed" class="sc__header-end">
        <span class="sc__branch">
          <svg class="sc__branch-icon" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 9.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm7.5-3.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 1a2.25 2.25 0 0 0-.75 4.372v5.256a2.251 2.251 0 1 0 1.5 0V5.372A2.25 2.25 0 0 0 4.25 1ZM2.5 3.25a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Zm0 9.5a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM12.5 7a2.25 2.25 0 1 0-1.5.001V10.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 0 0 1.5h3A2.25 2.25 0 0 0 12.5 10.5V7Zm-1-3.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"/>
          </svg>
          {{ state.branch }}
        </span>
        <Tooltip text="Pull" placement="top">
          <button
            class="sc__sync-btn"
            :class="{ 'is-loading': state.isPulling }"
            :disabled="state.behind === 0 && !state.isPulling"
            @click="pull"
          >
            <WPIcon :icon="arrowDown" :size="16" />
            <span v-if="state.behind > 0" class="sc__sync-count">{{ state.behind }}</span>
          </button>
        </Tooltip>
        <Tooltip text="Push" placement="top">
          <button
            class="sc__sync-btn"
            :class="{ 'is-loading': state.isPushing }"
            :disabled="state.ahead === 0 && !state.isPushing"
            @click="push"
          >
            <WPIcon :icon="arrowUp" :size="16" />
            <span v-if="state.ahead > 0" class="sc__sync-count">{{ state.ahead }}</span>
          </button>
        </Tooltip>
      </div>
    </div>

    <Transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
    <div v-if="!collapsed" class="sc__body">
    <!-- Commit area -->
    <div class="sc__commit">
      <div class="sc__textarea-wrap">
        <textarea
          ref="textareaRef"
          v-model="state.commitMessage"
          class="sc__textarea"
          placeholder="Message (⌘Enter to commit)"
          rows="2"
          @input="autoResize"
          @keydown="onKeyDown"
        />
        <Tooltip text="Generate commit message" placement="top">
          <button class="sc__ai-btn" @click="generateCommitMessage">AI</button>
        </Tooltip>
      </div>
      <Button
        label="Commit"
        variant="primary"
        width="full"
        :disabled="state.staged.length === 0 || !state.commitMessage.trim()"
        @click="onCommit"
      />
    </div>

    <!-- Staged changes (hidden when empty) -->
    <div v-if="state.staged.length" class="sc__section">
      <button class="sc__section-header" @click="stagedOpen = !stagedOpen">
        <WPIcon :icon="stagedOpen ? chevronDown : chevronRight" :size="16" class="sc__chevron" />
        <span class="sc__section-label">Staged Changes</span>
        <span class="sc__section-count">{{ state.staged.length }}</span>
        <span class="sc__section-spacer" />
        <Tooltip text="Unstage all" placement="top">
          <button class="sc__section-action" @click.stop="unstageAll">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Z"/></svg>
          </button>
        </Tooltip>
      </button>
      <div v-if="stagedOpen" class="sc__file-list">
        <div v-for="file in state.staged" :key="file.path" class="sc__file">
          <span class="sc__file-path" :title="file.path">
            <span class="sc__file-name">{{ fileName(file.path) }}</span>
            <span v-if="fileDir(file.path)" class="sc__file-dir">{{ fileDir(file.path) }}</span>
          </span>
          <div class="sc__file-actions">
            <Tooltip text="Unstage" placement="top">
              <button class="sc__file-btn" @click="unstageFile(file.path)">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Z"/></svg>
              </button>
            </Tooltip>
          </div>
          <Tooltip :text="statusLabel(file.status)" placement="top">
            <span class="sc__badge" :class="`sc__badge--${file.status}`">{{ file.status }}</span>
          </Tooltip>
        </div>
      </div>
    </div>

    <!-- Unstaged changes -->
    <div class="sc__section">
      <button class="sc__section-header" @click="unstagedOpen = !unstagedOpen">
        <WPIcon :icon="unstagedOpen ? chevronDown : chevronRight" :size="16" class="sc__chevron" />
        <span class="sc__section-label">Changes</span>
        <span v-if="state.unstaged.length" class="sc__section-count">{{ state.unstaged.length }}</span>
        <span class="sc__section-spacer" />
        <Tooltip text="Stage all" placement="top">
          <button class="sc__section-action" @click.stop="stageAll" v-if="state.unstaged.length">
            <WPIcon :icon="plus" :size="16" />
          </button>
        </Tooltip>
      </button>
      <div v-if="unstagedOpen && state.unstaged.length" class="sc__file-list">
        <div v-for="file in state.unstaged" :key="file.path" class="sc__file">
          <span class="sc__file-path" :title="file.path">
            <span class="sc__file-name">{{ fileName(file.path) }}</span>
            <span v-if="fileDir(file.path)" class="sc__file-dir">{{ fileDir(file.path) }}</span>
          </span>
          <div class="sc__file-actions">
            <Tooltip text="Discard changes" placement="top">
              <button class="sc__file-btn" @click="discardFile(file.path)">
                <WPIcon :icon="undo" :size="14" />
              </button>
            </Tooltip>
            <Tooltip text="Stage" placement="top">
              <button class="sc__file-btn" @click="stageFile(file.path)">
                <WPIcon :icon="plus" :size="14" />
              </button>
            </Tooltip>
          </div>
          <Tooltip :text="statusLabel(file.status)" placement="top">
            <span class="sc__badge" :class="`sc__badge--${file.status}`">{{ file.status }}</span>
          </Tooltip>
        </div>
      </div>
      <div v-if="unstagedOpen && state.unstaged.length === 0" class="sc__empty">No changes</div>
    </div>
    </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ── Layout ── */
.sc {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.sc__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

/* ── Header ── */
.sc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sc__title-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xxxs);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  color: var(--color-text);
}

.sc__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.sc__header-end {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
}

.sc__branch {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  padding: 2px var(--space-xxs);
  border-radius: var(--radius-s);
  background: var(--color-surface-secondary);
  font-size: var(--font-size-xs);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: var(--color-text-secondary);
}

.sc__branch-icon {
  flex-shrink: 0;
  opacity: 0.6;
}

.sc__sync-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: var(--space-xxxs);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-text-secondary);
  font-family: inherit;
  font-size: var(--font-size-xs);
  transition: background var(--transition-hover), color var(--transition-hover);
}

.sc__sync-btn:hover:not(:disabled) {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.sc__sync-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.sc__sync-btn.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.sc__sync-count {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xs);
  min-width: 12px;
  text-align: center;
}

/* ── Commit area ── */
.sc__commit {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.sc__textarea-wrap {
  position: relative;
}

.sc__textarea {
  width: 100%;
  min-height: 50px;
  max-height: 120px;
  padding: var(--space-xxs) var(--space-xs);
  padding-inline-end: 40px;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text);
  resize: none;
  outline: none;
  transition: border-color var(--transition-hover);
  box-sizing: border-box;
}

.sc__textarea::placeholder {
  color: var(--color-text-muted);
}

.sc__textarea:focus {
  border-color: var(--color-primary);
}

.sc__ai-btn {
  position: absolute;
  inset-block-end: var(--space-xxs);
  inset-inline-end: var(--space-xxs);
  padding: 2px var(--space-xxs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover);
  line-height: 1.4;
}

.sc__ai-btn:hover {
  background: var(--color-primary);
  color: var(--color-surface);
}

/* ── Sections ── */
.sc__section {
  display: flex;
  flex-direction: column;
}

.sc__section-header {
  display: flex;
  align-items: center;
  gap: var(--space-xxxs);
  padding: var(--space-xxxs) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  color: var(--color-text);
}

.sc__chevron {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.sc__section-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.sc__section-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding-inline: var(--space-xxxs);
  border-radius: var(--radius-full);
  background: var(--color-surface-secondary);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  line-height: 1;
}

.sc__section-spacer {
  flex: 1;
}

.sc__section-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background var(--transition-hover), color var(--transition-hover);
}

.sc__section-action:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

/* ── File list ── */
.sc__file-list {
  display: flex;
  flex-direction: column;
}

.sc__file {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  height: 25px;
  padding-inline-start: 20px; /* Indent past chevron */
  padding-inline-end: var(--space-xxxs);
  border-radius: var(--radius-s);
  transition: background var(--transition-hover);
}

.sc__file:hover {
  background: var(--color-surface-secondary);
}

.sc__file-path {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
  overflow: hidden;
}

.sc__file-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

.sc__file-dir {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sc__file-actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity var(--transition-hover);
  flex-shrink: 0;
}

.sc__file:hover .sc__file-actions {
  opacity: 1;
}

.sc__file-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background var(--transition-hover), color var(--transition-hover);
}

.sc__file-btn:hover {
  background: var(--color-surface-border);
  color: var(--color-text);
}

/* ── Status badge ── */
.sc__badge {
  flex-shrink: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  width: 16px;
  text-align: center;
  line-height: 1;
}

.sc__badge--M { color: var(--color-primary); }
.sc__badge--A { color: var(--color-status-running); }
.sc__badge--D { color: var(--color-status-stop-hover); }
.sc__badge--U { color: var(--color-text-muted); }

/* ── Empty state ── */
.sc__empty {
  padding: var(--space-xxs);
  padding-inline-start: 20px;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
