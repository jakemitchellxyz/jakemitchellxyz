<template>
  <div id="scene"></div>
</template>

<script>
export default {
  name: 'scene',
  props: {
    effect: {
      type: String,
      required: true
    }
  },
  mounted() { // when page rendered
    this.$sceneManager.start(document, window, 'scene', this.effect)
  },
  beforeDestroy() { // when home page leaves
    setTimeout(() => { // after 2 seconds (animation time for page exit)
      this.$sceneManager.stop(this.effect)
    }, 2000)
  }
}
</script>

<style lang="scss">
  #scene {
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
