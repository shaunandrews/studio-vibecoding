import { reactive } from 'vue'

export interface EnvironmentData {
  siteUrl: string
  stack: {
    wordpress: string
    php: string
    database: string
    theme: string
    pluginCount: number
  }
  debug: {
    wpDebug: boolean
    scriptDebug: boolean
    xdebug: boolean
  }
  php: {
    memoryLimit: string
    uploadLimit: string
    maxExecution: string
  }
}

const environment = reactive<EnvironmentData>({
  siteUrl: 'developer-starter.local',
  stack: {
    wordpress: '6.7.2',
    php: '8.2.14',
    database: 'SQLite',
    theme: 'developer',
    pluginCount: 4,
  },
  debug: {
    wpDebug: true,
    scriptDebug: false,
    xdebug: false,
  },
  php: {
    memoryLimit: '256M',
    uploadLimit: '64M',
    maxExecution: '30s',
  },
})

export function useEnvironment() {
  function toggleDebug(key: 'wpDebug' | 'scriptDebug' | 'xdebug') {
    environment.debug[key] = !environment.debug[key]
  }

  return { environment, toggleDebug }
}
