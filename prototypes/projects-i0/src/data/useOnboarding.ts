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
import type { ProjectType, ContentBlock, Message } from './types'

// ---- Per-project onboarding state ----

interface OnboardingState {
  step: 'type' | 'name' | 'description'
  type: ProjectType
  name: string
  description: string
  freeTextType?: string
  resolve?: (value: string) => void
}

const onboardingStates: Record<string, OnboardingState> = reactive({})

// ---- Messages (ported from OnboardingChat) ----

const nameMessages: Record<ProjectType, string> = {
  restaurant: "Nice — what's the restaurant called?",
  portfolio: "Love it. What's your name, or what should we call the site?",
  store: "Great choice. What's the store called?",
  blog: "Fun. What do you want to call it?",
  custom: "Cool! What's it called?",
}

const descMessages: Record<ProjectType, string> = {
  restaurant: "Last thing — describe it in a sentence. What kind of food, what's the vibe?",
  portfolio: "Almost there. In a sentence — what kind of work do you do?",
  store: "One more — what do you sell, and who's it for?",
  blog: "Last one — what do you write about?",
  custom: "Describe it in a sentence — who's it for and what does it do?",
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

/** Strip actions blocks containing a specific payload key from a conversation's messages */
function consumeActions(msgs: Message[], convoId: string, payloadKey: string) {
  for (const msg of msgs) {
    if (msg.conversationId !== convoId || msg.role !== 'agent') continue
    const has = msg.content.some(b => b.type === 'actions' && b.actions.some(a => a.action.payload?.[payloadKey]))
    if (has) {
      msg.content = msg.content.filter(b => !(b.type === 'actions' && b.actions.some(a => a.action.payload?.[payloadKey])))
    }
  }
}

// ---- Exports ----

export function useOnboarding() {
  const { ensureConversation, postMessage, streamAgentMessage, messages } = useConversations()
  const { updateProject } = useProjects()
  const { startBuild } = useBuildProgress()
  const { hide } = usePreviewState()

  function isOnboarding(projectId: string): boolean {
    return !!onboardingStates[projectId]
  }

  function getOnboardingStep(projectId: string): 'type' | 'name' | 'description' | null {
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

    // 2. Hide preview — nothing to show until first section is built
    hide(projectId)

    // 3. Ensure conversation exists
    const convo = ensureConversation(projectId, 'assistant')

    // 3. Opening message
    await streamAgentMessage(convo.id, 'Hey! What are you building today?', 'assistant')

    // 4. Type selection buttons
    const typeActions: ContentBlock[] = [{
      type: 'actions',
      actions: [
        { id: 'type-restaurant', label: 'Restaurant', variant: 'secondary', action: { type: 'send-message', message: 'Restaurant', payload: { onboardingType: 'restaurant' } } },
        { id: 'type-portfolio', label: 'Portfolio', variant: 'secondary', action: { type: 'send-message', message: 'Portfolio', payload: { onboardingType: 'portfolio' } } },
        { id: 'type-store', label: 'Online Store', variant: 'secondary', action: { type: 'send-message', message: 'Online Store', payload: { onboardingType: 'store' } } },
        { id: 'type-blog', label: 'Blog', variant: 'secondary', action: { type: 'send-message', message: 'Blog', payload: { onboardingType: 'blog' } } },
        { id: 'type-custom', label: 'Something else', variant: 'secondary', action: { type: 'send-message', message: 'Something else', payload: { onboardingType: 'custom' } } },
      ],
    }]
    postMessage(convo.id, 'agent', typeActions, 'assistant')

    // 5. Wait for type selection
    const typeInput = await waitForInput(projectId)
    consumeActions(messages.value, convo.id, 'onboardingType')
    const state = onboardingStates[projectId]
    if (!state) return // cancelled

    // Parse: known type from action button, or freeform text
    const knownTypes: ProjectType[] = ['restaurant', 'portfolio', 'store', 'blog', 'custom']
    if (knownTypes.includes(typeInput as ProjectType)) {
      state.type = typeInput as ProjectType
    } else {
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

    // 10. Skip button (since InputChat won't fire on empty text)
    const skipAction: ContentBlock[] = [{
      type: 'actions',
      actions: [
        { id: 'skip-description', label: 'Skip', variant: 'secondary', action: { type: 'send-message', message: 'Skip', payload: { onboardingSkip: 'true' } } },
      ],
    }]
    postMessage(convo.id, 'agent', skipAction, 'assistant')

    // 11. Wait for description
    const descInput = await waitForInput(projectId)
    consumeActions(messages.value, convo.id, 'onboardingSkip')
    if (!onboardingStates[projectId]) return
    state.description = descInput

    // 12. Clear onboarding state
    const brief = {
      type: state.type,
      name: state.name,
      description: state.description,
      freeTextType: state.freeTextType,
    }
    delete onboardingStates[projectId]

    // 13. Seamless transition into build
    startBuild(projectId, brief)
  }

  return {
    startOnboarding,
    isOnboarding,
    getOnboardingStep,
    resolveInput,
  }
}
