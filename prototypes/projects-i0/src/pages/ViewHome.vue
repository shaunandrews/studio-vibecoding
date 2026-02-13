<script setup lang="ts">
import { plus } from '@wordpress/icons'
import Titlebar from '@/components/Titlebar.vue'
import Panel from '@/components/Panel.vue'
import Button from '@/components/Button.vue'
import Text from '@/components/Text.vue'
import StatusIndicator from '@/components/StatusIndicator.vue'
import InputChat from '@/components/InputChat.vue'
import { useProjects } from '@/data/useProjects'

const { projects } = useProjects()
</script>

<template>
  <div class="view-home vstack">
    <Titlebar />
    <div class="home-panels hstack align-stretch flex-1 min-h-0">
      <!-- Projects Panel -->
      <Panel surface="dark">
        <div class="panel-content vstack gap-s p-m overflow-auto flex-1">
          <div class="hstack justify-between">
            <Text variant="label" color="muted" tag="h2">Projects</Text>
            <Button variant="secondary" :icon="plus" label="New project" size="small" surface="dark" />
          </div>
          <div class="project-grid">
            <router-link
              v-for="project in projects"
              :key="project.id"
              :to="`/view-project`"
              class="project-card vstack gap-xs"
            >
              <div class="project-card-header hstack gap-xs">
                <img class="project-card-favicon" :src="project.favicon" alt="" />
                <div class="flex-1 min-w-0">
                  <Text variant="body" weight="medium" tag="div" class="project-card-name">{{ project.name }}</Text>
                  <Text variant="caption" color="muted">{{ project.url }}</Text>
                </div>
                <StatusIndicator :status="project.status" />
              </div>
              <div class="project-card-preview">
                <Text variant="caption" color="muted" class="preview-placeholder">Site preview</Text>
              </div>
            </router-link>
          </div>
        </div>
      </Panel>

      <!-- Chat Panel -->
      <Panel surface="dark">
        <div class="panel-content vstack gap-s p-m flex-1">
          <Text variant="label" color="muted" tag="h2">Chat</Text>
          <Text variant="body" color="secondary">Ask anything across all your projects.</Text>
          <InputChat surface="dark" />
        </div>
      </Panel>
    </div>
  </div>
</template>

<style scoped>
.view-home {
  height: 100vh;
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  font-family: var(--font-family);
  font-size: var(--font-size-m);
  -webkit-font-smoothing: antialiased;
}

.home-panels {
  min-height: 0;
}

/* Project Grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-s);
}

.project-card {
  background: var(--color-chrome-secondary);
  border: 1px solid var(--color-chrome-border);
  border-radius: var(--radius-m);
  padding: var(--space-s);
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  border-color: var(--color-chrome-text-muted);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.project-card-favicon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
}

.project-card-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-card-preview {
  background: var(--color-chrome-border);
  border-radius: var(--radius-s);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
