// 文章相关的请求接口
// 引入request.js文件
import request from '@/utils/request.js'
// 获取文章列表
export function getAticle (params) {
  // 返回一个回调函数
  return request({
    //   请求方式
    method: 'GET',
    // 请求地址
    url: '/app/v1_1/articles',
    // 请求参数
    params
  })
}
