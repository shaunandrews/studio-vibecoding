/**
 * Pipeline Stub (Phase B)
 * 
 * This is a stub to keep existing components compiling during the Phase B transition.
 * The real pipeline functionality will be replaced with simpler patterns in Phase C.
 */

// ---- Stub Functions ----

export function usePipeline() {
  return {
    /**
     * Update pipeline context (stub: does nothing)
     */
    updateContext(data: any): void {
      console.log(`[Stub] Pipeline context update:`, data)
    },

    /**
     * Get pipeline state (stub: always null)
     */
    getPipelineState(_projectId: string): null {
      return null
    },

    /**
     * Start pipeline (stub: does nothing)
     */
    startPipeline(projectId: string, _prompt: string): void {
      console.log(`[Stub] Pipeline start requested for project: ${projectId}`)
    },

    /**
     * Stop pipeline (stub: does nothing)
     */
    stopPipeline(projectId: string): void {
      console.log(`[Stub] Pipeline stop requested for project: ${projectId}`)
    }
  }
}