<template>
  <div id="app">
    <transition :name="slideDirection">
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        slideDirection: 'slide-up',
        slideDirections: [
          'slide-up',
          'slide-down',
          'slide-left',
          'slide-right'
        ]
      }
    },
    watch: {
      // pick random slide direction for page changes
      '$route' (to, from) {
        this.slideDirection = this.slideDirections[Math.floor(Math.random() * this.slideDirections.length)]
      }
    }
  }
</script>

<style lang="scss">
  @import "./design/scss/style";
</style>