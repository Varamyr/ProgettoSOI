import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '../Warehouse/Auth'
import ArticleService from '../Warehouse/ArticleService'
import OrderService from '../Warehouse/OrderService'
import Cart from '../Warehouse/Cart'
import Notifications from '../Warehouse/Notifications'

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
		ArticleService,
		Cart,
		Notifications,
		OrderService
	}
})
