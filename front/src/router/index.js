import Vue from 'vue'
import Router from 'vue-router'
import Website from '../components/link/Website'
import Blog from '../components/blog/Blog'
import Login from '../components/user/Login'
import Article from '../components/blog/Article'
import Addblog from '../components/blog/Addblog'
import Addweb from '../components/link/Addweb'
import Admin from '../components/user/Admin'


Vue.use(Router)

export default new Router({
  // mode:history,
  routes: [
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
    }
  ] 
})
