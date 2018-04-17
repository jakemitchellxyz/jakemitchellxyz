<template>
  <nav id="nav">
    <div class="btn-bg rounded-circle p-2 umr-2 d-inline-block">
      <a href="https://github.com/jakemitchellxyz" target="_blank" data-toggle="tooltip" title="Github"
         class="btn btn-outline-light rounded-circle" rel="noopener"><span class="ion-social-github"></span></a>
    </div>

    <div class="btn-bg rounded-circle p-2 pr-3 umr-3 d-inline-block">
      <a href="https://www.instagram.com/jakemitchell.xyz/" target="_blank" data-toggle="tooltip" title="Instagram"
         class="btn btn-outline-light rounded-circle" rel="noopener"><span class="ion-social-instagram-outline"></span></a>
    </div>

    <div class="btn-bg rounded-circle p-2 pr-3 umr-3 d-inline-block">
      <router-link :to="{ name: 'blog' }" class="btn btn-outline-light rounded-circle" data-toggle="tooltip" title="Blog"><span class="ion-android-list"></span></router-link>
    </div>

    <div class="btn-bg rounded-circle p-2 pl-3 d-inline-block dropup">
      <button type="button" class="btn btn-outline-light rounded-circle" id="menuDropup" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="ion-android-more-vertical"></span></button>
      <div class="dropdown-menu dropdown-menu-right mb-3 text-right" aria-labelledby="menuDropup">
        <router-link :to="{ name: 'about' }" class="dropdown-item">About</router-link>
        <router-link :to="{ name: 'resume' }" class="dropdown-item">Resume</router-link>
        <router-link :to="{ name: 'contact' }" class="dropdown-item">Contact</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  import $ from 'jquery'
  import 'bootstrap'

  export default {
    name: 'Navigation',
    mounted() {
      $('[data-toggle="tooltip"]').tooltip()
    },
    beforeDestroy() {
      $('[data-toggle="tooltip"]').tooltip('dispose')
      $('[role="tooltip"]').remove()
    }
  }
</script>
