import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/pages/HomePage.vue'
import SignInPage from '@/components/pages/SignInPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignInPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
