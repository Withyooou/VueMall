<template>
  <div id="shopcar">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template v-slot:center>
        <div>购物车({{length}})</div> 
      </template>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <scroll class="content" ref="scroll">
      <car-list/>
    </scroll>
    <!-- 底部结算模块 -->
    <car-bottom-bar/>
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
  .content {
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }
</style>
