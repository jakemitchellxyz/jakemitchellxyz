<template>
  <div class="page-padding animated">
    <div class="page resume">
      <div class="container">
        <div id="resume">
          <pdf src="/resumes/February_2018_techy.pdf" />
        </div>
      </div>

      <HomeButton />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import HomeButton from '@/components/HomeButton.vue'

export default {
  name: 'Resume',
  components: {
    pdf,
    HomeButton
  }
}
</script>

<style lang="scss">
  #resume {
    canvas {
      width: auto !important;
      min-width: 100%;
    }
  }
</style>
