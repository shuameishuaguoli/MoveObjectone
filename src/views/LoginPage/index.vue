<template>
  <div>
      <!-- 导航栏start -->
      <van-nav-bar
        title="登录"
        />
      <!-- 导航栏end -->

      <!-- 输入框start
        clearable：是否启用清除控件
        required：是否显示表单必填星号
      -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                clearable
                required
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="user.code"
                type="text"
                clearable
                required
                label="验证码"
                placeholder="请输入验证码"
            />
            </van-cell-group>
      <!-- 输入框end -->
      <!-- 登录按钮start -->
        <div class="loginbtn">
            <van-button @click="onLogin" type="info">登录</van-button>
        </div>
      <!-- 登录按钮end -->
  </div>
</template>

<script>
// 加载user.js
import { login } from '@/api/user.js'
export default {
  // 登录组件的名字
  name: 'LoginPage',
  //   数据区
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  //   方法区
  methods: {
    //   点击登录按钮触发的事件
    async onLogin () {
      // 开启登录加载的效果
      this.$toast.loading({
        message: '加载中...', // 提示消息
        duration: 0, // 持续展示 toast
        forbidClick: true // 背景是否是禁止点击 true为禁止 false为不禁止
      })
      try {
        //   调用发送请求的login方法，这个方法中需要传一个参数，这个参数就是user对象
        const res = await login(this.user)
        console.log('登录成功', res)
        //   登录成功给一个提示  显示登录成功的时候会将上一个this.$toast效果关掉，所以我们在这里不用手动关闭$toast
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }
    }
  }
}
</script>

<style lang="less" scope>
// 登录按钮样式
.loginbtn{
    padding: 20px;
    .van-button{
        width: 100%;
    }
}
</style>
