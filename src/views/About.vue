<template>
  <div class="page-padding animated">
    <div class="page">
      <div class="container">
        <h1>Welcome to the About page.</h1>
      </div>

      <home-button />
    </div>
  </div>
</template>

<script>
import homeButton from '@/views/components/home-button.vue'

export default {
  name: 'about',
  components: {
    'home-button': homeButton
  }
}
</script>