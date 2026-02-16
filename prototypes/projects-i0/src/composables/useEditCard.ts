import { ref } from 'vue'
import type { CardState, EditOperation } from '@/data/edit-types'
import { useSiteStore } from '@/data/useSiteStore'
import { useEditHistory } from './useEditHistory'

export function useEditCard(operation: EditOperation, projectId: string) {
  const state = ref<CardState>('proposed')
  const progressMessage = ref('')
  const siteStore = useSiteStore()
  const { captureSnapshot } = useEditHistory()

  // Track previous state for try-it mode
  let previousState: any = null

  function tryIt() {
    if (state.value !== 'proposed') return

    state.value = 'trying'
    
    // Store current state for reverting
    const site = siteStore.getSite(projectId)
    if (!site) return

    // Apply the change temporarily
    applyOperation(operation, false)
  }

  function dismiss() {
    if (state.value !== 'trying') return

    state.value = 'proposed'
    
    // Revert the change
    if (previousState) {
      restorePreviousState()
      previousState = null
    }
  }

  async function apply() {
    if (state.value === 'dismissed' || state.value === 'complete') return

    state.value = 'applying'
    progressMessage.value = 'Applying changes...'

    try {
      // Capture snapshot for undo
      const site = siteStore.getSite(projectId)
      if (site) {
        captureSnapshot(getOperationLabel(operation), operation, site)
      }

      // Apply the operation permanently
      await applyOperation(operation, true)

      state.value = 'complete'
      progressMessage.value = ''
    } catch (error) {
      state.value = 'error'
      progressMessage.value = 'Failed to apply changes'
      console.error('Edit operation failed:', error)
    }
  }

  function applyOperation(op: EditOperation, permanent: boolean) {
    switch (op.type) {
      case 'section-update':
        siteStore.updateSection(op.projectId, op.sectionId, op.html, op.css)
        break
      
      case 'section-add':
        // First create the section
        siteStore.updateSection(op.projectId, op.section.id, op.section.html, op.section.css)
        // Then add it to the page
        siteStore.addSectionToPage(op.projectId, op.pageSlug, op.section.id, op.position)
        break
      
      case 'section-remove':
        siteStore.removeSectionFromPage(op.projectId, op.pageSlug, op.sectionId)
        siteStore.deleteSection(op.projectId, op.sectionId)
        break
      
      case 'section-reorder':
        const site = siteStore.getSite(op.projectId)
        if (site) {
          const page = site.pages.find(p => p.slug === op.pageSlug)
          if (page) {
            page.sections = [...op.order]
          }
        }
        break
      
      case 'theme-update':
        const currentSite = siteStore.getSite(op.projectId)
        if (currentSite) {
          const updatedTheme = {
            ...currentSite.theme,
            variables: { ...currentSite.theme.variables, ...op.variables }
          }
          siteStore.updateTheme(op.projectId, updatedTheme)
        }
        break
    }
  }

  function restorePreviousState() {
    // This would restore the previous state - for now we'll implement a simple approach
    // In a production system, this would be more sophisticated
    console.warn('Revert functionality not fully implemented yet')
  }

  function getOperationLabel(op: EditOperation): string {
    switch (op.type) {
      case 'section-update':
        return `Updated section ${op.sectionId}`
      case 'section-add':
        return `Added section ${op.section.id}`
      case 'section-remove':
        return `Removed section ${op.sectionId}`
      case 'section-reorder':
        return `Reordered sections`
      case 'theme-update':
        return `Updated theme`
      default:
        return 'Unknown operation'
    }
  }

  return { 
    state, 
    progressMessage, 
    tryIt, 
    dismiss, 
    apply 
  }
}