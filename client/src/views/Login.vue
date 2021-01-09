<template>
	<div id="login">
		<page-header/>
		<div class="row">
			<div class="card mx-auto text-left">
				<div class="card-header primary-color text-white">
					<h4 class="text-title">Autenticazione</h4>
				</div>
				<div class="card-body">
					<form @submit.prevent="loginUser">
						<div class="form-group">
							<label for="loginEmail">Indirizzo email</label>
							<input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Inserisci qui la tua email" v-model="email">
						</div>
						<div class="form-group">
							<label for="loginPassword">Password</label>
							<input type="password" class="form-control" id="loginPassword" placeholder="Inserisci qui la tua password" v-model="password">
						</div><br>
						<error-component v-if="error" v-bind:msg="error" />
						<input type="submit" class="btn text-white primary-color" value="Login"/>
					</form><br>
					<small>
						Ti serve un nuovo account? <router-link to="/register">Registrati</router-link>.
					</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ErrorComponent from '../components/ErrorComponent';
import PageHeader from '../components/PageHeader';

export default {
	name: 'Login',
	components: {
		ErrorComponent,
		PageHeader
	},
	data(){
		return{
			email:"",
			password:""
		}
	},
	methods: {
		...mapActions(['login']),
		loginUser(){
			let user = {
				email: this.email,
				password: this.password
			}
			this.login(user);
		}
	},
	computed: {
		...mapGetters(["error"])
	}
}

</script>

<style scoped>
.card{
	margin-top: 10%;
	border: 0;
	min-width: 500px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.btn{
	width: 100%;
}
</style>
