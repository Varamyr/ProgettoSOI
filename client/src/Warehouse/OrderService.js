import axios from 'axios';
import Vue from 'vue';

const state = {
	activeOrders: [],
	oldOrders: [],
	error: ''
};

const getters = {
	ordersError: state => state.error,
	getStateActiveOrders: state => state.activeOrders
};

const actions = {
	async getActiveOrders({commit, getters}){
		commit('user_active_orders_request');
		try{
			var userType = getters.getUserType;
			var res;
			if(userType == 'user')
				res = await axios.get('/api/dashboard/user/getActiveOrders');
			else if(userType == 'vendor')
				res = await axios.get('/api/dashboard/vendor/getActiveOrders');
			else
				console.log('Errore: il tipo di utente che ha effettuato la richiesta è sconosciuto.');
				
			if(res.data.success){
				//Raggruppo gli ordini ricevuti per data

				var groupBy = function(vector, key) {
					return vector.reduce(function(rv, x) {
						(rv[x[key]] = rv[x[key]] || []).push(x);
					return rv;
					}, []);
				};
				
				var grouped = groupBy(res.data.orderList, 'paidDate');

				var formattedOrders = [];
				for (const [key, value] of Object.entries(grouped)) {

					var totalPrice = 0;

					for(var i = 0; i < value.length; i++){
						totalPrice += value[i].price*value[i].quantity; 
					}

					if(userType == 'user'){
						formattedOrders.push({
							paidDate: key,
							totalPrice: totalPrice,
							articles: value
						});
					}
					else if(userType == 'vendor'){
						formattedOrders.push({
							paidDate: key,
							totalPrice: totalPrice,
							articles: value,
							userName: value[0].userName,
							userSurname: value[0].userSurname,
							userMail: value[0].userMail,
							userPhone: value[0].userPhone,
							userAddress: value[0].userAddress,
							userCity: value[0].userCity,
							userProvince: value[0].userProvince
						});
					}
					
				}

				res.data.orderList = formattedOrders;
				
				commit('user_active_orders_success', formattedOrders);
			}
			return res;
		}catch(err){
			commit('user_active_orders_failed', err);
		}
	},
	async setOrderArticleAsArrived({commit}, ids){
		try {
			let res = await axios.post('/api/dashboard/user/setArticleArrived', {orderID: ids.orderid});
			if(res.data.success){

				//Forse ci vuole dispatch per aggiornare ui
				commit('user_active_orders_update', {orderid: ids.orderid, paidDate: ids.paidDate, arrivedDate: res.data.arrivedDate});
			}else{
				commit('user_active_orders_update_failure', res.data.msg);
			}
			return res;
		} catch (error) {
			commit('user_active_orders_update_failure', error.response.data.msg);
			throw error;
		}
	},
	async getOldOrders({commit, getters}){
		commit('old_orders_request');
		try{
			var userType = getters.getUserType;
			var res;
			if(userType == 'user')
				res = await axios.get('/api/dashboard/user/getOldOrders');
			else if(userType == 'vendor')
				res = await axios.get('/api/dashboard/vendor/getOldOrders');
			else
				console.log('Errore: il tipo di utente che ha effettuato la richiesta è sconosciuto.');

			if(res.data.success){
				//Raggruppo gli ordini ricevuti per data

				var groupBy = function(vector, key) {
					return vector.reduce(function(rv, x) {
						(rv[x[key]] = rv[x[key]] || []).push(x);
					return rv;
					}, []);
				};
				
				var grouped = groupBy(res.data.orderList, 'paidDate');

				var formattedOrders = [];
				for (const [key, value] of Object.entries(grouped)) {

					var totalPrice = 0;

					for(var i = 0; i < value.length; i++){
						totalPrice += value[i].price*value[i].quantity; 
					}
					
					formattedOrders.push({
						paidDate: key,
						totalPrice: totalPrice,
						articles: value,
						userName: value[0].userName,
						userSurname: value[0].userSurname,
						userMail: value[0].userMail,
						userPhone: value[0].userPhone,
						userAddress: value[0].userAddress,
						userCity: value[0].userCity,
						userProvince: value[0].userProvince
					});
				}

				res.data.orderList = formattedOrders;
				
				commit('old_orders_success', formattedOrders);
			}
			return res;
		}catch(err){
			commit('old_orders_failed', err);
		}
	},
	async setOrderArticleAsShipped({commit}, ids){
		var orderid = ids.orderid;

		try {
			let res = await axios.put('/api/dashboard/vendor/setArticleShipped', {orderID: orderid});
			if(res.data.success){
				
				let update = {orderid: ids.orderid, shippedDate: res.data.shippedDate, paidDate: ids.paidDate}
				commit('vendor_active_orders_update', update);
			}else{
				commit('vendor_active_orders_update_failure', res.data.msg);
			}
			return res;
		} catch (error) {
			commit('vendor_active_orders_update_failure', 'Errore nell\'applicazione client');
		}
	}
};

const mutations = {
	user_active_orders_request(state){
		state.error = null;
	},
	user_active_orders_success(state, orders){
		state.error = null;
		state.activeOrders = orders;
	},
	user_active_orders_failed(state, err){
		state.error = err.response.data.msg;
	},
	user_active_orders_update(state, ids){

		var arrivedDate = ids.arrivedDate;
		var orderid = ids.orderid;
		var paidDate = ids.paidDate;
		
		for(var i = 0; i < state.activeOrders.length; i++){
			if(state.activeOrders[i].paidDate === paidDate){
				var allArticlesArrived = true;
				state.activeOrders[i].articles.forEach( element => {
					if(element.id == orderid){
						/* Vue.set necessario per aggiungere proprietà che contengono dati dinamici
							altrimenti vue non setta l'observer per la proprietà aggiunta */
						Vue.set(element, 'arrived', true);
						Vue.set(element, 'arrivedDate', arrivedDate);
					}
					
					if(!element.arrived){
						allArticlesArrived = false;
					}
				});

				//Se era l'ultimo articolo di quell'ordine posso rimuovere l'ordine
				if(allArticlesArrived){
					state.activeOrders = state.activeOrders.filter( order => order.paidDate !== paidDate)
				}
				break;
			}
		}
	},
	user_active_orders_update_failure(state, err){
		state.error = err;
	},
	old_orders_request(state){
		state.error = null;
	},
	old_orders_success(state, orders){
		state.error = null;
		state.oldOrders = orders;
	},
	old_orders_failed(state, err){
		state.error = err.response.data.msg;
	},
	vendor_active_orders_update(state, ids){

		var orderid = ids.orderid;
		var shippedDate = ids.shippedDate;
		var paidDate = ids.paidDate;
		
		for(var i = 0; i < state.activeOrders.length; i++){
			if(state.activeOrders[i].paidDate === paidDate){
				//Aggiorno lo stato dell'articolo che è stato confermato come spedito
				state.activeOrders[i].articles.forEach( element => {
					if(element.id == orderid){
						element.shipped = true;
						element.shippedDate = shippedDate;
					}
				});
				break;
			}
		}
	},
	vendor_active_orders_update_failure(state, err){
		state.error = err;
	}

};

export default {
	state,
	getters,
	actions,
	mutations
};