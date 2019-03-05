<template>
  <div class="nav-wrapper resume">
    <div class="nav-btn">
      <!-- Back to Home Link -->
      <router-link :to="{ name: 'home' }" class="btn btn-outline-dark rounded-circle" @mouseenter.native="show_tooltip()" @mouseleave.native="hide_tooltip()">
        <span class="ion-md-cube"></span>
      </router-link>

      <!-- Hover Tooltip -->
      <transition name="tooltip" enter-active-class="fade-grow-up" leave-active-class="fade-shrink-down">
        <div v-show="showing_tooltip" class="tooltip animated fast">
          home
          <div class="arrow"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-button',
    data() {
      return {
        showing_tooltip: false
      }
    },
    methods: {
      // Change visibility of the button tooltip
      show_tooltip() { this.showing_tooltip = true },
      hide_tooltip() { this.showing_tooltip = false }
    }
  }
</script>
