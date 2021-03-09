<template>
	<div>
		<b-card
		no-body
		class="m-2"
		style="max-width: 650px; min-width:450px"
		>
			<div class="row" style="margin:0;">
				<div class="col" style="background-color: rgba(0,0,0,0.025); padding:0; height:300px;">
					<!-- Fixare il caricamento dinamico delle immagini -->
					<b-img class="h-100 embed-responsive" style="object-fit: scale-down;" fluid :src="article.photo" alt="Image 1"></b-img>
				</div>
				<div class="col p-4">
					<h4>{{article.name}}</h4>
					<b-card-text class=" text-left" style="overflow-y:auto; height:150px;">
						<small>{{article.description}}</small>
					</b-card-text>
					<b-card-text>
						Venditore: {{article.sellerName}}
					</b-card-text>
				</div>
			</div>
			<div class="card-footer">
				<small class="text-muted">
					<div class="row h-100">
						<div class="col">
							<b-card-text>
								Prezzo: <h4 class="py-2">{{article.price}} €</h4>
							</b-card-text>
						</div>
						<div class="col">
							<b-card-text>
								Disponibilità: <div class="row" style="min-width: 150px;">
									<div class="col" v-if="isLogged && getUserType=='vendor'"><button type="button" class="btn circle-btn" @click.prevent="decAvailability(article._id)"><b-icon-dash-circle class="text-danger"/></button></div>
									<div class="col"><h4 class="py-2">{{article.availability}}</h4> </div>
									<div class="col" v-if="isLogged && getUserType=='vendor'"><button type="button" class="btn circle-btn" @click.prevent="incAvailability(article._id)"><b-icon-plus-circle class="text-success"/></button></div>
									
								</div>
							</b-card-text>
						</div>
						<div class="col">
							<b-card-text v-if="isLogged && getUserType=='user'">
								Aggiungi al carrello: <h4><button type="button" class="btn btn-wide primary-color text-white" @click.prevent="addToCart"><b-icon-cart/></button></h4>
							</b-card-text>
							<b-card-text v-if="isLogged && getUserType=='vendor'">
								Rimuovi dalla vetrina: <h4 ><button type="button" class="btn btn-danger btn-wide text-white" data-toggle="modal" data-target="#removeArticleModal"><b-icon-cart-x-fill/></button></h4>
							</b-card-text>
							<b-card-text v-if="!isLogged">
								Aggiungi al carrello: <h4><router-link to="/login" type="button" class="btn btn-wide primary-color text-white" ><b-icon-cart/></router-link></h4>
							</b-card-text>
							<!-- Modal -->
							<div class="modal fade" id="removeArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLabel">Rimozione articolo dalla vetrina</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										</div>
										<div class="modal-body">
										Attenzione stai rimuovendo questo articolo dalla vetrina: se vuoi reinserirlo dovrai creare un nuovo articolo utilizzando il tasto + in basso a sinistra.
										<br>
										Sei sicuro di voler continuare?
										</div>
										<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
										<button type="button" class="btn btn-danger"  data-dismiss="modal" @click.prevent="removeFromShowcase(article)">Rimuovi articolo</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</small>
			</div>
			
		</b-card>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
	props: ["article"],
	methods: {
		...mapActions(["getShowcase"]),
		...mapActions(["addArticleToCart"]),
		...mapActions(["addNotification"]),
		...mapActions(["modifyArticleAvailability"]),
		...mapActions(["removeArticleFromShowcase"]),
		addToCart() {
			this.addArticleToCart({
				article: this.article,
				quantity: 1
			});
			this.addNotification({type:"Successo", message: "L'articolo è stato aggiunto al carrello."});
		},
		removeFromShowcase(article){
			this.removeArticleFromShowcase(article._id).then(res => {
				if(res.data.success){
					this.addNotification({type: 'Successo', message: 'L\'articolo è stato rimosso con successo.'});
				}else{
					this.addNotification({type: 'Errore', message: res.data.message});
				}
			});
		},
		incAvailability(id){
			this.modifyArticleAvailability({articleId: id, type:"inc"})
			.then(res => {
				if(res.data.success){
					this.getShowcase();
					this.addNotification({type:"Successo", message:"Disponibilità modificata."});
				}
			}).catch(err => {
				this.addNotification({type:"Successo", message:err});
			});
		},
		decAvailability(id){
			this.modifyArticleAvailability({articleId: id, type:"dec"})
			.then(res => {
				if(res.data.success){
					this.getShowcase();
					this.addNotification({type:"Successo", message:"Disponibilità modificata."});
				}
			}).catch(err => {
				this.addNotification({type:"Successo", message:err});
			});
		}
	},
	computed:{
		...mapGetters(["isLogged"]),
		...mapGetters(["getUserType"])
	}
}
</script>

<style scoped>
.card{
	display: inline-block;
	border:0;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}



h4.price{
	padding-top:10px;
}

.btn-wide{
	margin-top: 10px;
	width: 100%;
}

.circle-btn{
	width: fit-content;
	height: fit-content;
	padding:0;
	padding-top:10px;
}

</style>