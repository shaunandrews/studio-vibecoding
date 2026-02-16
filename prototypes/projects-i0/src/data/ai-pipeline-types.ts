/**
 * Phase 2: AI Generation Pipeline — Types
 *
 * Types for the AI generation pipeline including parsed blocks,
 * theme normalization, section validation, and pipeline state.
 */

import type { SiteTheme } from './themes/types'
import type { Section } from './sections/types'

// ---- AI Output Types ----

/** What the AI actually returns for a theme — minimal subset of SiteTheme */
export interface AIThemeOutput {
  color: {
    palette: Array<{ slug: string; name: string; hex: string }>
    background: string
    text: string
  }
  typography: {
    fontFamily: { heading: string; body: string }
    fontSize: { hero: string; xlarge: string; large: string; medium: string; small: string }
  }
}

/** Fence types the parser recognizes */
export type AIFenceType =
  | { kind: 'section'; sectionType: string }
  | { kind: 'theme' }
  | { kind: 'templatePart'; partType: string }
  | { kind: 'card'; cardType: string }
  | { kind: 'context' }

/** A parsed block from the AI response stream */
export type ParsedAIBlock =
  | { type: 'text'; text: string }
  | { type: 'section'; sectionType: string; data: Record<string, unknown>; valid: boolean; errors: string[] }
  | { type: 'theme'; data: SiteTheme }
  | { type: 'templatePart'; partType: string; data: Record<string, unknown> }
  | { type: 'context'; data: ContextData }
  | { type: 'card'; cardType: string; data: Record<string, unknown> }
  | { type: 'error'; fenceType: string; raw: string; error: string }

/** Context data extracted from chat (business details) */
export interface ContextData {
  address?: string
  phone?: string
  email?: string
  hours?: string[]
  businessName?: string
  description?: string
  [key: string]: unknown
}

// ---- Validation ----

export interface ValidationResult {
  valid: boolean
  errors: string[]
  sectionType: string
  data: Record<string, unknown>
}

/** Required fields per section type — canonical source from Phase 1 types */
export const REQUIRED_FIELDS: Record<string, string[]> = {
  'hero-split': ['heading', 'tagline', 'image'],
  'hero-fullwidth': ['image'],
  'hero-simple': ['heading'],
  'image-strip': ['images'],
  'image-gallery': ['images'],
  'menu-list': ['variant', 'categories'],
  'content-prose': ['body'],
  'content-cards': ['cards'],
  'team-grid': ['members'],
  'event-list': ['events'],
  'event-recurring': ['events'],
  'contact-info': [],
  'cta-banner': ['text'],
  'order-menu': ['categories'],
}

export function validateSection(type: string, data: Record<string, unknown>): ValidationResult {
  const required = REQUIRED_FIELDS[type]
  if (!required) {
    return { valid: false, errors: [`Unknown section type: ${type}`], sectionType: type, data }
  }
  const errors: string[] = []
  for (const field of required) {
    if (!(field in data)) {
      errors.push(`Missing required field: ${field}`)
    }
  }
  return { valid: errors.length === 0, errors, sectionType: type, data }
}

/**
 * Converts AI's minimal theme output into a full SiteTheme with sensible defaults.
 * Handles the flat → nested `settings` wrapper mismatch.
 */
export function normalizeTheme(raw: AIThemeOutput): SiteTheme {
  return {
    name: 'custom',
    settings: {
      color: {
        palette: raw.color.palette,
        background: raw.color.background,
        text: raw.color.text,
      },
      typography: {
        fontFamily: raw.typography.fontFamily,
        fontSize: raw.typography.fontSize,
        lineHeight: { tight: '1.2', normal: '1.5' },
      },
      spacing: { unit: 'rem', scale: [0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8] },
      layout: { contentWidth: '800px', wideWidth: '1200px' },
    },
  }
}

// ---- Pipeline Types ----

export type StepStatus = 'pending' | 'generating' | 'complete' | 'error' | 'retrying'

export interface PipelineStep {
  id: string
  status: StepStatus
  label: string
  artifacts: ParsedAIBlock[]
  error?: string
  retryCount: number
}

export interface CreativeBrief {
  siteType: string
  siteName: string
  description: string
  additionalContext?: Record<string, string>
}

export interface PipelineState {
  status: 'idle' | 'running' | 'complete' | 'error'
  steps: PipelineStep[]
  brief: CreativeBrief
  theme?: SiteTheme
  templateParts: Record<string, Record<string, unknown>>
  pages: Record<string, Section[]>
}

export interface PageConfig {
  slug: string
  title: string
  description: string
  suggestedSections: string[]
}

// ---- Skeleton Types (Progressive Rendering) ----

export type SkeletonStatus = 'pending' | 'generating' | 'complete' | 'error'

export interface SkeletonSlot {
  id: string
  expectedType?: string
  status: SkeletonStatus
  section?: Section
  error?: string
}
