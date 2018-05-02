import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import World from '@/assets/js/world'

Vue.prototype.$three = World

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
