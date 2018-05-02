<template>
  <div id="three"></div>
</template>

<script>
export default {
  name: 'Three',
  mounted() {
    if (!this.$three.created)
      this.$three.build(window, document, 'three')
    this.$three.append('three')
  },
  beforeDestroy() {
    setTimeout(() => {
      if (this.$three.created)
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
  }

  canvas {
    width: 100%;
    height: 100%;
  }
</style>
