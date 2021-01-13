<template>
  <div class="bottom-bar">
    <check-button class="select-all"
                  :is-checked="isSelectAll"
                  @click.native="allClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去结算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: 'CarBottomBar',
  components: {
    CheckButton
  },
  computed: {
    // 计算商品总价格
    totalPrice() {
      return this.$store.state.carList
        .filter((item) => {
          return item.checked
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.realPrice
        }, 0)
        .toFixed(2)
    },
    // 去计算括号中数值的判断
    checkLength() {
      return this.$store.state.carList.filter((item) => item.checked).length
    },
    // 判断是否全选
    isSelectAll() {
      if (this.$store.state.carList.length === 0) return false
      // 1.使用filter函数
      // return !(this.$store.state.carList.filter(item => item.checked === false).length);

      // 2.使用find函数,find()没有找到符合条件的数组成员时返回undefined,并且不再继续执行,性能稍高
      return this.$store.state.carList.find(item => item.checked === false) === undefined
    },
  },
  methods: {
    allClick() {
      if (this.isSelectAll) {
        // 如果全部选中,则将之全部取消
        this.$store.state.carList.forEach(item => item.checked = false);
      } else {
        // 如果部分或全部未选中,则将之全选
        this.$store.state.carList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(this.checkLength == 0) {
        this.$toast.show('请选择购买的商品')
      } else {
        this.$toast.show('不会真有人想结算吧? !')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    font-size: 14px;
    color: #888;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.2);
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-bar .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
