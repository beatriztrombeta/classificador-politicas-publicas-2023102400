import { createRouter, createWebHistory } from 'vue-router'
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
        path: 'units',
        name: 'units',
        component: UnitsView,
        meta: {
          titleKey: 'home.title.units'
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

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

let authCheckedAt = 0;
let isAuthedCache = false;

async function checkAuth() {
  const now = Date.now();
  if (now - authCheckedAt < 30_000) return isAuthedCache;

  try {
    const res = await fetch(`${apiBase}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    isAuthedCache = res.ok;
  } catch {
    isAuthedCache = false;
  } finally {
    authCheckedAt = now;
  }

  return isAuthedCache;
}

router.beforeEach(async (to) => {
  const publicPaths = new Set(["/login", "/auth", "/signup"]);
  const isPublic = publicPaths.has(to.path);

  if (to.path === "/") {
    const ok = await checkAuth();
    return ok ? { path: "/home" } : { path: "/login" };
  }

  if (isPublic) {
    const ok = await checkAuth();
    if (ok) return { path: "/home" };
    return true;
  }

  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth);
  if (!requiresAuth) return true;

  const ok = await checkAuth();
  if (!ok) return { path: "/login" };

  return true;
});

export default router