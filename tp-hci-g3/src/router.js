// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthView from './pages/AuthView.vue'
import ProfilePage from './pages/ProfilePage.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
