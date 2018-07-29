'use strict'

// import scene object and effects
import scene from '@/effects/scene'
import pointwaves from '@/effects/vendor/pointwaves/effect'

const effects = {
  pointwaves
}

// acts as a scene manager
class manager {
  constructor() {
    this.scenes = {}
  }

  // start an effect, dynamically create a scene as necessary
  start(document, window, id, effect) {
    // if this effect doesn't have a scene, build one for it
    if (this.scenes[effect] === undefined) {
      this.scenes[effect] = {
        running: true,
        scene: new scene(document, window, id, effects[effect])
      }
      this.scenes[effect].scene.play(id)
    } else if (!this.scenes[effect].running) { // if scene is paused, play it
      this.scenes[effect].scene.play(id)
      this.scenes[effect].running = true
    }
  }

  // stop an effect, detaching the scene, but saving it in case this effect is started again
  stop(effect) {
    // if scene exists and is running, pause it
    if (this.scenes[effect] === undefined) return
    else if (this.scenes[effect].running) {
      this.scenes[effect].scene.pause()
      this.scenes[effect].running = false
    }
    console.log('ended with: %o', this.scenes)
  }
}

export default manager

// if we start an effect that doesn't have a scene yet, see if there is a paused scene that exists. if so, delete it and create the new scene, attach it to the id and then start it
// if we start an effect that already has a scene, just attach the existing scene to the id and start the effect
// if we stop an effect that hasn't been started, do nothing
// if we stop an effect that is running, pause its scene

// if we create a new scene with an effect that hasn't been created, create both
// if we create a new scene with an effect that has been done before, if it is paused, just attach the existing scene for this effect, else create a new one and delete the old one when it pauses
// if we delete a scene, just pause it and unrender it
