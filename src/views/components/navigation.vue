<template>
  <div class="nav-wrapper">
    <nav id="nav" class="dropup" @mouseleave="hideDropup()">
      <!-- Github link -->
      <div class="nav-btn dark rounded-circle p-2 umr-2">
        <a href="https://github.com/jakemitchellxyz" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('github')" @mouseleave="hideTooltip('github')">
          <span class="ion-social-github"></span>
        </a>
        <!-- hover tooltip -->
        <transition name="tooltip-github" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.github" class="tooltip animated-fast">
            Github
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- instagram link -->
      <div class="nav-btn dark rounded-circle p-2 pr-3 umr-3">
        <a href="https://www.instagram.com/jakemitchell.xyz/" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('instagram')" @mouseleave="hideTooltip('instagram')">
          <span class="ion-social-instagram-outline"></span>
        </a>
        <!-- hover tooltip -->
        <transition name="tooltip-instagram" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.instagram" class="tooltip animated-fast">
            Instagram
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- LinkedIn link -->
      <div class="nav-btn dark rounded-circle p-2 pr-3 umr-3">
        <a href="https://www.linkedin.com/in/jakemitchellxyz/" target="_blank" rel="noopener"
           class="btn btn-outline-light rounded-circle" @mouseenter="showTooltip('linkedin')" @mouseleave="hideTooltip('linkedin')">
          <span class="ion-social-linkedin"></span>
        </a>
        <!-- hover tooltip -->
        <transition name="tooltip-linkedin" enter-active-class="fadeGrowUp" leave-active-class="fadeShrinkDown">
          <div v-show="tooltips.linkedin" class="tooltip animated-fast">
            LinkedIn
            <div class="arrow"></div>
          </div>
        </transition>
      </div>

      <!-- more popup -->
      <div class="btn-bg rounded-circle p-2 pl-3 d-inline-block">
        <button type="button" class="btn btn-outline-light rounded-circle" @mouseenter="showDropup()" @click="showDropup()">
          <span class="ion-android-more-vertical"></span>
        </button>

        <!-- page links -->
        <transition name="dropup" enter-active-class="fadeGrowUpLeft" leave-active-class="fadeShrinkDownRight">
          <div v-show="showingDropup" class="dropup-menu animated-fast">
            <!-- <router-link :to="{ name: 'about' }" class="dropup-item">About</router-link> -->
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
    name: 'navigation',
    data() {
      return {
        showingDropup: false,
        tooltips: {
          github: false,
          instagram: false,
          linkedin: false
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
