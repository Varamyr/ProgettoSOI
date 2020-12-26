<template>
	<div class="headerContainer">
		<b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark">
			
			<router-link to="/" class="navbar-brand" > <h3><img class="appLogo" alt="Vue logo" src="../assets/logo.png"> Hello E-commerce</h3> </router-link>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
					<!-- Using 'button-content' slot -->
					<template #button-content>
						<em><b-icon-lock-fill/> Login</em>
					</template>
					<router-link to="/login" class="dropdown-item"><b-icon-person/> Pagina di Login</router-link>
					<router-link to="/register" class="dropdown-item"><b-icon-person-plus/> Registrati</router-link>
					</b-nav-item-dropdown>
			</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: 'PageHeader'
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

.navbar-brand{
	cursor: pointer;
}
</style>