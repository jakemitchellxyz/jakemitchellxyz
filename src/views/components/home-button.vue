<template>
  <div class="nav-wrapper">
    <div class="nav-btn p-2">
      <!-- Back to Home Link -->
      <router-link :to="{ name: 'home' }" class="btn btn-outline-dark rounded-circle" @mouseenter.native="showTooltip()" @mouseleave.native="hideTooltip()">
        <span class="ion-cube"></span>
      </router-link>

      <!-- Hover Tooltip -->
      <transition name="tooltip" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
        <div v-show="showingTooltip" class="tooltip dark animated-fast">
          Home
          <div class="arrow"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeButton',
    data() {
      return {
        showingTooltip: false
      }
    },
    methods: {
      // Change visibility of the button tooltip
      showTooltip() { this.showingTooltip = true },
      hideTooltip() { this.showingTooltip = false }
    }
  }
</script>
