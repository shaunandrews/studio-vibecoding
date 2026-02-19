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
      name: 'site',
      path: '/projects/:id',
      components: {
        main: () => import('@/pages/SitePage.vue'),
      },
      meta: { layout: 'main', mode: 'project' },
      beforeEnter: (to) => {
        const { projects } = useProjects()
        const exists = projects.value.some(p => p.id === to.params.id)
        if (!exists) return '/'
      },
    },
    {
      name: 'chat-popout',
      path: '/chat-popout/:id',
      component: () => import('@/pages/ChatPopout.vue'),
      meta: { layout: 'bare', mode: 'popout' },
    },
    // Catch-all
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
