<template>
  <div class="bottom-bar">
    <check-button class="select-all"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "CarBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.carList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.realPrice
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.carList.filter(item => item.checked).length
      },
      isSelectAll() {
        // find()没有找到符合条件的数组成员时返回undefined
        return this.$store.state.carList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      // checkBtnClick: function () {
      //   // 1.判断是否有未选中的按钮
      //   let isSelectAll = this.$store.getters.this.$store.state.carList.find(item => !item.checked);

      //   // 2.有未选中的内容, 则全部选中
      //   if (isSelectAll) {
      //     this.$store.state.this.$store.state.carList.forEach(item => {
      //       item.checked = true;
      //     });
      //   } else {
      //     this.$store.state.this.$store.state.carList.forEach(item => {
      //       item.checked = false;
      //     });
      //   }
      // }
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
    box-shadow: 0 -2px 1px rgba(0, 0, 0, .2);
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
