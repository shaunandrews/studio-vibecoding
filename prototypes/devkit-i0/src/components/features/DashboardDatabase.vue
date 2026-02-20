<script setup lang="ts">
import { ref, computed, reactive, nextTick, onMounted, onUnmounted } from 'vue'
import { chevronRight, chevronDown, arrowUp, arrowDown } from '@wordpress/icons'
import WPIcon from '@/components/primitives/WPIcon.vue'

// ─── Types ───────────────────────────────────────────────────────────────────

interface TableInfo {
  name: string
  rowCount: number
}

interface ColumnDef {
  key: string
  label: string
  primaryKey?: boolean
}

interface TableGroup {
  name: string
  tables: TableInfo[]
  collapsed: boolean
}

type CellValue = string | number | null

interface SortState {
  column: string
  direction: 'asc' | 'desc'
}

interface FilterState {
  active: boolean
  expanded: boolean
  column: string
  value: string
}

interface EditingCell {
  rowIndex: number
  column: string
}

interface PendingChange {
  rowIndex: number
  column: string
  oldValue: CellValue
  newValue: CellValue
}

interface DetailPopover {
  visible: boolean
  content: string
  formattedContent: string
  x: number
  y: number
}

type CellType = 'null' | 'empty' | 'date' | 'serialized' | 'status-draft' | 'status-trash' | 'autoload-no' | 'autoload-yes' | 'numeric' | 'long' | 'normal'

// ─── Mock Data ───────────────────────────────────────────────────────────────

const tables: TableInfo[] = [
  { name: 'wp_posts', rowCount: 247 },
  { name: 'wp_postmeta', rowCount: 1843 },
  { name: 'wp_options', rowCount: 392 },
  { name: 'wp_users', rowCount: 3 },
  { name: 'wp_usermeta', rowCount: 67 },
  { name: 'wp_comments', rowCount: 14 },
  { name: 'wp_commentmeta', rowCount: 6 },
  { name: 'wp_terms', rowCount: 18 },
  { name: 'wp_termmeta', rowCount: 4 },
  { name: 'wp_term_taxonomy', rowCount: 18 },
  { name: 'wp_term_relationships', rowCount: 42 },
  { name: 'wp_links', rowCount: 0 },
]

const sidebarGroups = reactive<TableGroup[]>([
  {
    name: 'Core',
    collapsed: false,
    tables,
  },
])

const activeTable = ref('wp_posts')

const tableColumns: Record<string, ColumnDef[]> = {
  wp_posts: [
    { key: 'ID', label: 'ID', primaryKey: true },
    { key: 'post_title', label: 'post_title' },
    { key: 'post_status', label: 'post_status' },
    { key: 'post_type', label: 'post_type' },
    { key: 'post_date', label: 'post_date' },
  ],
  wp_postmeta: [
    { key: 'meta_id', label: 'meta_id', primaryKey: true },
    { key: 'post_id', label: 'post_id' },
    { key: 'meta_key', label: 'meta_key' },
    { key: 'meta_value', label: 'meta_value' },
  ],
  wp_options: [
    { key: 'option_id', label: 'option_id', primaryKey: true },
    { key: 'option_name', label: 'option_name' },
    { key: 'option_value', label: 'option_value' },
    { key: 'autoload', label: 'autoload' },
  ],
  wp_users: [
    { key: 'ID', label: 'ID', primaryKey: true },
    { key: 'user_login', label: 'user_login' },
    { key: 'user_email', label: 'user_email' },
    { key: 'user_registered', label: 'user_registered' },
    { key: 'display_name', label: 'display_name' },
  ],
  wp_usermeta: [
    { key: 'umeta_id', label: 'umeta_id', primaryKey: true },
    { key: 'user_id', label: 'user_id' },
    { key: 'meta_key', label: 'meta_key' },
    { key: 'meta_value', label: 'meta_value' },
  ],
  wp_comments: [
    { key: 'comment_ID', label: 'comment_ID', primaryKey: true },
    { key: 'comment_post_ID', label: 'comment_post_ID' },
    { key: 'comment_author', label: 'comment_author' },
    { key: 'comment_content', label: 'comment_content' },
    { key: 'comment_date', label: 'comment_date' },
  ],
  wp_commentmeta: [
    { key: 'meta_id', label: 'meta_id', primaryKey: true },
    { key: 'comment_id', label: 'comment_id' },
    { key: 'meta_key', label: 'meta_key' },
    { key: 'meta_value', label: 'meta_value' },
  ],
  wp_terms: [
    { key: 'term_id', label: 'term_id', primaryKey: true },
    { key: 'name', label: 'name' },
    { key: 'slug', label: 'slug' },
    { key: 'term_group', label: 'term_group' },
  ],
  wp_termmeta: [
    { key: 'meta_id', label: 'meta_id', primaryKey: true },
    { key: 'term_id', label: 'term_id' },
    { key: 'meta_key', label: 'meta_key' },
    { key: 'meta_value', label: 'meta_value' },
  ],
  wp_term_taxonomy: [
    { key: 'term_taxonomy_id', label: 'term_taxonomy_id', primaryKey: true },
    { key: 'term_id', label: 'term_id' },
    { key: 'taxonomy', label: 'taxonomy' },
    { key: 'description', label: 'description' },
    { key: 'count', label: 'count' },
  ],
  wp_term_relationships: [
    { key: 'object_id', label: 'object_id', primaryKey: true },
    { key: 'term_taxonomy_id', label: 'term_taxonomy_id' },
    { key: 'term_order', label: 'term_order' },
  ],
  wp_links: [
    { key: 'link_id', label: 'link_id', primaryKey: true },
    { key: 'link_url', label: 'link_url' },
    { key: 'link_name', label: 'link_name' },
    { key: 'link_visible', label: 'link_visible' },
  ],
}

const tableRows: Record<string, Record<string, CellValue>[]> = {
  wp_posts: [
    { ID: 1, post_title: 'Hello world!', post_status: 'publish', post_type: 'post', post_date: '2026-01-15 09:23:41' },
    { ID: 2, post_title: 'Sample Page', post_status: 'publish', post_type: 'page', post_date: '2026-01-15 09:23:41' },
    { ID: 3, post_title: 'Privacy Policy', post_status: 'draft', post_type: 'page', post_date: '2026-01-15 09:23:41' },
    { ID: 4, post_title: null, post_status: 'publish', post_type: 'wp_navigation', post_date: '2026-01-15 09:24:02' },
    { ID: 5, post_title: 'Our Story', post_status: 'publish', post_type: 'page', post_date: '2026-01-28 14:11:07' },
    { ID: 6, post_title: 'Weekly specials are back', post_status: 'publish', post_type: 'post', post_date: '2026-02-03 10:45:19' },
    { ID: 7, post_title: 'New hours starting March', post_status: 'draft', post_type: 'post', post_date: '2026-02-10 16:32:55' },
    { ID: 8, post_title: 'Header', post_status: 'publish', post_type: 'wp_template_part', post_date: '2026-01-15 09:24:02' },
    { ID: 9, post_title: 'Old announcement', post_status: 'trash', post_type: 'post', post_date: '2025-12-01 08:00:00' },
    { ID: 10, post_title: 'Contact Us', post_status: 'pending', post_type: 'page', post_date: '2026-02-14 11:20:00' },
    { ID: 11, post_title: '', post_status: 'publish', post_type: 'wp_global_styles', post_date: '2026-01-15 09:24:02' },
  ],
  wp_postmeta: [
    { meta_id: 1, post_id: 1, meta_key: '_edit_last', meta_value: '1' },
    { meta_id: 2, post_id: 1, meta_key: '_edit_lock', meta_value: '1706882621:1' },
    { meta_id: 3, post_id: 2, meta_key: '_wp_page_template', meta_value: 'default' },
    { meta_id: 4, post_id: 5, meta_key: '_edit_last', meta_value: '1' },
    { meta_id: 5, post_id: 5, meta_key: '_thumbnail_id', meta_value: '12' },
    { meta_id: 6, post_id: 6, meta_key: '_edit_last', meta_value: '2' },
    { meta_id: 7, post_id: 9, meta_key: '_wp_trash_meta_status', meta_value: 'publish' },
    { meta_id: 8, post_id: 9, meta_key: '_wp_trash_meta_time', meta_value: '1738400000' },
    { meta_id: 9, post_id: 3, meta_key: '_wp_page_template', meta_value: null },
  ],
  wp_options: [
    { option_id: 1, option_name: 'siteurl', option_value: 'http://localhost:8881', autoload: 'yes' },
    { option_id: 2, option_name: 'home', option_value: 'http://localhost:8881', autoload: 'yes' },
    { option_id: 3, option_name: 'blogname', option_value: 'Downstreet Cafe', autoload: 'yes' },
    { option_id: 4, option_name: 'blogdescription', option_value: 'Good food, good people', autoload: 'yes' },
    { option_id: 5, option_name: 'active_plugins', option_value: 'a:3:{i:0;s:35:"downstreet-reservations/plugin.php";i:1;s:29:"jetpack/jetpack.php";i:2;s:41:"wordpress-seo/wp-seo.php";}', autoload: 'yes' },
    { option_id: 6, option_name: 'template', option_value: 'downstreet-starter', autoload: 'yes' },
    { option_id: 7, option_name: 'stylesheet', option_value: 'downstreet-starter', autoload: 'yes' },
    { option_id: 8, option_name: 'cron', option_value: 'a:5:{i:1708012800;a:1:{s:16:"wp_version_check";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}}i:1708012801;a:1:{s:17:"wp_update_plugins";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}}i:1708012802;a:1:{s:16:"wp_update_themes";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}}i:1708099200;a:1:{s:30:"wp_site_health_scheduled_check";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:6:"weekly";s:4:"args";a:0:{}s:8:"interval";i:604800;}}}s:7:"version";i:2;}', autoload: 'yes' },
    { option_id: 9, option_name: 'widget_block', option_value: 'a:1:{s:12:"_multiwidget";i:1;}', autoload: 'yes' },
    { option_id: 10, option_name: 'sidebars_widgets', option_value: 'a:2:{s:19:"wp_inactive_widgets";a:0:{}s:13:"array_version";i:3;}', autoload: 'yes' },
    { option_id: 11, option_name: '_transient_timeout_feed_mod_abcdef', option_value: '1708099200', autoload: 'no' },
    { option_id: 12, option_name: '_transient_feed_mod_abcdef', option_value: '1708012800', autoload: 'no' },
    { option_id: 13, option_name: '_site_transient_timeout_browser_check', option_value: '1708617600', autoload: 'no' },
    { option_id: 14, option_name: 'recently_activated', option_value: 'a:0:{}', autoload: 'no' },
    { option_id: 15, option_name: 'auto_update_core_dev', option_value: 'enabled', autoload: 'yes' },
    { option_id: 16, option_name: 'finished_updating_comment_type', option_value: null, autoload: 'yes' },
    { option_id: 17, option_name: 'db_version', option_value: '57155', autoload: 'yes' },
  ],
  wp_users: [
    { ID: 1, user_login: 'admin', user_email: 'admin@localhost.com', user_registered: '2026-01-15 09:23:41', display_name: 'Admin' },
    { ID: 2, user_login: 'shaun', user_email: 'shaun@example.com', user_registered: '2026-01-20 11:04:33', display_name: 'Shaun Andrews' },
    { ID: 3, user_login: 'editor', user_email: 'editor@localhost.com', user_registered: '2026-02-01 08:15:00', display_name: 'Test Editor' },
  ],
  wp_usermeta: [
    { umeta_id: 1, user_id: 1, meta_key: 'nickname', meta_value: 'admin' },
    { umeta_id: 2, user_id: 1, meta_key: 'wp_capabilities', meta_value: 'a:1:{s:13:"administrator";b:1;}' },
    { umeta_id: 3, user_id: 1, meta_key: 'session_tokens', meta_value: 'a:1:{s:64:"abc123def456abc123def456abc123def456abc123def456abc123def456abcd";a:4:{s:10:"expiration";i:1708099200;s:2:"ip";s:9:"127.0.0.1";s:2:"ua";s:68:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";s:5:"login";i:1707926400;}}' },
    { umeta_id: 4, user_id: 2, meta_key: 'nickname', meta_value: 'shaun' },
    { umeta_id: 5, user_id: 2, meta_key: 'wp_capabilities', meta_value: 'a:1:{s:13:"administrator";b:1;}' },
    { umeta_id: 6, user_id: 2, meta_key: 'description', meta_value: '' },
    { umeta_id: 7, user_id: 3, meta_key: 'nickname', meta_value: 'editor' },
    { umeta_id: 8, user_id: 3, meta_key: 'wp_capabilities', meta_value: 'a:1:{s:6:"editor";b:1;}' },
    { umeta_id: 9, user_id: 3, meta_key: 'last_activity', meta_value: null },
  ],
  wp_comments: [
    { comment_ID: 1, comment_post_ID: 1, comment_author: 'A WordPress Commenter', comment_content: 'Hi, this is a comment. To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.', comment_date: '2026-01-15 09:23:41' },
    { comment_ID: 2, comment_post_ID: 6, comment_author: 'Test Editor', comment_content: 'Looking forward to the specials!', comment_date: '2026-02-04 11:20:03' },
    { comment_ID: 3, comment_post_ID: 1, comment_author: 'shaun', comment_content: 'Testing the comment system.', comment_date: '2026-02-05 14:55:12' },
    { comment_ID: 4, comment_post_ID: 6, comment_author: 'admin', comment_content: 'Thanks for the feedback!', comment_date: '2026-02-06 09:10:44' },
    { comment_ID: 5, comment_post_ID: 5, comment_author: 'editor', comment_content: null, comment_date: '2026-02-08 16:30:00' },
  ],
  wp_commentmeta: [
    { meta_id: 1, comment_id: 2, meta_key: '_wp_trash_meta_status', meta_value: 'approved' },
    { meta_id: 2, comment_id: 3, meta_key: '_wp_trash_meta_status', meta_value: 'approved' },
    { meta_id: 3, comment_id: 1, meta_key: '_wp_comment_author_IP', meta_value: '127.0.0.1' },
  ],
  wp_terms: [
    { term_id: 1, name: 'Uncategorized', slug: 'uncategorized', term_group: 0 },
    { term_id: 2, name: 'News', slug: 'news', term_group: 0 },
    { term_id: 3, name: 'Specials', slug: 'specials', term_group: 0 },
    { term_id: 4, name: 'Events', slug: 'events', term_group: 0 },
    { term_id: 5, name: 'Main Menu', slug: 'main-menu', term_group: 0 },
    { term_id: 6, name: 'Footer Menu', slug: 'footer-menu', term_group: 0 },
  ],
  wp_termmeta: [
    { meta_id: 1, term_id: 2, meta_key: 'order', meta_value: '0' },
    { meta_id: 2, term_id: 3, meta_key: 'order', meta_value: '1' },
    { meta_id: 3, term_id: 5, meta_key: 'order', meta_value: '0' },
  ],
  wp_term_taxonomy: [
    { term_taxonomy_id: 1, term_id: 1, taxonomy: 'category', description: '', count: 1 },
    { term_taxonomy_id: 2, term_id: 2, taxonomy: 'category', description: 'Latest news', count: 2 },
    { term_taxonomy_id: 3, term_id: 3, taxonomy: 'post_tag', description: '', count: 1 },
    { term_taxonomy_id: 4, term_id: 4, taxonomy: 'post_tag', description: '', count: 0 },
    { term_taxonomy_id: 5, term_id: 5, taxonomy: 'nav_menu', description: '', count: 4 },
    { term_taxonomy_id: 6, term_id: 6, taxonomy: 'nav_menu', description: '', count: 3 },
  ],
  wp_term_relationships: [
    { object_id: 1, term_taxonomy_id: 1, term_order: 0 },
    { object_id: 1, term_taxonomy_id: 2, term_order: 0 },
    { object_id: 6, term_taxonomy_id: 2, term_order: 0 },
    { object_id: 6, term_taxonomy_id: 3, term_order: 0 },
    { object_id: 7, term_taxonomy_id: 2, term_order: 0 },
  ],
  wp_links: [],
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_SIDEBAR_WIDTH = 100
const MAX_SIDEBAR_WIDTH = 250

// ─── State ───────────────────────────────────────────────────────────────────

const sidebarWidth = ref(130)
const isSidebarDragging = ref(false)

const sort = ref<SortState | null>(null)
const filter = reactive<FilterState>({ active: false, expanded: false, column: '', value: '' })
const editing = ref<EditingCell | null>(null)
const editValue = ref('')
const editInputRef = ref<HTMLInputElement | null>(null)
const pendingChanges = reactive<Map<string, PendingChange>>(new Map())
const sqlEditorOpen = ref(false)
const sqlQuery = ref('')
const actionsDropdownOpen = ref(false)
const detailPopover = reactive<DetailPopover>({
  visible: false,
  content: '',
  formattedContent: '',
  x: 0,
  y: 0,
})

// Autoload health
const autoloadSize = 342 // KB -- mock value
const autoloadLabel = computed(() => `${autoloadSize} KB`)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function abbreviateCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

function stripPrefix(name: string): string {
  return name.replace(/^wp_/, '')
}

function formatDate(val: string): string {
  const d = new Date(val.replace(' ', 'T'))
  if (isNaN(d.getTime())) return val
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const day = d.getDate()
  const year = String(d.getFullYear()).slice(2)
  let hours = d.getHours()
  const ampm = hours >= 12 ? 'p' : 'a'
  hours = hours % 12 || 12
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${month} ${day} '${year} ${hours}:${mins}${ampm}`
}

function isSerialized(val: string): boolean {
  return /^[aOsbidn]:\d+[:{]/.test(val)
}

function isNumeric(val: CellValue): boolean {
  if (val === null || val === '') return false
  if (typeof val === 'number') return true
  return /^-?\d+(\.\d+)?$/.test(String(val))
}

function isDateColumn(key: string): boolean {
  return /_date$/.test(key) || /_registered$/.test(key)
}

function formatSerializedPhp(raw: string): string {
  let result = ''
  let depth = 0
  let i = 0
  const indent = () => '  '.repeat(depth)

  while (i < raw.length) {
    const arrMatch = raw.slice(i).match(/^a:(\d+):\{/)
    if (arrMatch) {
      result += `array(${arrMatch[1]}) {\n`
      depth++
      i += arrMatch[0].length
      continue
    }
    const objMatch = raw.slice(i).match(/^O:\d+:"([^"]+)":(\d+):\{/)
    if (objMatch) {
      result += `${objMatch[1]}(${objMatch[2]}) {\n`
      depth++
      i += objMatch[0].length
      continue
    }
    const strMatch = raw.slice(i).match(/^s:(\d+):"/)
    if (strMatch) {
      const len = parseInt(strMatch[1], 10)
      const start = i + strMatch[0].length
      const strVal = raw.slice(start, start + len)
      result += `${indent()}"${strVal}"\n`
      i = start + len + 2
      continue
    }
    const intMatch = raw.slice(i).match(/^i:(-?\d+);/)
    if (intMatch) {
      result += `${indent()}${intMatch[1]}\n`
      i += intMatch[0].length
      continue
    }
    const boolMatch = raw.slice(i).match(/^b:([01]);/)
    if (boolMatch) {
      result += `${indent()}${boolMatch[1] === '1' ? 'true' : 'false'}\n`
      i += boolMatch[0].length
      continue
    }
    if (raw[i] === 'N' && raw[i + 1] === ';') {
      result += `${indent()}null\n`
      i += 2
      continue
    }
    if (raw[i] === '}') {
      depth = Math.max(0, depth - 1)
      result += `${indent()}}\n`
      i++
      continue
    }
    i++
  }

  return result.trim()
}

// ─── Computed: Columns & Rows ────────────────────────────────────────────────

const columns = computed(() => tableColumns[activeTable.value] ?? [])

const baseRows = computed(() => tableRows[activeTable.value] ?? [])

const filteredRows = computed(() => {
  let rows = baseRows.value
  if (filter.active && filter.column && filter.value) {
    const col = filter.column
    const val = filter.value.toLowerCase()
    rows = rows.filter(row => {
      const cell = row[col]
      if (cell === null) return 'null'.includes(val)
      return String(cell).toLowerCase().includes(val)
    })
  }
  return rows
})

const sortedRows = computed(() => {
  const rows = [...filteredRows.value]
  if (!sort.value) return rows
  const { column, direction } = sort.value
  const mult = direction === 'asc' ? 1 : -1
  rows.sort((a, b) => {
    const av = a[column]
    const bv = b[column]
    if (av === null && bv === null) return 0
    if (av === null) return 1
    if (bv === null) return -1
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * mult
    return String(av).localeCompare(String(bv)) * mult
  })
  return rows
})

const totalRowCount = computed(() => {
  const info = tables.find(t => t.name === activeTable.value)
  return info?.rowCount ?? 0
})

const filteredRowCount = computed(() => sortedRows.value.length)

const pendingCount = computed(() => pendingChanges.size)

// ─── Cell Type Detection ─────────────────────────────────────────────────────

function getCellType(column: string, value: CellValue): CellType {
  if (value === null) return 'null'
  const str = String(value)
  if (str === '' && typeof value === 'string') return 'empty'
  if (isDateColumn(column)) return 'date'
  if (typeof value === 'string' && isSerialized(value)) return 'serialized'
  if (column === 'post_status') {
    if (value === 'draft' || value === 'pending') return 'status-draft'
    if (value === 'trash') return 'status-trash'
  }
  if (column === 'autoload') {
    if (value === 'no') return 'autoload-no'
    return 'autoload-yes'
  }
  if (isNumeric(value)) return 'numeric'
  if (str.length > 60) return 'long'
  return 'normal'
}

function getCellDisplay(column: string, value: CellValue): string {
  const type = getCellType(column, value)
  switch (type) {
    case 'null': return '\u2300'
    case 'empty': return 'empty'
    case 'date': return formatDate(String(value))
    case 'serialized': return '{...}'
    case 'long': return String(value).slice(0, 60) + '\u2026'
    default: return String(value ?? '')
  }
}

// ─── Pending Change Key ──────────────────────────────────────────────────────

function changeKey(rowIndex: number, column: string): string {
  return `${rowIndex}:${column}`
}

function getEffectiveValue(rowIndex: number, column: string, originalValue: CellValue): CellValue {
  const key = changeKey(rowIndex, column)
  const change = pendingChanges.get(key)
  return change ? change.newValue : originalValue
}

function hasPendingChange(rowIndex: number, column: string): boolean {
  return pendingChanges.has(changeKey(rowIndex, column))
}

// ─── Cell Classes & Click Handler ────────────────────────────────────────────

function cellClasses(column: string, value: CellValue, rowIndex: number): Record<string, boolean> {
  const type = getCellType(column, value)
  return {
    'db__td--null': type === 'null',
    'db__td--empty-str': type === 'empty',
    'db__td--date': type === 'date',
    'db__td--serialized': type === 'serialized',
    'db__td--status-draft': type === 'status-draft',
    'db__td--status-trash': type === 'status-trash',
    'db__td--autoload-no': type === 'autoload-no',
    'db__td--numeric': type === 'numeric',
    'db__td--long': type === 'long',
    'db__td--pending': hasPendingChange(rowIndex, column),
    'db__td--pk': columns.value.find(c => c.key === column)?.primaryKey === true,
  }
}

function onCellClick(event: MouseEvent, rowIndex: number, column: string, value: CellValue) {
  const type = getCellType(column, value)
  if (type === 'serialized' || type === 'long') {
    showDetail(event, column, value)
    return
  }
  startEdit(rowIndex, column, value)
}

// ─── Sort ────────────────────────────────────────────────────────────────────

function toggleSort(column: string) {
  if (!sort.value || sort.value.column !== column) {
    sort.value = { column, direction: 'asc' }
  } else if (sort.value.direction === 'asc') {
    sort.value = { column, direction: 'desc' }
  } else {
    sort.value = null
  }
}

// ─── Filter ──────────────────────────────────────────────────────────────────

function toggleFilter() {
  if (filter.expanded) {
    clearFilter()
  } else {
    filter.expanded = true
    if (!filter.column && columns.value.length > 0) {
      filter.column = columns.value[0].key
    }
  }
}

function applyFilter() {
  filter.active = filter.value.length > 0
}

function clearFilter() {
  filter.active = false
  filter.expanded = false
  filter.column = ''
  filter.value = ''
}

// ─── Editing ─────────────────────────────────────────────────────────────────

function startEdit(rowIndex: number, column: string, currentValue: CellValue) {
  const colDef = columns.value.find(c => c.key === column)
  if (colDef?.primaryKey) return

  editing.value = { rowIndex, column }
  editValue.value = currentValue === null ? '' : String(currentValue)
  nextTick(() => {
    editInputRef.value?.focus()
    editInputRef.value?.select()
  })
}

function confirmEdit() {
  if (!editing.value) return
  const { rowIndex, column } = editing.value
  const originalRow = sortedRows.value[rowIndex]
  if (!originalRow) { cancelEdit(); return }
  const originalValue = originalRow[column]
  const newValue = editValue.value

  const originalStr = originalValue === null ? '' : String(originalValue)
  if (newValue !== originalStr) {
    const key = changeKey(rowIndex, column)
    pendingChanges.set(key, {
      rowIndex,
      column,
      oldValue: originalValue,
      newValue: newValue === '' ? '' : (isNumeric(newValue) ? Number(newValue) : newValue),
    })
  }
  editing.value = null
}

function cancelEdit() {
  editing.value = null
}

function discardChanges() {
  pendingChanges.clear()
}

function commitChanges() {
  pendingChanges.clear()
}

// ─── Detail Popover ──────────────────────────────────────────────────────────

function showDetail(event: MouseEvent, column: string, value: CellValue) {
  if (value === null) return
  const raw = String(value)
  const type = getCellType(column, value)
  if (type !== 'serialized' && type !== 'long') return

  const rect = (event.target as HTMLElement).getBoundingClientRect()
  detailPopover.content = raw
  detailPopover.formattedContent = type === 'serialized' ? formatSerializedPhp(raw) : raw
  detailPopover.x = Math.min(rect.x, window.innerWidth - 320)
  detailPopover.y = rect.y + rect.height + 5
  if (detailPopover.y + 220 > window.innerHeight) {
    detailPopover.y = rect.y - 210
  }
  detailPopover.visible = true
}

function closeDetail() {
  detailPopover.visible = false
}

// ─── Actions Dropdown ────────────────────────────────────────────────────────

function toggleActions() {
  actionsDropdownOpen.value = !actionsDropdownOpen.value
}

// ─── Global Click & Key Handlers ─────────────────────────────────────────────

function handleGlobalClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (actionsDropdownOpen.value && !target.closest('.db__actions-wrap')) {
    actionsDropdownOpen.value = false
  }
  if (detailPopover.visible && !target.closest('.db__detail')) {
    closeDetail()
  }
}

function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (editing.value) { cancelEdit(); return }
    if (detailPopover.visible) { closeDetail(); return }
    if (actionsDropdownOpen.value) { actionsDropdownOpen.value = false; return }
  }
}

onMounted(() => {
  document.addEventListener('click', handleGlobalClick, true)
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick, true)
  document.removeEventListener('keydown', handleGlobalKeydown)
})

// ─── Sidebar Resize ──────────────────────────────────────────────────────────

function onSidebarPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isSidebarDragging.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('pointermove', onSidebarPointerMove)
  document.addEventListener('pointerup', onSidebarPointerUp)
}

function onSidebarPointerMove(e: PointerEvent) {
  if (!isSidebarDragging.value) return
  const db = document.querySelector('.db')
  if (!db) return
  const rect = db.getBoundingClientRect()
  const rawWidth = e.clientX - rect.left
  sidebarWidth.value = Math.round(Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, rawWidth)))
}

function onSidebarPointerUp() {
  isSidebarDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.removeEventListener('pointermove', onSidebarPointerMove)
  document.removeEventListener('pointerup', onSidebarPointerUp)
}

// ─── Table Selection ─────────────────────────────────────────────────────────

function selectTable(name: string) {
  activeTable.value = name
  sort.value = null
  clearFilter()
  editing.value = null
  pendingChanges.clear()
  sqlEditorOpen.value = false
}
</script>

<template>
  <div class="db" :class="{ 'is-dragging-sidebar': isSidebarDragging }">
    <!-- Sidebar -->
    <div class="db__sidebar" :style="{ width: sidebarWidth + 'px' }">
      <div class="db__sidebar-scroll">
        <div v-for="group in sidebarGroups" :key="group.name" class="db__group">
          <button class="db__group-header" @click="group.collapsed = !group.collapsed">
            <WPIcon :icon="group.collapsed ? chevronRight : chevronDown" :size="12" class="db__group-arrow" />
            <span class="db__group-name">{{ group.name }}</span>
            <span class="db__group-count">{{ group.tables.length }}</span>
          </button>
          <div v-if="!group.collapsed" class="db__group-tables">
            <button
              v-for="table in group.tables"
              :key="table.name"
              class="db__table-item"
              :class="{ 'db__table-item--active': activeTable === table.name }"
              @click="selectTable(table.name)"
            >
              <span class="db__table-name">{{ stripPrefix(table.name) }}</span>
              <span class="db__table-count">{{ abbreviateCount(table.rowCount) }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Sidebar resize handle -->
    <div class="db__resize-handle" @pointerdown="onSidebarPointerDown" />

    <!-- Main Content -->
    <div class="db__main">
      <!-- Toolbar -->
      <div class="db__toolbar">
        <div class="db__toolbar-start">
          <button
            v-if="!filter.expanded"
            class="db__tool-btn"
            @click="toggleFilter"
          >
            Filter
          </button>
          <template v-if="filter.expanded">
            <select v-model="filter.column" class="db__filter-select" @change="applyFilter">
              <option v-for="col in columns" :key="col.key" :value="col.key">{{ col.label }}</option>
            </select>
            <span class="db__filter-op">contains</span>
            <input
              v-model="filter.value"
              class="db__filter-input"
              placeholder="Value..."
              @input="applyFilter"
            />
            <button class="db__tool-btn db__tool-btn--icon" @click="clearFilter">&times;</button>
          </template>
        </div>
        <div class="db__toolbar-end">
          <button
            class="db__tool-btn"
            :class="{ 'db__tool-btn--active': sqlEditorOpen }"
            @click="sqlEditorOpen = !sqlEditorOpen"
          >
            SQL
          </button>
          <div class="db__actions-wrap">
            <button class="db__tool-btn" @click="toggleActions">
              Actions
            </button>
            <div v-if="actionsDropdownOpen" class="db__actions-dropdown">
              <button class="db__actions-item">Clean expired transients <span class="db__actions-badge">12</span></button>
              <button class="db__actions-item">Find orphaned meta</button>
              <button class="db__actions-item">Autoload breakdown</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SQL Editor (collapsible) -->
      <div class="db__sql-editor" :class="{ 'db__sql-editor--open': sqlEditorOpen }">
        <div class="db__sql-inner">
          <textarea
            v-model="sqlQuery"
            class="db__sql-textarea"
            placeholder="SELECT * FROM wp_posts WHERE..."
            spellcheck="false"
          ></textarea>
          <button class="db__sql-run">Run</button>
        </div>
      </div>

      <!-- Data Grid -->
      <div class="db__grid-wrap">
        <table class="db__grid">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                class="db__th"
                :class="{
                  'db__th--numeric': col.key.endsWith('_id') || col.key === 'ID' || col.key === 'count' || col.key === 'term_order' || col.key === 'term_group',
                  'db__th--sorted': sort?.column === col.key
                }"
                @click="toggleSort(col.key)"
              >
                <span class="db__th-label">{{ col.label }}</span>
                <WPIcon
                  v-if="sort?.column === col.key"
                  :icon="sort?.direction === 'asc' ? arrowUp : arrowDown"
                  :size="14"
                  class="db__sort-icon"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIdx) in sortedRows"
              :key="rowIdx"
              class="db__row"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                class="db__td"
                :class="cellClasses(col.key, getEffectiveValue(rowIdx, col.key, row[col.key]), rowIdx)"
                @click="onCellClick($event, rowIdx, col.key, getEffectiveValue(rowIdx, col.key, row[col.key]))"
              >
                <!-- Editing state -->
                <template v-if="editing?.rowIndex === rowIdx && editing?.column === col.key">
                  <input
                    ref="editInputRef"
                    v-model="editValue"
                    class="db__edit-input"
                    @keydown.enter="confirmEdit"
                    @keydown.escape="cancelEdit"
                    @blur="confirmEdit"
                  />
                </template>
                <!-- Display state -->
                <template v-else>
                  <span
                    v-if="getCellType(col.key, getEffectiveValue(rowIdx, col.key, row[col.key])) === 'serialized'"
                    class="db__serialized-badge"
                  >{&hellip;}</span>
                  <span v-else>{{ getCellDisplay(col.key, getEffectiveValue(rowIdx, col.key, row[col.key])) }}</span>
                </template>
              </td>
            </tr>
            <tr v-if="sortedRows.length === 0">
              <td :colspan="columns.length" class="db__td db__td--empty">
                No rows in <code>{{ activeTable }}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Status Bar -->
      <div class="db__status">
        <div class="db__status-start">
          <span class="db__status-text">Autoload: {{ autoloadLabel }}</span>
        </div>
        <div class="db__status-center">
          <template v-if="pendingCount > 0">
            <span class="db__pending-dot"></span>
            <span class="db__status-text">{{ pendingCount }} pending</span>
            <button class="db__discard-btn" @click="discardChanges">Discard</button>
          </template>
        </div>
        <div class="db__status-end">
          <span class="db__status-text">
            <template v-if="filter.active">{{ filteredRowCount }} of </template>{{ totalRowCount }} rows
          </span>
          <button
            v-if="pendingCount > 0"
            class="db__commit-btn"
            @click="commitChanges"
          >
            Commit
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Popover -->
    <Teleport to="body">
      <Transition name="db-popover">
        <div
          v-if="detailPopover.visible"
          class="db__detail"
          :style="{ insetInlineStart: detailPopover.x + 'px', insetBlockStart: detailPopover.y + 'px' }"
        >
          <pre class="db__detail-content">{{ detailPopover.formattedContent }}</pre>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* -- Layout ---------------------------------------------------------------- */
.db {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--color-surface);
  border-block-start: 1px solid var(--color-surface-border);
}

/* -- Sidebar --------------------------------------------------------------- */
.db__sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: var(--color-surface);
}

.db__sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding-block: var(--space-xxxs);
}

.db__group {
  margin-block-end: var(--space-xxxs);
}

.db__group-header {
  display: flex;
  align-items: center;
  gap: var(--space-xxxs);
  width: 100%;
  padding: var(--space-xxxs) var(--space-xs);
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.db__group-header:hover {
  color: var(--color-text);
}

.db__group-arrow {
  width: 12px;
  flex-shrink: 0;
}

.db__group-name {
  flex: 1;
  text-align: start;
}

.db__group-count {
  font-weight: var(--font-weight-regular);
  opacity: 0.5;
}

.db__group-tables {
  display: flex;
  flex-direction: column;
}

.db__table-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xxs);
  padding: var(--space-xs) var(--space-xs);
  padding-inline-start: var(--space-m);
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  text-align: start;
  width: 100%;
  transition: background var(--duration-fast), color var(--duration-fast);
}

.db__table-item:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.db__table-item--active {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.db__table-item--active:hover {
  background: var(--color-primary-hover);
  color: var(--color-primary-text);
}

.db__table-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.db__table-count {
  flex-shrink: 0;
  font-size: var(--font-size-xs);
  opacity: 0.5;
}

.db__table-item--active .db__table-count {
  opacity: 0.8;
}

/* Sidebar resize handle */
.db__resize-handle {
  width: 5px;
  cursor: col-resize;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-inline: -2px;
}

.db__resize-handle::after {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 50%;
  width: 1px;
  background: var(--color-surface-border);
  transition: background var(--transition-hover), width var(--transition-hover);
}

.db__resize-handle:hover::after,
.db.is-dragging-sidebar .db__resize-handle::after {
  width: 3px;
  margin-inline-start: -1px;
  background: var(--color-primary);
}

.db.is-dragging-sidebar {
  user-select: none;
}

/* -- Main Content ---------------------------------------------------------- */
.db__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
}

/* -- Toolbar --------------------------------------------------------------- */
.db__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--space-xl); /* 30px — compact toolbar */
  padding-inline: var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
  flex-shrink: 0;
  gap: var(--space-xs);
}

.db__toolbar-start {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  flex: 1;
  min-width: 0;
}

.db__toolbar-end {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  flex-shrink: 0;
}

.db__tool-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xxxs);
  padding: var(--space-xxxs) var(--space-xs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast), color var(--duration-fast), border-color var(--duration-fast);
}

.db__tool-btn:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.db__tool-btn--active {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

.db__tool-btn--active:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.db__tool-btn--icon {
  padding: var(--space-xxxs) var(--space-xxs);
  font-size: var(--font-size-m);
  line-height: var(--line-height-tight); /* Single-glyph button */
}

.db__filter-select {
  padding: var(--space-xxxs) var(--space-xxs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  outline: none;
}

.db__filter-select:focus {
  border-color: var(--color-primary);
}

.db__filter-op {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.db__filter-input {
  padding: var(--space-xxxs) var(--space-xxs);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  width: 125px; /* 25 grid units */
  outline: none;
}

.db__filter-input:focus {
  border-color: var(--color-primary);
}

/* Actions dropdown */
.db__actions-wrap {
  position: relative;
}

.db__actions-dropdown {
  position: absolute;
  inset-block-start: calc(100% + var(--space-xxxs));
  inset-inline-end: 0;
  min-width: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 12px var(--color-shadow);
  padding: var(--space-xxxs);
  z-index: 100;
}

.db__actions-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);
  width: 100%;
  padding: var(--space-xxs) var(--space-xs);
  border: none;
  border-radius: var(--radius-s);
  background: none;
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-s);
  cursor: pointer;
  text-align: start;
}

.db__actions-item:hover {
  background: var(--color-surface-secondary);
}

.db__actions-badge {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxs);
  border-radius: var(--radius-s);
}

/* -- SQL Editor ------------------------------------------------------------ */
.db__sql-editor {
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--duration-fast) var(--ease-default);
  flex-shrink: 0;
}

.db__sql-editor--open {
  max-height: 100px;
}

.db__sql-inner {
  display: flex;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
  align-items: flex-end;
}

.db__sql-textarea {
  flex: 1;
  min-height: 50px;
  max-height: 80px;
  resize: none;
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  padding: var(--space-xxs);
  outline: none;
}

.db__sql-textarea:focus {
  border-color: var(--color-primary);
}

.db__sql-textarea::placeholder {
  color: var(--color-text-muted);
}

.db__sql-run {
  padding: var(--space-xxs) var(--space-xs);
  border: none;
  border-radius: var(--radius-s);
  background: var(--color-primary);
  color: var(--color-primary-text);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--duration-fast);
}

.db__sql-run:hover {
  background: var(--color-primary-hover);
}

/* -- Data Grid ------------------------------------------------------------- */
.db__grid-wrap {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.db__grid {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  table-layout: auto;
}

.db__th {
  position: sticky;
  inset-block-start: 0;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  text-align: start;
  padding: var(--space-xs) var(--space-xs);
  border-block-end: 1px solid var(--color-surface-border);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  z-index: 2;
  transition: color var(--duration-fast);
}

.db__th:hover {
  color: var(--color-text);
}

.db__th--sorted {
  color: var(--color-primary);
}

.db__th--sorted:hover {
  color: var(--color-primary-hover);
}

.db__th--numeric {
  text-align: end;
}

.db__td {
  padding: var(--space-xs) var(--space-xs);
  color: var(--color-text);
  border-block-end: 1px solid var(--color-surface-border);
  white-space: nowrap;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background var(--duration-fast);
}

.db__row:hover .db__td {
  background: var(--color-surface-secondary);
}

/* Type-specific cell styles */
.db__td--null {
  color: var(--color-text-muted);
  font-style: italic;
}

.db__td--empty-str {
  color: var(--color-text-muted);
  font-style: italic;
}

.db__td--date {
  color: var(--color-text-secondary);
}

.db__td--serialized {
  cursor: pointer;
}

.db__td--status-draft {
  color: var(--color-text-muted);
}

.db__td--status-trash {
  color: var(--color-status-stop-hover);
  text-decoration: line-through;
}

.db__td--autoload-no {
  color: var(--color-text-muted);
}

.db__td--numeric {
  text-align: end;
  font-variant-numeric: tabular-nums;
}

.db__td--long {
  cursor: pointer;
}

.db__td--pk {
  color: var(--color-text-secondary);
}

.db__td--pending {
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.db__row:hover .db__td--pending {
  background: color-mix(in srgb, var(--color-primary) 12%, var(--color-surface-secondary));
}

.db__td--empty {
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-l) var(--space-xs);
  font-family: var(--font-family);
  font-style: italic;
}

.db__td--empty code {
  font-family: var(--font-family-mono);
  font-style: normal;
  background: var(--color-surface-secondary);
  padding: 1px var(--space-xxs);
  border-radius: var(--radius-s);
}

/* Serialized badge */
.db__serialized-badge {
  display: inline-flex;
  align-items: center;
  padding: 0 var(--space-xxs);
  background: color-mix(in srgb, var(--color-serialized) 12%, transparent);
  color: var(--color-serialized);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-s);
  cursor: pointer;
  line-height: var(--line-height-normal);
  transition: background var(--duration-fast);
}

.db__serialized-badge:hover {
  background: color-mix(in srgb, var(--color-serialized) 20%, transparent);
}

/* Edit input */
.db__edit-input {
  width: 100%;
  padding: 0;
  margin: -1px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-s);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  outline: none;
  box-shadow: 0 0 0 1px var(--color-primary);
  transition: border-color var(--transition-focus), box-shadow var(--transition-focus);
}

/* -- Status Bar ------------------------------------------------------------ */
.db__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--space-xl); /* 30px — status bar */
  padding-inline: var(--space-xs);
  border-block-start: 1px solid var(--color-surface-border);
  flex-shrink: 0;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
}

.db__status-start,
.db__status-center,
.db__status-end {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
}

.db__status-start {
  flex: 1;
}

.db__status-center {
  flex: 1;
  justify-content: center;
}

.db__status-end {
  flex: 1;
  justify-content: flex-end;
}

.db__status-text {
  color: var(--color-text-muted);
}

.db__pending-dot {
  width: var(--space-xxs);
  height: var(--space-xxs);
  border-radius: var(--radius-full);
  background: var(--color-primary);
}

.db__discard-btn {
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.db__discard-btn:hover {
  color: var(--color-status-stop-hover);
}

.db__commit-btn {
  padding: 1px var(--space-xs);
  border: none;
  border-radius: var(--radius-s);
  background: var(--color-primary);
  color: var(--color-primary-text);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background var(--duration-fast);
}

.db__commit-btn:hover {
  background: var(--color-primary-hover);
}

/* Sort icon */
.db__sort-icon {
  display: inline-flex;
  vertical-align: middle;
  color: var(--color-primary);
  margin-inline-start: var(--space-xxxs);
}

/* -- Detail Popover -------------------------------------------------------- */
.db__detail {
  position: fixed;
  max-width: 300px;
  max-height: 200px;
  overflow: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 16px var(--color-shadow-heavy);
  z-index: 1000;
  padding: var(--space-xs);
}

.db__detail-content {
  margin: 0;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text);
  white-space: pre-wrap;
  word-break: break-all;
  line-height: var(--line-height-normal);
}

/* Popover transitions */
.db-popover-enter-active {
  transition: opacity var(--duration-fast), transform var(--duration-fast);
}

.db-popover-leave-active {
  transition: opacity var(--duration-fast), transform var(--duration-fast);
}

.db-popover-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.db-popover-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
