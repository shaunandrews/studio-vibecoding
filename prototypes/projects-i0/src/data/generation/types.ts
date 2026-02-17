export interface DesignBrief {
  cssVariables: string    // the :root CSS block
  direction: string       // design direction text
  fonts: string[]         // Google Font names
}

export interface GenerationProgress {
  status: 'idle' | 'brief' | 'generating' | 'extracting' | 'reviewing' | 'complete' | 'error'
  briefReady: boolean
  sectionsTotal: number
  sectionsComplete: number
  currentPage: string
  error?: string
}

// ---- Generation Events ----

export type GenerationEvent =
  | { type: 'brief-done'; brief: DesignBrief }
  | { type: 'section-done'; sectionId: string; pageSlug: string; sectionsComplete: number; sectionsTotal: number }
  | { type: 'page-start'; pageTitle: string }
  | { type: 'extract-start' }
  | { type: 'complete' }
  | { type: 'error'; error: string }

export type GenerationEventCallback = (event: GenerationEvent) => void

export interface ReviewResult {
  passed: boolean
  issues: {
    section: string
    severity: 'warn' | 'fail'
    description: string
    fix: string
  }[]
}