/**
 * Build Progress Stub (Phase B)
 * 
 * This is a stub to keep existing components compiling during the Phase B transition.
 * The real build progress functionality will be replaced with simpler patterns in Phase C.
 */

// ---- Stub Functions ----

export function useBuildProgress() {
  return {
    /**
     * Check if a project is currently building (stub: always false)
     */
    isBuilding(_projectId: string): boolean {
      return false
    },

    /**
     * Get build state for a project (stub: always undefined)
     */
    getBuildState(_projectId: string): undefined {
      return undefined
    },

    /**
     * Start building a project (stub: does nothing)
     */
    startBuild(projectId: string, _prompt?: string): void {
      console.log(`[Stub] Build requested for project: ${projectId}`)
    },

    /**
     * Stop building a project (stub: does nothing)
     */
    stopBuild(projectId: string): void {
      console.log(`[Stub] Build stop requested for project: ${projectId}`)
    }
  }
}