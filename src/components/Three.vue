<template>
  <div id="three"></div>
</template>

<script>
import World from '@/assets/js/world'

export default {
  name: 'Three',
  mounted() {
    // Build world and append to page
    World.build(window, document, 'three')

    // Call first animation frame
    World.animate()
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
