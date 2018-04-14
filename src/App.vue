<template>
  <div id="app" style="height:100vh;width:100vw;">
    <div class="container-fluid p-5 h-100">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100');
  @import "./assets/scss/variables";
  @import "~bootstrap/scss/bootstrap";
  @import "./assets/scss/ionicons";

  .page {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
</style>
