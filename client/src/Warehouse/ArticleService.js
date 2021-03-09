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
	/* Dedicato al cliente */
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
	//Usato per il reset dell'article component al login
	deleteArticles({commit}){
		commit('delete_articles');
	},
	updateFilters({commit}, filter){
		
		commit('filters_updated', filter);
	},
	clearFilters({commit}){
		commit('filters_cleared');
	},
	/* Dedicato al vendor */
	async getShowcase({commit}){
		commit('showcase_request');
		try{
			let res = await axios.get('/api/dashboard/vendor/getShowcase');
			if(res.data.success){
				const articles = res.data.articles.map(article => ({
					...article
				}));
				commit('showcase_success', articles);
			}
			return res;
		}catch(err){
			commit('showcase_failed', err);
		}
	},
	async removeArticleFromShowcase({commit}, articleId){
		commit('remove_article_showcase_request');

		try{
			let res = await axios.put('/api/dashboard/vendor/removeFromShowcase', {id: articleId});
			if(res.data.success){
				commit('remove_article_showcase_request_success', articleId);
			}
			return res;
		}catch(err){
			commit('remove_article_showcase_request_failed', err);
		}
	},
	async addArticleToShowcase({commit, getters}, article){
		commit('add_article_showcase_request');
			
		var user = getters.getUser;
		try{
			var newArticle = {
				article: article,
				user: user
			}
			let res = await axios.post('/api/dashboard/vendor/addToShowcase', newArticle);
			if(res.data.success){
				commit('add_article_showcase_request_success', res.data.article);
			}
			return res;
		}catch(err){
			commit('add_article_showcase_request_failed', err);
		}
	},
	async modifyArticleAvailability({commit}, request){
		commit('update_availability_request');
		try {
			let res = await axios.post('/api/dashboard/vendor/modifyAvailability', { articleId: request.articleId, type: request.type })
			
			if(res.data.success){
				commit('update_availability_success');
			}
			return res;
		} catch (error) {
			commit('update_availability_failed', error.response.data.msg);
			throw(error.response.data.msg);
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
	delete_articles(){
		state.error = null;
		state.articles = [];
		state.filtered = [];
		state.filters = {
			category: null,
			price: null,
			minPrice: -1,
			maxPrice: -1
		};
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
				if(state.filters.minPrice != newValue && (newValue <= state.filters.maxPrice || state.filters.maxPrice == -1 || newValue == -1)){
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
				if(state.filters.maxPrice != newValue && (state.filters.minPrice <= newValue || state.filters.minPrice == -1 || newValue == -1) ){
					somethingChanged = true;
					state.filters.maxPrice = newValue;
				}
				break;
			default:
				break;
		}
		
		//Aggiornamento elementi filtrati da visualizzare
		if(somethingChanged){
			
			state.filtered = state.articles.filter(
				element => {
					return ((element.category == state.filters.category || state.filters.category == null) && (element.price >= state.filters.minPrice || state.filters.minPrice == -1) && (element.price <= state.filters.maxPrice || state.filters.maxPrice == -1))
				}	
			);
			state.filtered.sort(function (a, b) {
				if(newValue == 'desc')
					return b.price - a.price;
				else
					return a.price - b.price;
			});
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
	},
	showcase_request(state){
		state.error = null;
	},
	showcase_success(state, articles){
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
	showcase_failed(state, err){
		state.error = err.response.data.msg;
	},
	remove_article_showcase_request(state){
		state.error = null;
	},
	remove_article_showcase_request_success(state, id){
		state.articles = state.articles.filter(element => {
			return element._id != id
		});
		state.filtered = state.filtered.filter(element => {
			return element._id != id
		});
	},
	remove_article_showcase_request_failed(state, err){
		state.error = err.response.data.msg;
	},
	add_article_showcase_request(state){
		state.error = null;
	},
	add_article_showcase_request_success(state, article){
		state.articles.push({
			article
		});
	},
	add_article_showcase_request_failed(state, err){
		state.error = err.response.data.msg;
	},
	update_availability_request(state){
		state.error = '';
	},
	update_availability_failed(state, error){
		state.error = error;
	},
	update_availability_success(state){
		state.error = '';
	}
}

export default {
	state,
	actions,
	mutations,
	getters
};