import { createRouter, createWebHistory } from 'vue-router'
import { useProjects } from '@/data/useProjects'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: { render: () => null },
      meta: { layout: 'main', mode: 'home' },
    },
    {
      name: 'project',
      path: '/projects/:id',
      components: {
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
      component: { render: () => null },
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
      redirect: '/components/primitives',
      children: [
        { name: 'components-primitives', path: 'primitives', component: () => import('@/pages/components/PrimitivesPage.vue'), meta: { layout: 'bare' } },
        { name: 'components-composites', path: 'composites', component: () => import('@/pages/components/CompositesPage.vue'), meta: { layout: 'bare' } },
        { name: 'components-features', path: 'features', component: () => import('@/pages/components/FeaturesPage.vue'), meta: { layout: 'bare' } },
        { name: 'components-chat-cards', path: 'chat-cards', component: () => import('@/pages/components/ChatCardsPage.vue'), meta: { layout: 'bare' } },
      ],
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
