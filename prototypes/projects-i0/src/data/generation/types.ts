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

export interface ReviewResult {
  passed: boolean
  issues: {
    section: string
    severity: 'warn' | 'fail'
    description: string
    fix: string
  }[]
}