<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar
  },
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      console.log(res);
      // 获取轮播图数据
      this.banner = res.data.banner.list;
      // 获取轮播图下面的推荐数据;
      this.recommend = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
