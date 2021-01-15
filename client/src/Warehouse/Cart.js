const state = {
	cart: []
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
	}
}

const mutations = {
	add_to_cart(state, {article, quantity}){
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
	},
	remove_from_cart(state, article) {
		state.cart = state.cart.filter(item => {
			return item.article._id !== article._id;
		})
	},
	clear_cart(state){
		state.cart = [];
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};