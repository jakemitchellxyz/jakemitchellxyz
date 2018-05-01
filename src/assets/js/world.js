import * as THREE from 'three'
import { noise } from '@/assets/js/perlin'

const world = (function () {
  const self = {} // export container

  // Dimensions of the grid
  const width = 256
  const height = 64
  const threshold = 3

  // Global variables
  let window,
      container,
      scene,
      camera,
      renderer,
      raycaster,
      mouse,
      intersectedPoints,
      brushColor,
      points,
      clock

  // Helper for grabbing element to append to DOM
  self.getDomElement = function () {
    return renderer.domElement
  }

  // Build the Three.js Instance
  self.build = function (win, document, id) {
    // Init Perlin noise
    noise.seed(Math.random())
    clock = new THREE.Clock()

    // save container reference for later
    window = win
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

    // Setup Raycaster
    mouse = new THREE.Vector2()
    raycaster = new THREE.Raycaster()
		raycaster.params.Points.threshold = threshold

    self.populate()
    self.append()
  }

  // Draw the objects into our world
  self.populate = function () {
    // Create Plane
    const geometry = new THREE.PlaneGeometry(width*1.25, height*1.25, width, height)
    geometry.rotateX(Math.PI / 2)

    // Create Points Material
    const point = new THREE.TextureLoader().load('/textures/disc.png')
    const material = new THREE.PointsMaterial({ size: 0.5, map: point, sizeAttenuation: true, alphaTest: 0.5, transparent: true, vertexColors: THREE.VertexColors })

    // Create vertex independent colors
    let i
    for (i = 0; i < geometry.vertices.length; i++) {
      geometry.colors[i] = new THREE.Color(0xffffff)
    }

    // Create brush material for painting
		brushColor = new THREE.Color(0xffffff)

    // Add Points Mesh to Scene
    points = new THREE.Points(geometry, material)
    scene.add(points)
  }

  self.height = function (x, y, z, persistence, octaves) {
    let total = 0.0
    let normalize = 0.0
    let frequency = 1.0/30.0
    let amplitude = 30.0

    // Build and layer each octave
    let i
    for (i = 0; i < octaves; i++) {
        total += noise.perlin3(x * frequency, y * frequency, z * frequency) * amplitude
        normalize += amplitude

        frequency *= 3.0
        amplitude *= persistence
    }

    return total / normalize
  }

  // Logic applied every frame
  self.render = function () {
    const time = clock.getElapsedTime()

    // Oscillate brush color for fun rainbow effect
    const r = (Math.sin(time * 0.6 + 0) * 127 + 128) / 255.0
    const g = (Math.sin(time * 0.6 + 2) * 127 + 128) / 255.0
    const b = (Math.sin(time * 0.6 + 4) * 127 + 128) / 255.0
    brushColor.setRGB(r, g, b)

    // Iterate over each vertex getting the x and y offsets
    let x, y, i
    for (y = 0; y <= height; y++) {
      for (x = 0; x <= width; x++) {
        i = x + (y * (width + 1))
        points.geometry.vertices[i].y = self.height(x, y, time, 0.5, 2) * 15.0

        // If this vertice's color is different, fade it to white
        if (points.geometry.colors[i].r < 1.0 || points.geometry.colors[i].g < 1.0 || points.geometry.colors[i].b < 1.0) {
          points.geometry.colors[i].r = Math.min(1.0, points.geometry.colors[i].r + 0.01)
          points.geometry.colors[i].g = Math.min(1.0, points.geometry.colors[i].g + 0.01)
          points.geometry.colors[i].b = Math.min(1.0, points.geometry.colors[i].b + 0.01)
        }
      }
    }

    // Update Geometry Values
    points.geometry.verticesNeedUpdate = true
    points.geometry.colorsNeedUpdate = true
    points.geometry.computeBoundingBox()
  }

  // Method called each frame
  self.animate = function () {
    requestAnimationFrame(self.animate)
    self.render()
    renderer.render(scene, camera)
  }

  // Append to document and setup responsive behaviour
  self.append = function () {
    // Add listeners
    window.addEventListener('mousemove', self.onMouseMove)
    window.addEventListener('touchmove', self.onMouseMove)
    window.addEventListener('resize', self.onWindowResize)

    // Append THREE.js to our document
    container.appendChild(self.getDomElement())
  }

  // Helper to resize view when window is resized
  self.onWindowResize = function () {
  	camera.aspect = container.offsetWidth / container.offsetHeight
    camera.updateProjectionMatrix()
  	renderer.setSize(container.offsetWidth, container.offsetHeight)
  }

  // Handle mouse movement for painting color
  self.onMouseMove = function (event) {
    event.preventDefault()

    // Capture mouse/touch location
    let x, y
		if (event.changedTouches) {
			x = event.changedTouches[0].pageX
			y = event.changedTouches[0].pageY
		} else {
			x = event.clientX
			y = event.clientY
		}

    // Save location to mouse object
    mouse.x = (x / window.innerWidth) * 2 - 1
    mouse.y = -(y / window.innerHeight) * 2 + 1

    // Update Raycaster
    raycaster.setFromCamera(mouse, camera)

    // Handle intersections
		intersectedPoints = raycaster.intersectObjects([ points ])
    if (intersectedPoints.length > 0) self.paint()
  }

  // Draw ~additive~ color onto the points mesh
  self.paint = function () {
    let point,
        intensity,
        nr, ng, nb,
        r, g, b, i

    // Iterate over collided vertices
    for (i = 0; i < intersectedPoints.length; i++) {
      point = intersectedPoints[i].index

      // Calculate an intensity based on distance for a fade area effect
      intensity = Math.max(0, intersectedPoints[i].distanceToRay / threshold)
      r = Math.min(brushColor.r + intensity, 1.0)
      g = Math.min(brushColor.g + intensity, 1.0)
      b = Math.min(brushColor.b + intensity, 1.0)

      // Calculate new colors to set (to avoid whiting out colors we just set)
      nr = Math.min(r, points.geometry.colors[point].r)
      ng = Math.min(g, points.geometry.colors[point].g)
      nb = Math.min(b, points.geometry.colors[point].b)

      // Update point color
  		points.geometry.colors[point].setRGB(nr, ng, nb)
    }
  }

  return self
})()

// Export Module
export default world
