<template>
  <div class="page-padding animated">
    <div class="page">
      <div class="container">
        <h1>Welcome to the contact page.</h1>
      </div>

      <home-button />
    </div>
  </div>
</template>

<script>
import home_button from '@/views/components/home-button.vue'

export default {
  name: 'contact',
  components: {
    'home-button': home_button
  }
}
</script>
