// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue' 
import ProfilePage from './pages/ProfilePage'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: HomePage
  // },
  {
    path: '/',
    name: 'ProfilePage',
    component: ProfilePage
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
