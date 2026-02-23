import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/signup/SignupView.vue'
import UsersView from '@/views/UsersView.vue'
import DepsView from '@/views/DepsView.vue'
import CoursesView from '@/views/CoursesView.vue'
import SubjectsView from '@/views/SubjectsView.vue'
import StudentsView from '@/views/StudentsView.vue'
import DefaultLayout from '@/views/layout/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          titleKey: 'home.title.home'
        }
      },
      {
        path: 'users',
        name: 'users',
        component: UsersView,
        meta: {
          titleKey: 'home.title.users'
        }
      },
      {
        path: 'departments',
        name: 'departments',
        component: DepsView,
        meta: {
          titleKey: 'home.title.departments'
        }
      },
      {
        path: 'courses',
        name: 'courses',
        component: CoursesView,
        meta: {
          titleKey: 'home.title.courses'
        }
      },
      {
        path: 'subjects',
        name: 'subjects',
        component: SubjectsView,
        meta: {
          titleKey: 'home.title.subjects'
        }
      },
      {
        path: 'students',
        name: 'students',
        component: StudentsView,
        meta: {
          titleKey: 'home.title.students'
        }
      },
      {
        path: 'students/:id',
        name: 'student-details',
        component: () => import('@/views/StudentDetailView.vue'),
        meta: {
          titleKey: 'home.title.student'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
