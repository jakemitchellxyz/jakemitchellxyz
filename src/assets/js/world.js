import * as THREE from 'three'
import { noise } from '@/assets/js/perlin'

const world = (function () {
  const self = {} // export container

  // Dimensions of the grid
  const width = 256
  const height = 64

  // Global variables
  let container,
      scene,
      camera,
      renderer,
      geometry,
      clock

  // Helper for grabbing element to append to DOM
  self.getDomElement = function () {
    return renderer.domElement
  }

  // Build the Three.js Instance
  self.build = function (window, document, id) {
    // Init Perlin noise
    noise.seed(Math.random())
    clock = new THREE.Clock()

    // save container reference for later
    container = document.getElementById(id)

    // Init Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x33333b)
    scene.fog = new THREE.Fog(0x33333b, 1, height)

    // Init camera
    camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000)
    camera.position.z = 30
    camera.position.y = 15
    camera.rotation.x = -Math.PI / 12

    // Create renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.offsetWidth, container.offsetHeight)

    self.populate()
    self.append(window)
  }

  // Draw the objects into our world
  self.populate = function () {
    // Create Plane
    geometry = new THREE.PlaneGeometry(width*1.25, height*1.25, width, height)
    geometry.rotateX(Math.PI / 2)

    // Create Points Material
    let texture = new THREE.TextureLoader().load('/textures/disc.png')
    let material = new THREE.PointsMaterial({ size: 0.5, map: texture, sizeAttenuation: true, alphaTest: 0.5, transparent: true })
    material.color.setHSL(1.0, 1.0, 1.0)

    // Add Points Mesh to Scene
    let points = new THREE.Points(geometry, material)
    scene.add(points)
  }

  // Append to document and setup responsive behaviour
  self.append = function (window) {
    container.appendChild(self.getDomElement())
    window.addEventListener('resize', self.onWindowResize)
  }

  self.height = function (x, y, z, persistence, octaves) {
    let total = 0.0
    let normalize = 0.0
    let frequency = 1.0/30.0
    let amplitude = 30.0

    // Build and layer each octave
    for (let i = 0; i < octaves; i++) {
        total += noise.perlin3(x * frequency, y * frequency, z * frequency) * amplitude
        normalize += amplitude

        frequency *= 3.0
        amplitude *= persistence
    }

    return total / normalize
  }

  // Logic applied every frame
  self.render = function () {
    let time = clock.getElapsedTime()

    // Iterate over each vertex getting the x and y offsets
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
          geometry.vertices[x + (y * (width + 1))].y = self.height(x, y, time, 0.5, 2) * 15.0
      }
    }

    geometry.verticesNeedUpdate = true
  }

  // Method called each frame
  self.animate = function () {
    requestAnimationFrame(self.animate)
    self.render()
    renderer.render(scene, camera)
  }

  // Helper to resize view when window is resized
  self.onWindowResize = function () {
  	camera.aspect = container.offsetWidth / container.offsetHeight
    camera.updateProjectionMatrix()
  	renderer.setSize(container.offsetWidth, container.offsetHeight)
  }

  return self
})()

export default world
