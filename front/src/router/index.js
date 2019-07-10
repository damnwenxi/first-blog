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
import Axios from '_axios@0.18.1@axios';
import { resolve } from 'path';


Vue.use(Router)

const router = new Router({
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
      component: Addblog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta: {
        requireAuth: true
      }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    Axios({
      method: "get",
      url: "/login/valid",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        if (response.data.user) {
          window.localStorage.setItem("token", response.data.token);
          next();
        } else {
          window.localStorage.clear();
          window.alert("登录信息已过期，请重新登录");
          next({ path: '/login' });
        }
      })
      .catch(err => {
        throw (err);
        // console.log("err")
      });
  } else {
    next();
  }
})

export default router;


