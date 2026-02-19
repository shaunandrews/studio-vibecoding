<script setup lang="ts">
import { useSkills } from '@/data/useSkills'
import { tool } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'

const { skills, aiPlugins, skillCount, activePluginCount } = useSkills()
</script>

<template>
  <div class="skills-card">
    <!-- Header -->
    <div class="skills-card__header">
      <span class="skills-card__title">Skills &amp; Plugins</span>
    </div>

    <!-- Summary -->
    <div class="skills-card__summary">
      {{ skillCount }} skills · {{ activePluginCount }} AI plugins active
    </div>

    <!-- Skills grid -->
    <div class="skills-card__grid">
      <button
        v-for="skill in skills"
        :key="skill.id"
        class="skills-card__tile"
        type="button"
        :title="skill.description"
      >
        <WPIcon :icon="tool" :size="16" class="skills-card__tile-icon" />
        <span class="skills-card__tile-name">{{ skill.name }}</span>
      </button>
    </div>

    <!-- Footer -->
    <div class="skills-card__footer">
      <button class="skills-card__link" type="button">Browse &amp; manage</button>
    </div>
  </div>
</template>

<style scoped>
.skills-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
}

/* ── Header ── */
.skills-card__header {
  margin-block-end: var(--space-xxxs);
}

.skills-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Summary ── */
.skills-card__summary {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  margin-block-end: var(--space-s);
}

/* ── Skills grid ── */
.skills-card__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xxs);
}

.skills-card__tile {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  transition: border-color var(--duration-instant) var(--ease-default);
}

.skills-card__tile:hover {
  border-color: var(--color-text-muted);
}

.skills-card__tile-icon {
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.skills-card__tile-name {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Footer ── */
.skills-card__footer {
  margin-block-start: var(--space-s);
  display: flex;
  justify-content: flex-end;
}

.skills-card__link {
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--duration-instant) var(--ease-default);
}

.skills-card__link:hover {
  color: var(--color-text-secondary);
}
</style>
