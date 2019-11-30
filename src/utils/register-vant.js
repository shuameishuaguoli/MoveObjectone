// 首先要引入vue
import Vue from 'vue'
// 这个里面直接写组件名称即可
import {
  Button, // 按钮
  NavBar, // 导航栏
  Field, // 输入框
  Toast// 轻提示
} from 'vant'
// 组件名称引入之后，需要将所有的引入的组件名称挂载到Vue实例中
Vue
  .use(Button)// 按钮
  .use(NavBar)// 导航栏
  .use(Field)// 输入框
  .use(Toast)// 轻提示
