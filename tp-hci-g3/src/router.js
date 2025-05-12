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
    path: '/home/transfer',
    name: 'Transfer',
    component: TransferPage
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
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

function goTo(route) {
  router.push(route)
}
