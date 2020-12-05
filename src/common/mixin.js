import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'

// 解决不同页面调用GoodsListItem组件时,this.$bus.$emit('itemImageLoad')相互冲突的问题
export const itemLinstenerMixin = {
  data() {
    return {
      itemImageListener: null,
      dbRefresh: null
    }
  },
  mounted() {
    // 监听GoodsListItem中图片加载完成
    this.dbRefresh = debounce(this.$refs.scroll.refresh, 50)
    // 对监听的事件进行保存
    this.itemImageListener = () => {
      this.dbRefresh()
    }
    // 监听全局总线事件(注意第2个参数必须是个函数)
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    console.log('mixin的内容')
  }
}

// 回到顶部
export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}
