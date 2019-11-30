// 首先要引入vue
import Vue from 'vue'
// 这个里面直接写组件名称即可
import {
  Button
} from 'vant'
// 组件名称引入之后，需要将所有的引入的组件名称挂载到Vue实例中
Vue
  .use(Button)
