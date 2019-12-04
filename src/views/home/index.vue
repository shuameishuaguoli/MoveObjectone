<template>
  <div class="home">
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
                >
                <!-- 宫格start -->
                  <!-- <van-grid :border="false" :column-num="3">
                    <van-grid-item>
                      <van-image :src="" />
                    </van-grid-item>
                  </van-grid> -->
                <!-- 宫格end -->
                </van-cell>
              </van-list>
          <!-- 内容列表end -->
        </van-pull-refresh>
        <!-- 下拉刷新组件end -->
      </van-tab>
      <!-- 面包屑图标start 点击图标将弹出层显示-->
      <div slot="nav-right" class="wap-nav" @click="show=true">
        <van-icon name="wap-nav" />
      </div>
      <!-- 面包屑图标end -->
    </van-tabs>
    <!-- 标签页end -->
    <!-- 弹出层start -->
    <van-popup
      v-model="show"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '95%' }"
      @open="getallchannels"
    >
        <van-cell style="margin-top:30px;" title="我的频道">
          <van-button
          size="small"
          type="danger"
          @click="isEdit = !isEdit"
          >
          {{isEdit?'完成':'编辑'}}
          </van-button>
        </van-cell>
      <!-- 我的频道start -->
        <van-grid>
          <van-grid-item
          v-for="(channel,index) in channels"
          :key="channel.id"
          :text="channel.name"
          class="griditem"
          @click="onDelChannel(index)"
        >
          <!-- 叉号图标 -->
          <van-icon
            slot="icon"
            class="vanicon"
            size="20px"
            name="close"
            v-show="isEdit"
          />
        </van-grid-item>
        </van-grid>
      <!-- 我的频道end -->
      <!-- 推荐频道start -->
      <van-cell style="margin-top:30px;" title="推荐频道">
      </van-cell>
      <van-grid>
        <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        class="griditem"
        @click="addChannel(channel)"
      />
      </van-grid>
      <!-- 推荐频道end -->
    </van-popup>
    <!-- 弹出层end -->
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
import { UserChannelList, getAllChannels } from '@/api/user.js'
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
      isLoading: false,
      // 默认弹出层是隐藏状态
      show: false,
      // 定义一个获取所有的频道列表的变量
      allChannels: [],
      // 默认我的频道的叉号是隐藏的
      isEdit: false
    }
  },
  //   钩子函数，组件加载的时候就执行created中的方法
  created () {
    //   在钩子函数中调用一下获取用户频道列表的方法
    this.getUserChannelList()
  },
  // 封装一个计算属性用来获取我们的剩余频道
  computed: {
    // 推荐频道
    recommendChannels () {
      // 定义一个空数组
      const arr = []
      // 遍历一下所有频道
      this.allChannels.forEach(channel => {
        // 这里的channel表示所有频道中的每一项
        // 我们的逻辑是，在我的频道中找一下这个channel，如果有的话，就将获取到这个频道
        // find方法返回的是一个数组

        const res = this.channels.find(item => {
          // find方法里面写一下查找条件
          return item.id === channel.id
        })
        // 现在res中是和我的频道中的频道是一样的，所有我们要将不是res中的数据放到推荐频道中
        if (!res) {
          arr.push(channel)
        }
      })
      // 最后返回arr
      return arr
    }
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
    async onRefresh () {
      // 下拉刷新还是要获取到当前的标签页
      const activeChannel = this.channels[this.active]
      // 下拉获取数据
      const res = await getAticle({
        // 获取标签页的id
        channel_id: activeChannel.id,
        // 获取当前的时间戳，因为获取的是最新数据，所有要当前最新的时间戳
        timestamp: Date.now(),
        // 设置文章是否置顶
        with_top: 1
      })
      // 获取一下刷新出来的数据  获取到的是一个数组，一个数组要往另一个数组中添加，我们建议使用...的方式
      const leng = res.data.data.results
      // 将刷新出来的数据添加到数据列表中
      activeChannel.articles.unshift(...leng)
      // 使用三元表达式的方式对提示进行判断
      const tips = leng.length ? `更新了${leng.length}条数据` : '暂无数据跟新'
      this.$toast(tips)
      // 数据更新成功之后需要将loading圈圈关闭
      this.isLoading = false
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
    },
    // 获取所有的频道列表
    async getallchannels () {
      // 获取一下所有频道列表
      const res = await getAllChannels({})
      // 将获取到的所有频道列表赋值给到我们定义的空数组中
      this.allChannels = res.data.data.channels
    },
    // 点击推荐频道添加到我的频道
    addChannel (channel) {
      // 将channel添加到我的频道中
      this.channels.push(channel)
    },
    // 点击叉号删除我的频道中的频道
    onDelChannel (index) {
      // 先判断是不是编辑状态，如果是编辑状态则是删除当前频道，如果不是编辑状态，则跳转到当前频道并关闭弹出层  如果是true，则是点击删除，如果是false则是跳转到当前点击的频道
      if (this.isEdit) {
        // 如果isEdit为true，则是编辑状态，删掉当前的频道
        this.channels.splice(index, 1)
      } else {
        // 跳转到当前点击的频道页中
        this.active = index
        // 并把弹层关掉
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scope>
// 标签栏进行了定位
.vantbabs{
  margin-top: 46px;
}
//
.wap-nav{
  // 固定定位
  position: sticky;
  right: 0;
  // flex布局
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: 0.7;
}
.griditem{
  margin:5px;
  border:1px solid #ccc;
}
.home{
  /deep/ .van-grid-item__icon-wrapper{
    position: absolute;
    right: -12px;
    top:-15px
  }
}
</style>
