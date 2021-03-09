const state = {
	notificationList : []
};

const getters = {
};

const actions = {
	addNotification: ({ commit }, notification) => {
		commit('push_notification', notification);
	},
	removeNotification: ({ commit }, notificationID) => {
		commit('remove_notification', notificationID);
	},
	clearNotifications: ({ commit }, notificationID) => {
		commit('clear_notifications', notificationID);
	}
};

const mutations = {
	//Notification {type:"TITOLO", message:"MESSAGGIO"}
	push_notification: (state, notification) => {
		let newElement = {
			...notification,
			id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
		};
		state.notificationList.push(newElement);

		//console.log(state.notificationList);
	},
	remove_notification: (state, notificationID) => {
		var findex;
		var found = state.notificationList.some( 
			function(notification, index){
				findex = index; 
				return notification.id == notificationID; 
		});
		if (found) {
			state.notificationList.splice(findex, 1);
		}
	},
	clear_notifications: (state) => {
		state.notificationList = []
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};