<script setup lang="ts">
import { useDevAgents } from '@/data/useDevAgents'
import Badge from '@/components/primitives/Badge.vue'

const { agents, attentionCount } = useDevAgents()

const dotColor: Record<string, string> = {
  active: 'var(--color-status-running)',
  idle: 'var(--color-light-minimize)',
  error: 'var(--color-status-stop-hover)',
  off: 'var(--color-text-muted)',
}
</script>

<template>
  <div class="agents-card">
    <!-- Header -->
    <div class="agents-card__header hstack justify-between">
      <span class="agents-card__title">Agents</span>
      <Badge
        v-if="attentionCount > 0"
        :label="`${attentionCount} needs attention`"
        variant="warning"
      />
    </div>

    <!-- Agent list -->
    <ul class="agents-card__list">
      <li
        v-for="agent in agents"
        :key="agent.id"
        class="agents-card__row"
      >
        <span
          class="agents-card__dot"
          :style="{ background: dotColor[agent.status] }"
          :class="{ 'agents-card__dot--hollow': agent.status === 'off' }"
        />
        <div class="agents-card__info">
          <div class="agents-card__main hstack">
            <span class="agents-card__name">{{ agent.name }}</span>
            <span class="agents-card__summary">{{ agent.summary }}</span>
          </div>
          <div v-if="agent.lastEvent" class="agents-card__event">
            {{ agent.lastEvent }}
          </div>
        </div>
      </li>
    </ul>

    <!-- Footer -->
    <div class="agents-card__footer">
      <button class="agents-card__link" type="button">View all agents</button>
    </div>
  </div>
</template>

<style scoped>
.agents-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  padding: var(--space-m);
}

/* ── Header ── */
.agents-card__header {
  margin-block-end: var(--space-s);
}

.agents-card__title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ── Agent list ── */
.agents-card__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.agents-card__row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
}

/* ── Status dot ── */
.agents-card__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-block-start: 5px; /* Align with first line of text */
}

.agents-card__dot--hollow {
  background: transparent !important;
  box-shadow: inset 0 0 0 1.5px var(--color-text-muted);
}

/* ── Agent info ── */
.agents-card__info {
  flex: 1;
  min-width: 0;
}

.agents-card__main {
  gap: var(--space-xs);
}

.agents-card__name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  white-space: nowrap;
}

.agents-card__summary {
  font-size: var(--font-size-m);
  color: var(--color-text-secondary);
}

.agents-card__event {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-block-start: var(--space-xxxs);
}

/* ── Footer ── */
.agents-card__footer {
  margin-block-start: var(--space-s);
  display: flex;
  justify-content: flex-end;
}

.agents-card__link {
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--duration-instant) var(--ease-default);
}

.agents-card__link:hover {
  color: var(--color-text-secondary);
}
</style>
