import { computed, reactive } from 'vue'

export type EventType = 'git' | 'wordpress' | 'error' | 'system' | 'agent'

export interface TimelineEvent {
  id: string
  type: EventType
  title: string
  description?: string
  timestamp: string
  timeAgo: string
  // Git
  hash?: string
  diffStats?: { files: number; insertions: number; deletions: number }
  // WordPress
  wpAction?: string
  postTitle?: string
  // Errors
  errorLevel?: 'warning' | 'deprecated' | 'notice' | 'error'
  location?: string
  fullMessage?: string
  errorCount?: number
  context?: string
  // Agent
  agentName?: string
}

const events = reactive<TimelineEvent[]>([
  // ── Today ──
  {
    id: '1',
    type: 'error',
    title: 'Call to undefined function get_field()',
    errorLevel: 'error',
    location: 'theme/template-parts/hero.php:8',
    fullMessage: 'PHP Fatal error: Uncaught Error: Call to undefined function get_field() in /var/www/html/wp-content/themes/developer/template-parts/hero.php:8\nStack trace:\n#0 /var/www/html/wp-includes/template.php(812): require()\n#1 {main}',
    errorCount: 1,
    context: 'ACF plugin may not be activated',
    timestamp: '2026-02-20T14:32:00',
    timeAgo: '2 min ago',
  },
  {
    id: '2',
    type: 'git',
    title: 'add login block',
    hash: 'a1b2c3f',
    diffStats: { files: 4, insertions: 127, deletions: 3 },
    timestamp: '2026-02-20T12:15:00',
    timeAgo: '2 hours ago',
  },
  {
    id: '3',
    type: 'agent',
    title: 'Generated login block scaffold',
    description: 'Created block.json, edit.js, save.js, and style.scss for login block',
    agentName: 'Kit',
    timestamp: '2026-02-20T12:10:00',
    timeAgo: '2 hours ago',
  },
  {
    id: '4',
    type: 'wordpress',
    title: 'Activated plugin',
    wpAction: 'plugin_activate',
    description: 'Developer Login Block',
    timestamp: '2026-02-20T12:08:00',
    timeAgo: '2 hours ago',
  },
  {
    id: '5',
    type: 'error',
    title: 'Undefined variable $foo',
    errorLevel: 'warning',
    location: 'my-plugin/inc/class.php:42',
    fullMessage: 'PHP Warning: Undefined variable $foo in /var/www/html/wp-content/plugins/my-plugin/inc/class.php on line 42',
    errorCount: 12,
    timestamp: '2026-02-20T11:45:00',
    timeAgo: '3 hours ago',
  },
  {
    id: '6',
    type: 'wordpress',
    title: 'Published post',
    wpAction: 'publish_post',
    postTitle: 'Getting Started with Block Development',
    timestamp: '2026-02-20T10:30:00',
    timeAgo: '4 hours ago',
  },
  {
    id: '7',
    type: 'wordpress',
    title: 'Updated site settings',
    wpAction: 'update_option',
    description: 'Changed permalink structure to /%postname%/',
    timestamp: '2026-02-20T10:15:00',
    timeAgo: '4 hours ago',
  },

  // ── Yesterday ──
  {
    id: '8',
    type: 'git',
    title: 'fix nav menu alignment',
    hash: 'd4e5f6a',
    diffStats: { files: 2, insertions: 8, deletions: 12 },
    timestamp: '2026-02-19T16:30:00',
    timeAgo: 'yesterday',
  },
  {
    id: '9',
    type: 'wordpress',
    title: 'Created page',
    wpAction: 'publish_page',
    postTitle: 'About Us',
    timestamp: '2026-02-19T15:00:00',
    timeAgo: 'yesterday',
  },
  {
    id: '10',
    type: 'error',
    title: 'strftime() is deprecated',
    errorLevel: 'deprecated',
    location: 'theme/functions.php:118',
    fullMessage: 'PHP Deprecated: Function strftime() is deprecated since PHP 8.1. Use IntlDateFormatter::format() instead in /var/www/html/wp-content/themes/developer/functions.php on line 118',
    errorCount: 3,
    context: 'Use IntlDateFormatter::format() instead',
    timestamp: '2026-02-19T14:20:00',
    timeAgo: 'yesterday',
  },
  {
    id: '11',
    type: 'agent',
    title: 'Suggested nav menu fix',
    description: 'Identified CSS specificity conflict in header.php causing menu misalignment',
    agentName: 'Kit',
    timestamp: '2026-02-19T14:00:00',
    timeAgo: 'yesterday',
  },
  {
    id: '12',
    type: 'system',
    title: 'Plugin auto-updated',
    description: 'Jetpack 14.2 → 14.3',
    timestamp: '2026-02-19T04:00:00',
    timeAgo: 'yesterday',
  },

  // ── Earlier ──
  {
    id: '13',
    type: 'git',
    title: 'update dependencies',
    hash: '7f8g9h0',
    diffStats: { files: 1, insertions: 342, deletions: 198 },
    timestamp: '2026-02-17T11:00:00',
    timeAgo: '3 days ago',
  },
  {
    id: '14',
    type: 'wordpress',
    title: 'Published post',
    wpAction: 'publish_post',
    postTitle: 'Hello World — Welcome to Developer Starter',
    timestamp: '2026-02-17T09:00:00',
    timeAgo: '3 days ago',
  },
  {
    id: '15',
    type: 'git',
    title: 'scaffold custom post type',
    hash: 'b2c3d4e',
    diffStats: { files: 6, insertions: 89, deletions: 0 },
    timestamp: '2026-02-16T14:00:00',
    timeAgo: '4 days ago',
  },
  {
    id: '16',
    type: 'system',
    title: 'WordPress updated',
    description: '6.7.1 → 6.7.2',
    timestamp: '2026-02-16T04:00:00',
    timeAgo: '4 days ago',
  },
  {
    id: '17',
    type: 'git',
    title: 'initial theme setup',
    hash: 'e3f4a5b',
    diffStats: { files: 12, insertions: 456, deletions: 0 },
    timestamp: '2026-02-15T10:00:00',
    timeAgo: '5 days ago',
  },
  {
    id: '18',
    type: 'wordpress',
    title: 'Activated theme',
    wpAction: 'switch_theme',
    description: 'developer',
    timestamp: '2026-02-15T09:30:00',
    timeAgo: '5 days ago',
  },
])

function getDateGroup(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date('2026-02-20T14:34:00')
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return 'This week'
  return 'Earlier'
}

export interface GroupedEvents {
  label: string
  events: TimelineEvent[]
}

const grouped = computed<GroupedEvents[]>(() => {
  const groups: Map<string, TimelineEvent[]> = new Map()
  for (const event of events) {
    const label = getDateGroup(event.timestamp)
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label)!.push(event)
  }
  return Array.from(groups.entries()).map(([label, evts]) => ({ label, events: evts }))
})

export function useTimeline() {
  return { events, grouped }
}
