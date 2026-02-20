import type { Site, Section } from '@shared/data/site-types'

export type CardState = 'proposed' | 'trying' | 'applying' | 'complete' | 'error' | 'dismissed'

export type EditOperation =
  | { type: 'section-update'; projectId: string; sectionId: string; html: string; css: string }
  | { type: 'section-add'; projectId: string; pageSlug: string; section: Section; position: number }
  | { type: 'section-remove'; projectId: string; pageSlug: string; sectionId: string }
  | { type: 'section-reorder'; projectId: string; pageSlug: string; order: string[] }
  | { type: 'theme-update'; projectId: string; variables: Record<string, string> }

export interface SectionEditCardData {
  label: string
  sectionId: string
  changeSummary: string
  html: string
  css: string
}

export interface ThemeEditCardData {
  label: string
  changeSummary: string
  before: Record<string, string> // old variables
  after: Record<string, string>  // new variables
}

export interface SiteSnapshot {
  id: string
  timestamp: number
  label: string
  operation: EditOperation
  site: Site // full site state before the change
}