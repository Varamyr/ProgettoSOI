import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta:{
			requiresGuest: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		meta:{
			requiresGuest: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
		meta:{
			requiresGuest: true
		}
	},
	{
		path: '/dashboard/user',
		name: 'UserDashboard',
		component: () => import('../views/dashboard/User.vue'),
		meta:{
			requiresAuthUser: true
		}
	},
	{
		path: '/dashboard/user/cart',
		name: 'UserShoppingCart',
		component: () => import('../views/dashboard/user/UserShoppingCart.vue'),
		meta:{
			requiresAuthUser: true
		}
	},
	{
		path: '/dashboard/user/shippings',
		name: 'UserShippings',
		component: () => import('../views/dashboard/user/UserShippings.vue'),
		meta:{
			requiresAuthUser: true
		}
	},
	{
		path: '/dashboard/user/orders',
		name: 'UserOrders',
		component: () => import('../views/dashboard/user/UserOrders.vue'),
		meta:{
			requiresAuthUser: true
		}
	},
	{
		path: '/dashboard/vendor',
		name: 'VendorDashboard',
		component: () => import('../views/dashboard/Vendor.vue'),
		meta:{
			requiresAuthVendor: true
		}
	},
	{
		path: '/dashboard/admin',
		name: 'AdminDashboard',
		component: () => import('../views/dashboard/Admin.vue'),
		meta:{
			requiresAuthAdmin: true
		}
	},
	{
		path: '*',
		name: 'PageNotFound',
		component: () => import('../views/NotFound.vue'),
		meta:{
			outOfBounds: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

//Gestisco la navigazione tra le pagine dell'applicazione
//Utilizzo il campo meta per definire l'accessibilità delle varie pagine
//to = pagina a cui voglio accedere, from = pagina da cui provengo, next = pagina che verrà restituita

//TODO: adattare la navigazione per ogni user type in modo che gli utenti non accedano alle aree che 
//non gli competono
router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuthUser)){
		if(!store.getters.isLogged){
			//Se non sono loggato vengo reindirizzato verso la pagina di Login
			next('/login');
		}else{
			switch(store.getters.getUserType){
				case 'user':
					next();
					break;
				case 'vendor':
					next('/dashboard/vendor');
					break;
				case 'admin':
					next('/dashboard/admin');
					break;
			}
		}
	}else if(to.matched.some(record => record.meta.requiresAuthVendor)){
		if(!store.getters.isLogged){
			//Se non sono loggato vengo reindirizzato verso la pagina di Login
			next('/login');
		}else{
			switch(store.getters.getUserType){
				case 'user':
					next('/dashboard/user');
					break;
				case 'vendor':
					next();
					break;
				case 'admin':
					next('/dashboard/admin');
					break;
			}
		}
	}else if(to.matched.some(record => record.meta.requiresAuthAdmin)){
		if(!store.getters.isLogged){
			//Se non sono loggato vengo reindirizzato verso la pagina di Login
			next('/login');
		}else{
			switch(store.getters.getUserType){
				case 'user':
					next('/dashboard/user');
					break;
				case 'vendor':
					next('/dashboard/vendor');
					break;
				case 'admin':
					next();
					break;
			}
		}
	}else if(to.matched.some(record => record.meta.requiresGuest)){
		if(store.getters.isLogged){
			switch(store.getters.getUserType){
				case 'user':
					next('/dashboard/user');
					break;
				case 'vendor':
					next('/dashboard/vendor');
					break;
				case 'admin':
					next('/dashboard/admin');
					break;
			}
		}else{
			next(); //procede normalmente alla pagina indicata da to
		}
	}else if(to.matched.some(record => record.meta.outOfBounds)){
		next();
	}
});

export default router
