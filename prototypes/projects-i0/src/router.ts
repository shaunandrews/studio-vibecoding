import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/Index.vue') },
    { path: '/design-system', component: () => import('./pages/DesignSystem.vue') },
    { path: '/view-project', component: () => import('./pages/ViewProject.vue') },
    { path: '/view-home', component: () => import('./pages/ViewHome.vue') },
    { path: '/components', component: () => import('./pages/Components.vue') },
    { path: '/architecture', component: () => import('./pages/Architecture.vue') },
  ],
})

export default router
