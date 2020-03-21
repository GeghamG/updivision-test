import axios from 'axios'

export default {
	state: {
		accessToken: localStorage.getItem('user-token') || null
	},
	getters: {
		accessToken: state => state.accessToken,
		isAuthenticated: state => !!state.accessToken
	},
	mutations: {
		setAccessToken: (state, accessToken) => {
			state.accessToken = accessToken
		}
	},
	actions: {
		login: ({commit}, payload) => {
			commit
			return new Promise((resolve, reject) => {
				axios.post('login', payload, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
					},
					useCredentails: true
				})
				.then(res => {
          localStorage.setItem('user-token', res.data.accessToken)
					resolve(res)
				})
				.catch(err => reject(err))
			})
		},
		register: ({commit}, payload) => {
			commit
			return new Promise((resolve, reject) => {
				axios.post('register', payload, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
					},
					useCredentails: true
				})
				.then(res => resolve(res))
				.catch(err => reject(err))
			})
		},
		logout: ({getters}, payload) => {
			return new Promise((resolve, reject) => {
				axios.post('logout', payload, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getters.accessToken,
					},
					useCredentails: true
				})
				.then(res => {
          localStorage.setItem('user-token', null)
					resolve(res)
				})
				.catch(err => reject(err))
			})
		}
	}
}