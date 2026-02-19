import { ref, computed } from 'vue'

export interface WorkspacePlugin {
  name: string
  slug: string
  version: string
  status: 'clean' | 'error' | 'new'
  summary: string
}

export interface WorkspaceTheme {
  name: string
  slug: string
  parent?: string
  summary: string
}

export interface WorkspaceBlock {
  name: string
  slug: string
  version: string
  status: 'clean' | 'error' | 'new'
  summary: string
}

const plugins = ref<WorkspacePlugin[]>([
  { name: 'downstreet-reservations', slug: 'downstreet-reservations', version: '1.2.0', status: 'error', summary: '1 fatal \u00b7 3 files changed \u00b7 2m ago' },
  { name: 'downstreet-events', slug: 'downstreet-events', version: '0.4.0', status: 'clean', summary: '12/12 tests \u00b7 watching' },
  { name: 'caf\u00e9-loyalty-card', slug: 'cafe-loyalty-card', version: '0.1.0', status: 'new', summary: 'new \u00b7 no tests \u00b7 no build' },
])

const theme = ref<WorkspaceTheme>({
  name: 'flavor/downstreet',
  slug: 'flavor-downstreet',
  parent: 'Twenty Twenty-Five',
  summary: '4 template overrides \u00b7 2 style edits \u00b7 theme.json customized',
})

const blocks = ref<WorkspaceBlock[]>([
  { name: 'caf\u00e9-menu-block', slug: 'cafe-menu-block', version: '1.0.0', status: 'clean', summary: 'build clean \u00b7 registered' },
  { name: 'caf\u00e9-hours-block', slug: 'cafe-hours-block', version: '0.2.0', status: 'error', summary: 'render error in editor' },
])

export function useWorkspace() {
  const itemCounts = computed(() => ({
    plugins: plugins.value.length,
    themes: 1,
    blocks: blocks.value.length,
  }))

  const errorCount = computed(() => {
    const pluginErrors = plugins.value.filter(p => p.status === 'error').length
    const blockErrors = blocks.value.filter(b => b.status === 'error').length
    return pluginErrors + blockErrors
  })

  return { plugins, theme, blocks, itemCounts, errorCount }
}
