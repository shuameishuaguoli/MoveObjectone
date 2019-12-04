// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入存取token和获取token的文件
import { setItem, getItem } from '@/utils/storage'
// 将Vuex挂载到Vue中
Vue.use(Vuex)
// 导出一个容器实例
export default new Vuex.Store({
  // 共享的数据存放到state中
  state: {
    // getToken('token')
    // 这个user其实也是从本地获取token值，如果本地有token值，那么就将token值赋给user
    user: getItem('token')
  },
  // 同步执行的逻辑代码存放到mutations中
  mutations: {
    // mutations中的所有方法都有一个默认的参数，state
    setUser (state, data) {
      // 将从登录页传过来的值赋值给到我们在state中的user数据，data是一个对象类型
      state.user = data
      // 将获取到的token存放到本地
      setItem('token', state.user)
    }
  },
  // 异步执行的逻辑代码存放到actions中
  actions: {
  },
  modules: {
  }
})
