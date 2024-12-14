import { createRouter, createWebHistory } from 'vue-router'
import VenueView from '../views/VenueView.vue'
import LoginView from '../views/LoginView.vue'
import VenueFormView from '../views/VenueFormView.vue'
import LogsView from "@/views/LogsView.vue";
import { isAuthenticated } from '../services/auth'
import { layouts } from '../layout'

const routes = [
  {
    path: '/',
    component: layouts.default,
    children: [
      { path: '', component: VenueView, name: 'home', meta: { requiresAuth: true } },
      { path: '/venue/:id?', component: VenueFormView, meta: { requiresAuth: true } },
      { path: '/logs', component: LogsView, meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    component: layouts.auth,
    children: [
      { path: '', component: LoginView, name: 'login' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router