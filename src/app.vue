<template>
  <div id="app">
    <!-- title section -->
    <header id="title">
      <h1 class="display-4">jake<br><span class="last">mitchell</span></h1>
    </header>

    <!-- page to render -->
    <transition :name="slide_direction">
      <router-view />
    </transition>

    <!-- navigation and social links -->
    <navigation />
    <social />
  </div>
</template>

<script>
  import navigation from '@/views/components/navigation.vue'
  import social from '@/views/components/social.vue'

  export default {
    name: 'app',
    components: {
      navigation,
      social
    },
    data() {
      return {
        slide_direction: 'slide-up',
        slide_directions: [
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
        this.slide_direction = this.slide_directions[Math.floor(Math.random() * this.slide_directions.length)]
      }
    }
  }
</script>

<style lang="scss">
  @import "./design/scss/style";
</style>
