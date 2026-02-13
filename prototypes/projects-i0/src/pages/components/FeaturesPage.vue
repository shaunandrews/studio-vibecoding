<script setup lang="ts">
import AgentPanel from '@/components/features/AgentPanel.vue'
import ProjectList from '@/components/features/ProjectList.vue'
import SitePreview from '@/components/features/SitePreview.vue'
import '@/pages/components/components-docs.css'
</script>

<template>
  <!-- AgentPanel -->
  <section id="agent-panel">
    <h2>AgentPanel</h2>
    <p class="section-desc">Chat-focused panel with tabbed agent switcher, message list, and input. The primary interaction surface for AI conversations.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>previewVisible</code></td><td><code>boolean</code></td><td>—</td><td>Whether the site preview panel is showing (toggles sidebar icon state)</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>toggle-preview</code></td><td>Emitted when the preview toggle button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Preview</h3>
    <div class="example-section" style="height: 400px; border: 1px solid var(--color-surface-border); border-radius: var(--radius-m); overflow: hidden;">
      <AgentPanel :preview-visible="true" />
    </div>
  </section>

  <!-- ProjectList -->
  <section id="project-list">
    <h2>ProjectList</h2>
    <p class="section-desc">Full project list with grid (cards) or list (sidebar rows) mode. Includes header, items, and footer.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>mode</code></td><td><code>'grid' | 'list'</code></td><td>—</td><td>Layout mode</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>select-project</code></td><td>Emitted when a project is selected (via router navigation)</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Grid mode</h3>
    <div class="example-section example-section--dark" style="min-height: 300px; border-radius: var(--radius-m); overflow: hidden;">
      <ProjectList mode="grid" />
    </div>

    <h3>List mode</h3>
    <div class="example-section example-section--dark" style="max-width: 240px; min-height: 200px; border-radius: var(--radius-m); overflow: hidden;">
      <ProjectList mode="list" />
    </div>
  </section>

  <!-- SitePreview -->
  <section id="site-preview">
    <h2>SitePreview</h2>
    <p class="section-desc">Browser-like preview panel with navigation controls (back, forward, refresh), a BrowserBar URL display, and a placeholder viewport. Used as the right panel alongside AgentPanel.</p>

    <div class="props-table">
      <h3>Structure</h3>
      <table>
        <thead><tr><th>Region</th><th>Contents</th></tr></thead>
        <tbody>
          <tr><td><code>PanelToolbar</code></td><td>Back/forward/refresh buttons + BrowserBar with current URL</td></tr>
          <tr><td><code>preview-frame</code></td><td>Placeholder viewport area showing site URL</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Preview</h3>
    <div class="example-section" style="height: 300px; border: 1px solid var(--color-surface-border); border-radius: var(--radius-m); overflow: hidden;">
      <SitePreview />
    </div>
  </section>
</template>
