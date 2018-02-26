
<template>
  <div id="app">
    <nav-bar></nav-bar>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  export default {
    name: 'App',
    components: {NavBar}

  }

</script>

<style lang="sass">
  @import "assets/sass/main.sass"
  /* Your css for this file... */
</style>
<style>

</style>
