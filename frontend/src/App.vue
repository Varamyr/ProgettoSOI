<template>
  <div id="app">
    <page-header/>
    <articles-component/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import ArticlesComponent from './components/ArticleComponent.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    ArticlesComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
