import Vue from 'vue'
import App from './App'
import router from './router'

import "./plugins/element";
import './api'; //axios 配置
import store from './state/index'

import "../static/global.css"; // 重置样式表
import "./assets/css/iconfont.css" // 引入阿里图标

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store: store,
  components: {App},
  template: '<App/>'
})
