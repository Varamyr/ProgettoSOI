import axios from 'axios';

const state = {
	cart: [],
	error: ''
};

const getters = {
	cartItemCount: state => {
		let total = 0;

		state.cart.forEach(item => {
			total += item.quantity;
		});
		return total;
	},
	cartTotalPrice: state => {
		let total = 0;
  
		state.cart.forEach(item => {
			total += item.article.price * item.quantity;
		});
		return total;
	},
	getCartItems: state => {
		return state.cart;
	}
}

const actions = {
	addArticleToCart({ commit }, { article, quantity }){
		commit('add_to_cart', { article, quantity });
	},
	removeArticleFromCart({ commit }, article){
		commit('remove_from_cart', article);
	},
	clearCartItems({ commit }){
		commit('clear_cart');
	},
	async checkoutItems({ commit, dispatch }){
		//Controllo se il cart è vuoto se non lo è inoltro l'ordine al backend
		if(getters.cartItemCount == 0){
			commit('checkout_failed');
		}else{
			//Creo la request per interrogare il backend
			try{
				//L'utente è loggato quindi il token esiste, estraggo il suo id
				var base64Url = this.getters['getToken'].replace('Bearer ','').split('.')[1];
				var base64 = base64Url.replace('-', '+').replace('_', '/');
				var userId = JSON.parse(atob(base64))._id;

				var cartItems = [];
				this.getters['getCartItems'].forEach(element => {
					var newElement = {
						id: element.article._id,
						sellerid: element.article.sellerid,
						quantity: element.quantity
					};

					cartItems.push(newElement);
				});

				let req = {
					userID : userId,
					cartItems : cartItems
				};
				
				let res = await axios.post('/api/dashboard/user/checkout/', req);
				
				if(res.data.success){
					
					commit('checkout_success');

					dispatch('clearCartItems');
				}
				return res;
			}catch(err){
				commit('checkout_failed', err);
			}			
		}
	}
}

const mutations = {
	add_to_cart(state, {article, quantity}){
		state.error = '';
		let articleInCart = state.cart.find(item => {
			return item.article._id === article._id;
		});

		if(articleInCart){
			articleInCart.quantity += quantity;
			return;
		}

		state.cart.push({
			article,
			quantity
		});
	},
	set_cart(state, cartItems){
		state.cart = cartItems;
		state.error = '';
	},
	remove_from_cart(state, article) {
		state.error = '';
		state.cart = state.cart.filter(item => {
			return item.article._id !== article._id;
		})
	},
	clear_cart(state){
		state.cart = [];
	},
	checkout_success(state){
		state.cart = [];
		state.error = '';
	},
	checkout_failed(state, err){
		state.error = err;
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};