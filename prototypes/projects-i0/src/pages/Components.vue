<script setup lang="ts">
import * as wpIcons from '@wordpress/icons'
import WPIcon from '../components/WPIcon.vue'
import Button from '../components/Button.vue'
import StatusIndicator from '../components/StatusIndicator.vue'
import Titlebar from '../components/Titlebar.vue'
import ProjectListItem from '../components/ProjectListItem.vue'
import { cog, plus, upload, external, trash, pencil, chevronDown } from '@wordpress/icons'

const componentNav = [
  { id: 'button', label: 'Button' },
  { id: 'project-list-item', label: 'ProjectListItem' },
  { id: 'status-indicator', label: 'StatusIndicator' },
  { id: 'titlebar', label: 'Titlebar' },
  { id: 'wpicon', label: 'WPIcon' },
]

const icons = Object.entries(wpIcons)
  .filter(([key, val]) => key !== 'Icon' && typeof val === 'object' && val !== null && (val as any)?.props)
  .map(([name, icon]) => ({ name, icon }))
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

<template>
  <div class="components-layout">
    <nav class="components-nav">
      <h2 class="nav-heading">Components</h2>
      <ul>
        <li v-for="item in componentNav" :key="item.id">
          <a :href="'#' + item.id" class="nav-link">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
    <div class="components">

    <!-- Button -->
    <section id="button">
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

    <!-- ProjectListItem -->
    <section id="project-list-item">
      <h2>ProjectListItem</h2>
      <p class="section-desc">A single project row for the sidebar. Favicon, name, and status indicator with select/toggle events.</p>

      <div class="props-table">
        <h3>Props</h3>
        <table>
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>name</code></td><td><code>string</code></td><td>—</td><td>Project name</td></tr>
            <tr><td><code>favicon</code></td><td><code>string</code></td><td>—</td><td>URL for the project icon</td></tr>
            <tr><td><code>status</code></td><td><code>'stopped' | 'loading' | 'running'</code></td><td>—</td><td>Current project state</td></tr>
            <tr><td><code>active</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Whether this project is currently selected</td></tr>
          </tbody>
        </table>
        <h3>Events</h3>
        <table>
          <thead>
            <tr><th>Event</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>select</code></td><td>Emitted when the row is clicked</td></tr>
            <tr><td><code>toggle</code></td><td>Emitted when the status indicator is toggled</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Preview (dark surface)</h3>
      <div class="example-section example-section--dark" style="max-width: 240px;">
        <ProjectListItem name="Downstreet Cafe" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=cafe" status="running" />
        <ProjectListItem name="Shaun's Blog" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=blog" status="running" :active="true" />
        <ProjectListItem name="UI Portfolio" favicon="https://api.dicebear.com/9.x/shapes/svg?seed=portfolio" status="stopped" />
      </div>
    </section>

    <!-- StatusIndicator -->
    <section id="status-indicator">
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

    <!-- Titlebar -->
    <section id="titlebar">
      <h2>Titlebar</h2>
      <p class="section-desc">App chrome title bar with traffic lights, sidebar toggle, centered heading, and action buttons.</p>

      <h3>Preview (dark surface)</h3>
      <div class="example-section example-section--dark" style="padding: 0; overflow: hidden; border-radius: var(--radius-m);">
        <Titlebar />
      </div>

      <div class="props-table">
        <h3>Slots / Structure</h3>
        <table>
          <thead>
            <tr><th>Region</th><th>Contents</th></tr>
          </thead>
          <tbody>
            <tr><td><code>titlebar-start</code></td><td>Traffic lights + sidebar toggle button</td></tr>
            <tr><td><code>titlebar-center</code></td><td>Absolutely centered heading: "WordPress Studio • Site Title"</td></tr>
            <tr><td><code>titlebar-end</code></td><td>Settings + help buttons</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- WPIcon -->
    <section id="wpicon">
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
  </div>
</template>

<style scoped>
.components-layout {
  display: flex;
  min-height: 100vh;
  scroll-behavior: smooth;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
}

.components-nav {
  position: sticky;
  top: 0;
  align-self: flex-start;
  width: 200px;
  flex-shrink: 0;
  padding: var(--space-xxxl) var(--space-m);
  border-inline-end: 1px solid var(--color-surface-border);
}

.nav-heading {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-xs);
}

.components-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

.nav-link {
  display: block;
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius-s);
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background 120ms ease, color 120ms ease;
}

.nav-link:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.components {
  flex: 1;
  min-width: 0;
  max-width: 960px;
  padding: var(--space-xxxl) var(--space-xl);
}

section {
  margin-block-end: var(--space-xxxl);
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-block-end: var(--space-xxxs);
  padding-block-end: var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
}

h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: var(--space-m) 0 var(--space-xxs);
}

h4 {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: var(--space-xs) 0 var(--space-xxs);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.section-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-block-end: var(--space-s);
}

.section-desc code,
.props-table code {
  font-size: 12px;
  background: var(--color-surface-secondary);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  font-family: 'SF Mono', 'Fira Code', monospace;
}

/* Props table */
.props-table {
  margin-block-end: var(--space-m);
}

.props-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.props-table th {
  text-align: start;
  font-weight: 600;
  color: var(--color-text-secondary);
  padding: var(--space-xxs) var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.props-table td {
  padding: var(--space-xxs) var(--space-xs);
  border-block-end: 1px solid var(--color-surface-secondary);
  color: var(--color-text);
  vertical-align: top;
}

/* Example sections */
.example-section {
  margin-block-end: var(--space-l);
}

.example-section--dark {
  background: var(--color-chrome);
  border-radius: var(--radius-m);
  padding: var(--space-s) var(--space-m) var(--space-m);
  margin-block-start: var(--space-s);
}

.example-section--dark h3,
.example-section--dark h4 {
  color: var(--color-chrome-text-secondary);
}

.example-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-xxs);
  margin-block-end: var(--space-xxxs);
}

/* Code block */
.code-block {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-m);
  padding: var(--space-xs) var(--space-s);
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text);
  overflow-x: auto;
  margin-block-end: var(--space-m);
  line-height: 1.6;
}

/* StatusIndicator demo */
.status-demo-row {
  display: flex;
  gap: var(--space-xxl);
  margin-block-end: var(--space-xs);
}

.status-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xxs);
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
  gap: var(--space-xxxs);
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-s) var(--space-xxs);
  border-radius: var(--radius-m);
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
