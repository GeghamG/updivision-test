import axios from 'axios'

export default {
	state: {
		accessToken: ''
	},
	getters: {
		accessToken: state => state.accessToken
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
				axios.post('https://test-api.updivision.work/api/login', payload, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
					},
					useCredentails: true
				})
				.then(res => resolve(res))
				.catch(err => reject(err))
			})
		}
	}
}