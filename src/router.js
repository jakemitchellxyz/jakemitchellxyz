import Vue from 'vue'
import Router from 'vue-router'

// Views
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Resume from '@/views/Resume.vue'

Vue.use(Router)

// Helper to set page title
let setTitle = function (to, from, next) {
  let title = to.meta.title
  title += (title === '') ? 'Jake Mitchell' : ' \— Jake Mitchell'
  document.title = title

  next()
}

export default new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: Home, meta: { title: '' }, beforeEnter: setTitle },
    { name: 'about', path: '/about', component: About, meta: { title: 'About Me' }, beforeEnter: setTitle },
    { name: 'contact', path: '/contact', component: Contact, meta: { title: 'Contact' }, beforeEnter: setTitle },
    { name: 'resume', path: '/resume', component: Resume, meta: { title: 'Resume' }, beforeEnter: setTitle },
  ]
})
