<script setup lang="ts">
import { useWorkspace } from '@/data/useWorkspace'

const { plugins, theme, blocks } = useWorkspace()

// Extra detail data — hardcoded inline, not in useWorkspace
const pluginDetails: Record<string, {
  path: string
  files: number
  lastModified: string
  tests?: string
  errors?: string[]
  actions: string[]
}> = {
  'downstreet-reservations': {
    path: 'wp-content/plugins/downstreet-reservations/',
    files: 14,
    lastModified: '2m ago',
    tests: 'not configured',
    errors: ['register_rest_route callback returns WP_Error without handling'],
    actions: ['Open in editor', 'Run tests', 'View logs'],
  },
  'downstreet-events': {
    path: 'wp-content/plugins/downstreet-events/',
    files: 22,
    lastModified: '1h ago',
    tests: '12/12 passing',
    actions: ['Open in editor', 'Run tests', 'View logs'],
  },
  'cafe-loyalty-card': {
    path: 'wp-content/plugins/cafe-loyalty-card/',
    files: 3,
    lastModified: 'Just created',
    tests: 'none',
    actions: ['Open in editor', 'Set up tests', 'Configure build'],
  },
}

const themeDetails = {
  path: 'wp-content/themes/flavor-downstreet/',
  files: 18,
  lastModified: '3h ago',
  overrides: ['header', 'footer', 'single', 'archive'],
  styleEdits: 2,
  themeJsonCustomized: true,
  actions: ['Open in editor', 'View overrides'],
}

const blockDetails: Record<string, {
  build: string
  buildOk: boolean
  registered?: boolean
  actions: string[]
}> = {
  'cafe-menu-block': {
    build: 'clean',
    buildOk: true,
    registered: true,
    actions: ['Open in editor', 'Rebuild'],
  },
  'cafe-hours-block': {
    build: 'render error in editor',
    buildOk: false,
    actions: ['Open in editor', 'Rebuild', 'View error'],
  },
}

function statusColor(status: 'clean' | 'error' | 'new') {
  if (status === 'error') return 'var(--color-status-stop-hover)'
  if (status === 'clean') return 'var(--color-status-running)'
  return 'var(--color-text-muted)'
}
</script>

<template>
  <div class="code-view p-m">
    <!-- PLUGINS -->
    <section class="code-view__section">
      <span class="code-view__section-label">Plugins</span>

      <div
        v-for="plugin in plugins"
        :key="plugin.slug"
        class="code-card"
      >
        <div class="code-card__header">
          <span class="code-card__name">{{ plugin.name }}</span>
          <span class="code-card__version">v{{ plugin.version }}</span>
        </div>

        <div class="code-card__path">
          {{ pluginDetails[plugin.slug]?.path }}
        </div>

        <div class="code-card__meta">
          {{ pluginDetails[plugin.slug]?.files }} files
          <span class="code-card__sep">&middot;</span>
          Last modified {{ pluginDetails[plugin.slug]?.lastModified }}
        </div>

        <div class="code-card__meta">
          Tests: {{ pluginDetails[plugin.slug]?.tests }}
          <span
            v-if="pluginDetails[plugin.slug]?.tests === '12/12 passing'"
            class="code-card__check"
          >&#10003;</span>
        </div>

        <div
          v-if="pluginDetails[plugin.slug]?.errors?.length"
          class="code-card__errors"
        >
          <div
            v-for="(err, i) in pluginDetails[plugin.slug]!.errors"
            :key="i"
            class="code-card__error"
          >
            <span class="code-card__error-icon">&#9888;</span>
            1 fatal: {{ err }}
          </div>
        </div>

        <div
          v-if="plugin.slug === 'cafe-loyalty-card'"
          class="code-card__meta code-card__meta--muted"
        >
          No build configured
        </div>

        <div class="code-card__actions">
          <button
            v-for="action in pluginDetails[plugin.slug]?.actions"
            :key="action"
            class="code-card__action"
            type="button"
          >
            {{ action }}
          </button>
        </div>
      </div>
    </section>

    <!-- THEME -->
    <section class="code-view__section">
      <span class="code-view__section-label">Theme</span>

      <div class="code-card">
        <div class="code-card__header">
          <span class="code-card__name">{{ theme.name }}</span>
          <span v-if="theme.parent" class="code-card__parent">(child of {{ theme.parent }})</span>
        </div>

        <div class="code-card__path">{{ themeDetails.path }}</div>

        <div class="code-card__meta">
          {{ themeDetails.files }} files
          <span class="code-card__sep">&middot;</span>
          Last modified {{ themeDetails.lastModified }}
        </div>

        <div class="code-card__meta">
          {{ themeDetails.overrides.length }} template overrides: {{ themeDetails.overrides.join(', ') }}
        </div>

        <div class="code-card__meta">
          {{ themeDetails.styleEdits }} style.css edits
          <span class="code-card__sep">&middot;</span>
          theme.json customized
        </div>

        <div class="code-card__actions">
          <button
            v-for="action in themeDetails.actions"
            :key="action"
            class="code-card__action"
            type="button"
          >
            {{ action }}
          </button>
        </div>
      </div>
    </section>

    <!-- BLOCKS -->
    <section class="code-view__section">
      <span class="code-view__section-label">Blocks</span>

      <div class="code-card__group">
        <div
          v-for="block in blocks"
          :key="block.slug"
          class="code-card code-card--grouped"
        >
          <div class="code-card__header">
            <span class="code-card__name">{{ block.name }}</span>
            <span class="code-card__version">v{{ block.version }}</span>
          </div>

          <div class="code-card__meta">
            Build:
            <template v-if="blockDetails[block.slug]?.buildOk">
              {{ blockDetails[block.slug]?.build }}
              <span class="code-card__check">&#10003;</span>
              <template v-if="blockDetails[block.slug]?.registered">
                <span class="code-card__sep">&middot;</span>
                Registered in editor
              </template>
            </template>
            <template v-else>
              <span class="code-card__error-inline">
                &#9888; {{ blockDetails[block.slug]?.build }}
              </span>
            </template>
          </div>

          <div class="code-card__actions">
            <button
              v-for="action in blockDetails[block.slug]?.actions"
              :key="action"
              class="code-card__action"
              type="button"
            >
              {{ action }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.code-view {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
}

/* ── Sections ── */
.code-view__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.code-view__section-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Card ── */
.code-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

/* Grouped cards share a container */
.code-card__group {
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  overflow: hidden;
}

.code-card--grouped {
  border: none;
  border-radius: 0;
}

.code-card--grouped + .code-card--grouped {
  border-block-start: 1px solid var(--color-surface-border);
}

/* ── Header ── */
.code-card__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
}

.code-card__name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.code-card__version {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  margin-inline-start: auto;
}

.code-card__parent {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  margin-inline-start: auto;
}

/* ── Path ── */
.code-card__path {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
  color: var(--color-text-muted);
}

/* ── Meta lines ── */
.code-card__meta {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.code-card__meta--muted {
  color: var(--color-text-muted);
}

.code-card__sep {
  margin-inline: var(--space-xxxs);
  color: var(--color-text-muted);
}

.code-card__check {
  color: var(--color-status-running);
  margin-inline-start: var(--space-xxxs);
}

/* ── Errors ── */
.code-card__errors {
  margin-block-start: var(--space-xxxs);
}

.code-card__error {
  font-size: var(--font-size-s);
  color: var(--color-status-stop-hover);
}

.code-card__error-icon {
  margin-inline-end: var(--space-xxxs);
}

.code-card__error-inline {
  color: var(--color-status-stop-hover);
}

/* ── Actions ── */
.code-card__actions {
  display: flex;
  gap: var(--space-xxs);
  margin-block-start: var(--space-xs);
}

.code-card__action {
  height: 25px;
  padding: 0 var(--space-xs);
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  font-family: inherit;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background var(--transition-hover), color var(--transition-hover);
}

.code-card__action:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}
</style>
