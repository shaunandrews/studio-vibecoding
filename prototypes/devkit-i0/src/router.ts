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
    // Catch-all
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
