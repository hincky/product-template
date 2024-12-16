<template>
  <div id="app">
    <Model />
  </div>
</template>

<script>
import Model from './components/Model.vue'
export default {
  name: 'App',
  components: {
    // ProductTemplate
    Model
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
