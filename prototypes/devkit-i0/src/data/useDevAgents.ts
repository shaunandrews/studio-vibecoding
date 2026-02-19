import { ref, computed } from 'vue'

export interface DevAgent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error' | 'off'
  summary: string
  lastEvent?: string
}

const agents = ref<DevAgent[]>([
  {
    id: 'error-watcher',
    name: 'Error Watcher',
    status: 'error',
    summary: '3 new warnings',
    lastEvent: '1 fatal found 2m ago',
  },
  {
    id: 'test-runner',
    name: 'Test Runner',
    status: 'active',
    summary: '12/12 passing',
  },
  {
    id: 'code-review',
    name: 'Code Review',
    status: 'active',
    summary: 'Watching 3 plugins',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    status: 'off',
    summary: 'Not configured',
  },
])

export function useDevAgents() {
  const attentionCount = computed(() =>
    agents.value.filter(a => a.status === 'error').length
  )

  return { agents, attentionCount }
}
