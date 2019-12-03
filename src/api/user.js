// 引入request.js文件
import request from '@/utils/request.js'
// 用户登录
// 用户登录请求需要传一个参数，这个参数就是用户的手机号和验证码，这是一个对象类型
export function login (data) {
  // 返回一个回调函数
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取用户频道列表
export function UserChannelList () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有频道列表
export function getAllChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
