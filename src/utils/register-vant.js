// 首先要引入vue
import Vue from 'vue'
// 这个里面直接写组件名称即可
import {
  Button, // 按钮
  NavBar, // 导航栏
  Field, // 输入框
  Toast, // 轻提示
  Tabbar, // 底部的 “首页 问答 视频 我的”
  TabbarItem, // 底部的 “首页 问答 视频 我的”
  Tab, // 标签页
  Tabs, // 标签页
  PullRefresh, // 下拉刷新组件
  List, // list列表
  cell, /// / list列表
  Grid, // 宫格
  GridItem, // 宫格
  Image, // 图片
  Icon, // 图标
  Popup, // 弹出层
  Cell, // 单元格
  CellGroup, // 单元格
  Search, // 搜索
  Lazyload // 图片懒加载
} from 'vant'
// 组件名称引入之后，需要将所有的引入的组件名称挂载到Vue实例中
Vue
  .use(Button)// 按钮
  .use(NavBar)// 导航栏
  .use(Field)// 输入框
  .use(Toast)// 轻提示
  .use(Tabbar)// 底部的 “首页 问答 视频 我的”
  .use(TabbarItem)// 底部的 “首页 问答 视频 我的”
  .use(Tab) // 标签页
  .use(Tabs) // 标签页
  .use(PullRefresh) // 下拉刷新组件
  .use(List) // 内容列表
  .use(cell) // list列表
  .use(Grid) // 宫格
  .use(GridItem) // 宫格
  .use(Image) // 图片
  .use(Icon) // 图标
  .use(Popup) // 弹出层
  .use(Cell) // 单元格
  .use(CellGroup) // 单元格
  .use(Search) // 搜索
  .use(Lazyload) // 图片懒加载
