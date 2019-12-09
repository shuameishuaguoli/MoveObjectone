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

// 关注用户发送的请求
export function focusUser (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取关用户发送的请求
export function RemovefocusUser (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取指定用户账户信息
export function GetUserInfo () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户个人资料
export function Getuser () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 保存用户头像
export function UpdataPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
