<template>
  <!-- 封装滚动组件 -->
  <div class="wrapper" ref="wrapper">
    <!-- wrapper里面只能放一个元素，就是滚动的 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0    // 默认是0,不监听滚动
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      useTransition: false  // 是否使用CSS3 transition动画,如果设置为false,则使用requestAnimationFrame做动画
    })

    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }
    
    // 3.监听滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 当上拉加载事件完成后,调用此方法,才可以进行下一次加载更多
    finishPullUp() {
      console.log('已加载更多数据!')
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // 只有当this.scroll创建完成后,才会执行this.scroll.refresh()
      // 防止出现this.scroll还未创建完毕,Home组件就调用refresh()方法,这种情况会报错
      this.scroll && this.scroll.refresh()
      console.log('调用refresh')
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
