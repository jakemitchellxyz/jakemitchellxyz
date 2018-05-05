import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import World from '@/assets/js/world'

// Create a single three scene
Vue.prototype.$three = World

// Build this Vue instance with the router and mount on the '#app' domElement
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
