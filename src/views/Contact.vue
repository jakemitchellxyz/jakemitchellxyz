<template>
  <div class="page">
    <div class="container">
      <h1>Welcome to the Contact page.</h1>

      <HomeButton />
    </div>
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'

export default {
  name: 'Contact',
  components: {
    HomeButton
  }
}
</script>
