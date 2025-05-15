// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthView from './pages/AuthView.vue'
import ProfilePage from './pages/ProfilePage.vue'
import TransferPage from './pages/TransferPage.vue'
import MovementsAndSpendings from './pages/MovementsAndSpendings.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: TransferPage
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
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/pages/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global para verificar autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('email') || sessionStorage.getItem('email')

  if (to.name !== 'Auth' && !isAuthenticated) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router

function goTo(route) {
  router.push(route)
}
