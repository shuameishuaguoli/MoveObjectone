// 引入axios
import axios from 'axios'
// 引入json-bigint
import jsonBig from 'json-bigint'
// 引入Vuex的index.js文件
import store from '@/store/'
// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
// 在请求拦截器中获取token值，获取的渠道是从Vuex中获取到的，并不是从浏览器的本地存储获取到的，那么我们要在一个非组件中使用Vuex中的数据，我们要先引入store/index.js文件
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // 这里我们要获取到store中的user的token
    const user = store.state.user
    // console.log(config)
    // 这里的config是一个对象，这个对象中有一个headers的键名，所有这里我们可以直接就可以将config.headers.接口文档规定的键名 = `Bearer {}`
    // Do something before request is sent
    // config.headers.
    config.headers.Authorization = `Bearer ${user.token}`
    return config
  }, function (error) {
  // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(
  function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
    return response
  }, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    return Promise.reject(error)
  }
)

// 导出request
export default request
