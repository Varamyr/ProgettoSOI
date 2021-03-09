<template>
	<div id="user">
		<page-header/>
		<article-component/>
		<notification-component/>
	</div>
</template>

<script>
import ArticleComponent from '../../components/articles/ArticleComponent.vue';
import NotificationComponent from '../../components/ui/notifications/NotificationComponent.vue';
import PageHeader from '../../components/ui/PageHeader.vue';

export default {
	name: 'user',
	components: {
		ArticleComponent,
		PageHeader,
		NotificationComponent
	}
}
</script>

<style scoped>
</style>
