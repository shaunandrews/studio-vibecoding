import { ref, watch } from 'vue'

const STORAGE_KEY = 'sidebar-collapsed'

const collapsed = ref<boolean>(
  localStorage.getItem(STORAGE_KEY) === 'true'
)

watch(collapsed, (val) => {
  localStorage.setItem(STORAGE_KEY, String(val))
})

export function useSidebarCollapse() {
  function toggle() { collapsed.value = !collapsed.value }
  function collapse() { collapsed.value = true }
  function expand() { collapsed.value = false }

  return { collapsed, toggle, collapse, expand }
}
