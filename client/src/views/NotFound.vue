<template>
	<div id="not-found">
		<page-header/>
		<div class="row">
			<div class="card mx-auto" >
				<img class="card-img-top" src="../assets/404.png" alt="Card image cap" >
				<div class="card-title"><h3>Ci dispiace ma la pagina cercata non esiste!</h3> </div>
				<div class="card-text">
					<a href="#" @click="$router.go(-1)" class="btn primary-color text-white btn-lg ">
						<b-icon-house />
						Riportami indietro 
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'

export default {
	name: 'PageNotFound',
	components: {
		PageHeader
	}
}
</script>

<style scoped>
.card{
	max-width: 800px;
	margin:20px;
	padding-bottom: 20px;
}
.card-img-top{
	margin-bottom: 30px;
}
</style>
