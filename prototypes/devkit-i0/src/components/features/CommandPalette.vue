<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { search as searchIcon } from '@wordpress/icons'
import WPIcon from '@shared/primitives/WPIcon.vue'
import { useCommandPalette, type Command } from '@/data/useCommandPalette'

const { isOpen, searchQuery, close } = useCommandPalette()

const inputRef = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

// ── Commands ──

const commands: Command[] = [
  // Navigation
  { id: 'nav-sites', label: 'Go to Sites', category: 'Navigation', shortcut: '⌘⇧H', action: close },
  { id: 'nav-overview', label: 'Overview tab', category: 'Navigation', action: close },
  { id: 'nav-code', label: 'Code tab', category: 'Navigation', action: close },
  { id: 'nav-terminal', label: 'Terminal tab', category: 'Navigation', action: close },

  // Skills
  { id: 'skill-scaffold', label: 'Scaffold Block', category: 'Skills', action: close },
  { id: 'skill-tests', label: 'Generate Tests', category: 'Skills', action: close },
  { id: 'skill-review', label: 'Code Review', category: 'Skills', action: close },
  { id: 'skill-plugin', label: 'Plugin Wizard', category: 'Skills', action: close },
  { id: 'skill-wpcli', label: 'WP-CLI Runner', category: 'Skills', action: close },
  { id: 'skill-theme', label: 'Theme Builder', category: 'Skills', action: close },

  // WP-CLI
  { id: 'wp-run', label: 'Run WP-CLI command…', category: 'WP-CLI', action: close },
  { id: 'wp-plugins', label: 'List active plugins', category: 'WP-CLI', action: close },
  { id: 'wp-export', label: 'Export database', category: 'WP-CLI', action: close },
]

// ── Filtering ──

const filteredCommands = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return commands
  return commands.filter(cmd => cmd.label.toLowerCase().includes(q))
})

// Group filtered commands by category, preserving order
const groupedCommands = computed(() => {
  const groups: { category: string; commands: Command[] }[] = []
  const seen = new Set<string>()

  for (const cmd of filteredCommands.value) {
    if (!seen.has(cmd.category)) {
      seen.add(cmd.category)
      groups.push({ category: cmd.category, commands: [] })
    }
    groups.find(g => g.category === cmd.category)!.commands.push(cmd)
  }

  return groups
})

// ── Keyboard navigation ──

function onKeydown(e: KeyboardEvent) {
  const total = filteredCommands.value.length
  if (!total) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % total
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + total) % total
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const cmd = filteredCommands.value[selectedIndex.value]
    if (cmd) cmd.action()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

// Reset selection when query changes
watch(searchQuery, () => {
  selectedIndex.value = 0
})

// Focus input when palette opens
watch(isOpen, (open) => {
  if (open) {
    selectedIndex.value = 0
    nextTick(() => inputRef.value?.focus())
  }
})

// Flat index for a command across groups
function flatIndex(cmd: Command): number {
  return filteredCommands.value.indexOf(cmd)
}

function onBackdropClick() {
  close()
}

function onRowClick(cmd: Command) {
  cmd.action()
}

function onRowMouseEnter(cmd: Command) {
  selectedIndex.value = flatIndex(cmd)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="isOpen" class="palette-overlay" @mousedown.self="onBackdropClick">
        <div class="palette" @keydown="onKeydown">
          <!-- Search input -->
          <div class="palette-search">
            <WPIcon :icon="searchIcon" :size="16" class="palette-search-icon" />
            <input
              ref="inputRef"
              v-model="searchQuery"
              type="text"
              class="palette-input"
              placeholder="Search commands…"
              spellcheck="false"
              autocomplete="off"
            />
          </div>

          <!-- Command list -->
          <div class="palette-list">
            <template v-if="groupedCommands.length">
              <div
                v-for="group in groupedCommands"
                :key="group.category"
                class="palette-group"
              >
                <div class="palette-category">{{ group.category }}</div>
                <button
                  v-for="cmd in group.commands"
                  :key="cmd.id"
                  class="palette-row"
                  :class="{ selected: flatIndex(cmd) === selectedIndex }"
                  @click="onRowClick(cmd)"
                  @mouseenter="onRowMouseEnter(cmd)"
                >
                  <span class="palette-row-label">{{ cmd.label }}</span>
                  <kbd v-if="cmd.shortcut" class="palette-shortcut">{{ cmd.shortcut }}</kbd>
                </button>
              </div>
            </template>
            <div v-else class="palette-empty">No matching commands</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ── */
.palette-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  padding-block-start: 80px; /* Pushed down from top like VS Code */
  align-items: flex-start;
}

/* ── Panel ── */
.palette {
  width: 100%;
  max-width: 480px;
  background: var(--color-chrome);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-l);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 420px;
}

/* ── Search ── */
.palette-search {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-s);
  border-block-end: 1px solid rgba(255, 255, 255, 0.08);
}

.palette-search-icon {
  color: var(--color-chrome-text-muted);
  flex-shrink: 0;
}

.palette-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  font-size: var(--font-size-l);
  line-height: var(--line-height-normal);
}

.palette-input::placeholder {
  color: var(--color-chrome-text-muted);
}

/* ── Command list ── */
.palette-list {
  overflow-y: auto;
  padding: var(--space-xxs);
}

/* ── Category label ── */
.palette-group + .palette-group {
  margin-block-start: var(--space-xxs);
}

.palette-category {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-chrome-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-xxs) var(--space-xs);
}

/* ── Row ── */
.palette-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-xxs) var(--space-xs);
  border: none;
  background: transparent;
  border-radius: var(--radius-s);
  cursor: pointer;
  transition: background var(--duration-instant) var(--ease-default);
  text-align: start;
}

.palette-row.selected {
  background: var(--color-chrome-hover);
}

.palette-row-label {
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  color: var(--color-chrome-text);
  line-height: var(--line-height-normal);
}

/* ── Keyboard shortcut badge ── */
.palette-shortcut {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-size-xs);
  color: var(--color-chrome-text-faint);
  background: rgba(255, 255, 255, 0.06);
  padding: 1px var(--space-xxxs);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  line-height: 1.3;
}

/* ── Empty state ── */
.palette-empty {
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  color: var(--color-chrome-text-muted);
  padding: var(--space-m) var(--space-xs);
  text-align: center;
}

/* ── Transitions ── */
.palette-enter-active {
  transition: opacity var(--duration-fast) var(--ease-out);
}
.palette-enter-active .palette {
  transition: transform var(--duration-fast) var(--ease-out), opacity var(--duration-fast) var(--ease-out);
}

.palette-leave-active {
  transition: opacity var(--duration-instant) var(--ease-in);
}
.palette-leave-active .palette {
  transition: transform var(--duration-instant) var(--ease-in), opacity var(--duration-instant) var(--ease-in);
}

.palette-enter-from {
  opacity: 0;
}
.palette-enter-from .palette {
  opacity: 0;
  transform: scale(0.97) translateY(-5px);
}

.palette-leave-to {
  opacity: 0;
}
.palette-leave-to .palette {
  opacity: 0;
  transform: scale(0.97) translateY(-5px);
}
</style>
