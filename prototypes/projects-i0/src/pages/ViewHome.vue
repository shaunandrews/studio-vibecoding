<script setup lang="ts">
import { ref } from 'vue'
import { plus, cog, help } from '@wordpress/icons'
import Titlebar from '../components/Titlebar.vue'
import Button from '../components/Button.vue'
import Text from '../components/Text.vue'
import StatusIndicator from '../components/StatusIndicator.vue'
import InputChat from '../components/InputChat.vue'

interface Project {
  id: string
  name: string
  favicon: string
  status: 'running' | 'stopped' | 'loading'
  url: string
}

const projects = ref<Project[]>([
  { id: '1', name: 'Downstreet Cafe', favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=cafe', status: 'running', url: 'downstreet-cafe.local' },
  { id: '2', name: "Shaun's Blog", favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=blog', status: 'running', url: 'shaunsblog.local' },
  { id: '3', name: 'UI Portfolio', favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=portfolio', status: 'stopped', url: 'ui-portfolio.local' },
  { id: '4', name: 'Client Project', favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=client', status: 'stopped', url: 'client-project.local' },
])
</script>

<template>
  <div class="view-home vstack">
    <Titlebar />
    <div class="home-content flex-1 overflow-auto">
      <div class="home-inner vstack gap-xxl">

        <!-- Projects Section -->
        <section class="projects-section vstack gap-s">
          <div class="hstack justify-between">
            <Text variant="label" color="muted" tag="h2">Projects</Text>
            <Button variant="secondary" :icon="plus" label="New project" size="small" />
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
        </section>

        <!-- Global Chat Section -->
        <section class="chat-section vstack gap-s">
          <Text variant="label" color="muted" tag="h2">Chat</Text>
          <Text variant="body" color="secondary">Ask anything across all your projects.</Text>
          <div class="home-chat-input">
            <InputChat />
          </div>
        </section>

      </div>
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

.home-content {
  background: var(--color-chrome);
  color: var(--color-chrome-text);
  min-height: 0;
}

.home-inner {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: var(--space-xxl) var(--space-xl);
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

/* Chat Section */
.home-chat-input {
  max-width: 640px;
}
</style>
