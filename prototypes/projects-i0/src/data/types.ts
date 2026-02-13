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
  content: string
  timestamp: string
}
