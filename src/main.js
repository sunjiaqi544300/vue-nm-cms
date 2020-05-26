// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'


// axios.defaults.baseURL = '/translate'  //关键代码

// import '../config/rem(1)'
import flexible from 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper';

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

//vuex
import store from './store'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import VueRouter from 'vue-router';
import 'vue-easytable/libs/themes-base/index.css'
import {
  VTable,
  VPagination
} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)


import 'lib-flexible/flexible'

// // Vue.use(Message)

import VConsole from 'vconsole'

// var vConsole = new VConsole();
// if (process.env.NODE_ENV === 'production') {
//         new VConsole()
//     }

import {
  getCookie
} from "js/public.js"

import {
  hostType
} from 'api/env.js'

Vue.prototype.$apihost = hostType(1)

Vue.prototype.$apihost2 = hostType(2)
// Vue.use(ElementUI)
// Vue.use(MintUI)

// const router = new VueRouter({
//   mode:'history',
//   routes:routers
// })

// axios拦截器
axios.interceptors.request.use(
  config => {
    // var token = localStorage.getItem('token')
    var token = getCookie("token")
    // console.log(config.url)
    if (config.url != '192.168.1.3:8000/wechat/api/user/' || config.url != '192.168.1.3:8000/wechat/api/code/') {
      if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers.Authorization = 'JWT ' + token
      }
    }
    if (config.method == "get") {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    } else if (config.method == "post") {
      // config.data = {
      //     ...config.data,
      //     _t: Date.parse(new Date()) / 1000
      // }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          // Element.Message.error({
          //   message: '请您登陆'
          // })
          router.push('/')
      }
      return false
    }
    return false
  })


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$eCharts = echarts
Vue.use(flexible)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
