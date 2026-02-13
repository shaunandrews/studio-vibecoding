<script setup lang="ts">
import * as wpIcons from '@wordpress/icons'
import WPIcon from '../components/WPIcon.vue'
import Button from '../components/Button.vue'
import StatusIndicator from '../components/StatusIndicator.vue'
import { cog, plus, upload, external, trash, pencil, chevronDown } from '@wordpress/icons'

const icons = Object.entries(wpIcons)
  .filter(([key, val]) => key !== 'Icon' && typeof val === 'object' && val !== null && (val as any)?.props)
  .map(([name, icon]) => ({ name, icon }))
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

<template>
  <div class="components">
    <h1>Components</h1>

    <!-- Button -->
    <section>
      <h2>Button</h2>
      <p class="section-desc">Flexible button with three variants, two sizes, two surfaces, and optional icon/label.</p>

      <div class="props-table">
        <h3>Props</h3>
        <table>
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>variant</code></td><td><code>'primary' | 'secondary' | 'tertiary'</code></td><td><code>'secondary'</code></td><td>Visual style</td></tr>
            <tr><td><code>surface</code></td><td><code>'light' | 'dark'</code></td><td><code>'light'</code></td><td>Background context the button sits on</td></tr>
            <tr><td><code>size</code></td><td><code>'default' | 'small'</code></td><td><code>'default'</code></td><td>36px or 28px height</td></tr>
            <tr><td><code>icon</code></td><td><code>WPIcon</code></td><td>—</td><td>WordPress icon object. Icon-only when no label.</td></tr>
            <tr><td><code>label</code></td><td><code>string</code></td><td>—</td><td>Button text. Omit for icon-only.</td></tr>
            <tr><td><code>width</code></td><td><code>'hug' | 'full'</code></td><td><code>'hug'</code></td><td>Hug content or fill container width</td></tr>
          </tbody>
        </table>
      </div>

    <!-- StatusIndicator -->
    <section>
      <h2>StatusIndicator</h2>
      <p class="section-desc">Shows site state with animated hover transitions. Click to toggle start/stop.</p>

      <div class="props-table">
        <h3>Props</h3>
        <table>
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>status</code></td><td><code>'stopped' | 'loading' | 'running'</code></td><td>—</td><td>Current site state</td></tr>
          </tbody>
        </table>
        <h3>Events</h3>
        <table>
          <thead>
            <tr><th>Event</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>toggle</code></td><td>Emitted on click (start/stop)</td></tr>
          </tbody>
        </table>
      </div>

      <h3>States</h3>
      <div class="example-section example-section--dark" style="padding: 24px 32px;">
        <div class="status-demo-row">
          <div class="status-demo-item">
            <StatusIndicator status="stopped" />
            <span class="status-demo-label">Stopped</span>
          </div>
          <div class="status-demo-item">
            <StatusIndicator status="loading" />
            <span class="status-demo-label">Loading</span>
          </div>
          <div class="status-demo-item">
            <StatusIndicator status="running" />
            <span class="status-demo-label">Running</span>
          </div>
        </div>
        <p class="status-demo-hint">Hover stopped or running to see the transition.</p>
      </div>
    </section>

      <!-- Width -->
      <div class="example-section">
        <h3>Width</h3>
        <h4>Hug (default)</h4>
        <div class="example-row">
          <Button variant="primary" label="Hug content" />
          <Button variant="secondary" label="Hug content" />
        </div>
        <h4>Full</h4>
        <div class="example-row" style="max-width: 300px;">
          <Button variant="primary" label="Full width" width="full" />
          <Button variant="secondary" label="Full width" width="full" />
        </div>
      </div>

      <!-- Light surface -->
      <div class="example-section">
        <h3>On light surface</h3>

        <h4>Primary</h4>
        <div class="example-row">
          <Button variant="primary" label="Publish site" />
          <Button variant="primary" label="Publish" :icon="upload" />
          <Button variant="primary" :icon="plus" />
          <Button variant="primary" label="Small" size="small" />
          <Button variant="primary" label="Small" size="small" :icon="plus" />
          <Button variant="primary" :icon="plus" size="small" />
        </div>

        <h4>Secondary</h4>
        <div class="example-row">
          <Button variant="secondary" label="Open site" />
          <Button variant="secondary" label="Open site" :icon="external" />
          <Button variant="secondary" :icon="cog" />
          <Button variant="secondary" label="Small" size="small" />
          <Button variant="secondary" label="Small" size="small" :icon="pencil" />
          <Button variant="secondary" :icon="cog" size="small" />
        </div>

        <h4>Tertiary</h4>
        <div class="example-row">
          <Button variant="tertiary" label="Cancel" />
          <Button variant="tertiary" label="Delete" :icon="trash" />
          <Button variant="tertiary" :icon="chevronDown" />
          <Button variant="tertiary" label="Small" size="small" />
          <Button variant="tertiary" label="Small" size="small" :icon="trash" />
          <Button variant="tertiary" :icon="chevronDown" size="small" />
        </div>
      </div>

      <!-- Dark surface -->
      <div class="example-section example-section--dark">
        <h3>On dark surface</h3>

        <h4>Primary</h4>
        <div class="example-row">
          <Button variant="primary" surface="dark" label="Publish site" />
          <Button variant="primary" surface="dark" label="Publish" :icon="upload" />
          <Button variant="primary" surface="dark" :icon="plus" />
          <Button variant="primary" surface="dark" label="Small" size="small" />
          <Button variant="primary" surface="dark" label="Small" size="small" :icon="plus" />
          <Button variant="primary" surface="dark" :icon="plus" size="small" />
        </div>

        <h4>Secondary</h4>
        <div class="example-row">
          <Button variant="secondary" surface="dark" label="Add site" />
          <Button variant="secondary" surface="dark" label="Add site" :icon="plus" />
          <Button variant="secondary" surface="dark" :icon="cog" />
          <Button variant="secondary" surface="dark" label="Small" size="small" />
          <Button variant="secondary" surface="dark" label="Small" size="small" :icon="pencil" />
          <Button variant="secondary" surface="dark" :icon="cog" size="small" />
        </div>

        <h4>Tertiary</h4>
        <div class="example-row">
          <Button variant="tertiary" surface="dark" label="Stop all" />
          <Button variant="tertiary" surface="dark" label="Settings" :icon="cog" />
          <Button variant="tertiary" surface="dark" :icon="chevronDown" />
          <Button variant="tertiary" surface="dark" label="Small" size="small" />
          <Button variant="tertiary" surface="dark" label="Small" size="small" :icon="trash" />
          <Button variant="tertiary" surface="dark" :icon="chevronDown" size="small" />
        </div>
      </div>
    </section>

    <!-- WPIcon -->
    <section>
      <h2>WPIcon</h2>
      <p class="section-desc">Vue wrapper for <code>@wordpress/icons</code>. Resolves React element trees to native SVG.</p>

      <div class="props-table">
        <h3>Props</h3>
        <table>
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>icon</code></td><td><code>object</code></td><td>—</td><td>Icon object from <code>@wordpress/icons</code></td></tr>
            <tr><td><code>size</code></td><td><code>number</code></td><td><code>24</code></td><td>Width and height in px</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Usage</h3>
      <pre class="code-block"><code>import { cog } from '@wordpress/icons'
&lt;WPIcon :icon="cog" :size="24" /&gt;</code></pre>

      <h3>All icons ({{ icons.length }})</h3>
      <div class="icon-grid">
        <div class="icon-cell" v-for="item in icons" :key="item.name">
          <WPIcon :icon="item.icon" :size="24" />
          <span class="icon-name">{{ item.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.components {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
}

h1 {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 40px;
}

section {
  margin-bottom: 56px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-surface-border);
}

h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: 20px 0 8px;
}

h4 {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 12px 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.section-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.section-desc code,
.props-table code {
  font-size: 12px;
  background: var(--color-surface-secondary);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

/* Props table */
.props-table {
  margin-bottom: 20px;
}

.props-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.props-table th {
  text-align: left;
  font-weight: 600;
  color: var(--color-text-secondary);
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-surface-border);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.props-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-surface-secondary);
  color: var(--color-text);
  vertical-align: top;
}

/* Example sections */
.example-section {
  margin-bottom: 24px;
}

.example-section--dark {
  background: var(--color-chrome);
  border-radius: 8px;
  padding: 16px 20px 20px;
  margin-top: 16px;
}

.example-section--dark h3,
.example-section--dark h4 {
  color: var(--color-chrome-text-secondary);
}

.example-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}

/* Code block */
.code-block {
  background: var(--color-surface-secondary);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text);
  overflow-x: auto;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* StatusIndicator demo */
.status-demo-row {
  display: flex;
  gap: 40px;
  margin-bottom: 12px;
}

.status-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.status-demo-label {
  font-size: 12px;
  color: var(--color-chrome-text-muted);
}

.status-demo-hint {
  font-size: 12px;
  color: var(--color-chrome-text-faint);
  font-style: italic;
}

/* Icon grid */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  border-radius: 8px;
  cursor: default;
  transition: background 150ms ease;
  color: var(--color-text);
}

.icon-cell:hover {
  background: var(--color-surface-secondary);
}

.icon-name {
  font-size: 10px;
  color: var(--color-text-secondary);
  text-align: center;
  word-break: break-all;
  line-height: 1.3;
}
</style>
