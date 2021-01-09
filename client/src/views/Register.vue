<template>
	<div id="register">
		<page-header/>
		<div class="row">
			<div class="card mx-auto text-left">
				<div class="card-header  primary-color text-white">
					<h3 class="text-title">Registrazione</h3>
				</div>

				<div class="card-body">
					<form @submit.prevent="registerUser">
						
					<h5 class="text-subtitle">Completa tutti i campi per registrarti.</h5>
						<br>
						<h5 class="card-subtitle">Dati account, questi dati serviranno per autenticarti.</h5>
						<br>
						<div class="form-group">
							<label for="regEmail">Indirizzo email</label>
							<input type="email" class="form-control" id="regEmail" aria-describedby="emailHelp" placeholder="email@example.com" maxlength="50" v-model="email">
						</div><br>
						<div class="form-group">
							<label for="regPassword">Password</label>
							<input type="password" class="form-control" id="regPassword" placeholder="Inserisci qui la tua password" maxlength="50" v-model="password">
						</div>
						<div class="form-group">
							<label for="regConfirmPassword">Conferma la tua password</label>
							<input type="password" class="form-control" id="regConfirmPassword" placeholder="Inserisci nuovamente la tua password" maxlength="50" v-model="confirmPassword">
						</div><br>
						<h5 class="card-subtitle">Dati anagrafici, questi dati serviranno per effettuare acquisti sulla piattaforma.</h5>
						<br>
						<div class="form-group">
							<label for="regName">Nome</label>
							<input type="text" class="form-control" id="regName" placeholder="" maxlength="50" v-model="name">
						</div>
						<div class="form-group">
							<label for="regSurname">Cognome</label>
							<input type="text" class="form-control" id="regSurname" placeholder="" maxlength="50" v-model="surname">
						</div>
						<div class="form-group">
							<label for="regAddress">Indirizzo</label>
							<input type="text" class="form-control" id="regAddress" placeholder="Via, numero civico" maxlength="100" v-model="address">
						</div>
						<div class="form-group">
							<label for="regCity">Città</label>
							<input type="text" class="form-control" id="regCity" v-model="city">
						</div>
						<div class="form-group">
							<label for="regProvince">Provincia</label>
							<select id="regProvince" class="form-control" v-model="province">
								<option>AG</option>
								<option>AL</option>
								<option>AN</option>
								<option>AO</option>
								<option>AR</option>
								<option>AP</option>
								<option>AT</option>
								<option>AV</option>
								<option>BA</option>
								<option>BT</option>
								<option>BL</option>
								<option>BN</option>
								<option>BG</option>
								<option>BI</option>
								<option>BO</option>
								<option>BZ</option>
								<option>BS</option>
								<option>BR</option>
								<option>CA</option>
								<option>CL</option>
								<option>CB</option>
								<option>CE</option>
								<option>CT</option>
								<option>CZ</option>
								<option>CH</option>
								<option>CO</option>
								<option>CS</option>
								<option>CR</option>
								<option>KR</option>
								<option>CN</option>
								<option>EN</option>
								<option>FM</option>
								<option>FE</option>
								<option>FI</option>
								<option>FG</option>
								<option>FC</option>
								<option>FR</option>
								<option>GE</option>
								<option>GO</option>
								<option>GR</option>
								<option>IM</option>
								<option>IS</option>
								<option>SP</option>
								<option>AQ</option>
								<option>LT</option>
								<option>LE</option>
								<option>LC</option>
								<option>LI</option>
								<option>LO</option>
								<option>LU</option>
								<option>MC</option>
								<option>MN</option>
								<option>MS</option>
								<option>MT</option>
								<option>ME</option>
								<option>MI</option>
								<option>MO</option>
								<option>MB</option>
								<option>NA</option>
								<option>NO</option>
								<option>NU</option>
								<option>OR</option>
								<option>PD</option>
								<option>PA</option>
								<option>PR</option>
								<option>PV</option>
								<option>PG</option>
								<option>PU</option>
								<option>PE</option>
								<option>PC</option>
								<option>PI</option>
								<option>PT</option>
								<option>PN</option>
								<option>PZ</option>
								<option>PO</option>
								<option>RG</option>
								<option>RA</option>
								<option>RC</option>
								<option>RE</option>
								<option>RI</option>
								<option>RN</option>
								<option>RM</option>
								<option>RO</option>
								<option>SA</option>
								<option>SS</option>
								<option>SV</option>
								<option>SI</option>
								<option>SR</option>
								<option>SO</option>
								<option>SU</option>
								<option>TA</option>
								<option>TE</option>
								<option>TR</option>
								<option>TO</option>
								<option>TP</option>
								<option>TN</option>
								<option>TV</option>
								<option>TS</option>
								<option>UD</option>
								<option>VA</option>
								<option>VE</option>
								<option>VB</option>
								<option>VC</option>
								<option>VR</option>
								<option>VV</option>
								<option>VI</option>
								<option>VT</option>
							</select>
						</div>
						<div class="form-group">
							<label for="regPhone">Cellulare</label>
							<input type="number" class="form-control" id="regPhone" maxlength="50" v-model="phone">
							<small>Questo campo è opzionale.</small>
						</div>
						<br>
						<input type="submit" class="btn primary-color text-white" value="Registrati"/>
						<br>
						<br>
						<small>
							Hai già un account? <router-link to="/login">Esegui il login</router-link>.
						</small>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import PageHeader from '../components/PageHeader.vue';

export default {
	name: 'Register',
	data(){
		return{
			email:"",
			password:"",
			confirmPassword:"",
			name:"",
			surname:"",
			address:"",
			city:"",
			province:"",
			phone:""
		}
	},
	components: {
		PageHeader
	},
	methods: {
		...mapActions(["register"]),
		registerUser(){
			let user = {
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword,
				name: this.name,
				surname: this.surname,
				address: this.address,
				city: this.city,
				province: this.province,
				phone: this.phone
			};
			this.register(user).then(res => {
				if(res.data.success){
					this.$router.push("login");
				}
			});
		}
	},
}
</script>

<style scoped>
.card{
	margin-top: 10%;
	border: 0;
	min-width: 500px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	margin-bottom: 10%;
	padding-bottom: 20px;
}

.btn{
	width: 100%;
}
</style>
