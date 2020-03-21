import axios from 'axios'

export default {
	state: {
		accessToken: localStorage.getItem('user-token')
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
		LOGIN: ({commit, state}, payload) => {
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
					commit('setAccessToken', res.data.accessToken)
					axios.defaults.headers.common["Authorization"] = "Bearer " + state.accessToken;
					resolve(res)
				})
				.catch(err => {
					localStorage.removeItem('usre-token')
					reject(err)
				})
			})
		},
		REGISTER: ({commit}, payload) => {
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
		LOGOUT: ({commit}, payload) => {
			return new Promise((resolve, reject) => {
				axios.post('logout', payload, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
					},
					useCredentails: true
				})
				.then(res => {
					localStorage.removeItem('user-token', '')
					commit('setAccessToken' ,'')
					resolve(res)
				})
				.catch(err =>{
					localStorage.removeItem('user-token', '')
					commit('setAccessToken' ,'')
					reject(err)
				})
			})
		}
	}
}