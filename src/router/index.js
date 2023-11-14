import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store/index";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/ContactsView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.state.loggedInMod.loggedIn;
      if (!isAuthenticated) {
        next();
      } else {
        next('/');
      }
    },
    component: () => import('../views/AuthorizationView.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/RegistrationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
