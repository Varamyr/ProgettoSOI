<template>
	<div id="shippings" class="container">
		<page-header/>
		<h1>Ordini attivi e spedizioni</h1>
		<!-- Creare gli articoli qui-->
		<hr>
		<active-orders-component/>
		<notification-component/>
	</div>
</template>

<script>
import ActiveOrdersComponent from '../../../components/activeOrders/ActiveOrdersComponent.vue'
import NotificationComponent from '../../../components/ui/notifications/NotificationComponent'
import PageHeader from '../../../components/ui/PageHeader.vue'

export default {
	name: 'shippings',
	components: {
		PageHeader,
		ActiveOrdersComponent,
		NotificationComponent
	}
}
</script>

<style scoped>
</style>