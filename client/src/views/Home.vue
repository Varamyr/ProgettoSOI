<template>
	<div id="home">
		<page-header/>
		<articles-component/>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import ArticlesComponent from '../components/ArticleComponent'

export default {
	name: 'Home',
	components: {
		PageHeader,
		ArticlesComponent
	}
}
</script>

<style>
</style>
