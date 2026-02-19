import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// Module-level state (singleton — shared across all components)
const transitionProjectId = ref<string | null>(null)

export function useProjectTransition() {
  const router = useRouter()

  async function navigateToProject(projectId: string) {
    // Already viewing a project — just swap, no transition
    const currentMode = router.currentRoute.value.meta.mode
    if (currentMode === 'project') {
      router.push({ name: 'site', params: { id: projectId } })
      return
    }

    transitionProjectId.value = projectId

    if (!(document as any).startViewTransition) {
      router.push({ name: 'site', params: { id: projectId } })
      return
    }

    await nextTick() // card gets view-transition-name before capture

    const transition = (document as any).startViewTransition(async () => {
      await router.push({ name: 'site', params: { id: projectId } })
      await nextTick()
    })

    transition.finished.then(() => {
      transitionProjectId.value = null
    })
  }

  async function navigateHome() {
    const currentId = router.currentRoute.value.params.id as string
    transitionProjectId.value = currentId

    if (!(document as any).startViewTransition) {
      router.push({ name: 'home' })
      return
    }

    const transition = (document as any).startViewTransition(async () => {
      await router.push({ name: 'home' })
      await nextTick()
    })

    transition.finished.then(() => {
      transitionProjectId.value = null
    })
  }

  return { transitionProjectId, navigateToProject, navigateHome }
}

export { transitionProjectId }
