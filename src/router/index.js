import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/signup/SignupView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/auth',
    component: AuthView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/signup',
    component: SignupView,
  },
  {
    path: '/home',
    component: HomeView,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
