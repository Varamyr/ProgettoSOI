import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//Import necessari per lo styling con Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

//Preparo i moduli http di Vue per le chiamate alle mie api
Vue.prototype.$http = axios;
//Carico il token dal localStorage
const token = localStorage.getItem("token");
//Se il token esiste allora lo aggiungerò sempre all'header delle request fatte con axios
//In questo modo garantisco l'autenticazione delle pagine che la richiedono
if(token){
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token;

	var base64Url = token.replace('Bearer ','').split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	var user = JSON.parse(atob(base64)).type;

	localStorage.setItem('userType', user);
}

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
