import { ref, computed } from 'vue'

export interface Command {
  id: string
  label: string
  category: string
  shortcut?: string
  action: () => void
}

const isOpen = ref(false)
const searchQuery = ref('')

export function useCommandPalette() {
  function open() {
    isOpen.value = true
    searchQuery.value = ''
  }

  function close() {
    isOpen.value = false
    searchQuery.value = ''
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  return { isOpen, searchQuery, open, close, toggle }
}
