<template>
	<div class="headerContainer">
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark">
			
			<router-link to="/" class="navbar-brand not-logged" v-if="!isLogged"> <h3><img class="appLogo" alt="Vue logo" src="../assets/logo.png"> Hello E-commerce</h3> </router-link>
			<div class="navbar-brand" v-if="isLogged"> <h3><img class="appLogo" alt="Vue logo" src="../assets/logo.png"> Hello E-commerce</h3> </div>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
					<router-link to="/login" class="nav-link"  v-if="!isLogged"> <h5><b-icon-person/> Login</h5> </router-link>
					<a href="/logout" class="nav-link" v-if="isLogged" @click.prevent="logoutUser"> <h5><b-icon-person-x/> Logout</h5> </a>
			</b-navbar-nav>
					
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
	name: 'PageHeader',
	computed: {
		...mapGetters(["isLogged"])
	},
	methods: {
		...mapActions(["logout"]),
		logoutUser() {
			this.logout();
		}
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
}

.dropdown-item{
	cursor: pointer;
}

.navbar-brand.not-logged{
	cursor: pointer;
}
</style>