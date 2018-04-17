<template>
  <div id="app">
    <div class="page-padding">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="scss">
  // Custom Bootstrap Variables
  @import "./assets/scss/app/variables";

  // Style Dependencies
  @import url('https://fonts.googleapis.com/css?family=Roboto:100');
  @import "~bootstrap/scss/bootstrap";
  @import "./assets/scss/ionicons";

  // Custom Styles
  @import "./assets/scss/app/app";
</style>
