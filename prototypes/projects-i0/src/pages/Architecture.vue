<script setup lang="ts">
import Text from '../components/Text.vue'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'screens', label: 'Screens & States' },
  { id: 'data-layer', label: 'Data Layer' },
  { id: 'routing', label: 'Routing' },
  { id: 'components', label: 'Components' },
]
</script>

<template>
  <div class="arch-layout hstack">
    <nav class="arch-nav">
      <h2 class="nav-heading">Architecture</h2>
      <ul class="vstack gap-xxxs">
        <li v-for="item in sections" :key="item.id">
          <a :href="'#' + item.id" class="nav-link">{{ item.label }}</a>
        </li>
      </ul>
      <div class="nav-docs vstack gap-xxxs mt-m">
        <Text variant="label" color="muted">Plan docs</Text>
        <a href="/DATA-LAYER.md" class="nav-link" target="_blank">DATA-LAYER.md</a>
        <a href="/ROUTING.md" class="nav-link" target="_blank">ROUTING.md</a>
        <a href="/COMPONENTS.md" class="nav-link" target="_blank">COMPONENTS.md</a>
      </div>
    </nav>
    <div class="arch-content flex-1 min-w-0">

      <section id="overview">
        <h2>Overview</h2>
        <p class="section-desc">Architecture plans for the projects-i0 prototype. This page summarizes the key decisions; full details live in the linked plan docs.</p>

        <div class="card vstack gap-xs p-m mt-m">
          <Text variant="body" weight="medium">Status: Planning</Text>
          <Text variant="body" color="secondary">Sub-agents are researching data layer, routing, and component architecture. Plans will appear in the prototype root as MD files. This page will be updated with summaries and diagrams as plans are finalized.</Text>
        </div>
      </section>

      <section id="screens">
        <h2>Screens &amp; States</h2>
        <p class="section-desc">The app has three primary screens, plus dev/documentation pages.</p>

        <h3>Home <code>/</code></h3>
        <div class="screen-desc vstack gap-xxs">
          <Text variant="body" color="secondary">Landing page. Grid of projects, global cross-project chat, onboarding for new users without projects.</Text>
        </div>

        <h3>Project <code>/projects/:id</code></h3>
        <div class="screen-desc vstack gap-xxs">
          <Text variant="body" color="secondary">The working view. Sidebar with project list, agent chat panel with tabs, site preview. This is what the current app-shell demo represents.</Text>
        </div>

        <h3>Settings <code>/settings</code></h3>
        <div class="screen-desc vstack gap-xxs">
          <Text variant="body" color="secondary">App configuration. Details TBD.</Text>
        </div>

        <h3>Dev Pages</h3>
        <div class="screen-desc vstack gap-xxs">
          <Text variant="body" color="secondary">Design System, Components, and this Architecture page. Accessible during development, not part of the user-facing app.</Text>
        </div>
      </section>

      <section id="data-layer">
        <h2>Data Layer</h2>
        <p class="section-desc">How the app manages state — models, stores, and seed data.</p>
        <div class="card vstack gap-xs p-m">
          <Text variant="body" color="muted">⏳ Plan in progress — see DATA-LAYER.md when complete</Text>
        </div>
      </section>

      <section id="routing">
        <h2>Routing</h2>
        <p class="section-desc">Route structure, layouts, and navigation patterns.</p>
        <div class="card vstack gap-xs p-m">
          <Text variant="body" color="muted">⏳ Plan in progress — see ROUTING.md when complete</Text>
        </div>
      </section>

      <section id="components">
        <h2>Components</h2>
        <p class="section-desc">Component organization, decomposition, and new components needed.</p>
        <div class="card vstack gap-xs p-m">
          <Text variant="body" color="muted">⏳ Plan in progress — see COMPONENTS.md when complete</Text>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.arch-layout {
  min-height: 100vh;
  scroll-behavior: smooth;
  font-family: var(--font-family);
  color: var(--color-text);
}

.arch-nav {
  position: sticky;
  top: 0;
  align-self: flex-start;
  width: 200px;
  padding: var(--space-xxxl) var(--space-m);
  border-inline-end: 1px solid var(--color-surface-border);
}

.nav-heading {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-xs);
}

.arch-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: block;
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius-s);
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background 120ms ease, color 120ms ease;
}

.nav-link:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.arch-content {
  max-width: 960px;
  padding: var(--space-xxxl) var(--space-xl);
}

section {
  margin-block-end: var(--space-xxxl);
}

h2 {
  font-size: 20px; /* Section heading — intentional, outside type scale */
  font-weight: var(--font-weight-semibold);
  margin-block-end: var(--space-xxxs);
  padding-block-end: var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
}

h3 {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin: var(--space-m) 0 var(--space-xxs);
}

h3 code {
  font-size: var(--font-size-s);
  font-family: var(--font-family-mono);
  background: var(--color-surface-secondary);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  font-weight: var(--font-weight-regular);
  margin-inline-start: var(--space-xxs);
}

.section-desc {
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
  margin-block-end: var(--space-s);
}

.card {
  background: var(--color-surface-secondary);
  border-radius: var(--radius-m);
  border: 1px solid var(--color-surface-border);
}

.screen-desc {
  padding-inline-start: var(--space-s);
  border-inline-start: 2px solid var(--color-surface-border);
}
</style>
