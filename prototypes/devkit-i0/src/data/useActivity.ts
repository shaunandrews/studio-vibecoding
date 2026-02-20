import { reactive } from 'vue'

export interface GitCommit {
  hash: string
  message: string
  timeAgo: string
}

export interface PhpError {
  type: 'warning' | 'deprecated' | 'notice' | 'error'
  message: string
  location: string
}

export interface ActivityData {
  git: {
    branch: string
    uncommittedCount: number
    commits: GitCommit[]
  }
  errors: {
    newCount: number
    recent: PhpError[]
  }
  build: {
    status: 'watching' | 'building' | 'idle' | 'error'
    tool: string
    lastBuild: string
    lastBuildSuccess: boolean
  }
}

const activity = reactive<ActivityData>({
  git: {
    branch: 'main',
    uncommittedCount: 3,
    commits: [
      { hash: 'a1b2c3f', message: 'add login block', timeAgo: '2 hours ago' },
      { hash: 'd4e5f6a', message: 'fix nav menu alignment', timeAgo: 'yesterday' },
      { hash: '7f8g9h0', message: 'update dependencies', timeAgo: '3 days ago' },
      { hash: 'b2c3d4e', message: 'scaffold custom post type', timeAgo: '4 days ago' },
    ],
  },
  errors: {
    newCount: 3,
    recent: [
      { type: 'warning', message: 'Undefined variable $foo', location: 'my-plugin/inc/class.php:42' },
      { type: 'deprecated', message: 'strftime() is deprecated', location: 'theme/functions.php:118' },
    ],
  },
  build: {
    status: 'watching',
    tool: 'wp-scripts',
    lastBuild: '2m ago',
    lastBuildSuccess: true,
  },
})

export function useActivity() {
  return { activity }
}
