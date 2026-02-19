import { ref } from 'vue'

// Module-level state (singleton — shared across all components)
const isPoppedOut = ref(false)
let popoutWindow: Window | null = null

export function useChatPopout() {
  function popOut(projectId: string) {
    if (popoutWindow && !popoutWindow.closed) {
      popoutWindow.focus()
      return
    }

    const width = 400
    const height = 700
    const left = window.screenX + window.outerWidth - width - 20
    const top = window.screenY + 80

    popoutWindow = window.open(
      `/chat-popout/${projectId}`,
      'devkit-chat',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    isPoppedOut.value = true

    // Poll for the popup closing
    const checkClosed = setInterval(() => {
      if (popoutWindow && popoutWindow.closed) {
        clearInterval(checkClosed)
        isPoppedOut.value = false
        popoutWindow = null
      }
    }, 500)
  }

  function dockBack() {
    if (popoutWindow && !popoutWindow.closed) {
      popoutWindow.close()
    }
    isPoppedOut.value = false
    popoutWindow = null
  }

  return { isPoppedOut, popOut, dockBack }
}
