// 这个文件夹的主要作用就是获取token值和存取token值的

// 获取token值
export const getToken = name => {
  // 返回一个对象或数组，JSON.parse就是JSON格式的字符串转成对象或数组类型
  return JSON.parse(window.localStorage.getItem(name))
}

// 存token值
export const setToken = (name, data) => {
  // 将对象和数组先转成JSON格式的字符串再存到本地中
  return window.localStorage.setItem(name, JSON.stringify(data))
}

// 删除指定的存储在本地的字段
export const delToken = name => {
  // 这个方法不用返回什么，直接删掉指定的字段名即可
  window.localStorage.removeItem(name)
}
