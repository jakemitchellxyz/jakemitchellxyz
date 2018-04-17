<template>
  <div class="page">
    <div class="container">
      <h1>Welcome to my Blog.</h1>

      <HomeButton />
    </div>
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'

export default {
  name: 'Blog',
  components: {
    HomeButton
  }
}
</script>
