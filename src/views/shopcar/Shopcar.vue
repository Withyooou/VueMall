<template>
  <div id="shopcar">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template v-slot:center>
        <div>购物车({{length}})</div> 
        <img src="~assets/img/car/broom.svg" alt="" class="sweep" @click="sweepClick">
      </template>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <scroll class="wrapper" ref="scroll">
      <car-list/>
    </scroll>
    <!-- 底部结算模块 -->
    <car-bottom-bar/>
    <!-- ActionSheet动作面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import NavBar from 'components/common/navbar/NavBar'
import CarList from './childComps/CarList'
import CarBottomBar from './childComps/CarBottomBar'

export default {
  name: "Shopcar",
  components: {
    Scroll,
    NavBar,
    CarList,
    CarBottomBar
  },
  data() {
    return {
      show: false,
      delId: '',
      actions: [
        { 
          name: '删除',
          color: '#FF8198'
        }, 
        { 
          name: '找相似' 
        }
      ]
    }
  },
  computed: {
    // mapGetters用于将store中的getters映射到局部计算属性computed
    // 用法一：数组用法
    // ...mapGetters(['carList','carLength'])

    // 用法二：对象用法,可以重新指定计算属性的名称
    ...mapGetters({
      length: 'carLength',
      list: 'carList'
    })
  },
  // 需要有keep-alive时才有该方法
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    sweepClick() {
      this.$dialog.confirm({
        title: '',
        message: '确认清空购物车？',
      })
      .then(() => {
        // on confirm
        this.$store.commit('clear_car')
        this.$toast.show('购物车已清空')
      })
      .catch(() => {
        // on cancel
      });
      
    },
    longPressHandle(value) {
      this.show = true
      this.delId = value
    },
    onCancel() {
      this.show = false;
      // this.$toast.show('取消');
    },
    onSelect(item, index) {
      // 默认情况下点击选项时不会自动收起,html中已通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if(index === 0) {
        // 删除
        // findIndex()找出第一个符合条件的数组成员的索引位置,如果没有找到则返回 -1 
        this.$store.commit('clear_car_item', this.$store.state.carList.findIndex(item => item.iid === this.delId))
      } else {
        // 找相似
        this.$router.push('/category')
      }
    },
  },
  mounted() {
    // 第二个参数需要是一个函数
    this.$bus.$on('longPress', this.longPressHandle)
  }
}
</script>

<style scoped>
  #shopcar {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .wrapper {
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }
  .sweep {
    width: 20px;
    position: absolute;
    left: 70%;
    cursor: pointer;
  }
</style>
