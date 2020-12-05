<template>
  <div id="car-item">
    <div class="item-selector">
      <check-button @click.native="checkedChange" :is-checked="product.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.imgURL" alt="购物车商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.realPrice}}</div>
        <div class="right count-wrapper">
          <div class="decrease" @click="countDecrease"> - </div>
          <div class="item-count">x{{product.count}}</div>
          <div class="increase" @click="countIncrease"> + </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: "CarListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkedChange() {
      this.product.checked = !this.product.checked;
    },
    countIncrease() {
      console.log('increase')
      this.$store.commit('add_counter', this.product)
    },
    countDecrease() {
      console.log('decrease')
      this.$store.commit('cut_counter', this.product)
    }
  }
}
</script>

<style scoped>
  #car-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info-bottom {
    height: 22px;
    line-height: 22px;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .info-bottom .item-count {
    font-size: 15px;
    padding: 0 10px;
    border-left: 1px solid #333;
    border-right: 1px solid #333;
  }
  .count-wrapper {
    display: flex;
    height: 20px;
    line-height: 20px;
    box-sizing: border-box;
    border: 1px solid #333;
    border-radius: 6px;
    overflow: hidden;
  }
  .info-bottom .increase,
  .info-bottom .decrease {
    width: 20px;
    background-color: #EEEEEE;
    text-align: center;
    cursor: pointer;
  }
</style>
