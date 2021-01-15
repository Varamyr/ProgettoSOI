<template>
	<div class="container">
		<h1>Articoli in vendita</h1>
		<!-- Creare gli articoli qui-->
		<hr>
		<p class="error" v-if="error">{{error}}</p>
		<div class="articles-container">
			<div class="card-group" style="justify-content:center;">
				<article-card 
				v-for="(article, index) in articles" 
				v-bind:key="article._id" 
				v-bind:index="index"
				v-bind:article="article"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ArticleCard from './ArticleCard.vue';

export default {
	name: 'ArticleComponent',
	components:{
		ArticleCard
	},
	data() {
		return {
			articles: [],
			error : ''
		}
	},
	methods: {
		...mapActions(["getArticles"]),
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
		...mapGetters(["articlesError"])
	}
}
</script>

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
