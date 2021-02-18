<template>
	<div id="home">
		<page-header/>
		<articles-component/>
	</div>
</template>

<script>
import ArticlesComponent from '../components/articles/ArticleComponent'
import PageHeader from '../components/ui/PageHeader.vue'

export default {
	name: 'Home',
	components: {
		ArticlesComponent,
		PageHeader
	}
}
</script>

<style scoped>
</style>
