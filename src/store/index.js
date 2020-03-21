import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
  key: 'updivision-test',
  storage: window.localStorage
})

import UserModule from './modules/user'
import ProductsModule from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		UserModule,
		ProductsModule
	},
	plugins: [vuexPersist.plugin]
})