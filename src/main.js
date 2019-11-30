import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在main.js中加载执行注册模块
import './utils/register-vant.js'
// 引入动态适配rem基准值
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
