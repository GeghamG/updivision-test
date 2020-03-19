import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Products from './components/Products'
import Register from './components/Register'
import Login from './components/Login'

const routes = [
  { path: '/', component: Products },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

const store = new Vuex.Store({
  state: {
    
  },
  actions: {

  },

})

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
