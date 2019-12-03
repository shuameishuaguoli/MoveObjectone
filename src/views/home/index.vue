<template>
  <div>
      <!-- 导航栏start -->
    <van-nav-bar
    title="首页"
    fixed
    />
    <!-- 导航栏end -->
    <!-- 标签页start -->
    <van-tabs v-model="active" class="vantbabs">
      <van-tab
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"
      >
        <!-- 下拉刷新组件start -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 内容列表start -->
            <!-- list标签控制的是加载状态 -->
              <van-list
                v-model="loading"
                :finished="channel.finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
              <!-- cell标签控制的是加载内容 -->
                <van-cell
                  v-for="article in channel.articles"
                  :key="article.art_id.toString()"
                  :title="article.title"
                />
              </van-list>
          <!-- 内容列表end -->
        </van-pull-refresh>
        <!-- 下拉刷新组件end -->
      </van-tab>
    </van-tabs>
    <!-- 标签页end -->
  </div>
</template>

<script>
/*
分析：每个频道列表都应该各自的数据状态，
  包括：每个频道的文章列表  先给每个频道加一个列表
  频道是否加载结束
  频道是否在loading加载中
*/
// 引入user.js文件，这个文件的左右是用来发送请求的
import { UserChannelList } from '@/api/user.js'
// 引入获取新闻列表的接口
import { getAticle } from '@/api/article.js'
export default {
  name: 'homePage',
  data () {
    return {
      // 标签页绑定的数据
      active: 0,
      // 定义一个空，用来接收所有的标签页数据
      channels: [],
      // loading和finished这两个变量是控制加载状态，当组件滚动到底部时，  会触发onLoad()事件，onLoad事件是在滚动到底部的时候自动触发的，并将loading设置为true，此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置为false即可，若数据全部加载完毕，将finished设置为true即可
      loading: false,
      finished: false,
      // 下拉刷新
      isLoading: false
    }
  },
  //   钩子函数，组件加载的时候就执行created中的方法
  created () {
    //   在钩子函数中调用一下获取用户频道列表的方法
    this.getUserChannelList()
  },
  // 方法区
  methods: {
    async onLoad () {
      // 在加载的时候，需要让程序知道应该去加载哪个频道下边的文章列表
      const activeChannel = this.channels[this.active]
      // 获取一下当前频道的文章列表
      const actives = activeChannel.articles
      // 获取的当前的新闻列表
      const res = await getAticle({
        // 获取标签页id
        channel_id: activeChannel.id,
        // 获取当前的时间戳
        timestamp: activeChannel.timestamp || Date.now(),
        with_top: 1
      })
      // 打印一下响应到回来的数据
      // console.log(res)
      // 将获取到的当前的文章列表给到actives
      actives.push(...res.data.data.results)
      // 加载状态结束
      this.loading = false
      // 判断还有没有下一页数据，如果有的话则更新获取下一页的时间戳
      const preTimestamp = res.data.data.pre_timestamp
      if (preTimestamp) {
        activeChannel.timestamp = preTimestamp
      } else {
        activeChannel.finished = true
      }
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    //   获取用户频道列表
    async getUserChannelList () {
      // 定义一个变量来接收一下响应回来的数据
      const channelList = await UserChannelList()
      // 将响应回来的数据赋值给到我们在data中定义好的空数组中  this.channels
      // 因为我们要设计每个频道都有自己的内容列表和加载状态，这两个状态默认是没有的，所以我们要在响应回来的数据中添加这个两个属性，一个内容列表，一个加载状态，我们先定义个一个变量用来接收一下响应回来的数据，其实我们接收的响应回来的数据是一个对象，这个对象中就有两个属性，一个id值，一个频道名称，现在我们要再往这个对象中添加一个用来接收频道文章列表的数组和一个频道的加载结束状态
      const channels = channelList.data.data.channels
      // 因为接收的数据是一个数组，所以我们使用forEach的方法给数组添加两个属性
      // forEach中的可以写三个参数，第一个参数表示的是数组中的每一项，第二个参数表示的是数组的下标，第三个参数表示的这个数组，一般第三个参数用不到，用的最多的参数就是第一个参数，表示当前数组中的每一项
      channels.forEach(channel => {
        // 用来接收每个频道的文章列表
        channel.articles = []
        // 加载结束状态
        channel.finished = false
        // 用于获取频道下一页的时间戳
        channel.timestamp = null
      })
      // 最后再把添加属性完成后的channels赋值给到我们定义好的空数组，channels
      this.channels = channels
    }
  }
}
</script>

<style lang="less" scope>
.vantbabs{
  margin-top: 46px;
  position: fixed;

}
</style>
