import Vue from 'vue'
import VueRouter from 'vue-router'

import Products from '../components/Products'
import Register from '../components/Register'
import Login from '../components/Login'

const routes = [
  { 
    path: '/',
    name: 'products',
    component: Products,
    meta: { 
      requiresAuth: true
    }
  },
  { 
    path: '/register',
    name: 'register',
    component: Register,
  },
  { 
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(VueRouter)

export default router