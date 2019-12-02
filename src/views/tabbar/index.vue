<template>
  <div>
    <!-- 子路由的出口 -->
    <router-view></router-view>
    <!-- 底部的首页 问答 视频 我的start -->
    <!-- <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
    <van-tabbar-item icon="video-o">视频</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar> -->
    <!-- 底部的首页 问答 视频 我的end -->
  </div>
</template>

<script>
export default {
  // 组件名字
  name: 'tabbar',
  data () {
    return {
      // 底部的tabbar栏绑定的数据
      active: 0
    }
  },
  //   方法区
  methods: {

  }
}
</script>

<style>
</style>
