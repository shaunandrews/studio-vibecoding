import { ref, computed } from 'vue'
import type { Skill } from './types'
import { seedSkills } from './seed-skills'

// Module-level state (singleton)
const skills = ref<Skill[]>(structuredClone(seedSkills))

export function useSkills() {
  const installedSkills = computed(() =>
    skills.value.filter(s => s.installed)
  )

  const directorySkills = computed(() =>
    skills.value.filter(s => !s.installed)
  )

  function getSkill(id: string): Skill | undefined {
    return skills.value.find(s => s.id === id)
  }

  function getActiveSkills(projectId: string): Skill[] {
    return skills.value.filter(s => s.installed && s.activeProjectIds.includes(projectId))
  }

  function getSkillPrompt(projectId: string): string {
    const active = getActiveSkills(projectId)
    if (active.length === 0) return ''

    const skillBlocks = active.map(s => {
      const cmd = s.slashCommand ? ` (user can invoke with ${s.slashCommand})` : ' (auto-invoke when relevant)'
      return `### ${s.name}${cmd}\n${s.systemPrompt}`
    }).join('\n\n')

    return `\n\n## Active Skills\n\nYou have the following skills enabled for this project. Use them when relevant. When you use a skill, output a \`card:skillBanner\` fence FIRST, then continue your response.\n\n\`\`\`card:skillBanner\n{ "skillId": "id", "skillName": "Name", "skillIcon": "icon", "category": "category" }\n\`\`\`\n\n${skillBlocks}`
  }

  function installSkill(id: string) {
    const skill = skills.value.find(s => s.id === id)
    if (skill) skill.installed = true
  }

  function uninstallSkill(id: string) {
    const skill = skills.value.find(s => s.id === id)
    if (skill) {
      skill.installed = false
      skill.activeProjectIds = []
    }
  }

  function toggleSkillForProject(skillId: string, projectId: string) {
    const skill = skills.value.find(s => s.id === skillId)
    if (!skill || !skill.installed) return
    const idx = skill.activeProjectIds.indexOf(projectId)
    if (idx >= 0) {
      skill.activeProjectIds.splice(idx, 1)
    } else {
      skill.activeProjectIds.push(projectId)
    }
  }

  function isSkillActiveForProject(skillId: string, projectId: string): boolean {
    const skill = skills.value.find(s => s.id === skillId)
    return !!skill?.activeProjectIds.includes(projectId)
  }

  function createSkill(partial: Omit<Skill, 'installed' | 'activeProjectIds' | 'source'>): Skill {
    const skill: Skill = {
      ...partial,
      source: 'custom',
      installed: true,
      activeProjectIds: [],
    }
    skills.value.push(skill)
    return skill
  }

  function matchSlashCommand(input: string, projectId: string): Skill[] {
    if (!input.startsWith('/')) return []
    const query = input.slice(1).toLowerCase()
    return getActiveSkills(projectId).filter(s =>
      s.slashCommand && s.slashCommand.slice(1).toLowerCase().startsWith(query)
    )
  }

  function getSkillsByCategory(category?: string): Skill[] {
    if (!category) return skills.value
    return skills.value.filter(s => s.category === category)
  }

  return {
    skills,
    installedSkills,
    directorySkills,
    getSkill,
    getActiveSkills,
    getSkillPrompt,
    installSkill,
    uninstallSkill,
    toggleSkillForProject,
    isSkillActiveForProject,
    createSkill,
    matchSlashCommand,
    getSkillsByCategory,
  }
}
