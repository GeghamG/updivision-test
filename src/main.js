import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';

import routes from './routes';
import store from './store';

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

axios.defaults.baseURL = 'https://test-api.updivision.work/api/'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
