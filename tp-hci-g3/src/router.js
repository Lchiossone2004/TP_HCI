// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthView from './pages/AuthView.vue'
import ProfilePage from './pages/ProfilePage.vue'
import MovementsAndSpendings from './pages/MovementsAndSpendings.vue'
import EnterMoney from './pages/EnterMoney.vue'

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
    path: '/ProfilePAGE',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/actividad',
    name: 'Actividad',
    component: MovementsAndSpendings
  },
  {
    path: '/enter-money',
    name: 'EnterMoney',
    component: EnterMoney
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

function goTo(route) {
  router.push(route)
}
