/**
 * Shared preview visibility state.
 *
 * Backed by localStorage so it persists across reloads.
 * Used by ProjectPage (toggle button) and useBuildProgress
 * (auto-show preview when the first section lands).
 */

import { ref, computed } from 'vue'

const STORAGE_KEY = 'previewState'

function load(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

const state = ref(load())

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
}

export function usePreviewState() {
  function isVisible(projectId: string): boolean {
    return state.value[projectId] ?? true
  }

  function show(projectId: string) {
    state.value = { ...state.value, [projectId]: true }
    persist()
  }

  function hide(projectId: string) {
    state.value = { ...state.value, [projectId]: false }
    persist()
  }

  function toggle(projectId: string) {
    const current = isVisible(projectId)
    if (current) hide(projectId)
    else show(projectId)
  }

  function visibleComputed(projectId: () => string) {
    return computed({
      get: () => isVisible(projectId()),
      set: (v: boolean) => {
        if (v) show(projectId())
        else hide(projectId())
      },
    })
  }

  return { isVisible, show, hide, toggle, visibleComputed }
}
