import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthView from './pages/Auth/AuthView.vue'
import ProfilePage from './pages/ProfilePage.vue'
import MovementsAndSpendings from './pages/MovementsAndSpendings.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/passwordRecovery',
    name: 'PasswordRecovery',
    component: () => import('@/pages/Auth/PasswordRecoveryPage.vue')
  },
  {
    path: '/verification',
    name: 'Verification',
    component: () => import('@/pages/Auth/VerificationPage.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('@/pages/TransferPage.vue')
  },
  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/actividad',
    name: 'Actividad',
    component: MovementsAndSpendings
  },
  {
    path: '/help',
    name: 'HelpPage',
    component: () => import('@/pages/help/HelpPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/pages/NotFound.vue')
  },
  {
  path: '/tarjetas',
  name: 'Tarjetas',
  component: () => import('@/pages/CardsPage.vue')
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: () => import('@/pages/ServicesPage.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
const publicRoutes = ['Auth', 'Verification', 'PasswordRecovery', 'HelpPage']



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token')

  if (publicRoutes.includes(to.name)) {
    return next()
  }

  if (!token) {
    return next({ name: 'Auth' })
  }

  next()
})


export default router

function goTo(route) {
  router.push(route)
}
