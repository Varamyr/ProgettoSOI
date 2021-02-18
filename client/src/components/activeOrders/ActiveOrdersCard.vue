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
			<active-orders-card-row class="card-body"
				v-for="(article,index) in order.articles"
				:index="index"
				:key="article.id"
				:article="article"
				:class="{'border-bottom' : index < order.articles.length-1}">
			</active-orders-card-row>
			
		</div>
	</div>
	
</template>

<script>
import ActiveOrdersCardRow from './ActiveOrdersCardRow';
export default {
	props: ["order"],
	components:{
		ActiveOrdersCardRow
	},
	created() {
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