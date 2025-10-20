import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
    path: '/',
    redirect: '/login',
  },
  {
    path:'/auth',
    component: AuthView,
  },
  {
    path: '/login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
