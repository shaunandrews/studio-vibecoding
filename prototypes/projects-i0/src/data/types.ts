export type ProjectStatus = 'running' | 'stopped' | 'loading'

export interface Project {
  id: string
  name: string
  favicon: string
  status: ProjectStatus
  url: string
  createdAt: string
  description?: string
}

export type AgentId = 'assistant' | 'code' | 'design'

export interface Agent {
  id: AgentId
  label: string
  description: string
  avatar?: string
}

export interface Conversation {
  id: string
  projectId: string | null
  agentId: AgentId
  title?: string
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  role: 'user' | 'agent'
  agentId?: AgentId
  content: ContentBlock[]
  messageContext?: MessageContext
  timestamp: string
}

export interface MessageContext {
  source: 'typed' | 'action'
  actionId?: string
  cardRef?: string
  payload?: Record<string, string>
}

export type CardUiState = 'default' | 'loading' | 'complete' | 'error' | 'disabled'

export interface ActionButton {
  id: string
  label: string
  variant?: 'primary' | 'secondary' | 'destructive'
  icon?: any
  action: {
    type: 'send-message'
    message: string
    cardRef?: string
    payload?: Record<string, string>
  }
}

interface BaseCardBlock {
  type: 'card'
  id?: string
  state?: CardUiState
  compact?: boolean
}

export type CardBlock =
  | (BaseCardBlock & { card: 'plugin'; data: PluginCardData })
  | (BaseCardBlock & { card: 'colorPalette'; data: ColorPaletteData })
  | (BaseCardBlock & { card: 'settings'; data: SettingsCardData })
  | (BaseCardBlock & { card: 'progress'; data: ProgressCardData })
  | (BaseCardBlock & { card: 'themePicker'; data: ThemePickerCardData })
  | (BaseCardBlock & { card: 'page'; data: PageCardData })
  | (BaseCardBlock & { card: 'postDraft'; data: PostDraftCardData })

export type ContentBlock =
  | { type: 'text'; text: string }
  | CardBlock
  | { type: 'actions'; actions: ActionButton[] }

export interface PluginCardData {
  name: string
  slug: string
  description: string
  icon?: string
  rating?: number
  activeInstalls?: string
  status: 'available' | 'installing' | 'installed' | 'active' | 'error'
  action?: ActionButton
}

export interface ColorPaletteData {
  label: string
  colors: { name: string; hex: string; usage: string }[]
  action?: ActionButton
}

export interface SettingsCardData {
  label: string
  settings: { key: string; current: string; proposed: string }[]
  actions?: ActionButton[]
}

export interface ProgressCardData {
  label: string
  steps: { name: string; status: 'pending' | 'running' | 'done' | 'error' }[]
}

export interface ThemePickerCardData {
  themes: { name: string; slug: string; thumbnail?: string; description: string }[]
  actions?: ActionButton[]
}

export interface PageCardData {
  title: string
  slug: string
  template?: string
  status: 'draft' | 'published' | 'scheduled'
  excerpt?: string
  actions?: ActionButton[]
}

export interface PostDraftCardData {
  title: string
  excerpt: string
  categories?: string[]
  tags?: string[]
  featuredImage?: string
  status: 'draft' | 'pending' | 'published'
  actions?: ActionButton[]
}
