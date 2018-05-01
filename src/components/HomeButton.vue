<template>
  <div class="nav-wrapper">
    <router-link :to="{ name: 'home' }" class="btn btn-outline-dark rounded-circle" data-toggle="tooltip" title="Back to Home"><span class="ion-android-arrow-dropdown-circle"></span></router-link>
  </div>
</template>

<script>
  export default {
    name: 'HomeButton',
  }
</script>
