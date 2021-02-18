import axios from 'axios';

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
	async getActiveOrders({commit}){
		
		commit('active_orders_request');
		try{
			let res = await axios.get('/api/dashboard/user/getActiveOrders');
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
						articles: value
					});
				}

				res.data.orderList = formattedOrders;
				
				commit('active_orders_success', formattedOrders);
			}
			return res;
		}catch(err){
			commit('active_orders_failed', err);
		}
	},
	async setOrderArticleAsArrived({commit}, ids){
		var orderid = ids.orderid;

		try {
			let res = await axios.post('/api/dashboard/user/setArticleArrived', {orderID: orderid});
			if(res.data.success){

				//Forse ci vuole dispatch per aggiornare ui
				commit('active_orders_update', ids);
			}else{
				commit('active_orders_update_failure', res.data.msg);
			}
			return res;
		} catch (error) {
			commit('active_orders_update_failure', 'Errore nell\'applicazione client');
		}
	},
	async getOldOrders({commit}){
		commit('old_orders_request');
		try{
			let res = await axios.get('/api/dashboard/user/getOldOrders');
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
						articles: value
					});
				}

				res.data.orderList = formattedOrders;
				
				commit('old_orders_success', formattedOrders);
			}
			return res;
		}catch(err){
			commit('old_orders_failed', err);
		}
	}
};

const mutations = {
	active_orders_request(state){
		state.error = null;
	},
	active_orders_success(state, orders){
		state.error = null;
		state.activeOrders = orders;
	},
	active_orders_failed(state, err){
		state.error = err.response.data.msg;
	},
	active_orders_update(state, ids){
		var orderid = ids.orderid;
		var paidDate = ids.paidDate;
		
		for(var i = 0; i < state.activeOrders.length; i++){
			console.log(paidDate, state.activeOrders[i].paidDate, state.activeOrders[i].paidDate === paidDate)
			if(state.activeOrders[i].paidDate === paidDate){
				//Rimuovo dallo stato l'articolo che è stato confermato come arrivato
				var filtered = state.activeOrders[i].articles.filter( article => {
					return article.id !== orderid
				});
				//Se era l'ultimo articolo di quell'ordine posso rimuovere l'ordine
				if(filtered.length == 0){
					state.activeOrders = state.activeOrders.filter( order => order.paidDate !== paidDate)
				}
				break;
			}
		}
	},
	active_orders_update_failure(state, err){
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
	}

};

export default {
	state,
	getters,
	actions,
	mutations
};