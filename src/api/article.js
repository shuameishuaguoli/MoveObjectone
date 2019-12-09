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

// 获取文章详情
export function getAticleDetails (articleId) {
  // 返回一个回调函数
  return request({
    //   请求方式
    method: 'GET',
    // 请求地址
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 对文章点赞
export function GiveThumbs (articleId) {
  // 返回一个回调函数
  return request({
    //   请求方式
    method: 'POST',
    // 请求地址
    url: '/app/v1_0/article/likings',
    // 请求参数
    data: {
      target: articleId
    }
  })
}

// 取消对文章点赞
export function CancelPoints (articleId) {
  // 返回一个回调函数
  return request({
    //   请求方式
    method: 'POST',
    // 请求地址
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
