<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="scrollNavTheme">
      <!-- 定义属性的时候是topImages,传入的时候最好写top-images,防止出现预料之外的错误 -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommendList" ref="recommend"/>
    </scroll>
    <!-- 监听一个组件的原生事件时,必须给对应的事件加上.native修饰符才能正常进行监听 -->
    <back-top @click.native="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    <detail-bottom-bar @addToCar="addToCar"/>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
import { debounce } from 'common/utils'
import { itemLinstenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: "Detail",
  mixins: [itemLinstenerMixin, backTopMixin],
  components: { 
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      getThemeTops: null,
      currentIndex: 0
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result;
      // 轮播图的切换
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品信息
      this.detailInfo = data.detailInfo;
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
    })
    // 4.对this.themeTops的赋值执行防抖处理
    this.getThemeTops = debounce(() => {
      this.themeTops = []
      this.themeTops.push(0)
      this.themeTops.push(this.$refs.param.$el.offsetTop-44)   // 44是detail-nav-bar的高度
      this.themeTops.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop-44)
      this.themeTops.push(Number.MAX_VALUE)
      console.log(this.themeTops)
    }, 200)
  },
  methods: {
    // 解决DetailGoodsInfo商品详情滚动bug
    imageLoad() {
      // 方法一：直接调用refresh(),子组件中做了处理,这里只会调用一次
      // this.$refs.scroll.refresh()

      // 方法二：这里执行了防抖函数,详见mixin
      this.dbRefresh()
      
      // 获取导航栏各个模块的offsetTop(用于导航栏滚动定位)
      this.getThemeTops()
    },
    // 点击导航栏滚动到相应位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 600)
    },
    // 滚动位置和导航栏颜色的联动
    scrollNavTheme(position) {
      // 获取y值
      const positionY = -position.y;
      // 判断backTop是否显示
      this.showBackTop = positionY > 1000

      /*  判断方案一： */
      // if(positionY < this.themeTops[1]) {
      //   this.$refs.navBar.currentIndex = 0
      // } else if(positionY >= this.themeTops[1] & positionY < this.themeTops[2]) {
      //   this.$refs.navBar.currentIndex = 1
      // } else if(positionY >= this.themeTops[2] & positionY < this.themeTops[3]) {
      //   this.$refs.navBar.currentIndex = 2
      // } else {
      //   this.$refs.navBar.currentIndex = 3
      // }

      /* 判断方案二： */
      // 运用条件2时这里必须length-1,因为数组最后一个数Number.MAX_VALUE没有意义
      for (let i = 0; i < this.themeTops.length-1; i++) {   
        // if条件1: (i < (length-1) && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1]) || (i === (length-1) && positionY >= this.themeTops[i])

        // if条件2: 给themeTops最后添加一个很大的值(Number.MAX_VALUE), 用于和最后一个主题的top进行比较
        // this.currentIndex !== i是为了减少执行次数,提升代码性能
        if (this.currentIndex !== i && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1]) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },
    addToCar() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      // 2.将商品信息添加到购物车里
      this.$store.dispatch('addCar', product).then(res => {
        this.$toast.show(res)
      })
    }
  },
  destroyed() {
    // 取消全局事件的监听(注意第2个参数必须是个函数)
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1000;  /* TabBar的z-index为999,此处设置1000是为了把TabBar盖住 */
    background-color: #fff;
  }
  .detail-nav {
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 9999;
  }
</style>
