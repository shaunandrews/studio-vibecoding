/**
 * Minimal AI Pipeline Types (Phase B Stub)
 * 
 * This is a minimal stub to support ai-service.ts until Phase C.
 * Contains only the types and functions needed for the AI service to compile.
 */

// ---- Basic Types ----

export interface AIThemeOutput {
  name?: string
  variables?: Record<string, string>
  fonts?: string[]
}

// ---- Parsed Block Types ----

export type ParsedAIBlock =
  | { type: 'text'; text: string }
  | { type: 'theme'; data: AIThemeOutput }
  | { type: 'section'; sectionType: string; data: any; valid: boolean; errors: string[] }
  | { type: 'templatePart'; partType: string; data: any }
  | { type: 'context'; data: any }
  | { type: 'card'; cardType: string; data: any }
  | { type: 'error'; fenceType: string; raw: string; error: string }

// ---- Validation Functions (Stubs) ----

/**
 * Stub validation function for sections.
 * In Phase C this will do real validation.
 */
export function validateSection(_sectionType: string, _data: any): { valid: boolean; errors: string[] } {
  // For now, just accept everything as valid
  return { valid: true, errors: [] }
}

/**
 * Stub normalization function for themes.
 * In Phase C this will do real normalization.
 */
export function normalizeTheme(data: AIThemeOutput): AIThemeOutput {
  // For now, just return as-is
  return data
}