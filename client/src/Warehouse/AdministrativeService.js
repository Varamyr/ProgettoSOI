import axios from 'axios';
// import Vue from 'vue';

const state = {
	vendors: [],
	filteredVendors: [],
	error: ''
}

const getters = {

}

const actions = {
	async getVendors({commit}){
		commit('vendor_request');
		try {
			let res = await axios.get('/api/dashboard/admin/getVendors');
			if(res.data.success){
				const vendors = res.data.vendors.map(vendor => ({
					...vendor
				}));
				
				commit('vendor_request_success', vendors);
			}
			return res;
		} catch (error) {
			commit('vendor_request_failed', error);
			throw error;
		}
	},
	async addNewVendor({commit}, vendor){
		commit('new_vendor_request');
		try {
			let res = await axios.post('/api/dashboard/admin/insertVendor', vendor);
			if(res.data.success){		
				commit('new_vendor_request_success', res.data.newVendor);
			}
			return res;
		} catch (error) {
			commit('new_vendor_request_failed', error);
			throw error;
		}
	},
	async toggleVendorAuthorization({commit}, id){
		commit('toggle_vendor_authorizazion_request');
		try {
			let res = await axios.put('/api/dashboard/admin/toggleAuthorization', {id : id});
			if(res.data.success){
				commit('toggle_vendor_authorizazion_request_success', id);
			}
			return res;
		} catch (error) {
			commit('toggle_vendor_authorizazion_request_failed', error);
			throw error;
		}
	}
}	

const mutations = {
	vendor_request(state){
		state.error = '';
		state.vendors = [];
		state.filteredVendors = [];
	},
	vendor_request_failed(state, error){
		state.error = error;
	},
	vendor_request_success(state, vendors){
		state.vendors = vendors;
		state.filteredVendors = vendors;
		state.error = '';
	},
	new_vendor_request(state){
		state.error = '';
	},
	new_vendor_request_failed(state, error){
		state.error = error;
	},
	new_vendor_request_success(state, newVendor){
		state.vendors.push(newVendor);
		state.filteredVendors.push(newVendor);

		state.error = '';
	},
	toggle_vendor_authorizazion_request(state){
		state.error = '';
	},
	toggle_vendor_authorizazion_request_success(state, id){
		state.vendors.forEach(element => {
			if(element._id == id){
				// Vue.set(element, 'authorized', !element.authorized);
				element.authorized = !element.authorized;
			}
		});
		state.filteredVendors.forEach(element => {
			if(element._id == id){
				// Vue.set(element, 'authorized', !element.authorized);
				element.authorized = !element.authorized;
			}
		});
	},
	toggle_vendor_authorizazion_request_failed(state, error){
		state.error = error;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}