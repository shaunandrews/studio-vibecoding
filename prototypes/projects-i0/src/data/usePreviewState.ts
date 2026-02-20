/**
 * Shared preview visibility state.
 *
 * Backed by localStorage so it persists across reloads.
 * Used by ProjectPage (toggle button) and useBuildProgress
 * (auto-show preview when the first section lands).
 */

import { ref, computed } from 'vue'

const STORAGE_KEY = 'previewState'
const MODE_KEY = 'previewBrowserMode'

type BrowserMode = 'app' | 'browser'

function load(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

function loadMode(): Record<string, BrowserMode> {
  try { return JSON.parse(localStorage.getItem(MODE_KEY) || '{}') }
  catch { return {} }
}

const state = ref(load())
const modeState = ref(loadMode())

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
}

function persistMode() {
  localStorage.setItem(MODE_KEY, JSON.stringify(modeState.value))
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

  // Browser mode: 'app' = in-app preview, 'browser' = external browser
  function getBrowserMode(projectId: string): BrowserMode {
    return modeState.value[projectId] ?? 'app'
  }

  function setBrowserMode(projectId: string, mode: BrowserMode) {
    modeState.value = { ...modeState.value, [projectId]: mode }
    persistMode()
  }

  function toggleBrowserMode(projectId: string) {
    const current = getBrowserMode(projectId)
    setBrowserMode(projectId, current === 'app' ? 'browser' : 'app')
  }

  function browserModeComputed(projectId: () => string) {
    return computed({
      get: () => getBrowserMode(projectId()),
      set: (v: BrowserMode) => setBrowserMode(projectId(), v),
    })
  }

  return { isVisible, show, hide, toggle, visibleComputed, getBrowserMode, setBrowserMode, toggleBrowserMode, browserModeComputed }
}
