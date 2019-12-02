import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页面组件
import login from '@/views/LoginPage'
// 引入tabbar页面组件
import tabbar from '@/views/tabbar'
// 引入首页页面组件
import home from '@/views/home'
Vue.use(VueRouter)
// 配置路由表
const routes = [
  // 配置登录页的路由表
  {
    path: '/login',
    component: login // 登录页组件
  },
  // 配置首页的路由表
  {
    path: '/tabbar',
    component: tabbar, // tabbar组件
    children: [
      {
        path: '',
        component: home // 首页组件 默认显示首页组件
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
