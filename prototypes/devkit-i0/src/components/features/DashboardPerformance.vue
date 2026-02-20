<script setup lang="ts">
interface QueryRow {
  sql: string
  time: number
  caller: string
}

const queries: QueryRow[] = [
  {
    sql: "SELECT option_name, option_value FROM wp_options WHERE autoload = 'yes'",
    time: 45.2,
    caller: 'wp_load_alloptions()',
  },
  {
    sql: "SELECT wp_posts.*, wp_term_relationships.term_taxonomy_id FROM wp_posts LEFT JOIN wp_term_relationships ON (wp_posts.ID = wp_term_relationships.object_id) LEFT JOIN wp_postmeta ON (wp_posts.ID = wp_postmeta.post_id AND wp_postmeta.meta_key = '_menu_item_type') WHERE wp_posts.post_type = 'nav_menu_item' AND wp_posts.post_status = 'publish' ORDER BY wp_posts.menu_order ASC",
    time: 32.1,
    caller: 'WP_Query::get_posts()',
  },
  {
    sql: "SELECT t.*, tt.* FROM wp_terms AS t INNER JOIN wp_term_taxonomy AS tt ON t.term_id = tt.term_id WHERE tt.taxonomy IN ('category', 'post_tag', 'nav_menu') ORDER BY t.name ASC",
    time: 18.4,
    caller: 'get_terms()',
  },
  {
    sql: "SELECT post_id, meta_key, meta_value FROM wp_postmeta WHERE post_id IN (12, 15, 23, 41, 56, 78, 92)",
    time: 12.7,
    caller: 'update_postmeta_cache()',
  },
  {
    sql: "SELECT * FROM wp_posts WHERE post_type = 'page' AND post_status = 'publish' ORDER BY post_title ASC",
    time: 4.3,
    caller: 'get_pages()',
  },
  {
    sql: "SELECT user_id, meta_key, meta_value FROM wp_usermeta WHERE user_id IN (1) ORDER BY umeta_id ASC",
    time: 2.1,
    caller: 'get_user_meta()',
  },
  {
    sql: "SELECT option_value FROM wp_options WHERE option_name = 'active_plugins' LIMIT 1",
    time: 1.8,
    caller: 'get_option()',
  },
  {
    sql: "SELECT ID, post_name, post_parent FROM wp_posts WHERE post_type = 'page' AND post_status = 'publish'",
    time: 0.9,
    caller: 'wp_cache_get()',
  },
]

const stats = {
  pageLoad: '0.847s',
  dbQueries: 47,
  memory: '42.1 MB / 256 MB',
  peakMemory: '44.8 MB',
  cacheHitRatio: '89%',
}

const totalTime = '0.847s'

function timeClass(ms: number): string {
  if (ms >= 20) return 'time--slow'
  if (ms >= 10) return 'time--warn'
  return 'time--ok'
}

function truncate(sql: string, max = 90): string {
  return sql.length > max ? sql.slice(0, max) + '\u2026' : sql
}
</script>

<template>
  <div class="performance">
    <!-- Stats bar -->
    <div class="performance__stats">
      <div class="stat">
        <span class="stat__label">Page load</span>
        <span class="stat__value">{{ stats.pageLoad }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">DB queries</span>
        <span class="stat__value">{{ stats.dbQueries }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Memory</span>
        <span class="stat__value">{{ stats.memory }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Peak</span>
        <span class="stat__value">{{ stats.peakMemory }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Cache hit ratio</span>
        <span class="stat__value stat__value--positive">{{ stats.cacheHitRatio }}</span>
      </div>
    </div>

    <!-- Query table -->
    <div class="performance__table-wrap">
      <table class="performance__table">
        <thead>
          <tr>
            <th class="col-query">Query</th>
            <th class="col-time">Time</th>
            <th class="col-caller">Caller</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(q, i) in queries" :key="i">
            <td class="col-query cell-query">{{ truncate(q.sql) }}</td>
            <td class="col-time cell-time" :class="timeClass(q.time)">{{ q.time.toFixed(1) }}ms</td>
            <td class="col-caller cell-caller">{{ q.caller }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="performance__footer">
      {{ stats.dbQueries }} queries &mdash; {{ totalTime }} total
    </div>
  </div>
</template>

<style scoped>
.performance {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── Stats bar ── */
.performance__stats {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-xs) var(--space-s);
  border-block-end: 1px solid var(--color-surface-border);
  background: var(--color-surface-secondary);
  flex-shrink: 0;
}

.stat {
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
}

.stat__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.stat__value {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
}

.stat__value--positive {
  color: var(--color-status-running);
}

/* ── Table wrapper (scrollable) ── */
.performance__table-wrap {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

/* ── Table ── */
.performance__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
  table-layout: fixed;
}

.performance__table thead {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
}

.performance__table th {
  padding: var(--space-xxs) var(--space-s);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-align: start;
  background: var(--color-surface);
  border-block-end: 1px solid var(--color-surface-border);
  white-space: nowrap;
}

.performance__table td {
  padding: var(--space-xxs) var(--space-s);
  border-block-end: 1px solid var(--color-surface-border);
  vertical-align: baseline;
}

.performance__table tbody tr:hover {
  background: var(--color-surface-secondary);
}

/* Column widths */
.col-query {
  width: 60%;
}

.col-time {
  width: 80px;
}

.col-caller {
  width: auto;
}

/* Cell styles */
.cell-query {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell-time {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-align: end;
  white-space: nowrap;
}

.cell-caller {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* Time severity colors */
.time--slow {
  color: var(--color-status-stop-hover);
}

.time--warn {
  color: var(--color-text-secondary);
}

.time--ok {
  color: var(--color-text-muted);
}

/* ── Footer ── */
.performance__footer {
  flex-shrink: 0;
  padding: var(--space-xxs) var(--space-s);
  border-block-start: 1px solid var(--color-surface-border);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
