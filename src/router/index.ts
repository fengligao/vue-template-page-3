import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/table.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('../views/page.vue')
    }
  ]
})

export default router
