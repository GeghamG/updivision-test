import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router';
import store from './store';

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next({name: 'login'}) 
  } else {
    next() 
  }
})

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://test-api.updivision.work/api/'
let accessToken = store.getters.accessToken
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
