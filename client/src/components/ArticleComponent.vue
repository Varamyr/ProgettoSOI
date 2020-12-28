<template>
	<div class="container">
		<h1>Articoli in vendita</h1>
		<!-- Creare gli articoli qui-->
		<hr>
		<p class="error" v-if="error">{{error}}</p>
		<div class="articles-container">
			<div class="card-group" style="justify-content:center;">
				<b-card
				no-body
				class="m-2 "
				style="max-width: 450px; min-width:450px"
				v-for="(article, index) in articles"
				v-bind:item="article"
				v-bind:index="index"
				v-bind:key="article._id">
					<div class="row h-100">
						<b-col sm="6">
							<b-img class="h-100 embed-responsive" style="object-fit: cover;" fluid src="https://images.everyeye.it/img-notizie/nvidia-geforce-rtx-3090-3080-3070-trapelano-specifiche-prezzi-v3-465276.jpg" alt="Image 1"></b-img>
						</b-col>
						<b-col sm="6" class="py-3">
							<h4>{{article.name}}</h4>
							<b-card-text>
								{{article.description}}
							</b-card-text>
							<b-card-text>
							Prezzo: <h4>{{article.price}} $</h4>
							</b-card-text>
							<b-card-text>
								Venditore: {{article.sellerid}}
							</b-card-text>
						</b-col>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import ArticleService from '../services/ArticleService'

export default {
	name: 'ArticleComponent',
	data() {
		return {
		articles: [],
		error : ''
		}
	},
	async created() {
		try{
		this.articles = await ArticleService.getArticles();
		}catch(err){
			this.error = err.response.status;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
	max-width: 1000px;
	min-width: 400px;
	margin: 0 auto;
}

p.error{
	background-color: #ffffff;
	padding: 10px;
	margin-bottom: 15px;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
</style>
