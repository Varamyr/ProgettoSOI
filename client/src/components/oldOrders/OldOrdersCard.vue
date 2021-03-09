<template>
	<!-- 	name: article.name,
			photo: article.photo,
			price: article.price,
			category: article.category,
			sellerName: vendor.businessName,
			quantity: order.amount,
			paidDate: order.paidDate,
			shippedDate: order.shippedDate -->
	<div class="row">
		<div
		class="card m-2"
		>
			<div class="card-header">
				<div class="row">
					<div class="col card-text">
						Ordinato il: <b>
							{{
								new Date(order.paidDate).toLocaleDateString('it-IT',{
									hour: '2-digit',
									minute:'2-digit'
								})
							}}
						</b>
					</div>
					<div class="col card-text">
						Totale: <b>{{order.totalPrice}}€</b>
					</div>
				</div>
			</div>
			<old-orders-card-row class="card-body"
				v-for="(article,index) in order.articles"
				:index="index"
				:key="article.id"
				:article="article"
				:class="{'border-bottom' : index < order.articles.length-1}">
			</old-orders-card-row>
			<div 
			v-if="isLogged && getUserType=='vendor'" 
			class="card-footer text-muted">
				<div class="row">
					<div class="col"><h4>Spedito a</h4></div>
				</div>
				<div class="row">
					<div class="col">
						Nome: <b>{{order.userName}}</b><br>
						Cognome: <b>{{order.userSurname}}</b>
					</div>
					<div class="col">
						Indirizzo: <b>{{order.userAddress}}</b><br>
						Citta: <b>{{order.userCity}}</b><br>
						Provincia: <b>{{order.userProvince}}</b><br>
					</div>
					<div class="col">
						Contatto email: <b>{{order.userMail}}</b><br>
						Contatto telefonico: <b>{{order.userPhone}}</b><div v-if="order.userPhone.length==0"><b>Non fornito</b></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import {mapGetters} from 'vuex';
import OldOrdersCardRow from './OldOrdersCardRow';
export default {
	props: ["order"],
	components:{
		OldOrdersCardRow
	},
	computed:{
		...mapGetters(['isLogged']),
		...mapGetters(['getUserType'])
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