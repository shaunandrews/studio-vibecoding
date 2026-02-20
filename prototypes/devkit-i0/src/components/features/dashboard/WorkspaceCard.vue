<script setup lang="ts">
import { useWorkspace } from '@/data/useWorkspace'
import Badge from '@/components/primitives/Badge.vue'

const { plugins, theme, blocks, itemCounts, errorCount } = useWorkspace()

function statusColor(status: 'clean' | 'error' | 'new') {
  if (status === 'error') return 'var(--color-status-stop-hover)'
  if (status === 'clean') return 'var(--color-status-running)'
  return 'var(--color-text-muted)'
}
</script>

<template>
  <div class="workspace-card">
    <!-- Header -->
    <div class="workspace-card__header hstack justify-between">
      <span class="workspace-card__title">Workspace</span>
      <Badge
        v-if="errorCount > 0"
        :label="`${errorCount} error${errorCount > 1 ? 's' : ''}`"
        variant="error"
      />
    </div>

    <!-- Summary line -->
    <div class="workspace-card__summary">
      {{ itemCounts.plugins }} plugins · {{ itemCounts.themes }} theme · {{ itemCounts.blocks }} blocks
    </div>

    <!-- Plugins section -->
    <div class="workspace-card__section">
      <span class="workspace-card__section-label">Plugins</span>
      <ul class="workspace-card__group">
        <li
          v-for="plugin in plugins"
          :key="plugin.slug"
          class="workspace-card__item"
        >
          <div class="workspace-card__item-header">
            <span
              class="workspace-card__dot"
              :style="{ background: statusColor(plugin.status) }"
            />
            <span class="workspace-card__item-name">{{ plugin.name }}</span>
            <span class="workspace-card__item-version">v{{ plugin.version }}</span>
          </div>
          <div
            class="workspace-card__item-summary"
            :class="{ 'workspace-card__item-summary--error': plugin.status === 'error' }"
          >
            {{ plugin.summary }}
          </div>
        </li>
      </ul>
    </div>

    <!-- Theme section -->
    <div class="workspace-card__section">
      <span class="workspace-card__section-label">Theme</span>
      <div class="workspace-card__group">
        <div class="workspace-card__item">
          <div class="workspace-card__item-header">
            <span class="workspace-card__item-name">{{ theme.name }}</span>
            <span v-if="theme.parent" class="workspace-card__item-parent">
              child of {{ theme.parent }}
            </span>
          </div>
          <div class="workspace-card__item-summary">
            {{ theme.summary }}
          </div>
        </div>
      </div>
    </div>

    <!-- Blocks section -->
    <div class="workspace-card__section">
      <span class="workspace-card__section-label">Blocks</span>
      <ul class="workspace-card__group">
        <li
          v-for="block in blocks"
          :key="block.slug"
          class="workspace-card__item"
        >
          <div class="workspace-card__item-header">
            <span
              class="workspace-card__dot"
              :style="{ background: statusColor(block.status) }"
            />
            <span class="workspace-card__item-name">{{ block.name }}</span>
            <span class="workspace-card__item-version">v{{ block.version }}</span>
          </div>
          <div
            class="workspace-card__item-summary"
            :class="{ 'workspace-card__item-summary--error': block.status === 'error' }"
          >
            {{ block.summary }}
          </div>
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="workspace-card__footer">
      <button class="workspace-card__link" type="button">Open workspace</button>
      <button class="workspace-card__link" type="button">+ New Plugin</button>
      <button class="workspace-card__link" type="button">+ New Block</button>
    </div>
  </div>
</template>

<style scoped>
.workspace-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
}

/* ── Header ── */
.workspace-card__header {
  margin-block-end: var(--space-xxxs);
}

.workspace-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Summary line ── */
.workspace-card__summary {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  margin-block-end: var(--space-s);
}

/* ── Sections ── */
.workspace-card__section {
  margin-block-end: var(--space-s);
}

.workspace-card__section:last-of-type {
  margin-block-end: 0;
}

.workspace-card__section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  margin-block-end: var(--space-xxs);
}

/* ── Group container ── */
.workspace-card__group {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-s);
  border: 1px solid var(--color-surface-border);
  overflow: hidden;
}

/* ── Item rows ── */
.workspace-card__item {
  padding: var(--space-xs) var(--space-xs);
}

.workspace-card__item + .workspace-card__item {
  border-block-start: 1px solid var(--color-surface-border);
}

.workspace-card__item-header {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
}

.workspace-card__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.workspace-card__item-name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  flex: 1;
  min-width: 0;
}

.workspace-card__item-version {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.workspace-card__item-parent {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.workspace-card__item-summary {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-block-start: var(--space-xxxs);
  padding-inline-start: 12px; /* 7px dot + 5px gap alignment */
}

.workspace-card__item-summary--error {
  color: var(--color-status-stop-hover);
}

/* Theme items have no dot, so no left padding offset */
.workspace-card__section:nth-child(4) .workspace-card__item-summary {
  padding-inline-start: 0;
}

/* ── Footer ── */
.workspace-card__footer {
  margin-block-start: var(--space-s);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-s);
}

.workspace-card__link {
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--duration-instant) var(--ease-default);
}

.workspace-card__link:hover {
  color: var(--color-text-secondary);
}
</style>
