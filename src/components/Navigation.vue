<template>
  <div class="nav-wrapper">
    <nav id="nav" class="dropup" @mouseleave="hideDropup()">
      <!-- Github Link -->
      <div class="nav-btn dark rounded-circle p-2 umr-2">
        <a href="https://github.com/jakemitchellxyz" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('github')" @mouseleave="hideTooltip('github')">
          <span class="ion-social-github"></span>
        </a>
        <!-- Hover Tooltip -->
        <transition name="tooltip-github" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.github" class="tooltip animated-fast">
            Github
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- Instagram Link -->
      <div class="nav-btn dark rounded-circle p-2 pr-3 umr-3">
        <a href="https://www.instagram.com/jakemitchell.xyz/" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('instagram')" @mouseleave="hideTooltip('instagram')">
          <span class="ion-social-instagram-outline"></span>
        </a>
        <!-- Hover Tooltip -->
        <transition name="tooltip-instagram" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.instagram" class="tooltip animated-fast">
            Instagram
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- Medium Link -->
      <div class="nav-btn dark rounded-circle p-2 pr-3 umr-3">
        <a href="https://medium.com/@jakemitchellxyz" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('medium')" @mouseleave="hideTooltip('medium')">
          <span class="ion-android-list"></span>
        </a>
        <!-- Hover Tooltip -->
        <transition name="tooltip-medium" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.medium" class="tooltip animated-fast">
            Medium
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- More Popup -->
      <div class="btn-bg rounded-circle p-2 pl-3 d-inline-block">
        <button type="button" class="btn btn-outline-light rounded-circle" @mouseenter="showDropup()" @click="showDropup()">
          <span class="ion-android-more-vertical"></span>
        </button>

        <!-- Page Links -->
        <transition name="dropup" enter-active-class="fadeGrowUpLeft" leave-active-class="fadeShrinkDownRight">
          <div v-show="showingDropup" class="dropup-menu animated-fast">
            <router-link :to="{ name: 'about' }" class="dropup-item">About</router-link>
            <router-link :to="{ name: 'resume' }" class="dropup-item">Resume</router-link>
            <router-link :to="{ name: 'contact' }" class="dropup-item">Contact</router-link>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {
        showingDropup: false,
        tooltips: {
          github: false,
          instagram: false,
          medium: false
        }
      }
    },
    methods: {
      // Change visibility of a tooltip
      showTooltip(tt) { this.tooltips[tt] = true; this.hideDropup() },
      hideTooltip(tt) { this.tooltips[tt] = false },
      // Change the visibility of the dropup
      showDropup() { this.showingDropup = true },
      hideDropup() { this.showingDropup = false }
    }
  }
</script>
