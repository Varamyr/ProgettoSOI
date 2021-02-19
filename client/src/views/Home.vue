<template>
	<div id="home">
		<page-header/>
		<articles-component/>
		<notification-component/>
	</div>
</template>

<script>
import ArticlesComponent from '../components/articles/ArticleComponent'
import NotificationComponent from '../components/ui/notifications/NotificationComponent.vue'
import PageHeader from '../components/ui/PageHeader.vue'

export default {
	name: 'Home',
	components: {
		ArticlesComponent,
		PageHeader,
		NotificationComponent
	}
}
</script>

<style scoped>
</style>
