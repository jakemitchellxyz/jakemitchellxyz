<template>
  <div id="app">
    <transition :name="slideDirection">
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return { slideDirection: 'slide-up' }
    },
    watch: {
      // create dynamic slide direction for page changes
      '$route' (to, from) {
        this.slideDirection = (to.name === 'home') ? 'slide-down' : 'slide-up'
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/app/app";
</style>
