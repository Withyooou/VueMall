<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      // 1.思路一,通过路由判断路径,从而区分不同的事件
      // if(this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else if(this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }
      
      // 2.思路二,多个用到该组件的页面都发出同名事件,在各个页面的 deactivated() 函数里取消全局事件的监听即可 this.$bus.$off 
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    /* 第一个0表示背景颜色,第二个0是background-position,两个14px是background-size */
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;  
  }
</style>