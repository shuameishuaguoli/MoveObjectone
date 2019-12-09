import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页面组件
// const login = () => import('@/views/LoginPage')
// // 引入tabbar页面组件
// const tabbar = () => import('@/views/tabbar')
// // 引入首页页面组件
// const home = () => import('@/views/home')
// // 引入搜索页
// const Search = () => import('@/views/search')
// // 引入进度条包
// const NProgress = () => import('nprogress')
// // 引入文章详情页
// const Article = () => import('@/views/article')
// // 引入我的页面
// const My = () => import('@/views/my')
// // 引入个人信息页面
// const MyInfo = () => import('@/views/myinfo')
// // 引入登录页面组件
import login from '@/views/LoginPage'
// 引入tabbar页面组件
import tabbar from '@/views/tabbar'
// 引入首页页面组件
import home from '@/views/home'
// 引入搜索页
import Search from '@/views/search'
// 引入进度条包
import NProgress from 'nprogress'
// 引入文章详情页
import Article from '@/views/article'
// 引入我的页面
import My from '@/views/my'
// 引入个人信息页面
import MyInfo from '@/views/myinfo'
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
      },
      // 配置我的 页面路由表
      {
        name: 'my',
        path: '/my',
        component: My
      }
    ]
  },
  // 配置搜索页面路由表
  {
    path: '/search',
    component: Search
  },
  // 配置搜索页面路由表
  {
    // 路由名
    name: 'article',
    path: '/article/:articleID',
    component: Article,
    // 是否是在组件中获取到所传参数
    props: true
  },
  // 配置个人信息的路由表
  {
    // 路由名
    name: 'MyInfo',
    path: '/myinfo',
    component: MyInfo
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条特效
  NProgress.start()
  // 1. 如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()
    // 停止代码往后执行
    return
  }
  //   // 2.1 获取用户 token
  const token = window.localStorage.getItem('token')

  // 2.2 判断是否有 token，有就通过
  if (token) {
    // 导航通过，放行，访问哪里就往哪里走
    next()
  } else {
    // 2.3 没有，就跳转到登录页
    next('/login') // 跳转到指定路由
  }
  router.afterEach((to, from) => {
    // 结束顶部的导航进度条
    NProgress.done()
  })
})

export default router
