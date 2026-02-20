<script setup lang="ts">
import { ref, computed } from 'vue'

interface DocEntry {
  title: string
  description: string
  category: string
  isMono: boolean
}

const docs: DocEntry[] = [
  {
    title: 'add_action()',
    description: 'Hooks a function to a specific action event.',
    category: 'Hooks',
    isMono: true,
  },
  {
    title: 'register_block_type()',
    description: 'Registers a block type from metadata in block.json.',
    category: 'Blocks',
    isMono: true,
  },
  {
    title: 'WP_Query',
    description: 'The main class for querying posts from the database.',
    category: 'Database',
    isMono: true,
  },
  {
    title: 'wp_enqueue_script()',
    description: 'Registers and enqueues a script for the front-end or admin.',
    category: 'Assets',
    isMono: true,
  },
  {
    title: 'register_rest_route()',
    description: 'Registers a new REST API route and its callbacks.',
    category: 'REST API',
    isMono: true,
  },
  {
    title: 'theme.json',
    description: 'Global settings and styles configuration for block themes.',
    category: 'Theme JSON',
    isMono: false,
  },
]

const categories = ['Hooks', 'REST API', 'Block Editor', 'Theme JSON', 'WP-CLI', 'Database']

const searchText = ref('')
const activeCategory = ref<string | null>(null)

function toggleCategory(category: string) {
  activeCategory.value = activeCategory.value === category ? null : category
}

const filteredDocs = computed(() => {
  return docs.filter((doc) => {
    const matchesCategory = !activeCategory.value || doc.category === activeCategory.value
    const query = searchText.value.toLowerCase()
    const matchesSearch =
      !query ||
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="docs">
    <div class="docs__header">
      <div class="docs__search">
        <svg class="docs__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="searchText"
          class="docs__search-input"
          type="text"
          placeholder="Search WordPress docs..."
          spellcheck="false"
          autocomplete="off"
        />
      </div>
      <div class="docs__chips">
        <button
          v-for="cat in categories"
          :key="cat"
          class="docs__chip"
          :class="{ 'docs__chip--active': activeCategory === cat }"
          @click="toggleCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="docs__list">
      <button
        v-for="doc in filteredDocs"
        :key="doc.title"
        class="docs__item"
      >
        <div class="docs__item-header">
          <span class="docs__item-title" :class="{ 'docs__item-title--mono': doc.isMono }">
            {{ doc.title }}
          </span>
          <span class="docs__item-badge">{{ doc.category }}</span>
        </div>
        <span class="docs__item-desc">{{ doc.description }}</span>
      </button>

      <div v-if="filteredDocs.length === 0" class="docs__empty">
        No results found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── Header (pinned) ── */
.docs__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-s);
  padding-block-end: var(--space-xs);
}

/* ── Search ── */
.docs__search {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-xs);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
}

.docs__search-icon {
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.docs__search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  color: var(--color-text);
  caret-color: var(--color-primary);
}

.docs__search-input::placeholder {
  color: var(--color-text-muted);
}

/* ── Category chips ── */
.docs__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xxs);
}

.docs__chip {
  padding: var(--space-xxxs) var(--space-xs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  white-space: nowrap;
}

.docs__chip:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.docs__chip--active {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

.docs__chip--active:hover {
  background: var(--color-primary-hover);
  color: var(--color-primary-text);
}

/* ── Scrollable article list ── */
.docs__list {
  flex: 1;
  overflow-y: auto;
  padding-inline: var(--space-s);
  padding-block-end: var(--space-s);
}

/* ── Doc entry ── */
.docs__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
  padding: var(--space-xs);
  border-radius: var(--radius-s);
  background: none;
  border: none;
  text-align: start;
  cursor: pointer;
  width: 100%;
  transition: background 100ms ease;
}

.docs__item:hover {
  background: var(--color-surface-secondary);
}

.docs__item + .docs__item {
  border-block-start: 1px solid var(--color-surface-border);
}

.docs__item:hover + .docs__item,
.docs__item + .docs__item:hover {
  border-block-start-color: transparent;
}

.docs__item-header {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.docs__item-title {
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  line-height: var(--line-height-tight);
}

.docs__item-title--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
}

.docs__item-badge {
  margin-inline-start: auto;
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  background: var(--color-surface-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  line-height: var(--line-height-tight);
  white-space: nowrap;
  flex-shrink: 0;
}

.docs__item-desc {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* ── Empty state ── */
.docs__empty {
  padding: var(--space-m);
  text-align: center;
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
}
</style>
