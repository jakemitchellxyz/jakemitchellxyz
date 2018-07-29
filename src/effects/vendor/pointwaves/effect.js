import * as three from 'three'
import { noise } from './lib/perlin'

/**
 * Effect: Point Waves
 * By: Jake Mitchell
 *
 * This effect is a simple perlin noise offset on points that changes over time,
 * giving a wave-like motion of the points. Moving the cursor over any points
 * will paint those points a color.
 */

 // dimensions of the grid of points
 const WIDTH = 256
 const HEIGHT = 64
 const THRESHOLD = 3

// create the effect
class pointwaves {
  // build the instance of the effect
  constructor(stage, register) {
    // init Perlin noise
    noise.seed(Math.random())
    const clock = new three.Clock()

    // init scene
    stage.scene.background = new three.Color(0x33333b)
    stage.scene.fog = new three.Fog(0x33333b, 1, HEIGHT)

    // init camera
    stage.camera.position.z = 30
    stage.camera.position.y = 15
    stage.camera.rotation.x = -Math.PI / 12

    // create plane to get points
    const plane = new three.PlaneGeometry(WIDTH * 1.25, HEIGHT * 1.25, WIDTH, HEIGHT)
    plane.rotateX(Math.PI / 2)

    // create points material
    const texture = new three.TextureLoader().load('/textures/disc.png')
    const material = new three.PointsMaterial({ size: 0.5, map: texture, sizeAttenuation: true, alphaTest: 0.5, transparent: true, vertexColors: three.VertexColors })

    // create vertex independent colors
    let i
    for (i = 0; i < plane.vertices.length; i++) {
      plane.colors[i] = new three.Color(0xffffff)
    }

    // create brush material and width (threshold) for painting
    this.brushColor = new three.Color(0xffffff)
    stage.raycaster.params.Points.threshold = THRESHOLD

    // add points mesh to scene
    this.points = new three.Points(plane, material)
    stage.scene.add(this.points)

    // init lifecycle hooks
    register('render', (stage) => this.render(stage, clock, noise))
    register('onMouseMove', (mouse) => this.onMouseMove(mouse))
  }

  // logic applied every frame
  render(stage, clock, noise) {
    const time = clock.getElapsedTime()

    // oscillate brush color for fun rainbow effect
    const r = (Math.sin(time * 0.6 + 0) * 127 + 128) / 255.0
    const g = (Math.sin(time * 0.6 + 2) * 127 + 128) / 255.0
    const b = (Math.sin(time * 0.6 + 4) * 127 + 128) / 255.0
    this.brushColor.setRGB(r, g, b)

    // iterate over each vertex getting the x and y offsets
    let x, y, i
    for (y = 0; y <= HEIGHT; y++) {
      for (x = 0; x <= WIDTH; x++) {
        i = x + (y * (WIDTH + 1))
        this.points.geometry.vertices[i].y = this.height(x, y, time, 0.5, 2, noise) * 15.0

        // if this vertice's color is different, fade it to white
        if (this.points.geometry.colors[i].r < 1.0
         || this.points.geometry.colors[i].g < 1.0
         || this.points.geometry.colors[i].b < 1.0) {
          this.points.geometry.colors[i].r = Math.min(1.0, this.points.geometry.colors[i].r + 0.01)
          this.points.geometry.colors[i].g = Math.min(1.0, this.points.geometry.colors[i].g + 0.01)
          this.points.geometry.colors[i].b = Math.min(1.0, this.points.geometry.colors[i].b + 0.01)
        }
      }
    }

    // update geometry values
    this.points.geometry.verticesNeedUpdate = true
    this.points.geometry.colorsNeedUpdate = true
    this.points.geometry.computeBoundingBox()
  }

  // handle mouse movement for painting color
  onMouseMove(mouse) {
    let intersectedPoints = mouse.intersectObject(this.points)
    if (intersectedPoints.length > 0) this.paint(intersectedPoints)
  }

  // calculate the height of any given point
  height(x, y, z, persistence, octaves, noise) {
    let total = 0.0
    let normalize = 0.0
    let frequency = 1.0 / 30.0
    let amplitude = 30.0

    // build and layer each octave
    let i
    for (i = 0; i < octaves; i++) {
        total += noise.perlin3(x * frequency, y * frequency, z * frequency) * amplitude
        normalize += amplitude

        frequency *= 3.0
        amplitude *= persistence
    }

    return total / normalize
  }

  // draw ~additive~ color onto the points mesh
  paint(intersectedPoints) {
    let point,
        intensity,
        nr, ng, nb,
        r, g, b, i

    // iterate over collided vertices
    for (i = 0; i < intersectedPoints.length; i++) {
      point = intersectedPoints[i].index

      // calculate an intensity based on distance for a fade area effect
      intensity = Math.max(0, intersectedPoints[i].distanceToRay / THRESHOLD)
      r = Math.min(this.brushColor.r + intensity, 1.0)
      g = Math.min(this.brushColor.g + intensity, 1.0)
      b = Math.min(this.brushColor.b + intensity, 1.0)

      // calculate new colors to set (to avoid whiting out colors we just set)
      nr = Math.min(r, this.points.geometry.colors[point].r)
      ng = Math.min(g, this.points.geometry.colors[point].g)
      nb = Math.min(b, this.points.geometry.colors[point].b)

      // update point color
      this.points.geometry.colors[point].setRGB(nr, ng, nb)
    }
  }
}

// export module
export default pointwaves
