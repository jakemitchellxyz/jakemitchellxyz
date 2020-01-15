<template>
  <div class="page-padding animated">
    <div class="page resume">
      <div class="container">
        <div id="resume">
          <pdf src="/resumes/January_2020.pdf" />
        </div>
      </div>

      <home-button />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import homeButton from '@/views/components/home-button.vue'

export default {
  name: 'resume',
  components: {
    'pdf': pdf,
    'home-button': homeButton
  }
}
</script>
