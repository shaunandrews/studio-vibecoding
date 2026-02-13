<script setup lang="ts">
import { plus } from '@wordpress/icons'
import Panel from '@/components/composites/Panel.vue'
import Button from '@/components/primitives/Button.vue'
import Text from '@/components/primitives/Text.vue'
import ProjectGrid from '@/components/features/ProjectGrid.vue'
import HomeChat from '@/components/features/HomeChat.vue'
import OnboardingEmpty from '@/components/features/OnboardingEmpty.vue'
import { useProjects } from '@/data/useProjects'
import { useRouter } from 'vue-router'

const { projects } = useProjects()
const router = useRouter()

function openProject(id: string) {
  router.push({ name: 'project', params: { id } })
}
</script>

<template>
  <div class="home-panels hstack align-stretch flex-1 min-h-0">
    <!-- Projects Panel -->
    <Panel surface="dark">
      <div class="panel-content vstack gap-s p-m overflow-auto flex-1">
        <div class="hstack justify-between">
          <Text variant="label" color="muted" tag="h2">Projects</Text>
          <Button variant="secondary" :icon="plus" label="New project" size="small" surface="dark" />
        </div>

        <OnboardingEmpty v-if="projects.length === 0" @action="() => {}" />

        <ProjectGrid
          v-else
          :projects="projects"
          @open-project="openProject"
        />
      </div>
    </Panel>

    <!-- Chat Panel -->
    <Panel surface="dark">
      <div class="panel-content vstack gap-s p-m flex-1">
        <Text variant="label" color="muted" tag="h2">Chat</Text>
        <Text variant="body" color="secondary">Ask anything across all your projects.</Text>
        <HomeChat />
      </div>
    </Panel>
  </div>
</template>
