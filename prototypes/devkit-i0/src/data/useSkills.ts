import { ref, computed } from 'vue'

export interface Skill {
  id: string
  name: string
  description: string
}

export interface AIPlugin {
  id: string
  name: string
  description: string
  active: boolean
}

const skills = ref<Skill[]>([
  { id: 'scaffold-block', name: 'Scaffold Block', description: 'Create a new block with edit, save, and view' },
  { id: 'generate-tests', name: 'Generate Tests', description: 'PHPUnit & Jest from your code + fixtures' },
  { id: 'code-review', name: 'Code Review', description: 'AI review of staged changes + security' },
  { id: 'wpcli-runner', name: 'WP-CLI Runner', description: 'Natural language → WP-CLI commands' },
  { id: 'plugin-wizard', name: 'Plugin Wizard', description: 'Full plugin from idea to zip' },
  { id: 'theme-builder', name: 'Theme Builder', description: 'Child theme or block theme scaffolding' },
])

const aiPlugins = ref<AIPlugin[]>([
  { id: 'phpstan', name: 'PHPStan', description: 'Static analysis integration', active: true },
  { id: 'i18n-extract', name: 'i18n Extract', description: 'Translation string generation', active: true },
  { id: 'rest-docs', name: 'REST Docs', description: 'Auto-document REST endpoints', active: true },
  { id: 'block-linter', name: 'Block Linter', description: 'block.json + markup validation', active: true },
])

export function useSkills() {
  const skillCount = computed(() => skills.value.length)
  const activePluginCount = computed(() => aiPlugins.value.filter(p => p.active).length)

  return { skills, aiPlugins, skillCount, activePluginCount }
}
