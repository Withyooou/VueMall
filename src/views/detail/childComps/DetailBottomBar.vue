<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select" @click="collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "DetailBottomBar",
    data() {
      return {
        isCollect: false
      }
    },
    methods: {
      addToCart() {
        this.$emit('addToCar')
      },
      collect() {
        if(!this.isCollect) {
          this.isCollect = !this.isCollect
          this.$toast.show('商品已收藏')
          document.querySelector('.select').style.backgroundPosition = '0 -27px'
        } else {
          this.isCollect = !this.isCollect
          this.$toast.show('已取消收藏')
          document.querySelector('.select').style.backgroundPosition = '0 0'
        }
      },
      buy() {
        this.$toast.show('不会真有人想购买吧？！')
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    text-align: center;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item > div {
    flex: 1;
    display: flex;
    flex-flow: wrap column;
    justify-content: center;
    align-content: center;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin-bottom: 4px;
    /* 二倍精灵图,宽度需要为原来的一半 */
    background: url("~assets/img/detail/detail_bottom.png") 0 0/22px;
  }
  .bar-left .service {
    background-position:0 -53px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    line-height: 58px;
    font-size: 15px;
    color: #fff;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>
