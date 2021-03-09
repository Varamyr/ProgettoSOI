<template>
	<div class="row">
			<div class="col-md-12" style="justify-content:center; min-width:550px">
				<old-orders-card 
				v-for="(order, index) in oldOrders"
				:index="index"
				:key="order.paidDate"
				:order="order"
				/>
				<div v-if="oldOrders.length == 0">I tuoi ordini completati appariranno in questa sezione.</div>
			</div>
		</div>
</template>

<script>
import OldOrdersCard from './OldOrdersCard.vue';
import {mapGetters, mapActions, mapState} from 'vuex';
export default {
	components:{
		OldOrdersCard
	},
	methods: {
		...mapActions(["getOldOrders"]),
		...mapActions(["addNotification"]),
		loadOrders(){
			this.getOldOrders()
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
			oldOrders: state => state.OrderService.oldOrders
		}),
		...mapGetters(["ordersError"])
	}
}
</script>

<style scoped>
</style>