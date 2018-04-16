import Vue from 'vue'
import Router from 'vue-router'

// Views
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Resume from '@/views/Resume.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'blog', path: '/blog', component: Blog },
    { name: 'about', path: '/about', component: About },
    { name: 'contact', path: '/contact', component: Contact },
    { name: 'resume', path: '/resume', component: Resume },
  ]
})
