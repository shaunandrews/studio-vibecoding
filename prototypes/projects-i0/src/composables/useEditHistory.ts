import { ref, computed } from 'vue'
import type { SiteSnapshot, EditOperation } from '@/data/edit-types'
import type { Site } from '@shared/data/site-types'
import { useSiteStore } from '@/data/useSiteStore'

const snapshots = ref<SiteSnapshot[]>([])
const currentIndex = ref(-1)
const MAX_SNAPSHOTS = 20

export function useEditHistory() {
  const siteStore = useSiteStore()
  
  const canUndo = computed(() => currentIndex.value >= 0)
  const canRedo = computed(() => currentIndex.value < snapshots.value.length - 1)

  function captureSnapshot(label: string, operation: EditOperation, site: Site): void {
    const snapshot: SiteSnapshot = {
      id: `snapshot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      label,
      operation,
      site: JSON.parse(JSON.stringify(site)) // Deep clone
    }

    // Remove any snapshots after current index (if we undid some operations)
    if (currentIndex.value < snapshots.value.length - 1) {
      snapshots.value.splice(currentIndex.value + 1)
    }

    // Add the new snapshot
    snapshots.value.push(snapshot)
    currentIndex.value = snapshots.value.length - 1

    // Keep only the last MAX_SNAPSHOTS
    if (snapshots.value.length > MAX_SNAPSHOTS) {
      const overflow = snapshots.value.length - MAX_SNAPSHOTS
      snapshots.value.splice(0, overflow)
      currentIndex.value -= overflow
    }
  }

  function undo(): void {
    if (!canUndo.value) return

    const snapshot = snapshots.value[currentIndex.value]
    if (snapshot) {
      // Restore the site state from the snapshot
      siteStore.setSite(snapshot.operation.projectId, snapshot.site)
      currentIndex.value--
    }
  }

  function redo(): void {
    if (!canRedo.value) return

    currentIndex.value++
    const snapshot = snapshots.value[currentIndex.value]
    if (snapshot) {
      // Re-apply the operation
      applyOperationFromSnapshot(snapshot)
    }
  }

  function applyOperationFromSnapshot(snapshot: SiteSnapshot): void {
    const op = snapshot.operation
    
    switch (op.type) {
      case 'section-update':
        siteStore.updateSection(op.projectId, op.sectionId, op.html, op.css)
        break
      
      case 'section-add':
        siteStore.updateSection(op.projectId, op.section.id, op.section.html, op.section.css)
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

  function getHistory(): { snapshots: SiteSnapshot[], currentIndex: number } {
    return {
      snapshots: snapshots.value,
      currentIndex: currentIndex.value
    }
  }

  function clearHistory(): void {
    snapshots.value = []
    currentIndex.value = -1
  }

  return {
    snapshots,
    currentIndex,
    canUndo,
    canRedo,
    captureSnapshot,
    undo,
    redo,
    getHistory,
    clearHistory
  }
}