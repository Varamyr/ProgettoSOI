import axios from 'axios';
//import router from '../router/index'

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
	isLogged: state => !!state.token, //in javascript la stringa vuota si valuta come falsa
	authState: state => state.status,
	user: state => state.user,
	error: state => !!state.loginError
};

const actions = {
	//Login action
	async login({ commit }, user){
		commit('auth_request');
		try{
			let res = await axios.post('http://localhost:5000/api/auth/login', user);
		
			if(res.data.success){
				
				console.log(res);
				const token = res.data.token;
				const user = res.data.user;
				//Salvo il token nel localStorage
				localStorage.setItem("token", token);
				//Aggiorno l'header delle richieste mandate da axios mettendo il token dell'autenticazione
				axios.defaults.headers.common["Authorization"] = token;
				commit('auth_success', token, user);
			}
			return res;
		}catch(err){
			commit('auth_failed', err.response.data.msg);
		}
	}
};

const mutations = {
	auth_request(state){
		state.error = null
		state.status = 'loading'
	},
	auth_success(state, token, user){
		state.token = token
		state.user = user
		state.error = null
		state.status = 'success'
	},
	auth_failed(state, msg){
		state.error = msg
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};