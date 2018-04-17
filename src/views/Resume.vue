<template>
  <div class="page">
    <div class="container">
      <h1>Welcome to my Resume.</h1>

      <HomeButton />
    </div>
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'

export default {
  name: 'Resume',
  components: {
    HomeButton
  }
}
</script>
