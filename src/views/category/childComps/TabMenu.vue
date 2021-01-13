<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="tab-menu-item"
          v-for="(item, index) in categories"
          :class="{active: index === currentIndex}"
          :key="index"
          @click="itemClick(index)">
      {{item.title}}
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

	export default {
		name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    },
    activated() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 300)
    }
	}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }
  .tab-menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .tab-menu-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
