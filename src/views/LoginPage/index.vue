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
