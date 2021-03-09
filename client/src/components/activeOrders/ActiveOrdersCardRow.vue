<template>
<!-- 	name: article.name,
				photo: article.photo,
				price: article.price,
				category: article.category,
				sellerName: vendor.businessName,
				quantity: order.amount,
				paidDate: order.paidDate,
				shippedDate: order.shippedDate -->
	<div>
		<!-- Row ordine per l'utente -->
		<div v-if="isLogged && getUserType=='user'">
			<div class="row m-0">
				<b-col sm="3" class="card-image-container align-self-center">
					<b-img class="w-100 embed-responsive" style="object-fit: cover; border-radius:5px;" fluid :src="article.photo" alt="Image 1"></b-img>
				</b-col>
				<b-col sm="9" class="py-3 card-description">
					<div class="row">
						<div class="col text-left">
							<div class="card-text">
								<h5>Articolo: {{article.name}}</h5>
							</div>
							<div class="card-text">
								<small>Venduto da:  {{article.sellerName}}</small>
							</div>
							<div class="card-text">
								<small>Numero articoli acquistati: {{article.quantity}}</small>
							</div>
							<div class="card-text">
								<small>Prezzo: {{article.price}}€</small>
							</div>
						</div>
						<div class="col text-left">
							<div class="card-text text-center">
								<small v-if="!article.shipped && !article.arrived">L'ordine non è ancora stato spedito.</small>
								<small v-if="article.shipped && !article.arrived">L'ordine è stato spedito in data: <b>{{ new Date(article.shippedDate).toLocaleDateString('it-IT',{hour: '2-digit',minute:'2-digit'})}}</b></small>
								<small v-if="article.arrived">L'ordine è arrivato in data: <b>{{ new Date(article.arrivedDate).toLocaleDateString('it-IT',{hour: '2-digit',minute:'2-digit'})}}</b></small>
							</div>
							<hr/>
							<div class="card-text text-center">
								<div class="row">
									<div class="col">
										<small>Segna l'ordine come arrivato:</small>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<button v-if="article.shipped && !article.arrived" type="button" class="btn btn-buy primary-color text-white w-50" @click.prevent="setArticleArrived"><b-icon-cart-check-fill/></button>
										<button disabled v-if="!article.shipped && !article.arrived" :class="{'btn-secondary' : !article.shipped && !article.arrived}" type="button" class="btn btn-buy  text-white w-50" ><b-icon-cart-check-fill/></button>
										<button disabled v-if="article.arrived" :class="{'btn-secondary' : article.arrived}" type="button" class="btn btn-buy  text-white w-50" ><b-icon-cart-check-fill/></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</b-col>
			</div>
		</div>
		<!-- Row ordine per il vendor -->
		<div v-if="isLogged && getUserType=='vendor'">
			<div class="row m-0">
				<b-col sm="3" class="card-image-container align-self-center">
					<b-img class="w-100 embed-responsive" style="object-fit: cover; border-radius:5px;" fluid :src="article.photo" alt="Image 1"></b-img>
				</b-col>
				<b-col sm="9" class="py-3 card-description">
					<div class="row">
						<div class="col text-left">
							<div class="card-text">
								<h5>Articolo: {{article.name}}</h5>
							</div>
							<div class="card-text">
								<small>Numero articoli acquistati: {{article.quantity}}</small>
							</div>
							<div class="card-text">
								<small>Prezzo: {{article.price}}€</small>
							</div>
						</div>
						<div class="col text-left">
							<div class="card-text text-center">
								<small v-if="!article.shipped">L'ordine non è ancora stato spedito.</small>
								<small v-if="article.shipped">L'ordine è stato spedito in data: <b>{{ new Date(article.shippedDate).toLocaleDateString('it-IT',{hour: '2-digit',minute:'2-digit'})}}</b></small>
							</div>
							<hr/>
							<div class="card-text text-center">
								<div class="row">
									<div class="col">
										<small>Segna l'ordine come spedito:</small>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<button v-if="!article.shipped" type="button" class="btn btn-buy primary-color text-white w-50" @click.prevent="setArticleShipped"><b-icon-cart-check-fill/></button>
										<button  v-if="article.shipped" disabled :class="{'btn-secondary' : article.shipped}" type="button" class="btn btn-buy  text-white w-50" ><b-icon-cart-check-fill/></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</b-col>
			</div>
		</div>
	</div>
	
	
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
	props: ["article", "index"],
	methods: {
		...mapActions(['setOrderArticleAsArrived']),
		...mapActions(['setOrderArticleAsShipped']),
		...mapActions(['addNotification']),
		setArticleArrived(){
			this.setOrderArticleAsArrived({orderid: this.article.id, paidDate: this.article.paidDate})
			.then(res => {
				if(res.data.success){
					this.addNotification({type: "Successo", message:"L'articolo è stato segnato come arrivato e inserito nello storico ordini."});
				}
			})
			.catch(err => {
				this.addNotification({type: "Errore", message: err.response.data.msg});
			})
		},
		setArticleShipped(){
			this.setOrderArticleAsShipped({orderid: this.article.id, paidDate: this.article.paidDate})
			.then(res => {
				if(res.data.success){
					this.addNotification({type: "Successo", message:"L'articolo è stato segnato come spedito."});
				}else{
					this.addNotification({type: "Errore", message: res.data.msg});
				}
			})
			.catch(err => {
				console.log(err);
				this.addNotification({type: "Errore", message: 'L\'operazione ha avuto qualche problema, riprova più tardi.'});
			})
		}
	},
	computed:{
		...mapGetters(['getUserType']),
		...mapGetters(['isLogged'])
	}
}
</script>

<style scoped>
</style>