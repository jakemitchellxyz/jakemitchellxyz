<template>
  <div id="app">
    <div class="page-padding">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="scss">
  @import "./assets/scss/app/app";
</style>
