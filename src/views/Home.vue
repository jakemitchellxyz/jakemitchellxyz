<template>
  <div class="page-padding animated">
    <div class="page home">
      <!-- Cool WebGL Scene -->
      <Three />

      <!-- Title Section -->
      <div id="title" class="text-center pt-5">
        <h1 class="display-4">Jake Mitchell</h1>
        <div class="d-flex align-items-center justify-content-center">
          <div class="border-line"></div>
          <span class="lead muted">&nbsp;&nbsp;://&nbsp;&nbsp;</span>
          <div class="border-line"></div>
        </div>
        <h2 class="lead muted mt-2">Developer&nbsp;&nbsp;//&nbsp;&nbsp;Hacker&nbsp;&nbsp;//&nbsp;&nbsp;Artist</h2>
      </div>

      <!-- Navigation -->
      <Navigation />
    </div>
  </div>
</template>

<script>
import Three from '@/components/Three.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Home',
  components: {
    Three,
    Navigation
  }
}
</script>

<style lang="scss">
  #title {
    position: absolute;
    z-index: 10;
    width: 100%;
    color: white;

    .border-line {
      border-top: 1px solid rgba(255,255,255,0.3);
      width: 8rem;
    }

    .muted {
      color: rgba(255,255,255,0.8);
    }
  }
</style>
