import axios from 'axios'

export default {
	state: {
		products: [],
	},
	getters: {
		products: state => state.products,
	},
	mutations: {
		setProducts: (state, products) => state.products = products
	},
	actions: {
		getProducts: ({getters, commit}, page = 2) => {
			return new Promise((resolve, reject) => {
				axios.get('products/paginate?page=' + page, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getters.accessToken,
					},
					useCredentails: true
				})
				.then(res => {
					commit('setProducts', res.data.data)
					resolve(res)
				})
				.catch(err => reject(err))
			})
		},
		getAllProducts: ({getters, commit}) => {
			return new Promise((resolve, reject) => {
				axios.get('products', {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getters.accessToken,
					},
					useCredentails: true
				})
				.then(res => {
					commit('setProducts', res.data.data)
					resolve(res)
				})
				.catch(err => reject(err))
			})
		}
	}
}