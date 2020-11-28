<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- item-icon表示图片插槽, item-text表示文字插槽 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#FF5777'
    }
  },
  data() {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: auto;    /* 弹性元素的属性, 相当于 flex: 1 1 auto(可增可减) */
    font-size: 14px;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    /* 图片的底线会与父盒子的基线对齐,因此下方会出现一定空隙,这一步就是为了消除这个空隙,该属性只适用于行内、行内快元素 */
    vertical-align: middle;  
    margin-bottom: 2px;
  }
</style>
