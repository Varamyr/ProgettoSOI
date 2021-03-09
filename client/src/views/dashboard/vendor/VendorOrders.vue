<template>
	<div id="orders" class="container">
		<page-header/>
		<h1>Storico ordini</h1>
		<hr/>
		<old-orders-component/>
		<notification-component/>
	</div>
</template>

<script>
import OldOrdersComponent from '../../../components/oldOrders/OldOrdersComponent.vue'
import NotificationComponent from '../../../components/ui/notifications/NotificationComponent.vue'
import PageHeader from '../../../components/ui/PageHeader.vue'

export default {
	name: 'orders',
	components: {
		PageHeader,
		OldOrdersComponent,
		NotificationComponent
	}
}
</script>

<style scoped>
</style>