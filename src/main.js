// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import store from './store/index'
import '../theme2/index.css'
import socket from 'socket.io-client'
var socket_url = 'http://192.168.12.172:8008'
// var socket = require('socket.io-client')('http://192.168.12.172:8008')
var io = socket(socket_url)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$socket = io
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
