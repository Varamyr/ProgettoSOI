<template>
	<div class="row">
			<div class="col-md-12" style="justify-content:center; min-width:550px">
				<active-orders-card 
				v-for="(order, index) in activeOrders"
				:index="index"
				:key="order.paidDate"
				:order="order"
				/>
				<div v-if="activeOrders.length == 0">I tuoi ordini e le spedizioni appariranno in questa sezione.</div>
			</div>
		</div>
</template>

<script>
import ActiveOrdersCard from './ActiveOrdersCard.vue';
import {mapGetters, mapActions, mapState} from 'vuex';
export default {
	components:{
		ActiveOrdersCard
	},
	methods: {
		...mapActions(["getActiveOrders"]),
		...mapActions(["addNotification"]),
		loadOrders(){
			this.getActiveOrders()
			.then(
				res => {
					if(res.data.success){
						//this.orders = res.data.orderList;
					}
				}
			)
			.catch(
				err => {
					this.addNotification({type: "Errore", message:"Il caricamento degli ordini non è andato a buon fine, riprova più tardi."})
					console.log(err);
			});
		}
	},
	created() {
		this.loadOrders();
	},
	computed: {
		...mapState({
			activeOrders: state => state.OrderService.activeOrders
		}),
		...mapGetters(["ordersError"])
	}
}
</script>

<style scoped>
</style>