import axios from 'axios';
import router from '../router';

const state = {
	token: localStorage.getItem('token') || '',
	user:{},
	status: '',
	error: ''
};

const getters = {
	// isLogged: function(state){
	// 	if(state.token != ''){
	// 		return true
	// 	}else{
	// 		return false
	// 	}
	// },
	isLogged: state => {
		return !!state.token;
	}, //in javascript la stringa vuota si valuta come falsa
	getUserType: function(state){
		var base64Url = state.token.replace('Bearer ','').split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		var userType = JSON.parse(atob(base64)).type;
		return userType;
	},
	getToken: state => {
		return state.token;
	},
	authState: state => {
		return state.status;
	},
	getUser: state => {
		var base64Url = state.token.replace('Bearer ','').split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(atob(base64));
	},
	userId: state => {
		var base64Url = state.token.replace('Bearer ','').split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(atob(base64))._id;
	},
	error: state => state.error
};

const actions = {
	//Login action
	async login({ commit, getters, dispatch }, user){
		commit('auth_request');
		try{
			let res = await axios.post('/api/auth/login', user);
			
			if(res.data.success){
				const token = res.data.token;
				var base64Url = token.replace('Bearer ','').split('.')[1];
				var base64 = base64Url.replace('-', '+').replace('_', '/');
				const user = JSON.parse(atob(base64));

				//Salvo il token e l'userType nel localStorage
				await localStorage.setItem("token", token);

				const params = {token, user}
				//Aggiorno l'header delle richieste mandate da axios mettendo il token dell'autenticazione
				commit('auth_success', params);
				axios.defaults.headers.common["Authorization"] = token;
				
				dispatch('clearNotifications', {root: true});
				dispatch('deleteArticles', { root: true });
				switch(getters.getUserType){
					case 'user':
						router.push('/dashboard/user');
						break;
					case 'vendor':
						router.push('/dashboard/vendor');
						break;
					case 'admin':
						router.push('/dashboard/admin');
						break;
				}
				
			}
			return res;
		}catch(err){
			commit('auth_failed', err);
		}
	},
	async register({commit}, userData){
		commit('register_request');
		let res = await axios.post('/api/auth/register', userData);
		try{
			if(res.data.success){
				commit('register_success');
			}
		}catch(err){
			commit('register_failed', err);
		}
		return res;
	},
	async logout({commit, dispatch}){
		await localStorage.removeItem('token');
		commit('logout');
		delete axios.defaults.headers.common['Authorization'];

		//Dispatch serve per chiamare altre action all'interno dello store
		dispatch('clearCartItems', { root: true });
		dispatch('clearNotifications', {root: true});
		router.push('/');
		return;
	}
};

const mutations = {
	auth_request(state){
		state.error = null;
		state.status = 'loading';
	},
	auth_success(state, params){
		state.token = params.token;
		state.user = params.user;
		state.error = null;
		state.status = 'success';
	},
	auth_failed(state, err){
		state.error = err.response.data.msg;
	},
	register_request(state){
		state.error = null;
		state.status = 'loading';
	},
	register_success(state){
		state.error = null;
		state.status = 'success';
	},
	register_failed(state, err){
		state.error = err.response.data.msg;
		state.status = 'error';
	},
	logout(state){
		state.token = '';
		state.status = '';
		state.error = null;
		state.user = {};
	},
	profile_request(state) {
		state.status = 'loading';
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};