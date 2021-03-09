<template>
	<div >
		<h1>Articoli in vendita</h1>
		<!-- Creare gli articoli qui-->
		<hr>
		<article-filter/>
		<hr/>
		<div class="articles-container">
			<div class="card-group" style="justify-content:center;">
				<article-card 
				v-for="(article, index) in articles" 
				v-bind:key="article._id" 
				v-bind:index="index"
				v-bind:article="article"
				/>
			</div>
			<div v-if="articles.length == 0">La ricerca con questi parametri ha prodotto 0 risultati.</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import ArticleCard from './ArticleCard';
import ArticleFilter from './ArticleFilter.vue';

export default {
	name: 'ArticleComponent',
	components:{
		ArticleCard,
		ArticleFilter
	},
	methods: {
		...mapActions(["getArticles"]),
		loadArticles(){
			this.getArticles()
			.then(
				res => {
					if(res.data.success){

						//this.articles = res.data.articles
					}
				}
			)
			.catch(
				err => {
					console.log(err);
			});
		},
		addArticleToShowcase(){
		}
	},
	created() {
		this.loadArticles();
	},
	computed: {
		...mapGetters(["articlesError"]),
		...mapState({
			articles: state => state.ArticleService.filtered
		})
	}
}
</script>

<style scoped>
div.container {
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
