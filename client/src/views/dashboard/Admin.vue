<template>
	<div id="admin">\
		<page-header/>
		<h1>Gestione venditori</h1>
		<hr>
		<vendor-component/>
		<notification-component/>
	</div>
</template>

<script>
import VendorComponent from '../../components/administrative/VendorComponent'
import NotificationComponent from '../../components/ui/notifications/NotificationComponent.vue'
import PageHeader from '../../components/ui/PageHeader.vue'

export default {
	name: 'admin',
	components: {
		PageHeader,
		VendorComponent,
		NotificationComponent
	}
}
</script>

<style scoped>
</style>
