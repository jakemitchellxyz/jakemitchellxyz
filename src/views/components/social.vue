<template>
  <nav id="social">
    <!-- social media link -->
    <div class="social-btn" v-for="(link, platform) in social_links" :key="platform">
      <a :href="link.url" target="_blank" rel="noopener"
         class="btn btn-outline-dark rounded-circle" @mouseenter="show_tooltip(platform)" @mouseleave="hide_tooltip(platform)">
        <span :class="[ link.icon ]"></span>
      </a>
      <!-- hover tooltip -->
      <transition :name="'tooltip-' + platform" enter-active-class="fade-grow-up" leave-active-class="fade-shrink-down">
        <div v-show="tooltips[platform]" class="tooltip animated fast">
          {{ platform }}
          <div class="arrow"></div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'social',
    data() {
      return {
        social_links: {
          github: {
            url: 'https://github.com/jakemitchellxyz',
            icon: 'ion-logo-github'
          },
          instagram: {
            url: 'https://www.instagram.com/jakemitchell.xyz/',
            icon: 'ion-logo-instagram'
          },
          medium: {
            url: 'https://medium.com/@jakemitchellxyz',
            icon: 'ion-md-paper'
          }
        },
        tooltips: {
          github: false,
          instagram: false,
          medium: false
        }
      }
    },
    methods: {
      // change visibility of a tooltip
      show_tooltip(tt) { this.tooltips[tt] = true },
      hide_tooltip(tt) { this.tooltips[tt] = false },
    }
  }
</script>

<style lang="scss">
  #social {
    z-index: 20;
    position: fixed;
    right: 3rem;
    bottom: 1.5rem;
    margin-right: 2rem;

    .social-btn {
      display: inline-flex !important;
      justify-content: center;
      position: relative;
      padding: 0.5rem 0.25rem;
    }
  }
</style>
