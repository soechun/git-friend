<template>
  <div id="app">
    <h1>Friends of Git Town</h1>
    <h2>Find your git friends here</h2>
    <img src="./assets/logo.png" class="title-img">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title-img {
  width: 50%;
  height: 50%;
}
</style>
