import vue from 'vue'
import app from '@/app.vue'
import router from '@/router'
import sceneManager from '@/effects/manager'

// Create a single WebGL component to render the different animations (easier to manage memory)
vue.prototype.$sceneManager = new sceneManager()

// Build this Vue instance with the router and mount on the '#app' domElement
new vue({
  router,
  render: h => h(app)
}).$mount('#app')
