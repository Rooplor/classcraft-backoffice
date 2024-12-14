import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import VenueFormView from '../views/VenueFormView.vue'
import {isAuthenticated} from '../services/auth'

const routes = [
    {path: '/', component: HomeView, name: 'home', meta: {requiresAuth: true}},
    {path: '/login', component: LoginView, name: 'login'},
    {path: '/venue/:id?', component: VenueFormView, meta: {requiresAuth: true}}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
        next({name: 'login'})
    } else {
        next()
    }
})

export default router