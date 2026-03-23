export const USER_CATEGORIES = {
  ADMIN: 1,
  REITORIA: 2,
  PRO_REITORIA: 3,
  DEPARTAMENTO: 4,
  COORDENACAO: 5,
  PROFESSOR: 6,
  ALUNO: 7
}

export const CATEGORY_NAMES = {
  1: 'ADMIN',
  2: 'REITORIA',
  3: 'PRO-REITORIA',
  4: 'DEPARTAMENTO',
  5: 'COORDENAÇÃO',
  6: 'PROFESSOR',
  7: 'ALUNO'
}

export const navigationItems = [
  { name: 'home', path: '/home', titleKey: 'home.title.home' },
  { name: 'users', path: '/users', titleKey: 'home.title.users' },
  { name: 'units', path: '/units', titleKey: 'home.title.units' },
  { name: 'courses', path: '/courses', titleKey: 'home.title.courses' },
  { name: 'subjects', path: '/subjects', titleKey: 'home.title.subjects' },
  { name: 'students', path: '/students', titleKey: 'home.title.students' }
]

export const CATEGORY_ALLOWED_NAV = {
  [USER_CATEGORIES.ADMIN]: ['home', 'users', 'units', 'courses', 'subjects', 'students'],
  [USER_CATEGORIES.REITORIA]: ['units', 'courses', 'subjects', 'students'],
  [USER_CATEGORIES.PRO_REITORIA]: ['units', 'courses', 'subjects', 'students'],
  [USER_CATEGORIES.DEPARTAMENTO]: ['courses', 'subjects', 'students'],
  [USER_CATEGORIES.COORDENACAO]: ['courses', 'subjects', 'students'],
  [USER_CATEGORIES.PROFESSOR]: ['subjects', 'students'],
  [USER_CATEGORIES.ALUNO]: []
}

export function getAllowedNavigationByCategory(categoryId) {
  const allowedNames = CATEGORY_ALLOWED_NAV[categoryId] || []
  return navigationItems.filter(item => allowedNames.includes(item.name))
}