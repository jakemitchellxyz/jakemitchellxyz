import vue from 'vue'
import router from 'vue-router'

// views
import home from '@/views/home.vue'
import about from '@/views/about.vue'
import contact from '@/views/contact.vue'
import resume from '@/views/resume.vue'

vue.use(router)

export default new router({
  mode: 'history',
  beforeResolve: function (to, from, next) {
    let title = to.meta.title
    title += (title === '') ? 'jake mitchell' : ' \— jake mitchell'
    document.title = title

    next()
  },
  routes: [
    { name: 'home', path: '/', component: home, meta: { title: '' } },
    { name: 'about', path: '/about', component: about, meta: { title: 'about me' } },
    { name: 'contact', path: '/contact', component: contact, meta: { title: 'contact' } },
    { name: 'resume', path: '/resume', component: resume, meta: { title: 'resume' } },
  ]
})
