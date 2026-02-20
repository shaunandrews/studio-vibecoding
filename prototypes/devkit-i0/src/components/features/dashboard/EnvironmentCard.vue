<script setup lang="ts">
import { useEnvironment } from '@/data/useEnvironment'

const { environment, toggleDebug } = useEnvironment()

const debugLabels: Record<string, string> = {
  wpDebug: 'WP_DEBUG',
  scriptDebug: 'SCRIPT_DEBUG',
  xdebug: 'Xdebug',
}
</script>

<template>
  <div class="env-card">
    <div class="env-card__header">
      <span class="env-card__title">Environment</span>
    </div>

    <!-- Site URL -->
    <a class="env-card__url" :href="`http://${environment.siteUrl}`" target="_blank" rel="noopener">
      {{ environment.siteUrl }}
      <span class="env-card__url-arrow">↗</span>
    </a>

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
          <span class="env-card__toggle-label">{{ debugLabels[key] }}</span>
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
.env-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
}

/* ── Header ── */
.env-card__header {
  margin-block-end: var(--space-xs);
}

.env-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Site URL ── */
.env-card__url {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  font-size: var(--font-size-s);
  color: var(--color-primary);
  text-decoration: none;
  margin-block-end: var(--space-s);
  transition: color var(--transition-hover);
}

.env-card__url:hover {
  color: var(--color-primary-hover, var(--color-text));
}

.env-card__url-arrow {
  font-size: var(--font-size-xs);
  opacity: 0.6;
}

/* ── Sections ── */
.env-card__section {
  padding-block-start: var(--space-s);
  border-block-start: 1px solid var(--color-surface-border);
}

.env-card__section + .env-card__section {
  margin-block-start: var(--space-s);
}

.env-card__section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  gap: var(--space-xxs);
}

.env-card__toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xxxs) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.env-card__toggle-label {
  font-size: var(--font-size-s);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: var(--color-text-secondary);
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
