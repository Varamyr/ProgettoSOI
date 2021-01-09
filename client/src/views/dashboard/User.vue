<template>
	<div id="user">
		<page-header/>
		<article-component/>
	</div>
</template>

<script>
import ArticleComponent from '../../components/ArticleComponent.vue';
import PageHeader from '../../components/PageHeader.vue';

export default {
	name: 'user',
	components: {
		ArticleComponent,
		PageHeader
	}
}
</script>

<style scoped>
</style>
