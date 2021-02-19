import axios from 'axios';

//import router from '../router/index'

const state = {
	articles: [],
	filtered: [],
	filters: {},
	error: ''
};

const getters = {
	articles: state => {
		return state.articles;
	},
	articlesError: state => state.error,
	getArticlesFiltered: state => state.filtered
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
	},
	updateFilters({commit}, filter){
		
		commit('filters_updated', filter);
	},
	clearFilters({commit}){
		
		commit('filters_cleared');
	}
}

const mutations = {
	articles_request(state){
		state.error = null;
	},
	article_success(state, articles){
		state.error = null;
		state.articles = articles;
		state.filtered = articles;
		state.filters = {
			category: null,
			price: null,
			minPrice: -1,
			maxPrice: -1
		};
	},
	articles_failed(state, err){
		state.error = err.response.data.msg;
	},
	filters_updated(state, filter){
		//Visto che updateFilters viene richiamato ogni volta da un solo elemento dei filtri
		//Otterrò sempre una sola chiave
		var type = filter.type;
		var newValue = filter.newValue;

		//Aggiornamento variabile filters
		var somethingChanged = false;
		switch(type){
			case 'category':
				if(state.filters.category != newValue){
					if(newValue == 'default')
						state.filters.category = null;
					else
						state.filters.category = newValue;
					somethingChanged = true;
				}
				break;
			case 'orderby':
				if(state.filters.orderby != newValue){
					somethingChanged = true;
					state.filters.orderby = newValue;
				}
				break;
			case 'minPrice':
				if(newValue == ''){
					newValue = -1;
				}else{
					newValue = parseInt(newValue);
				}
				if(state.filters.minPrice != newValue && (newValue <= state.filters.maxPrice || state.filters.maxPrice == -1)){
					somethingChanged = true;
					state.filters.minPrice = newValue;
				}
				break;
			case 'maxPrice':
				if(newValue == ''){
					newValue = -1;
				}else{
					newValue = parseInt(newValue);
				}
				if(state.filters.maxPrice != newValue && (state.filters.minPrice <= newValue || state.filters.minPrice == -1) ){
					somethingChanged = true;
					state.filters.maxPrice = newValue;
				}
				break;
			default:
				break;
		}
		
		//Aggiornamento elementi filtrati da visualizzare
		if(somethingChanged){
			if(type == 'orderby'){
				state.filtered.sort(function (a, b) {
					if(newValue == 'desc')
						return b.price - a.price;
					else
						return a.price - b.price;
				})
			}else{
				state.filtered = state.articles.filter(
					element => {
						return ((element.category == state.filters.category || state.filters.category == null) && (element.price >= state.filters.minPrice || state.filters.minPrice == -1) && (element.price <= state.filters.maxPrice || state.filters.maxPrice == -1))
					}	
				);
			}
		}
	},
	filters_cleared(state){
		state.filters = {
			category: null,
			price: null,
			minPrice: -1,
			maxPrice: -1
		};
		state.filtered = state.articles;
	}
}

export default {
	state,
	actions,
	mutations,
	getters
};