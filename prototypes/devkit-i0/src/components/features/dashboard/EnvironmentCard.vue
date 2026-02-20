<script setup lang="ts">
import { useEnvironment } from '@/data/useEnvironment'

const { environment, toggleDebug } = useEnvironment()

const debugLabels: Record<string, string> = {
  wpDebug: 'WP_DEBUG',
  scriptDebug: 'SCRIPT_DEBUG',
  xdebug: 'Xdebug',
}

const debugDescriptions: Record<string, string> = {
  wpDebug: 'Show PHP errors and warnings',
  scriptDebug: 'Load unminified scripts and styles',
  xdebug: 'Step-through debugging with breakpoints',
}
</script>

<template>
  <div class="env-card">
    <!-- Stack -->
    <div class="env-card__section">
      <span class="env-card__section-label">Stack</span>
      <dl class="env-card__pairs">
        <div class="env-card__pair">
          <dt>WordPress</dt>
          <dd>{{ environment.stack.wordpress }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>PHP</dt>
          <dd>{{ environment.stack.php }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>Database</dt>
          <dd>{{ environment.stack.database }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>Theme</dt>
          <dd>{{ environment.stack.theme }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>Plugins</dt>
          <dd>{{ environment.stack.pluginCount }} active</dd>
        </div>
      </dl>
    </div>

    <!-- Debug -->
    <div class="env-card__section">
      <span class="env-card__section-label">Debug</span>
      <div class="env-card__toggles">
        <button
          v-for="(value, key) in environment.debug"
          :key="key"
          class="env-card__toggle-row"
          type="button"
          @click="toggleDebug(key as 'wpDebug' | 'scriptDebug' | 'xdebug')"
        >
          <div class="env-card__toggle-info">
            <span class="env-card__toggle-label">{{ debugLabels[key] }}</span>
            <span class="env-card__toggle-desc">{{ debugDescriptions[key] }}</span>
          </div>
          <span class="env-card__toggle" :class="{ on: value }">
            <span class="env-card__toggle-knob" />
          </span>
        </button>
      </div>
    </div>

    <!-- PHP -->
    <div class="env-card__section">
      <span class="env-card__section-label">PHP</span>
      <dl class="env-card__pairs">
        <div class="env-card__pair">
          <dt>Memory limit</dt>
          <dd>{{ environment.php.memoryLimit }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>Upload limit</dt>
          <dd>{{ environment.php.uploadLimit }}</dd>
        </div>
        <div class="env-card__pair">
          <dt>Max execution</dt>
          <dd>{{ environment.php.maxExecution }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
/* ── Sections ── */
.env-card__section + .env-card__section {
  margin-block-start: var(--space-m);
}

.env-card__section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-block-end: var(--space-xs);
}

/* ── Key-value pairs ── */
.env-card__pairs {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
  margin: 0;
}

.env-card__pair {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-xs);
}

.env-card__pair dt {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.env-card__pair dd {
  margin: 0;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-align: end;
}

/* ── Toggle rows ── */
.env-card__toggles {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  overflow: hidden;
}

.env-card__toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background var(--transition-hover);
}

.env-card__toggle-row:hover {
  background: var(--color-surface-secondary);
}

.env-card__toggle-row + .env-card__toggle-row {
  border-block-start: 1px solid var(--color-surface-border);
}

.env-card__toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: start;
}

.env-card__toggle-label {
  font-size: var(--font-size-s);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.env-card__toggle-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Toggle switch */
.env-card__toggle {
  position: relative;
  width: 30px;
  height: 16px;
  border-radius: 8px;
  background: var(--color-text-muted);
  flex-shrink: 0;
  transition: background var(--transition-hover);
}

.env-card__toggle.on {
  background: var(--color-status-running);
}

.env-card__toggle-knob {
  position: absolute;
  inset-block-start: 2px;
  inset-inline-start: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  transition: transform var(--transition-hover);
}

.env-card__toggle.on .env-card__toggle-knob {
  transform: translateX(14px);
}
</style>
