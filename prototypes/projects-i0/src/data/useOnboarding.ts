/**
 * Inline Onboarding Orchestrator
 *
 * Runs the "what are you building?" flow as the first messages in the
 * project chat, replacing the old NewProjectModal.
 *
 * Module-level singleton state (same pattern as useBuildProgress).
 * Promise-based input waiting (same pattern as selectBrief).
 */

import { reactive } from 'vue'
import { useConversations } from './useConversations'
import { useProjects } from './useProjects'
import { useBuildProgress } from './useBuildProgress'
import { usePreviewState } from './usePreviewState'
import { useInputActions } from './useInputActions'
import type { ProjectType } from './types'

// ---- Per-project onboarding state ----

interface OnboardingState {
  step: 'type' | 'name' | 'description' | 'visual' | 'inspiration'
  type: ProjectType
  name: string
  description: string
  freeTextType?: string
  visualDirection?: string
  inspiration?: string
  resolve?: (value: string) => void
}

const onboardingStates: Record<string, OnboardingState> = reactive({})

const greetings = [
  "Hey, it's Kit—your AI assistant.",
  "Hey! Kit here, ready when you are.",
  "Hi! I'm Kit, your AI assistant.",
  "Kit here—let's make something.",
  "Hey! Kit here.",
]

function randomGreeting(): string {
  return greetings[Math.floor(Math.random() * greetings.length)]!
}

// ---- Messages (ported from OnboardingChat) ----

const nameMessages: Record<ProjectType, string> = {
  restaurant: "Nice—what's the restaurant called?",
  portfolio: "Love it. What's your name, or what should we call the site?",
  store: "Great choice. What's the store called?",
  blog: "Fun. What do you want to call it?",
  custom: "Cool! What's it called?",
}

const descMessages: Record<ProjectType, string> = {
  restaurant: "Describe it in a sentence. What kind of food, what's the vibe?",
  portfolio: "In a sentence—what kind of work do you do?",
  store: "What do you sell, and who's it for?",
  blog: "What do you write about?",
  custom: "Describe it in a sentence—who's it for and what does it do?",
}

const typeLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  portfolio: 'Portfolio',
  store: 'Online Store',
  blog: 'Blog',
  custom: 'Something else',
}

// ---- Helpers ----

function waitForInput(projectId: string): Promise<string> {
  return new Promise(resolve => {
    const state = onboardingStates[projectId]
    if (state) state.resolve = resolve
  })
}

// ---- Exports ----

export function useOnboarding() {
  const { ensureConversation, streamAgentMessage } = useConversations()
  const { pushActions, clearActions } = useInputActions()
  const { updateProject } = useProjects()
  const { startBuild } = useBuildProgress()
  const { hide } = usePreviewState()

  function isOnboarding(projectId: string): boolean {
    return !!onboardingStates[projectId]
  }

  function getOnboardingStep(projectId: string): OnboardingState['step'] | null {
    return onboardingStates[projectId]?.step ?? null
  }

  function resolveInput(projectId: string, value: string) {
    const state = onboardingStates[projectId]
    if (state?.resolve) {
      const fn = state.resolve
      state.resolve = undefined
      fn(value)
    }
  }

  async function startOnboarding(projectId: string) {
    // 1. Init state
    onboardingStates[projectId] = {
      step: 'type',
      type: 'custom',
      name: '',
      description: '',
    }

    // 2. Hide preview—nothing to show until first section is built
    hide(projectId)

    // 3. Ensure conversation exists
    const convo = ensureConversation(projectId, 'assistant')

    // 3. Opening messages
    await streamAgentMessage(convo.id, randomGreeting(), 'assistant')
    await streamAgentMessage(convo.id, "I can design and build just about anything. I can make stores, blogs, portfolios, apps, you name it. Just describe what you want and I'll make it happen.", 'assistant')
    await streamAgentMessage(convo.id, "So, what are we making?", 'assistant')

    pushActions({
      id: 'onboarding-type',
      conversationId: convo.id,
      actions: [
        { id: 'type-business', label: 'Business Site', variant: 'secondary', action: { type: 'send-message', message: 'Business Site' } },
        { id: 'type-store', label: 'Online Store', variant: 'secondary', action: { type: 'send-message', message: 'Online Store' } },
        { id: 'type-blog', label: 'Blog', variant: 'secondary', action: { type: 'send-message', message: 'Blog' } },
        { id: 'type-portfolio', label: 'Portfolio', variant: 'secondary', action: { type: 'send-message', message: 'Portfolio' } },
        { id: 'type-restaurant', label: 'Restaurant', variant: 'secondary', action: { type: 'send-message', message: 'Restaurant' } },
        { id: 'type-agency', label: 'Agency', variant: 'secondary', action: { type: 'send-message', message: 'Agency' } },
        { id: 'type-nonprofit', label: 'Nonprofit', variant: 'secondary', action: { type: 'send-message', message: 'Nonprofit' } },
        { id: 'type-membership', label: 'Membership', variant: 'secondary', action: { type: 'send-message', message: 'Membership' } },
        { id: 'type-course', label: 'Course', variant: 'secondary', action: { type: 'send-message', message: 'Course' } },
        { id: 'type-event', label: 'Event', variant: 'secondary', action: { type: 'send-message', message: 'Event' } },
      ],
    })

    // 5. Wait for type selection
    const typeInput = await waitForInput(projectId)
    const state = onboardingStates[projectId]
    if (!state) return // cancelled

    // Map button labels → ProjectType (for page configs)
    const labelToType: Record<string, ProjectType> = {
      'Business Site': 'custom',
      'Online Store': 'store',
      'Blog': 'blog',
      'Portfolio': 'portfolio',
      'Restaurant': 'restaurant',
      'Agency': 'custom',
      'Nonprofit': 'custom',
      'Membership': 'custom',
      'Course': 'custom',
      'Event': 'custom',
    }

    const mappedType = labelToType[typeInput]
    if (mappedType) {
      state.type = mappedType
      // Always store the label so the prompt gets "Business Site" not "custom"
      state.freeTextType = typeInput
    } else {
      // Free text input (user typed something custom)
      state.type = 'custom'
      state.freeTextType = typeInput
    }

    // 6. Ask for name
    state.step = 'name'
    await streamAgentMessage(convo.id, nameMessages[state.type], 'assistant')

    // 7. Wait for name
    const nameInput = await waitForInput(projectId)
    if (!onboardingStates[projectId]) return
    state.name = nameInput

    // 8. Update sidebar immediately
    updateProject(projectId, {
      name: nameInput,
      favicon: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(nameInput)}`,
    })

    // 9. Ask for description
    state.step = 'description'
    await streamAgentMessage(convo.id, descMessages[state.type], 'assistant')

    // 10. Skip button—pushed to the input area
    pushActions({
      id: 'onboarding-skip',
      conversationId: convo.id,
      actions: [
        { id: 'skip-description', label: 'Skip', variant: 'secondary', action: { type: 'send-message', message: 'Skip', payload: { onboardingSkip: 'true' } } },
      ],
    })

    // 11. Wait for description
    const descInput = await waitForInput(projectId)
    clearActions(convo.id)
    if (!onboardingStates[projectId]) return
    state.description = descInput

    // 12. Ask for visual direction
    state.step = 'visual'
    await streamAgentMessage(convo.id, "How do you want the site to look and feel? Any vibe, mood, or style you have in mind?", 'assistant')
    pushActions({
      id: 'onboarding-skip-visual',
      conversationId: convo.id,
      actions: [
        { id: 'skip-visual', label: 'Skip', variant: 'secondary', action: { type: 'send-message', message: 'Skip', payload: { onboardingSkip: 'true' } } },
      ],
    })

    const visualInput = await waitForInput(projectId)
    clearActions(convo.id)
    if (!onboardingStates[projectId]) return
    if (visualInput.toLowerCase() !== 'skip') {
      state.visualDirection = visualInput
    }

    // 13. Ask for inspiration
    state.step = 'inspiration'
    await streamAgentMessage(convo.id, "Are there any sites you really like, or want to use as inspiration?", 'assistant')
    pushActions({
      id: 'onboarding-skip-inspiration',
      conversationId: convo.id,
      actions: [
        { id: 'skip-inspiration', label: 'Skip', variant: 'secondary', action: { type: 'send-message', message: 'Skip', payload: { onboardingSkip: 'true' } } },
      ],
    })

    const inspirationInput = await waitForInput(projectId)
    clearActions(convo.id)
    if (!onboardingStates[projectId]) return
    if (inspirationInput.toLowerCase() !== 'skip') {
      state.inspiration = inspirationInput
    }

    // 14. Clear onboarding state
    const brief = {
      type: state.type,
      name: state.name,
      description: state.description,
      freeTextType: state.freeTextType,
      visualDirection: state.visualDirection,
      inspiration: state.inspiration,
    }
    delete onboardingStates[projectId]

    // 15. Seamless transition into build
    startBuild(projectId, brief)
  }

  return {
    startOnboarding,
    isOnboarding,
    getOnboardingStep,
    resolveInput,
  }
}
