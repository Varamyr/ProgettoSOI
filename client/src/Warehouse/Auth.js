import axios from 'axios';
import router from '../router';
//import router from '../router/index'

const state = {
	token: localStorage.getItem('token') || '',
	user:{},
	status: '',
	error: '',
	userType: ''
};

const getters = {
	// isLogged: function(state){
	// 	if(state.token != ''){
	// 		return true
	// 	}else{
	// 		return false
	// 	}
	// },
	isLogged: state => !!state.token, //in javascript la stringa vuota si valuta come falsa
	authState: state => {
		return state.status;
	},
	user: state => {
		return state.user;
	},
	userType: state => {
		return state.userType;
	},
	error: state => !!state.loginError
};

const actions = {
	//Login action
	async login({ commit }, user){
		commit('auth_request');
		try{
			let res = await axios.post('http://localhost:5000/api/auth/login', user);
		
			if(res.data.success){
				const token = res.data.token;
				const user = res.data.user;
				const userType = res.data.type;

				console.log('si è loggato un '+res.data.type);
				//Salvo il token nel localStorage
				localStorage.setItem("token", token);
				//Aggiorno l'header delle richieste mandate da axios mettendo il token dell'autenticazione
				axios.defaults.headers.common["Authorization"] = token;
				commit('auth_success', token, user, userType);
			}
			return res;
		}catch(err){
			commit('auth_failed', err.response.data.msg);
		}
	},
	async register({commit}, userData){
		commit('register_request');
		let res = await axios.post('http://localhost:5000/api/auth/register', userData);
		try{
			if(res.data.success){
				commit('register_success');
			}
		}catch(err){
			commit('register_failed', err.response.data.msg);
		}
		return res;
	},
	async logout({commit}){
		await localStorage.removeItem('token');
		commit('logout');
		delete axios.defaults.headers.common['Authorization'];
		router.push('/');
		return;
	}
};

const mutations = {
	auth_request(state){
		state.error = null
		state.status = 'loading'
	},
	auth_success(state, token, user, userType){
		state.token = token
		state.user = user
		state.error = null
		state.status = 'success'
		state.userType = userType
	},
	auth_failed(state, msg){
		state.error = msg
	},
	register_request(state){
		state.error = null
		state.status = 'loading'
	},
	register_success(state){
		state.error = null
		state.status = 'success'
	},
	register_failed(state, msg){
		state.error = msg
		state.status = 'error'
	},
	logout(state){
		state.token = ''
		state.status = ''
		state.error = null
		state.user = {}
		state.userType = ''
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};