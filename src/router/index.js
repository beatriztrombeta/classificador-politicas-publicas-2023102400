import { createRouter, createWebHistory } from 'vue-router'
import { CATEGORY_ALLOWED_NAV, USER_CATEGORIES } from '@/schemas/navigation'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/signup/SignupView.vue'
import UsersView from '@/views/UsersView.vue'
import CoursesView from '@/views/CoursesView.vue'
import SubjectsView from '@/views/SubjectsView.vue'
import StudentsView from '@/views/StudentsView.vue'
import DefaultLayout from '@/views/layout/DefaultLayout.vue'
import UnitsView from '@/views/UnitsView.vue'

const routes = [
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
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: { titleKey: 'home.title.home' }
      },
      {
        path: 'users',
        name: 'users',
        component: UsersView,
        meta: { titleKey: 'home.title.users' }
      },
      {
        path: 'units',
        name: 'units',
        component: UnitsView,
        meta: { titleKey: 'home.title.units' }
      },
      {
        path: 'courses',
        name: 'courses',
        component: CoursesView,
        meta: { titleKey: 'home.title.courses' }
      },
      {
        path: 'subjects',
        name: 'subjects',
        component: SubjectsView,
        meta: { titleKey: 'home.title.subjects' }
      },
      {
        path: 'students',
        name: 'students',
        component: StudentsView,
        meta: { titleKey: 'home.title.students' }
      },
      {
        path: 'students/:id',
        name: 'student-details',
        component: () => import('@/views/StudentDetailView.vue'),
        meta: { titleKey: 'home.title.student' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let authCheckedAt = 0
let isAuthedCache = false
const AUTH_CACHE_TTL = 30000

function saveAuthUser(user) {
  localStorage.setItem('auth_user', JSON.stringify(user))
  window.dispatchEvent(new CustomEvent('auth-user-updated', { detail: user }))
}

function clearAuthUser() {
  localStorage.removeItem('auth_user')
  window.dispatchEvent(new CustomEvent('auth-user-updated', { detail: null }))
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('auth_user') || '{}')
  } catch {
    return {}
  }
}

export function invalidateAuthCache() {
  authCheckedAt = 0
  isAuthedCache = false
}

export async function checkAuth(force = false) {
  const now = Date.now()

  if (!force && isAuthedCache && now - authCheckedAt < AUTH_CACHE_TTL) {
    return true
  }

  try {
    const res = await fetch(`${apiBase}/auth/me`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!res.ok) {
      invalidateAuthCache()
      clearAuthUser()
      return false
    }

    const body = await res.json().catch(() => ({}))

    saveAuthUser({
      id_usuario: body?.id_usuario ?? null,
      id_categoria_usuario: body?.id_categoria_usuario ?? null,
      email: body?.email ?? null,
      nome: body?.nome ?? null,
      status_cadastro: body?.status_cadastro ?? null
    })

    isAuthedCache = true
    authCheckedAt = now
    return true
  } catch {
    invalidateAuthCache()
    clearAuthUser()
    return false
  }
}

function getDefaultRouteByCategory(categoryId, userId) {
  if (categoryId === USER_CATEGORIES.ALUNO && userId) return `/students/${userId}`
  if ([USER_CATEGORIES.REITORIA, USER_CATEGORIES.PRO_REITORIA].includes(categoryId)) return '/units'
  if ([USER_CATEGORIES.DEPARTAMENTO, USER_CATEGORIES.COORDENACAO].includes(categoryId)) return '/courses'
  if (categoryId === USER_CATEGORIES.PROFESSOR) return '/subjects'
  return '/home'
}

function canAccessRoute(to, user) {
  const categoryId = Number(user?.id_categoria_usuario)
  const userId = Number(user?.id_usuario)

  if (!categoryId) return false

  if (to.name === 'student-details') {
    if (categoryId === USER_CATEGORIES.ALUNO) {
      return Number(to.params.id) === userId
    }
    return true
  }

  if (to.name === 'students') {
    return categoryId !== USER_CATEGORIES.ALUNO
  }

  const allowedNames = CATEGORY_ALLOWED_NAV[categoryId] || []
  return allowedNames.includes(to.name)
}

router.beforeEach(async (to) => {
  const publicNames = new Set(['login', 'auth', 'signup'])
  const isPublic = publicNames.has(to.name)

  if (isPublic) {
    const ok = await checkAuth()
    if (!ok) return true

    const user = getStoredUser()
    const categoryId = Number(user?.id_categoria_usuario)
    const userId = Number(user?.id_usuario)
    return { path: getDefaultRouteByCategory(categoryId, userId) }
  }

  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth)
  if (!requiresAuth) return true

  const ok = await checkAuth()
  if (!ok) {
    return { path: '/login' }
  }

  const user = getStoredUser()
  const categoryId = Number(user?.id_categoria_usuario)
  const userId = Number(user?.id_usuario)

  if (to.path === '/') {
    return { path: getDefaultRouteByCategory(categoryId, userId) }
  }

  if (!canAccessRoute(to, user)) {
    return { path: getDefaultRouteByCategory(categoryId, userId) }
  }

  return true
})

export default router