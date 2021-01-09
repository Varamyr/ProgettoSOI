import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '../Warehouse/Auth'
import ArticleService from '../Warehouse/ArticleService'

Vue.use(Vuex)

//Ricorda: le mutations prendono al massimo un parametro. Se servono più parametri costruire un oggetto composto.

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		Auth,
		ArticleService
	}
})
