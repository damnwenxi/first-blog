// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor'
import 'iview/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(iView)
Vue.config.productionTip = false

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'http://localhost:8081';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) { //判断token是否存在
      config.headers.Authorization = localStorage.token;  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
Vue.use(VueAxios,axios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
