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
		getProducts: ({commit}) => {
			return new Promise((resolve, reject) => {
				axios.get('products/paginate')
				.then(res => {
					commit('setProducts', res.data.data)
					resolve(res)
				})
				.catch(err => reject(err))
			})
		}
	}
}