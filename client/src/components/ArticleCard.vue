<template>
	<div>
		<b-card
		no-body
		class="m-2"
		style="max-width: 450px; min-width:450px"
		>
			<div class="row h-100">
				<b-col sm="6" class="card-image-container">
					<b-img class="h-100 embed-responsive" style="object-fit: cover;" fluid src="https://images.everyeye.it/img-notizie/nvidia-geforce-rtx-3090-3080-3070-trapelano-specifiche-prezzi-v3-465276.jpg" alt="Image 1"></b-img>
				</b-col>
				<b-col sm="6" class="py-3 card-description">
					<h4>{{article.name}}</h4>
					<b-card-text>
						{{article.description}}
					</b-card-text>
					<b-card-text>
						Venditore: {{article.sellerid}}
					</b-card-text>
				</b-col>
			</div>
			<div class="card-footer">
				<small class="text-muted">
					<div class="row h-100">
						<div class="col-md-6">
							<b-card-text>
								Prezzo: <h4 class="price">{{article.price}} $</h4>
							</b-card-text>
						</div>
						<div class="col-md-6">
							<b-card-text v-if="isLogged && getUserType=='user'">
								Aggiungi al carrello: <h4><button type="button" class="btn btn-buy primary-color text-white" @click.prevent="addToCart"><b-icon-cart/></button></h4>
							</b-card-text>
							<b-card-text v-if="isLogged && getUserType=='vendor'">
								Rimuovi dalla vetrina: <h4><button type="button" class="btn btn-danger text-white"><b-icon-cart/></button></h4>
							</b-card-text>
							<b-card-text v-if="!isLogged">
								Aggiungi al carrello: <h4><router-link to="/login" type="button" class="btn btn-buy primary-color text-white" ><b-icon-cart/></router-link></h4>
							</b-card-text>
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
		...mapActions(["addArticleToCart"]),
		addToCart() {
      this.addArticleToCart({
			article: this.article,
			quantity: 1
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
	border:0;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.btn:hover{
	background-color: chocolate!important;
}

h4.price{
	padding-top:10px;
}

.btn-buy{
	margin-top: 10px;
	width: 100%;
}

.card-description{
	padding-right: 30px;
	padding-left:0;
}
</style>