import { ref, computed, reactive } from 'vue'

export type FileStatus = 'M' | 'A' | 'D' | 'U'

export interface GitFile {
  path: string
  status: FileStatus
}

interface SourceControlState {
  branch: string
  ahead: number
  behind: number
  staged: GitFile[]
  unstaged: GitFile[]
  commitMessage: string
  isPushing: boolean
  isPulling: boolean
}

const state = reactive<SourceControlState>({
  branch: 'main',
  ahead: 2,
  behind: 0,
  staged: [
    { path: 'functions.php', status: 'M' },
    { path: 'style.css', status: 'M' },
  ],
  unstaged: [
    { path: 'template-parts/header.php', status: 'M' },
    { path: 'assets/app.js', status: 'A' },
    { path: 'README.md', status: 'U' },
  ],
  commitMessage: '',
  isPushing: false,
  isPulling: false,
})

const stagedOpen = ref(true)
const unstagedOpen = ref(true)

function stageFile(path: string) {
  const idx = state.unstaged.findIndex(f => f.path === path)
  if (idx === -1) return
  const [file] = state.unstaged.splice(idx, 1)
  state.staged.push(file)
}

function unstageFile(path: string) {
  const idx = state.staged.findIndex(f => f.path === path)
  if (idx === -1) return
  const [file] = state.staged.splice(idx, 1)
  state.unstaged.push(file)
}

function stageAll() {
  state.staged.push(...state.unstaged.splice(0))
}

function unstageAll() {
  state.unstaged.push(...state.staged.splice(0))
}

function discardFile(path: string) {
  const idx = state.unstaged.findIndex(f => f.path === path)
  if (idx !== -1) state.unstaged.splice(idx, 1)
}

function commit() {
  if (state.staged.length === 0 || !state.commitMessage.trim()) return
  const msg = state.commitMessage.trim()
  state.staged.splice(0)
  state.commitMessage = ''
  state.ahead++
  return msg
}

function generateCommitMessage() {
  const fileNames = state.staged.map(f => {
    const name = f.path.split('/').pop() ?? f.path
    return name
  })
  const verb = state.staged.some(f => f.status === 'A') ? 'Add' : 'Update'
  state.commitMessage = `${verb} ${fileNames.join(', ')}`
}

function push() {
  if (state.isPushing || state.ahead === 0) return
  state.isPushing = true
  setTimeout(() => {
    state.ahead = 0
    state.isPushing = false
  }, 800)
}

function pull() {
  if (state.isPulling || state.behind === 0) return
  state.isPulling = true
  setTimeout(() => {
    state.behind = 0
    state.isPulling = false
  }, 800)
}

export function useSourceControl() {
  return {
    state,
    stagedOpen,
    unstagedOpen,
    stageFile,
    unstageFile,
    stageAll,
    unstageAll,
    discardFile,
    commit,
    generateCommitMessage,
    push,
    pull,
  }
}
