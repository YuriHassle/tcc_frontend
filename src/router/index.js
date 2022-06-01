import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterInnView from '../views/RegisterInnView.vue'
import ItemView from '../views/ItemView.vue'
import ServiceView from '../views/ServiceView.vue'
import PackageView from '../views/PackageView.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/inn/register',
    name: 'register_inn',
    component: RegisterInnView,
  },
  {
    path: '/inns/:inn_id/items',
    name: 'items',
    component: ItemView,
  },
  {
    path: '/inns/:inn_id/services',
    name: 'services',
    component: ServiceView,
  },
  {
    path: '/inns/:inn_id/packages',
    name: 'packages',
    component: PackageView,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const { name } = to
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if ((!user || !token) && name !== 'login') {
    return store.dispatch('user/logout')
  }

  if (name !== 'home' && name !== 'login') {
    const activeInn = localStorage.getItem('activeInn')
    if (activeInn) {
      next()
    } else next({ name: 'home' })
  }

  next()
})

export default router
