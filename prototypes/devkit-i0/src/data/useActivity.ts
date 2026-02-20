import { reactive } from 'vue'

export interface GitCommit {
  hash: string
  message: string
  timeAgo: string
  author: string
  filesChanged: number
  insertions: number
  deletions: number
}

export interface UncommittedFile {
  path: string
  status: 'modified' | 'added' | 'deleted' | 'renamed'
}

export interface PhpError {
  type: 'warning' | 'deprecated' | 'notice' | 'error'
  message: string
  location: string
  fullMessage: string
  count?: number
  timestamp: string
  context?: string
}

export interface ActivityData {
  git: {
    branch: string
    remoteBranch?: string
    ahead: number
    behind: number
    uncommittedCount: number
    uncommittedFiles: UncommittedFile[]
    commits: GitCommit[]
  }
  errors: {
    newCount: number
    total: number
    recent: PhpError[]
  }
}

const activity = reactive<ActivityData>({
  git: {
    branch: 'main',
    remoteBranch: 'origin/main',
    ahead: 1,
    behind: 0,
    uncommittedCount: 3,
    uncommittedFiles: [
      { path: 'my-plugin/inc/class.php', status: 'modified' },
      { path: 'theme/template-parts/hero.php', status: 'modified' },
      { path: 'my-plugin/blocks/login/index.js', status: 'added' },
    ],
    commits: [
      { hash: 'a1b2c3f', message: 'add login block', timeAgo: '2 hours ago', author: 'shaun', filesChanged: 4, insertions: 127, deletions: 3 },
      { hash: 'd4e5f6a', message: 'fix nav menu alignment', timeAgo: 'yesterday', author: 'shaun', filesChanged: 2, insertions: 8, deletions: 12 },
      { hash: '7f8g9h0', message: 'update dependencies', timeAgo: '3 days ago', author: 'shaun', filesChanged: 1, insertions: 342, deletions: 198 },
      { hash: 'b2c3d4e', message: 'scaffold custom post type', timeAgo: '4 days ago', author: 'shaun', filesChanged: 6, insertions: 89, deletions: 0 },
      { hash: 'e3f4a5b', message: 'initial theme setup', timeAgo: '5 days ago', author: 'shaun', filesChanged: 12, insertions: 456, deletions: 0 },
    ],
  },
  errors: {
    newCount: 3,
    total: 47,
    recent: [
      {
        type: 'error',
        message: 'Call to undefined function get_field()',
        location: 'theme/template-parts/hero.php:8',
        fullMessage: 'PHP Fatal error: Uncaught Error: Call to undefined function get_field() in /var/www/html/wp-content/themes/developer/template-parts/hero.php:8\nStack trace:\n#0 /var/www/html/wp-includes/template.php(812): require()\n#1 /var/www/html/wp-includes/template.php(745): load_template()\n#2 {main}',
        count: 1,
        timestamp: '2 min ago',
        context: 'ACF plugin may not be activated',
      },
      {
        type: 'warning',
        message: 'Undefined variable $foo',
        location: 'my-plugin/inc/class.php:42',
        fullMessage: 'PHP Warning: Undefined variable $foo in /var/www/html/wp-content/plugins/my-plugin/inc/class.php on line 42',
        count: 12,
        timestamp: '5 min ago',
      },
      {
        type: 'deprecated',
        message: 'strftime() is deprecated',
        location: 'theme/functions.php:118',
        fullMessage: 'PHP Deprecated: Function strftime() is deprecated since PHP 8.1. Use IntlDateFormatter::format() instead in /var/www/html/wp-content/themes/developer/functions.php on line 118',
        count: 3,
        timestamp: '12 min ago',
        context: 'Use IntlDateFormatter::format() instead',
      },
      {
        type: 'notice',
        message: 'Trying to access array offset on value of type bool',
        location: 'my-plugin/inc/api.php:156',
        fullMessage: 'PHP Notice: Trying to access array offset on value of type bool in /var/www/html/wp-content/plugins/my-plugin/inc/api.php on line 156',
        count: 8,
        timestamp: '15 min ago',
      },
    ],
  },
})

export function useActivity() {
  return { activity }
}
