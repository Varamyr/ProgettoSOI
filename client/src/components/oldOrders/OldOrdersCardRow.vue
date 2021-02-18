<template>
<!-- 	name: article.name,
				photo: article.photo,
				price: article.price,
				category: article.category,
				sellerName: vendor.businessName,
				quantity: order.amount,
				paidDate: order.paidDate,
				shippedDate: order.shippedDate -->
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
				<div class="col text-left align-self-center">
					<div class="card-text text-center">
						<small >L'ordine è stato spedito in data: <b>{{ new Date(article.shippedDate).toLocaleDateString('it-IT',{hour: '2-digit',minute:'2-digit'})}}</b></small>
					</div>
					<hr/>
					<div class="card-text text-center">
						<small >È arrivato a destinazione in data: <b>{{ new Date(article.arrivedDate).toLocaleDateString('it-IT',{hour: '2-digit',minute:'2-digit'})}}</b></small>
					</div>
				</div>
			</div>
		</b-col>
	</div>
</template>

<script>

export default {
	props: ["article", "index"],
	methods: {
		
	},
	created() {
		console.log(this.article)
	},
}
</script>

<style scoped>
	
</style>