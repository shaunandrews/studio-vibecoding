import { createRouter, createWebHistory } from 'vue-router'
import { useProjects } from '@/data/useProjects'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      components: {
        left: () => import('@/pages/HomePage.vue'),
      },
      meta: { layout: 'main', mode: 'home' },
    },
    {
      name: 'project',
      path: '/projects/:id',
      components: {
        left: () => import('@/components/features/Sidebar.vue'),
        main: () => import('@/pages/ProjectPage.vue'),
      },
      meta: { layout: 'main', mode: 'project' },
      beforeEnter: (to) => {
        const { projects } = useProjects()
        const exists = projects.value.some(p => p.id === to.params.id)
        if (!exists) return '/'
      },
    },
    {
      name: 'settings',
      path: '/settings',
      components: {
        left: () => import('@/pages/SettingsPage.vue'),
      },
      meta: { layout: 'main', mode: 'home' },
    },
    // Dev pages — bare layout (no app chrome)
    {
      name: 'design-system',
      path: '/design-system',
      component: () => import('@/pages/DesignSystem.vue'),
      meta: { layout: 'bare' },
    },
    {
      name: 'components',
      path: '/components',
      component: () => import('@/pages/Components.vue'),
      meta: { layout: 'bare' },
    },
    {
      name: 'architecture',
      path: '/architecture',
      component: () => import('@/pages/ArchitecturePage.vue'),
      meta: { layout: 'bare' },
    },
    // Catch-all
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
