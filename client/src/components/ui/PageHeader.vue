<template>
	<div class="headerContainer">
		<!-- Utente non loggato -->
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark" v-if="!isLogged">
			<router-link to="/" class="navbar-brand not-logged" > <h3><img class="appLogo" alt="Vue logo" src="../../assets/logo.png" > Hello E-commerce</h3> </router-link>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
					<router-link to="/login" class="nav-link" > <h5><b-icon-person/> Login</h5> </router-link>
			</b-navbar-nav>
			</b-collapse>
		</b-navbar>

		<!-- Utente loggato -->
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark" v-if="isLogged && getUserType=='user'">
			<router-link to="/" class="navbar-brand link" > <h3><img class="appLogo" alt="Vue logo" src="../../assets/logo.png" > Hello E-commerce - Area Privata</h3> </router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
			<div class="navbar-nav">
				<div class="nav-item">
					<router-link class="nav-link" to="/dashboard/user/orders"> <h5 class="pages">Ordini</h5></router-link>
				</div>
				<div class="nav-item">
					<router-link class="nav-link" to="/dashboard/user/shippings"><h5 class="pages">Spedizioni</h5></router-link>
				</div>
				<div class="dropdown open">
					<a
					role="button"
					class="btn btn-secondary dropdown-toggle cart"
					id="triggerId"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					>{{ cartItemCount }} Carrello</a>
					<div @click="$event.stopPropagation()">
						<shopping-cart />
					</div>
					
				</div>
			</div>

			<div class="navbar-nav ml-auto">
				<a href="/logout" class="nav-link" @click.prevent="logoutUser"> <h5><b-icon-person-x/> Logout</h5> </a>
			</div>
			</b-collapse>
		</b-navbar>

		<!-- Vendor loggato -->
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark" v-if="isLogged && getUserType=='vendor'">
			<router-link to="/" class="navbar-brand link" > <h3><img class="appLogo" alt="Vue logo" src="../../assets/logo.png" > Hello E-commerce - Area venditore</h3> </router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
			<div class="navbar-nav">
				
			</div>

			<div class="navbar-nav ml-auto">
				<a href="/logout" class="nav-link" @click.prevent="logoutUser"> <h5><b-icon-person-x/> Logout</h5> </a>
			</div>
			</b-collapse>
		</b-navbar>

		<!-- Admin loggato -->
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark" v-if="isLogged && getUserType=='admin'">
			<router-link to="/" class="navbar-brand link" > <h3><img class="appLogo" alt="Vue logo" src="../../assets/logo.png" > Hello E-commerce - Area di amministrazione</h3> </router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
			<div class="navbar-nav">
				
			</div>

			<div class="navbar-nav ml-auto">
				<a href="/logout" class="nav-link" @click.prevent="logoutUser"> <h5><b-icon-person-x/> Logout</h5> </a>
			</div>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ShoppingCart from '../cart/ShoppingCart'

export default {
	name: 'PageHeader',
	components: {
		ShoppingCart
	},
	methods: {
		...mapActions(["logout"]),
		logoutUser() {
			this.logout();
		}
	},
	computed:{
		...mapGetters(["isLogged"]),
		...mapGetters(["cartItemCount"]),
		...mapGetters(["getUserType"])
	}
}
</script>

<style scoped>
.appLogo {
	height: 40px;
}
.headerContainer
{
	margin-bottom: 100px;
}

.header
{
	padding-top:20px;
	box-shadow: 0px 5px 10px black;
	
	min-width: 567px;
}

.dropdown-item{
	cursor: pointer;
}

.navbar-brand.not-logged{
	cursor: pointer;
}

a{
	color: white!important;;
}

h4.pages{
	color: rgb(255, 255, 255);
}

a.cart{
	font-size: 18px;
}
</style>