<template>
	<div>
		<button type="button" class="btn btn-floating text-white" data-toggle="modal" data-target="#addVendorModal"><b-icon-plus style="width: 40px; height: 40px;"/></button>
		<!-- Modal -->
		<div class="modal fade" id="addVendorModal" tabindex="-1" role="dialog" style="min-width:574px;" aria-labelledby="addVendorModal" aria-hidden="true" >
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title" id="addVendorModal">Aggiunta di un nuovo venditore alla piattaforma</h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form @submit.prevent="newVendor">
						<div class="modal-body">
							<div class="card mx-auto text-left">
								<div class="card-body">
									<h4 class="text-subtitle">Completa i campi sottostanti per aggiungere un nuovo articolo alla tua vetrina.</h4>
									<br>
									<div class="form-group">
										<label for="name">Nome</label>
										<input type="text" class="form-control" id="name"  required placeholder="Inserisci qui il nome del venditore" maxlength="50" v-model="name">
									</div><br>
									<div class="form-group">
										<label for="surname">Cognome</label>
										<input type="text" class="form-control" id="surname"  required placeholder="Inserisci qui il cognome del venditore" maxlength="50" v-model="surname">
									</div><br>
									<div class="form-group">
										<label for="businessName">Nome attività</label>
										<input type="text" class="form-control" id="businessName"  required placeholder="Inserisci qui il nome dell'attività del venditore" maxlength="50" v-model="businessName">
									</div><br>
									<div class="form-group">
										<label for="address">Indirizzo</label>
										<input type="text" class="form-control" id="address"  required placeholder="Inserisci qui l'indirizzo dell'attività del venditore" maxlength="50" v-model="address">
									</div><br>
									<div class="form-group">
										<label for="city">Città</label>
										<input type="text" class="form-control" id="city"  required placeholder="Inserisci qui la città dell'attività del venditore" maxlength="50" v-model="city">
									</div><br>
									<div class="form-group">
										<label for="province">Provincia</label>
										<select id="province" class="form-control" v-model="province">
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
										<label for="pIva">Partita IVA</label>
										<input type="text" class="form-control" id="pIva"  required placeholder="Inserisci qui la partita IVA dell'attività del venditore" maxlength="11" v-model="pIva">
									</div><br>
									<div class="form-group">
										<label for="phone">Telefono</label>
										<input type="number" class="form-control" id="phone"  required placeholder="Inserisci qui la partita IVA dell'attività del venditore" maxlength="50" v-model="phone">
									</div><br>
									<hr>
									<h4>Credenziali per l'accesso alla piattaforma</h4>
									<div class="form-group">
										<label for="email">Indirizzo email</label>
										<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email@example.com" maxlength="50" v-model="email">
									</div><br>
									<div class="form-group">
										<label for="password">Password iniziale</label>
										<input type="password" class="form-control" id="password" maxlength="50" v-model="password">
									</div><br>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
							<input type="submit" class="btn btn-danger"  value="Aggiungi nuovo venditore"/>
						</div>
					</form>
				</div>
			</div>
		</div>
		<table class="table table-hover ">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Nome attività</th>
				<th scope="col">Nome venditore</th>
				<th scope="col">Indirizzo</th>
				<th scope="col">Città</th>
				<th scope="col">Provincia</th>
				<th scope="col">Telefono</th>
				<th scope="col">Partita IVA</th>
				<th scope="col">Email</th>
				<th scope="col">AUTORIZZATO</th>
				<th scope="col">Cambia autorizzazione</th>
			</tr>
		</thead>
		<tbody>
			<tr :class="{'table-danger' : !vendor.authorized}" v-for="(vendor, index) in this.vendors" :key="vendor._id" >
				<th scope="row">{{index+1}}</th>
				<td>{{vendor.businessName}}</td>
				<td>{{vendor.name}} {{vendor.surname}}</td>
				<td>{{vendor.address}}</td>
				<td>{{vendor.city}}</td>
				<td>{{vendor.province}}</td>
				<td>{{vendor.phone}}</td>
				<td>{{vendor.pIva}}</td>
				<td>{{vendor.email}}</td>
				<td>
					<div v-if="vendor.authorized">Autorizzato</div>
					<div v-if="!vendor.authorized">Non autorizzato</div>
				</td>
				<td v-if="vendor.authorized"><button type="button" class="btn primary-color" @click.prevent="toggleAuthorization(vendor._id)"><b-icon-lock  /></button></td>
				<td v-if="!vendor.authorized"><button type="button" class="btn primary-color"  @click.prevent="toggleAuthorization(vendor._id)"><b-icon-unlock  /></button></td>
			</tr>
		</tbody>
	</table>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import $ from 'jquery';

export default {
	name: "VendorComponent",
	data(){
		return {
			name:"Quarto",
			surname:"Quartino",
			businessName:"E-Quartz",
			address:"Via Quarto Oggiaro, 18",
			city:"Quarto",
			province:"MI",
			pIva:"IT208374031",
			phone:"1231231232",
			email:"quarto@gmail.com",
			password:"ciao"
			// name:"",
			// surname:"",
			// businessName:"",
			// address:"",
			// city:"",
			// province:"",
			// pIva:"",
			// phone:"",
			// email:"",
			// password:""
		}
	},
	methods: {
		...mapActions(['getVendors']),
		...mapActions(['addNewVendor']),
		...mapActions(['deleteVendor']),
		...mapActions(['toggleVendorAuthorization']),
		...mapActions(['addNotification']),
		loadVendors(){
			this.getVendors().then(res => {
				if(res.data.success){
					// this.addNotification({type: 'Successo', message: 'Venditori caricati.'});
				}else{
					this.addNotification({type: 'Errore', message: 'Il server non è riuscito a soddisfare la richiesta.'});
				}
			}).catch(err => {
				console.log(err)
				this.addNotification({type: 'Errore', message: err.response.data.msg});
			});
		},
		newVendor(){
			let vendor = {
				name: this.name,
				surname: this.surname,
				businessName: this.businessName,
				address: this.address,
				city: this.city,
				province: this.province,
				pIva: this.pIva,
				phone: this.phone,
				email: this.email,
				password: this.password
			};
			this.addNewVendor(vendor)
			.then(res => {
				if(res.data.success){
					this.name="";
					this.surname="";
					this.businessName="";
					this.address="";
					this.city="";
					this.province="";
					this.pIva="";
					this.phone="";
					this.email="";
					this.password="";
					$('#addVendorModal').modal('hide');
					this.addNotification({type: "Successo", message:"Il venditore è stato abilitato all'accesso sulla piattaforma."});
				}
			}).catch(error => {
				this.addNotification({type: "Errore",  message:error.response.data.msg});
				$('#addVendorModal').modal('hide');
			});
		},
		toggleAuthorization(id){
			this.toggleVendorAuthorization(id)
			.then(res => {
				if(res.data.success){
					this.addNotification({type: "Successo", message:"I privilegi del venditore sono stati modificati."});
					this.loadVendors();
				}
			}).catch(error => {
				this.addNotification({type: "Errore",  message:error.response.data.msg});
			});
		}
	},
	computed:{
		...mapState({
			vendors: state => state.AdministrativeService.filteredVendors
		})
	},
	created() {
		this.loadVendors();
	},
}
</script>

<style scoped>
	.btn-floating{
	padding: 0;
	
	background-color: #dc3545;;
	position: absolute;
	bottom: 25px;
	left: 25px;
	border-radius: 50px;
	width: 60px;
	height: 60px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

/* Tolgo le frecce da input type number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.table{
	max-width: 1000px;
	margin: 0 auto;
}

.btn{
	color: white;
}

.btn:hover{
	background-color: chocolate!important;
}

.btn-danger:hover{
	background-color: red!important;
}

</style>