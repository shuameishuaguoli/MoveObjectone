<template>
  <div class="my">
    <!-- 登录start 如果store容器中有token则不显示登录字样-->
    <div class="denglu" v-if="!$store.state.user">
        <!-- 点击登录div返回到登录页 -->
        <div class="login" @click="$router.push('/login')">
            <span>登录</span>
        </div>
    </div>
    <!-- 用户信息展示start -->
    <div v-else class="userInfo">
        <van-cell-group
        style="
         padding-left:10px;
         height:70px;
         display:flex;
         align-items: center;"
        >
            <van-image
            width="70px"
            height="58px"
            round
            :src="userInfo.photo"
            />
            <van-cell :title="userInfo.name" to="/myinfo" is-link/>
        </van-cell-group>
        <!--头条  关注 粉丝 获赞-->
        <van-grid :border="false">
            <van-grid-item class="item">
                <span>{{userInfo.art_count}}</span>
                <span>头条</span>
            </van-grid-item>
            <van-grid-item class="item">
                <span>{{userInfo.follow_count}}</span>
                <span>关注</span>
            </van-grid-item>
            <van-grid-item class="item">
                <span>{{userInfo.fans_count}}</span>
                <span>粉丝</span>
            </van-grid-item>
            <van-grid-item class="item">
                <span>{{userInfo.like_count}}</span>
                <span>获赞</span>
            </van-grid-item>
        </van-grid>
    </div>
    <!-- 用户信息展示end -->
    <!-- 登录end -->

    <!-- 我的收藏 评论 点赞 历史start -->
    <van-grid>
        <van-grid-item icon="star" text="我的收藏" />
        <van-grid-item icon="chat" text="我的评论" />
        <van-grid-item icon="like" text="我的点赞" />
        <van-grid-item icon="eye" text="浏览历史" />
    </van-grid>
      <!-- 我的收藏 评论 点赞 历史end -->
      <!-- 单元格start -->
        <van-cell-group>
            <van-cell title="消息通知" is-link/>
            <van-cell title="内容反馈" is-link/>
            <van-cell title="小智同学" is-link/>
            <van-cell title="系统设置" is-link/>
        </van-cell-group>
      <!-- 单元格end -->
      <!-- goout start -->
      <div class="goout" @click="onGoOut">
          <span style="color:blue; font-size:16px;">退出登录</span>
      </div>
      <!-- goout end -->
  </div>
</template>

<script>
// 引入删除token的方法
import { delItem } from '@/utils/storage'
// 引入获取用户自己信息的请求
import { GetUserInfo } from '@/api/user'
export default {
  name: 'my',
  data () {
    return {
      // 定义一个变量，对象类型，用来接收一下用户信息
      userInfo: {}
    }
  },
  //   钩子函数
  created () {
    //   执行以下获取用户自己信息的方法
    this.UserInfo()
  },
  //   方法区
  methods: {
    //   获取用户信息
    async UserInfo () {
      const res = await GetUserInfo()
      this.userInfo = res.data.data
      console.log(res)
    },
    //   用户退出登录
    onGoOut () {
      // 清除本地存储的token值
      delItem('token')
      //   并跳转到登录页面
      this.$router.push('/login')
      //   退出成功之后给一个提示
      this.$toast.success('您已退出')
    }
  }
}
</script>

<style lang="less">
.my{
    .denglu{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        background-color: #ccc;
        .login{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: red;
            line-height: 100px;
            display: flex;
            justify-content: center;
            color: #fff;
        }
    }
    .goout{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .userInfo{
        height: 150px;
    }
    .item span{
         font-size: 16px;
    }
}
</style>
