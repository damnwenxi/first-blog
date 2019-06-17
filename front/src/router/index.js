import Vue from 'vue'
import Router from 'vue-router'
import Website from '../components/link/Website'
import Blog from '../components/blog/Blog'
import Login from '../components/user/Login'
import Article from '../components/blog/Article'
import Addblog from '../components/blog/Addblog'
import Addweb from '../components/link/Addweb'
import Admin from '../components/user/Admin'
import Edit from '../components/blog/Editblog'
import About from '../components/user/Aboutme'
import Collection from '../components/user/Collection'
import Error from '../components/Error'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: Error
    },
    {
      path: '/',
      name: 'website',
      component: Website
    },
    {
      path: '/addweb',
      name: 'addweb',
      component: Addweb
    },
    {
      path: '/blogs',
      name: 'blos',
      component: Blog
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blogs/detail',
      name: 'detail',
      component: Article
    },
    {
      path: '/blogs/add',
      name: 'add',
      component: Addblog
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    }
  ]
})
