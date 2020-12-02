<template>
  <div id="home">
    <!-- 顶部nav-bar -->
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <!-- tab-control横向导航 -->
    <tab-control :titles="['流行','新款','精选']"
                  ref="tabControlOuter"
                  class="tab-control"
                  @tabControl="tabControl" 
                  v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3" 
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐模块(小圆圈) -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行(大图) -->
      <feature-view/>
      <!-- tab-control横向导航 -->
      <tab-control :titles="['流行','新款','精选']" @tabControl="tabControl" ref="tabControlInner"/>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 监听一个组件的原生事件时,必须给对应的事件加上.native修饰符才能正常进行监听 -->
    <back-top @click.native="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      showBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  created() {
    // 1.请求轮播图、推荐小圆圈数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 监听GoodsListItem中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabControl(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControlInner.currentIndex = index;
      this.$refs.tabControlOuter.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.showBackTop = (-position.y) > 1000
      // 2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControlInner.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 获取轮播图数据
        this.banners = res.data.banner.list;
        // 获取轮播图下面的推荐数据;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)  // ES6扩展运算符
        this.goods[type].page ++
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用原生滚动时,为了让导航栏不跟随滚动才需要如下设置,运用better-scroll则不需要 */
    /* position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9; */
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
