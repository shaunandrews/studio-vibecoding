<script setup lang="ts">
import { useActivity } from '@/data/useActivity'

const { activity } = useActivity()

const buildStatusLabel: Record<string, string> = {
  watching: 'watching',
  building: 'building...',
  idle: 'idle',
  error: 'build failed',
}

const buildStatusColor: Record<string, string> = {
  watching: 'var(--color-status-running)',
  building: 'var(--color-light-minimize)',
  idle: 'var(--color-text-muted)',
  error: 'var(--color-status-stop-hover)',
}

const errorTypeLabel: Record<string, string> = {
  warning: 'Warning',
  deprecated: 'Deprecated',
  notice: 'Notice',
  error: 'Error',
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
      <div class="activity-card__git-branch hstack gap-xxs">
        <span class="activity-card__branch-dot" />
        <span class="activity-card__branch-name">{{ activity.git.branch }}</span>
        <span v-if="activity.git.uncommittedCount > 0" class="activity-card__dirty">
          +{{ activity.git.uncommittedCount }} uncommitted
        </span>
      </div>
      <ul class="activity-card__commits">
        <li
          v-for="commit in activity.git.commits"
          :key="commit.hash"
          class="activity-card__commit"
        >
          <div class="activity-card__commit-top hstack gap-xxs">
            <code class="activity-card__hash">{{ commit.hash }}</code>
            <span class="activity-card__commit-msg">{{ commit.message }}</span>
          </div>
          <span class="activity-card__commit-time">{{ commit.timeAgo }}</span>
        </li>
      </ul>
    </div>

    <!-- Errors -->
    <div class="activity-card__section">
      <div class="activity-card__section-header hstack justify-between">
        <span class="activity-card__section-label">Errors</span>
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
          <div class="activity-card__error-top hstack gap-xxs">
            <span class="activity-card__error-type" :class="`activity-card__error-type--${error.type}`">
              {{ errorTypeLabel[error.type] }}
            </span>
            <span class="activity-card__error-msg">{{ error.message }}</span>
          </div>
          <code class="activity-card__error-loc">{{ error.location }}</code>
        </li>
      </ul>
      <span v-else class="activity-card__empty">No errors</span>
      <button v-if="activity.errors.recent.length > 0" class="activity-card__link" type="button">
        View all →
      </button>
    </div>

    <!-- Build -->
    <div class="activity-card__section">
      <span class="activity-card__section-label">Build</span>
      <div class="activity-card__build hstack gap-xxs">
        <span
          class="activity-card__build-dot"
          :class="{ 'activity-card__build-dot--pulse': activity.build.status === 'watching' || activity.build.status === 'building' }"
          :style="{ background: buildStatusColor[activity.build.status] }"
        />
        <span class="activity-card__build-tool">{{ activity.build.tool }}</span>
        <span class="activity-card__build-status">{{ buildStatusLabel[activity.build.status] }}</span>
      </div>
      <span class="activity-card__build-meta">
        last build {{ activity.build.lastBuild }}
        <span v-if="activity.build.lastBuildSuccess" class="activity-card__build-ok">✓</span>
        <span v-else class="activity-card__build-fail">✗</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
}

/* ── Header ── */
.activity-card__header {
  margin-block-end: var(--space-xs);
}

.activity-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Sections ── */
.activity-card__section {
  padding-block-start: var(--space-s);
  border-block-start: 1px solid var(--color-surface-border);
}

.activity-card__section + .activity-card__section {
  margin-block-start: var(--space-s);
}

.activity-card__section-header {
  align-items: center;
}

.activity-card__section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-block-end: var(--space-xs);
}

.activity-card__section-header .activity-card__section-label {
  margin-block-end: 0;
}

/* ── Git ── */
.activity-card__git-branch {
  align-items: center;
  margin-block-end: var(--space-xs);
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

.activity-card__dirty {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.activity-card__commits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.activity-card__commit-top {
  align-items: baseline;
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

.activity-card__commit-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
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
  gap: var(--space-xs);
}

.activity-card__error-top {
  align-items: baseline;
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

.activity-card__error-msg {
  font-size: var(--font-size-s);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-card__error-loc {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
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

/* ── Build ── */
.activity-card__build {
  align-items: center;
}

.activity-card__build-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-card__build-dot--pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.activity-card__build-tool {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.activity-card__build-status {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.activity-card__build-meta {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-block-start: var(--space-xxxs);
}

.activity-card__build-ok { color: var(--color-status-running); }
.activity-card__build-fail { color: var(--color-status-stop-hover); }
</style>
