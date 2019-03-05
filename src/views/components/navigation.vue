<template>
  <nav id="nav">
    <router-link v-for="link in links" :key="link"
        :to="{ name: link }"
        class="link"
        :style="{ color: colors[link] }"
        @mouseover.native="paint(link)"
        @mouseleave.native="reset(link)">
      {{ link }}
    </router-link>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        default_color: '#33333b',
        links: [ 'about', 'resume', 'contact' ],
        colors: {}
      }
    },
    mounted() {
      // default the colors back to the original
      for (let link of this.links) {
        this.colors[link] = this.default_color
      }
    },
    methods: {
      paint(name) { console.log('paint: ' + name); this.colors[name] = this.random_color() },
      reset(name) { console.log('reset: ' + name); this.colors[name] = this.default_color },
      // random hex color generator from https://www.paulirish.com/2009/random-hex-color-code-snippets/
      random_color() { return '#' + Math.floor(Math.random() * 16777215).toString(16) }
    }
  }
</script>

<style lang="scss">
  @import '../../design/scss/variables';

  #nav {
    position: fixed;
    z-index: 15;
    left: 3rem;
    bottom: 5rem;
    margin-left: 2rem;

    .link {
      color: $dark;
      font-size: 1.3rem;
      text-decoration: none;
      margin-right: 1rem;
    }
  }
</style>
