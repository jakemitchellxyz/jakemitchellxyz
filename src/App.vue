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
      return {
        slideDirection: 'slide-up'
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name == 'home') {
          this.slideDirection = 'slide-down'
        } else {
          this.slideDirection = 'slide-up'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/app/app";
</style>
