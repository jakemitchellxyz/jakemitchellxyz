<template>
  <div class="nav-wrapper">
    <router-link :to="{ name: 'home' }" class="btn btn-outline-dark rounded-circle" data-toggle="tooltip" title="Back to Home"><span class="ion-android-arrow-dropdown-circle"></span></router-link>
  </div>
</template>

<script>
  import $ from 'jquery'
  import 'bootstrap'

  export default {
    name: 'HomeButton',
    mounted() {
      $('[data-toggle="tooltip"]').tooltip()
    },
    beforeDestroy() {
      $('[data-toggle="tooltip"]').tooltip('dispose')
      $('[role="tooltip"]').remove()
    }
  }
</script>
