<template>
  <div class="page-padding animated">
    <div class="page resume">
      <div class="container">
        <div id="resume">
          <pdf src="/resumes/February_2018_techy.pdf" />
        </div>
      </div>

      <home-button />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import home_button from '@/views/components/home-button.vue'

export default {
  name: 'resume',
  components: {
    'pdf': pdf,
    'home-button': home_button
  }
}
</script>
