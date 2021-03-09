<template>
	<div >
		<h1>Vetrina negozio</h1>
		<button type="button" class="btn btn-floating text-white" data-toggle="modal" data-target="#addArticleModal"><b-icon-plus style="width: 40px; height: 40px;"/></button>
		<!-- Modal -->
		<div class="modal fade" id="addArticleModal" tabindex="-1" role="dialog" style="min-width:574px;" aria-labelledby="exampleModalLabel" aria-hidden="true" >
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Aggiunta di un articolo alla vetrina</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form @submit.prevent="newArticle">
						<div class="modal-body">
							
							<div class="card mx-auto text-left">
								<div class="card-body">
									<h5 class="text-subtitle">Completa i campi sottostanti per aggiungere un nuovo articolo alla tua vetrina.</h5>
									<br>
									<div class="form-group">
										<label for="name">Nome</label>
										<input type="text" class="form-control" id="name"  required placeholder="Inserisci qui il nome dell'articolo" maxlength="50" v-model="name">
									</div><br>
									<div class="form-group">
										<label for="price">Prezzo</label>
										<input type="number" class="form-control" id="price" required placeholder="Inserisci qui il prezzo dell'articolo" min="1" v-model="price">
									</div><br>
									<div class="form-group">
										<label for="category">Categoria</label>
										<select class="custom-select mr-sm-2" id="category" required v-model="category">
											<option value="gpu" selected aria-selected="selected">Schede video</option>
											<option value="monitor">Monitor</option>
											<option value="cpu">Processori</option>
											<option value="mobo">Schede madri</option>
											<option value="ram">Memoria</option>
											<option value="dissipator">Dissipatori</option>
											<option value="psu">Alimentatori</option>
											<option value="hdd">Dischi rigidi</option>
											<option value="ssd">Dischi a stato solido</option>
											<option value="case">PC Case</option>
											<option value="peripherals">Periferiche</option>
										</select>
									</div><br>
									<div class="form-group">
										<label for="availability">Disponibilità</label>
										<input type="number" class="form-control" id="availability" placeholder="Inserisci qui il numero di articoli disponibili" min="1" v-model="availability">
									</div><br>
									<div class="form-group">
										<label for="photo">Foto</label>
										<input pattern="(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*).(?:png|jpg|gif|jpeg)" type="text"  required class="form-control" id="photo" placeholder="https://dominio.(jpg/jpeg/gif/png)" v-model="photo">
									</div><br>
									<div class="form-group">
										<label for="description">Descrizione articolo (hai a disposizione ancora <div id="textareaCharacterCount"></div> caratteri)</label>
										<textarea id="description" class="form-control" required placeholder="Descrivi il tuo articolo con massimo 500 caratteri." maxlegth="500" rows="4" v-model="description"></textarea>
									</div><br>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
							<input type="submit" class="btn btn-danger"  value="Aggiungi l'articolo alla vetrina"/>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- Creo gli articoli qui-->
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
import $ from 'jquery';
import { mapActions, mapGetters, mapState } from 'vuex';
import ArticleCard from './ArticleCard';
import ArticleFilter from './ArticleFilter.vue';

export default {
	name: 'ArticleComponent',
	data(){
		return{
			// name:"GeForce RTX 3060",
			// price:1,
			// category:"gpu",
			// availability:1,
			// photo:"https://images.nvidia.com/aem-dam/Solutions/geforce/ampere/rtx-3060-ti/geforce-rtx-3060-ti-product-gallery-full-screen-3840-1-bl.jpg",
			// description:"asdf"
			name:"",
			price:0,
			category:"",
			availability:0,
			photo:"",
			description:""
		}
	},
	components:{
		ArticleCard,
		ArticleFilter
	},
	methods: {
		...mapActions(["getShowcase"]),
		...mapActions(["addArticleToShowcase"]),
		...mapActions(["addNotification"]),
		loadArticles(){
			this.getShowcase()
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
		newArticle(){
			let article = {
				name: this.name,
				price : this.price,
				category : this.category,
				availability : this.availability,
				photo : this.photo,
				description : this.description
			};
			this.addArticleToShowcase(article).then(res => {
				
				if(res.data.success){
					this.name = "";
					this.price=0;
					this.category="";
					this.availability=0;
					this.photo="";
					this.description="";
					$('#addArticleModal').modal('hide');
					this.addNotification({type: "Successo", message:"L'articolo è stato aggiunto con successo alla vetrina."});
					this.loadArticles();
				}
			}).catch(() => {
				this.addNotification({type: "Errore",  message:"Il server non ha processato correttamente la richiesta. Riprova."});
			})
		}
	},
	created() {
		this.loadArticles();
		$('#description').keyup(function() {
			var text_maxlength = $('#description').val().maxlength;
			var text_length = $('#description').val().length;
			var text_remaining = text_maxlength - text_length;
			
			console.log(text_maxlength, text_length, text_remaining)
			$('#textareaCharacterCount').html(text_remaining);
		});
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

.btn-floating{
	padding: 0;
	
	background-color: #dc3545;;
	position: fixed;
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
</style>
