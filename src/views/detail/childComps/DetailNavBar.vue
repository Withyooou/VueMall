<template>
  <nav-bar>
    <template v-slot:left>
      <img src="~assets/img/common/back.svg" alt="" @click="backClick">
    </template>
    <template v-slot:center>
      <div v-for="(item, index) in titles"
            :key="item"
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">
        {{item}}
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar,
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style scoped>
  .title-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
