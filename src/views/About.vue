<template>
  <div class="page-padding animated">
    <div class="page">
      <div class="container">
        <h1>Welcome to the About page.</h1>

        <HomeButton />
      </div>
    </div>
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'

export default {
  name: 'About',
  components: {
    HomeButton
  }
}
</script>
