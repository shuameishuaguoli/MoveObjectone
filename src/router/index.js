import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/LoginPage'
Vue.use(VueRouter)
// 配置路由表
const routes = [
  // 挂载登录页的路由
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
