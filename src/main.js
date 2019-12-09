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
// 引入解决移动端点击300毫秒的插件
import fastClick from 'fastclick'
// 当前的是环境是开发环境还是生产环境，false为开发环境 true为生产环境
Vue.config.productionTip = false
// 引入300毫秒的插件后，需要再写入这句代码
fastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
