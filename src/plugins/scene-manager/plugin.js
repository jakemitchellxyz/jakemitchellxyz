'use strict'

import manager from './scripts/manager.js'
import scene from './components/scene.vue'

const plugin = {}

// install the plugin onto vue
plugin.install = function (vue, options) {
  // register the scene component
  vue.component('scene', scene)

  // attach the manager to an instance variable of vue
  vue.prototype.$scene_manager = new manager()
}

export default plugin
