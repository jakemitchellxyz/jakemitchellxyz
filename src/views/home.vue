<template>
  <div class="page-padding animated">
    <div class="page home">
      <!-- cool WebGL scene -->
      <scene effect="pointwaves" />

      <!-- title section -->
      <div class="title text-center pb-3 pr-3 pl-3">
        <div class="top">
          <img class="face" src="face.png" alt="A drawing of my face">
          <div class="quote">
            <p style="font-size: 1.1rem;margin-bottom:0">Welcome, friend!</p>
            <p style="margin-top:10px">
              I am currently a Fullstack Engineer for
              <a href="https://www.linkedin.com/company/promazo/" target="_blank">ProMazo</a>
              specializing in
              <a href="https://reactjs.org/docs/getting-started.html" target="_blank">React</a>,
              <a href="https://redux.js.org/introduction/getting-started" target="_blank">Redux</a>,
              <a href="https://www.graphql.com/guides/" target="_blank">GraphQL</a>,
              <a href="https://aws.amazon.com/getting-started/" target="_blank">AWS</a>, and
              <a href="https://sass-lang.com/guide" target="_blank">Sass</a>.
            </p>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div class="border-line"></div>
          <span class="lead muted">&nbsp;&nbsp;://&nbsp;&nbsp;</span>
          <div class="border-line"></div>
        </div>
        <h1 class="display-4">Jake Mitchell</h1>
      </div>

      <!-- navigation -->
      <navigation />
    </div>
  </div>
</template>

<script>
import navigation from '@/views/components/navigation.vue'

export default {
  name: 'home',
  components: {
    'navigation': navigation
  }
}
</script>
