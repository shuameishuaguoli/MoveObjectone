<template>
  <div>
    <!-- 导航栏start -->
        <van-nav-bar
        fixed
        left-arrow
        title="文章详情页"
        @click-left="$router.push('/tabbar')"
        >
        </van-nav-bar>
    <!-- 导航栏end -->
    <!-- 文章详情start -->
        <div class="articleClass">
            <div class="art-title">{{article.title}}</div>
            <div class="headerCenter">
                <div class="header-left">
                    <div class="left-img">
                        <img :src="article.aut_photo" alt="">
                    </div>
                    <div class="left-artName">
                        <span>{{article.aut_name}}</span>
                        <span>{{article.pubdate | relativeTime}}</span>
                    </div>
                </div>
                <div class="header-right">
                    <van-button
                    size="small"
                    round
                    type="info"
                    @click="onfollow"
                    >
                    {{article.is_followed?'取消关注':'+关注'}}
                    </van-button>
                </div>
            </div>
            <!-- article内容start -->
            <div class="commont">
                <span v-html="article.content"></span>
            </div>
            <!-- article内容end -->
            <div class="btn">
                <div>
                    <van-button
                        size="small"
                        round
                        plain
                        type="primary"
                        @click="ondianzan"
                    >
                        <van-icon name="good-job-o" />
                       点赞
                    </van-button>
                </div>
                <div>
                    <van-button size="small" color="red" round plain type="info">
                        <van-icon name="delete" />
                        喜欢
                    </van-button>
                </div>
            </div>
        </div>
    <!-- 文章详情end -->
  </div>
</template>

<script>
// 引入获取文章详情的发送请求的接口  GiveThumbs, CancelPoints
import { getAticleDetails, CancelPoints } from '@/api/article'
import { RemovefocusUser, focusUser } from '@/api/user'
export default {
  // 组件名
  name: 'ArticleDetails',
  //   获取从上一个页面中传过来的文章ID
  props: {
    articleID: {
      // 类型是String类型
      type: String,
      //   是否是必须 true为是必须
      required: true
    }
  },
  //   模型
  data () {
    return {
      // 定义一个空对象，用来接收从服务器中获取到的文章详情
      article: {}
      //   定义一个变量用来控制添加关注和取关
    //   isfollow: false
    }
  },
  //   钩子函数
  created () {
    //   调用文章详情的方法
    this.getarticleDetails()
  },
  //   方法区
  methods: {
    //   获取文章详情的方法
    async getarticleDetails () {
      // 发送请求
      const res = await getAticleDetails(this.articleID)
      this.article = res.data.data
      console.log(this.article)
    },
    // 点击关注  +关注or取关
    async onfollow () {
      // 获取用户ID
      const userId = this.article.art_id
      console.log(userId)
      //   如果是true则取消关注 如果是false则添加关注
      if (this.article.is_followed) {
        await RemovefocusUser(userId)
      } else {
        await focusUser(userId)
      }
      //   将is_followed设置成  !is_followed
      this.article.is_followed = !this.article.is_followed
    },
    // 点击点赞按钮
    async ondianzan () {
      // 判断article中的attitude是否是-1，如果时-1则发送点赞请求；如果是1则发送取消点赞请求
      if (this.article.attitude === 1) {
        await CancelPoints(this)
      }
    }
  }
}
</script>

<style lang="less" scope>
.articleClass{
    margin-top: 60px;
    padding-left: 10px;
    padding-right: 15px;
    .art-title{
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 20px;
        font-weight: 700;
        color:blueviolet;
        margin-top: 10px;
    }
    .headerCenter{
        height: 100px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .header-left{
            height: 100%;
            flex: 5;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .left-img{
               width: 50px;
               height: 50px;
               img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
               }
            }
            .left-artName{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 16px;
                margin-left: 10px;
                :last-child{
                    color: #ccc;
                }
            }
        }
        .header-right{
            height: 100%;
            flex: 5;
            display: flex;
            justify-content:flex-end;
            align-items: center;
        }
    }
    .btn{
        display: flex;
        justify-content: center;
        :last-child{
            margin-right: 10px;
        }
    }
}
</style>
