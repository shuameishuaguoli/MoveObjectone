import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在main.js中加载执行注册模块
import './utils/register-vant.js'
// 加载全局样式文件
import './styles/index.less'
// 引入动态适配rem基准值
import 'amfe-flexible'
// 加载进度条的样式
import 'nprogress/nprogress.css'
// 引入新建的dayjs.js文件
import './utils/dayjs.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
