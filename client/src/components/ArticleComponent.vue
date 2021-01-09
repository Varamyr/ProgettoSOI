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
										Aggiungi al carrello: <h4><button type="button" class="btn btn-buy primary-color text-white"><b-icon-cart/></button></h4>
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
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'ArticleComponent',
	data() {
		return {
			articles: [],
			error : ''
		}
	},
	methods: {
		...mapActions(['getArticles']),
		loadArticles(){
			this.getArticles()
			.then(
				res => {
					if(res.data.success){
						this.articles = res.data.articles
					}
				}
			)
			.catch(
				err => {
					console.log(err);
			});
		}
	},
	created() {
		this.loadArticles();
	},
	computed: {
		...mapGetters(["articlesError"]),
		...mapGetters(["isLogged"]),
		...mapGetters(["getUserType"])
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
</style>
