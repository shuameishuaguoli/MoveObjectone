// 引入vue
import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'
// 按需加载
// 选择语言
import 'dayjs/locale/zh-cn' // 中国
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用中文
// dayjs本身只处理日期格式化之类的核心功能
// 其他例如相对时间，必须配合他自己的插件才能使用
dayjs.extend(relativeTime)
// 扩展一个全局过滤器，计算相对时间
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
