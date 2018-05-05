<template>
  <div id="three"></div>
</template>

<script>
export default {
  name: 'Three',
  mounted() { // when home page rendered
    if (!this.$three.created) // if scene hasn't been built, build it
      this.$three.build(window, document, 'three')
    this.$three.append('three') // append the existing scene to the page
  },
  beforeDestroy() { // when home page leaves
    setTimeout(() => { // after 2 seconds (animation time for page exit)
      if (this.$three.created) // if the scene has been rendered, pause it
        this.$three.pause()
    }, 2000)
  }
}
</script>

<style lang="scss">
  #three {
    z-index: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
