import vue from 'vue'
import vue_router from 'vue-router'

// views
import home from '@/views/home.vue'
import about from '@/views/about.vue'
import contact from '@/views/contact.vue'

// register router plugin
vue.use(vue_router)

// create the router definition
const router = new vue_router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: home, meta: { title: '' } },
    { name: 'about', path: '/about', component: about, meta: { title: 'about me' } },
    { name: 'contact', path: '/contact', component: contact, meta: { title: 'contact' } }
  ]
})

// define the title setting guard
router.beforeEach((to, from, next) => {
  let title = to.meta.title
  title += (title === '') ? 'jake mitchell' : ' — jake mitchell'
  document.title = title

  next()
})

export default router
