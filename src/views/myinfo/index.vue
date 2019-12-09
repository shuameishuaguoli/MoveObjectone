<template>
  <div>
    <!-- 导航栏start @click-right="onClickRight"-->
    <van-nav-bar
        title="个人信息"
        right-text="保存"
        left-arrow
        @click-left="$router.push('/my')"
        @click-right="onUserUpdata"
    />
    <!-- 导航栏end -->
    <!-- 用户信息头像 昵称 性别 生日start -->
    <van-cell title="头像" center is-link  @click="onUpload">
        <input type="file" ref="file" hidden @change="onChange">
        <van-image
            width="50"
            height="50"
            round
            :src="userinfo.photo"
        />
    </van-cell>
    <van-cell title="昵称" is-link :value="userinfo.name" @click="nickname=true"/>
    <van-cell title="性别" is-link :value="userinfo.gender===1?'男':'女'" />
    <van-cell title="生日" is-link :value="userinfo.birthday" />
    <!-- 用户信息头像 昵称 性别 生日end -->
  </div>
</template>

<script>
// 引入获取用户信息的请求
import { Getuser, UpdataPhoto } from '@/api/user'
export default {
  name: 'myselfinfo',
  data () {
    return {
      // 定义一个变量用来接收用户信息
      userinfo: {},
      //   昵称的显示及异常
      nickname: false
    }
  },
  //   钩子函数
  created () {
    //   调用获取用户个人信息的方法
    this.getUser()
  },
  // 方法区
  methods: {
    //   定义一个调用用户个人信息的方法
    async getUser () {
      const res = await Getuser()
      this.userinfo = res.data.data
      console.log(res)
    },
    // 点击头像的时候需要触发type='file'类型的input框
    onUpload () {
      const ref = this.$refs.file
      // 点击图片的时候需要将type='file'的input框进行触发
      ref.click()
    },
    // input框中的内容触发的事件
    onChange () {
    //   console.log(window.URL.createObjectURL(this.$refs.file.files[0]))
      // window.URL.createObjectURL
    //   将userinfo中的photo属性设置成上传的图片的url地址
      this.userinfo.photo = window.URL.createObjectURL(this.$refs.file.files[0])
    },
    // 点击保存的时候上传图片以及上传用户信息，这里我们先上传图片
    async onUserUpdata () {
      const photo = this.$refs.file.files[0]
      try {
        await UpdataPhoto(photo)
        this.$toast.success('保存成功')
      } catch (error) {
        this.$toast.success('保存失败')
      }
    }
  }
}
</script>

<style>
</style>
