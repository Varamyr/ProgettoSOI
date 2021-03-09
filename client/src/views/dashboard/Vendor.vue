<template>
	<div id="vendor">
		<page-header/>
		<showcase-component/>
		<notification-component/>
	</div>
</template>

<script>
import ShowcaseComponent from '../../components/articles/ShowcaseComponent.vue'
import NotificationComponent from '../../components/ui/notifications/NotificationComponent.vue'
import PageHeader from '../../components/ui/PageHeader.vue'

export default {
	name: 'vendor',
	components: {
		PageHeader,
		NotificationComponent,
		ShowcaseComponent
	}
}
</script>

<style scoped>
</style>
