<script setup lang="ts">
import { ref } from 'vue'
import { copy } from '@wordpress/icons'
import Button from '@/components/primitives/Button.vue'
import { useActivity } from '@/data/useActivity'

const { activity } = useActivity()

const errorTypeLabel: Record<string, string> = {
  warning: 'Warning',
  deprecated: 'Deprecated',
  notice: 'Notice',
  error: 'Error',
}

const fileStatusLabel: Record<string, string> = {
  modified: 'M',
  added: 'A',
  deleted: 'D',
  renamed: 'R',
}

const copiedIndex = ref<number | null>(null)

function copyError(fullMessage: string, index: number) {
  navigator.clipboard.writeText(fullMessage)
  copiedIndex.value = index
  setTimeout(() => { copiedIndex.value = null }, 1500)
}
</script>

<template>
  <div class="activity-card">
    <div class="activity-card__header">
      <span class="activity-card__title">Activity</span>
    </div>

    <!-- Git -->
    <div class="activity-card__section">
      <span class="activity-card__section-label">Git</span>

      <div class="activity-card__git-status">
        <div class="activity-card__git-branch hstack gap-xxs">
          <span class="activity-card__branch-dot" />
          <span class="activity-card__branch-name">{{ activity.git.branch }}</span>
          <span v-if="activity.git.ahead > 0 || activity.git.behind > 0" class="activity-card__sync">
            <span v-if="activity.git.ahead > 0">↑{{ activity.git.ahead }}</span>
            <span v-if="activity.git.behind > 0">↓{{ activity.git.behind }}</span>
          </span>
        </div>
      </div>

      <!-- Uncommitted files -->
      <div v-if="activity.git.uncommittedFiles.length > 0" class="activity-card__uncommitted">
        <span class="activity-card__uncommitted-label">
          {{ activity.git.uncommittedCount }} uncommitted
        </span>
        <ul class="activity-card__file-list">
          <li
            v-for="file in activity.git.uncommittedFiles"
            :key="file.path"
            class="activity-card__file"
          >
            <code class="activity-card__file-status" :class="`activity-card__file-status--${file.status}`">
              {{ fileStatusLabel[file.status] }}
            </code>
            <code class="activity-card__file-path">{{ file.path }}</code>
          </li>
        </ul>
      </div>

      <!-- Commit graph -->
      <ul class="activity-card__commits">
        <li
          v-for="(commit, i) in activity.git.commits"
          :key="commit.hash"
          class="activity-card__commit"
        >
          <div class="activity-card__graph">
            <span class="activity-card__graph-dot" />
            <span v-if="i < activity.git.commits.length - 1" class="activity-card__graph-line" />
          </div>
          <div class="activity-card__commit-body">
            <div class="activity-card__commit-top">
              <code class="activity-card__hash">{{ commit.hash }}</code>
              <span class="activity-card__commit-msg">{{ commit.message }}</span>
            </div>
            <div class="activity-card__commit-meta hstack gap-xs">
              <span class="activity-card__commit-time">{{ commit.timeAgo }}</span>
              <span class="activity-card__commit-stats">
                <span class="activity-card__stat-files">{{ commit.filesChanged }} file{{ commit.filesChanged !== 1 ? 's' : '' }}</span>
                <span class="activity-card__stat-add">+{{ commit.insertions }}</span>
                <span class="activity-card__stat-del">−{{ commit.deletions }}</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Errors -->
    <div class="activity-card__section">
      <div class="activity-card__section-header hstack justify-between">
        <span class="activity-card__section-label">
          Errors
          <span class="activity-card__error-total">{{ activity.errors.total }} total</span>
        </span>
        <span v-if="activity.errors.newCount > 0" class="activity-card__error-badge">
          {{ activity.errors.newCount }} new
        </span>
      </div>

      <ul v-if="activity.errors.recent.length > 0" class="activity-card__errors">
        <li
          v-for="(error, i) in activity.errors.recent"
          :key="i"
          class="activity-card__error"
        >
          <div class="activity-card__error-header">
            <span class="activity-card__error-type" :class="`activity-card__error-type--${error.type}`">
              {{ errorTypeLabel[error.type] }}
            </span>
            <span class="activity-card__error-timestamp">{{ error.timestamp }}</span>
          </div>

          <span class="activity-card__error-msg">{{ error.message }}</span>
          <code class="activity-card__error-loc">{{ error.location }}</code>

          <span v-if="error.context" class="activity-card__error-context">
            {{ error.context }}
          </span>

          <div class="activity-card__error-footer hstack justify-between">
            <span v-if="error.count && error.count > 1" class="activity-card__error-count">
              ×{{ error.count }} occurrences
            </span>
            <span v-else />
            <Button
              :icon="copy"
              :label="copiedIndex === i ? 'Copied' : 'Copy'"
              variant="tertiary"
              size="small"
              :tooltip="'Copy full error to clipboard'"
              @click="copyError(error.fullMessage, i)"
            />
          </div>
        </li>
      </ul>
      <span v-else class="activity-card__empty">No errors</span>

      <button v-if="activity.errors.recent.length > 0" class="activity-card__link" type="button">
        View all {{ activity.errors.total }} errors →
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Header ── */
.activity-card__header {
  margin-block-end: var(--space-s);
}

.activity-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Sections ── */
.activity-card__section {
  margin-block-start: var(--space-m);
}

.activity-card__section-header {
  align-items: center;
}

.activity-card__section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-block-end: var(--space-xs);
}

.activity-card__section-header .activity-card__section-label {
  margin-block-end: 0;
}

.activity-card__error-total {
  font-weight: var(--font-weight-normal);
  color: var(--color-text-muted);
  margin-inline-start: var(--space-xxs);
}

/* ── Git status ── */
.activity-card__git-status {
  margin-block-end: var(--space-xs);
}

.activity-card__git-branch {
  align-items: center;
}

.activity-card__branch-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-status-running);
  flex-shrink: 0;
}

.activity-card__branch-name {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.activity-card__sync {
  font-size: var(--font-size-xs);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: var(--color-text-muted);
  display: flex;
  gap: var(--space-xxxs);
}

/* ── Uncommitted files ── */
.activity-card__uncommitted {
  margin-block-end: var(--space-s);
  padding: var(--space-xs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
}

.activity-card__uncommitted-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-block-end: var(--space-xxs);
}

.activity-card__file-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.activity-card__file {
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
}

.activity-card__file-status {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  width: 12px;
  text-align: center;
  flex-shrink: 0;
}

.activity-card__file-status--modified { color: var(--color-light-minimize); }
.activity-card__file-status--added { color: var(--color-status-running); }
.activity-card__file-status--deleted { color: var(--color-status-stop-hover); }
.activity-card__file-status--renamed { color: var(--color-primary); }

.activity-card__file-path {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Commit graph ── */
.activity-card__commits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.activity-card__commit {
  display: flex;
  gap: var(--space-xs);
}

.activity-card__graph {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  flex-shrink: 0;
  padding-block-start: 5px;
}

.activity-card__graph-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
  box-shadow: 0 0 0 2px var(--color-surface);
  position: relative;
  z-index: 1;
}

.activity-card__graph-line {
  width: 1px;
  flex: 1;
  background: var(--color-text-muted);
  opacity: 0.3;
}

.activity-card__commit-body {
  flex: 1;
  min-width: 0;
  padding-block-end: var(--space-xs);
}

.activity-card__commit-top {
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
}

.activity-card__hash {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  flex-shrink: 0;
}

.activity-card__commit-msg {
  font-size: var(--font-size-s);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-card__commit-meta {
  align-items: baseline;
  margin-block-start: 2px;
}

.activity-card__commit-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.activity-card__commit-stats {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  display: flex;
  gap: var(--space-xxs);
}

.activity-card__stat-files {
  color: var(--color-text-muted);
}

.activity-card__stat-add {
  color: var(--color-status-running);
}

.activity-card__stat-del {
  color: var(--color-status-stop-hover);
}

/* ── Errors ── */
.activity-card__error-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-status-stop-hover);
  background: rgba(220, 38, 38, 0.1);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
}

.activity-card__errors {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.activity-card__error {
  padding: var(--space-xs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

.activity-card__error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-card__error-type {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  flex-shrink: 0;
}

.activity-card__error-type--warning { color: var(--color-light-minimize); }
.activity-card__error-type--deprecated { color: var(--color-light-minimize); }
.activity-card__error-type--notice { color: var(--color-text-muted); }
.activity-card__error-type--error { color: var(--color-status-stop-hover); }

.activity-card__error-timestamp {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.activity-card__error-msg {
  font-size: var(--font-size-s);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.activity-card__error-loc {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.activity-card__error-context {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  font-style: italic;
}

.activity-card__error-footer {
  align-items: center;
  margin-block-start: var(--space-xxxs);
}

.activity-card__error-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.activity-card__empty {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
}

.activity-card__link {
  display: block;
  margin-block-start: var(--space-xs);
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  cursor: pointer;
  text-align: end;
  width: 100%;
  transition: color var(--transition-hover);
}

.activity-card__link:hover {
  color: var(--color-text-secondary);
}
</style>
