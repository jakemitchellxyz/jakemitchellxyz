<template>
  <div id="app" style="height:100vh;width:100vw;">
    <div class="container-fluid page-padding h-100">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    // watch: {
    //   '$route' (to, from) {
    //     const toDepth = to.path.split('/').length
    //     const fromDepth = from.path.split('/').length
    //     this.pageTransition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   }
    // }
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
    box-shadow: 0 0 20px 1px $dark;
    background-color: $dark;
  }

  .page-padding {
    padding: 3rem;

    @media only screen and (max-width: 740px) {
      padding: 1rem;
    }

    @media only screen and (max-width: 400px) {
      padding: 0.25rem;
    }
  }
</style>
