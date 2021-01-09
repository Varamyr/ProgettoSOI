import axios from 'axios';

//import router from '../router/index'

const state = {
	articles: [],
	error: ''
};

const getters = {
	articles: state => {
		return state.articles;
	},
	articlesError: state => state.error
}

const actions = {
	async getArticles({commit}){
		commit('articles_request');
		try{
			let res = await axios.get('/api/home');
			if(res.data.success){
				const articles = res.data.articles.map(article => ({
					...article
				}));
				
				commit('article_success', articles);
			}
			return res;
		}catch(err){
			commit('articles_failed', err);
		}
	}
}

const mutations = {
	articles_request(state){
		state.error = null;
	},
	article_success(state, articles){
		state.error = null;
		state.articles = articles;
	},
	articles_failed(state, err){
		state.error = err.response.data.msg;
	}
}

export default {
	state,
	actions,
	mutations,
	getters
};