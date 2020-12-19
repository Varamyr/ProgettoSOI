<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <articles-component/>
  </div>
</template>

<script>
import ArticlesComponent from './components/ArticleComponent.vue'

export default {
  name: 'App',
  components: {
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
