<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommendList"/>
    </scroll>
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
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
import { debounce } from 'common/utils'
import { itemLinstenerMixin } from 'common/mixin'

export default {
  name: "Detail",
  mixins: [itemLinstenerMixin],
  components: { 
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
  },
  methods: {
    // 解决滚动bug
    imageLoad() {
      this.$refs.scroll.refresh()
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
    z-index: 1000;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 1001;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
