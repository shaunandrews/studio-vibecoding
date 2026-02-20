<script setup lang="ts">
import { ref } from 'vue'
import { copy, post, cog, plugins as pluginsIcon, page, brush } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import Button from '@/components/primitives/Button.vue'
import { useTimeline, type TimelineEvent } from '@/data/useTimeline'

const { grouped } = useTimeline()

const copiedId = ref<string | null>(null)

function copyError(event: TimelineEvent) {
  if (!event.fullMessage) return
  navigator.clipboard.writeText(event.fullMessage)
  copiedId.value = event.id
  setTimeout(() => { copiedId.value = null }, 1500)
}

const errorTypeLabel: Record<string, string> = {
  warning: 'Warning',
  deprecated: 'Deprecated',
  notice: 'Notice',
  error: 'Error',
}

const wpActionIcon: Record<string, any> = {
  publish_post: post,
  publish_page: page,
  update_option: cog,
  plugin_activate: pluginsIcon,
  switch_theme: brush,
}
</script>

<template>
  <div class="timeline">
    <div class="timeline__header">
      <span class="timeline__title">Timeline</span>
    </div>

    <div v-for="group in grouped" :key="group.label" class="timeline__group">
      <span class="timeline__group-label">{{ group.label }}</span>

      <div class="timeline__track">
        <div
          v-for="(event, i) in group.events"
          :key="event.id"
          class="timeline__event"
          :class="`timeline__event--${event.type}`"
        >
          <!-- Node -->
          <div class="timeline__node">
            <span class="timeline__dot" :class="`timeline__dot--${event.type}`" :data-error-level="event.errorLevel" />
            <span v-if="i < group.events.length - 1" class="timeline__line" />
          </div>

          <!-- Content -->
          <div class="timeline__content">
            <!-- Git -->
            <template v-if="event.type === 'git'">
              <div class="timeline__row">
                <code class="timeline__hash">{{ event.hash }}</code>
                <span class="timeline__event-title">{{ event.title }}</span>
              </div>
              <div class="timeline__meta">
                <span>{{ event.timeAgo }}</span>
                <span v-if="event.diffStats" class="timeline__diff">
                  {{ event.diffStats.files }} file{{ event.diffStats.files !== 1 ? 's' : '' }}
                  <span class="timeline__add">+{{ event.diffStats.insertions }}</span>
                  <span class="timeline__del">−{{ event.diffStats.deletions }}</span>
                </span>
              </div>
            </template>

            <!-- WordPress -->
            <template v-else-if="event.type === 'wordpress'">
              <div class="timeline__row">
                <WPIcon
                  v-if="event.wpAction && wpActionIcon[event.wpAction]"
                  :icon="wpActionIcon[event.wpAction]"
                  :size="14"
                  class="timeline__wp-icon"
                />
                <span class="timeline__event-title">{{ event.title }}</span>
                <span v-if="event.postTitle" class="timeline__post-title">{{ event.postTitle }}</span>
              </div>
              <div class="timeline__meta">
                <span>{{ event.timeAgo }}</span>
                <span v-if="event.description && !event.postTitle" class="timeline__desc">{{ event.description }}</span>
              </div>
            </template>

            <!-- Error -->
            <template v-else-if="event.type === 'error'">
              <div class="timeline__error-card">
                <div class="timeline__error-header">
                  <span class="timeline__error-level" :class="`timeline__error-level--${event.errorLevel}`">
                    {{ errorTypeLabel[event.errorLevel || 'error'] }}
                  </span>
                  <span class="timeline__error-time">{{ event.timeAgo }}</span>
                </div>
                <span class="timeline__error-msg">{{ event.title }}</span>
                <code class="timeline__error-loc">{{ event.location }}</code>
                <span v-if="event.context" class="timeline__error-context">{{ event.context }}</span>
                <div class="timeline__error-footer">
                  <span v-if="event.errorCount && event.errorCount > 1" class="timeline__error-count">
                    ×{{ event.errorCount }} occurrences
                  </span>
                  <span v-else />
                  <Button
                    :icon="copy"
                    :label="copiedId === event.id ? 'Copied' : 'Copy'"
                    variant="tertiary"
                    size="small"
                    tooltip="Copy full error to clipboard"
                    @click="copyError(event)"
                  />
                </div>
              </div>
            </template>

            <!-- Agent -->
            <template v-else-if="event.type === 'agent'">
              <div class="timeline__row">
                <span class="timeline__agent-badge">{{ event.agentName }}</span>
                <span class="timeline__event-title">{{ event.title }}</span>
              </div>
              <div class="timeline__meta">
                <span>{{ event.timeAgo }}</span>
                <span v-if="event.description" class="timeline__desc">{{ event.description }}</span>
              </div>
            </template>

            <!-- System -->
            <template v-else-if="event.type === 'system'">
              <div class="timeline__row">
                <span class="timeline__event-title timeline__event-title--system">{{ event.title }}</span>
              </div>
              <div class="timeline__meta">
                <span>{{ event.timeAgo }}</span>
                <span v-if="event.description" class="timeline__desc">{{ event.description }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Header ── */
.timeline__header {
  margin-block-end: var(--space-s);
}

.timeline__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Groups ── */
.timeline__group {
  margin-block-end: var(--space-m);
}

.timeline__group-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  margin-block-end: var(--space-xs);
  padding-inline-start: 28px; /* Align with content past the node column */
}

/* ── Track (vertical line container) ── */
.timeline__track {
  display: flex;
  flex-direction: column;
}

/* ── Event row ── */
.timeline__event {
  display: flex;
  gap: var(--space-xs);
}

/* ── Node column (dot + line) ── */
.timeline__node {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
  padding-block-start: 5px;
}

.timeline__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 3px var(--color-surface);
}

.timeline__dot--git { background: var(--color-primary); }
.timeline__dot--wordpress { background: var(--color-text-secondary); }
.timeline__dot--agent { background: #8b5cf6; }
.timeline__dot--system { background: var(--color-text-muted); }
.timeline__dot--error { background: var(--color-light-minimize); }
.timeline__dot--error[data-error-level="error"] { background: var(--color-status-stop-hover); }

.timeline__line {
  width: 1px;
  flex: 1;
  background: var(--color-surface-border);
}

/* ── Content ── */
.timeline__content {
  flex: 1;
  min-width: 0;
  padding-block-end: var(--space-s);
}

.timeline__row {
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
  flex-wrap: wrap;
}

.timeline__event-title {
  font-size: var(--font-size-s);
  color: var(--color-text);
}

.timeline__event-title--system {
  color: var(--color-text-secondary);
}

.timeline__meta {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  margin-block-start: 2px;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.timeline__desc {
  color: var(--color-text-secondary);
}

/* ── Git ── */
.timeline__hash {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  flex-shrink: 0;
}

.timeline__diff {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  display: flex;
  gap: var(--space-xxs);
}

.timeline__add { color: var(--color-status-running); }
.timeline__del { color: var(--color-status-stop-hover); }

/* ── WordPress ── */
.timeline__wp-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
  position: relative;
  inset-block-start: 2px;
}

.timeline__post-title {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  font-style: italic;
}

/* ── Agent ── */
.timeline__agent-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  padding: 1px var(--space-xxs);
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

/* ── Error card (embedded in timeline) ── */
.timeline__error-card {
  padding: var(--space-xs);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

.timeline__error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline__error-level {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.timeline__error-level--warning { color: var(--color-light-minimize); }
.timeline__error-level--deprecated { color: var(--color-light-minimize); }
.timeline__error-level--notice { color: var(--color-text-muted); }
.timeline__error-level--error { color: var(--color-status-stop-hover); }

.timeline__error-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.timeline__error-msg {
  font-size: var(--font-size-s);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.timeline__error-loc {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.timeline__error-context {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  font-style: italic;
}

.timeline__error-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-start: var(--space-xxxs);
}

.timeline__error-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
