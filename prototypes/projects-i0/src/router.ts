import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/Index.vue') },
    { path: '/design-system', component: () => import('./pages/DesignSystem.vue') },
    { path: '/app-shell', component: () => import('./pages/AppShell.vue') },
    { path: '/components', component: () => import('./pages/Components.vue') },
    { path: '/architecture', component: () => import('./pages/Architecture.vue') },
  ],
})

export default router
