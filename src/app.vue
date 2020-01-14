<template>
  <div id="app">
    <transition :name="slideDirection">
      <router-view />
    </transition>
  </div>
</template>

<script>
  console.log('%c I built this site using Vue <https://vuejs.org/> and Three.js <https://threejs.org/> if that helps.', 'color: darkorange')
  console.log('%c Also, fact that you\'re reading this makes me curious about you. Reach out to me, please.', 'color: darkorange')

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
