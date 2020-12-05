<template>
  <div id="home">
    <!-- 顶部nav-bar -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div> 
      </template>
    </nav-bar>
    <!-- tab-control横向导航(复制) -->
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

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemLinstenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: "Home",
  mixins: [itemLinstenerMixin, backTopMixin],
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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
      // 统一两个tab-control的高亮位置
      this.$refs.tabControlInner.currentIndex = index;
      this.$refs.tabControlOuter.currentIndex = index;
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
      // 直接mounted()里获取tab-control的offsetTop的值不准确,因为图片未加载完会导致sffsetTop的值偏小
      // 而轮播图的图片加载速度最慢,因此我们只要在轮播图的图片获取到之后再去计算offsetTop,得到的值就会相对准确
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
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
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
  // mounted() {
  //   // 监听GoodsListItem中图片加载完成
  //   const dbRefresh = debounce(this.$refs.scroll.refresh, 50)
  //   // 对监听的事件进行保存
  //   this.itemImageListener = () => {
  //     dbRefresh()
  //   }
  //   // 监听全局总线事件(注意第2个参数必须是个函数)
  //   this.$bus.$on('itemImageLoad', this.itemImageListener)
  // },
  activated() {
    // 再次切回首页时保持离开时的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 记录首页商品离开时的位置
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局事件的监听(注意第2个参数必须是个函数)
    this.$bus.$off('itemImageLoad', this.itemImageListener)
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
