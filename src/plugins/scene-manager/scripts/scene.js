'use strict'

// import three.js modules
import * as three from 'three'

// define scene class
class scene {
  // build the scene
  constructor (document, window, id, Effect) {
    // save window & container references for later
    this.window = window
    this.document = document
    this.container = this.document.getElementById(id)
    this.stage = {}
    this.plugins = {
      render: undefined,
      onMouseMove: undefined
    }

    // init scene
    this.stage.scene = new three.Scene()

    // init camera
    this.stage.camera = new three.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000)

    // create renderer
    this.renderer = new three.WebGLRenderer()
    this.renderer.setPixelRatio(this.window.devicePixelRatio)
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)

    // setup raycaster
    this.stage.raycaster = new three.Raycaster()

    // load the effect and build it
    this.effect = new Effect(this.stage, (plugin, method) => this.register(plugin, this.plugins, method))

    this.animationId = 0
  }

  register (plugin, plugins, method) {
    if (plugins[plugin] === undefined) {
      plugins[plugin] = method
    }
  }

  // method called each frame; animation loop
  animate (animationId, plugins, stage, renderer, animate) {
    if (plugins.render !== undefined) plugins.render(stage)
    renderer.render(stage.scene, stage.camera)
    animationId = this.window.requestAnimationFrame(() => animate(animationId, plugins, stage, renderer, animate))
  }

  // append to document and setup responsive behaviour, then start the animation
  play (id) {
    // update container
    this.container = this.document.getElementById(id)

    // add listeners
    this.window.addEventListener('mousemove', (e) => this.onMouseMove(e, this.stage, this.effect, this.window))
    this.window.addEventListener('touchmove', (e) => this.onMouseMove(e, this.stage, this.effect, this.window))
    this.window.addEventListener('resize', (e) => this.onWindowResize(this.stage, this.container, this.renderer))

    // append three.js to our document
    this.container.appendChild(this.renderer.domElement)

    // start animation sequence
    this.animate(this.animationId, this.plugins, this.stage, this.renderer, this.animate)
  }

  // remove listeners and domElement from document (when user leaves page)
  pause () {
    // remove listeners
    this.window.removeEventListener('mousemove', (e) => this.onMouseMove(e, this.stage, this.effect, this.plugins, this.window))
    this.window.removeEventListener('touchmove', (e) => this.onMouseMove(e, this.stage, this.effect, this.plugins, this.window))
    this.window.removeEventListener('resize', (e) => this.onWindowResize(this.stage, this.container, this.renderer))

    // stop animation sequence
    this.window.cancelAnimationFrame(this.animationId)

    // remove canvas from document
    this.container.innerHTML = ''
  }

  // helper to resize view when window is resized
  onWindowResize (stage, container, renderer) {
    stage.camera.aspect = container.offsetWidth / container.offsetHeight
    stage.camera.updateProjectionMatrix()
    renderer.setSize(container.offsetWidth, container.offsetHeight)
  }

  // handle mouse movement for interaction
  onMouseMove (event, stage, plugins, window) {
    // create the mouse object
    let mouse = new three.Vector2()

    // capture mouse/touch location
    let x, y
    if (event.changedTouches) {
      x = event.changedTouches[0].pageX
      y = event.changedTouches[0].pageY
    } else {
      x = event.clientX
      y = event.clientY
    }

    // save location to mouse object
    mouse.x = (x / window.innerWidth) * 2 - 1
    mouse.y = -(y / window.innerHeight) * 2 + 1

    // update raycaster with the camera
    stage.raycaster.setFromCamera(mouse, stage.camera)

    // let the effect handle the raycaster
    if (plugins.onMouseMove !== undefined) plugins.onMouseMove(stage.raycaster)
  }
}

// export module
export default scene
