import vue from 'vue'
import app from '@/app.vue'
import router from '@/router'
import scene_manager from '@/plugins/scene-manager/plugin'

// Create a single WebGL component to render the different animations (easier to manage memory)
vue.use(scene_manager)

// Build this Vue instance with the router and mount on the '#app' domElement
new vue({
  router,
  render: h => h(app)
}).$mount('#app')
