<template>
  <div id="category">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template v-slot:center>
        <div>商品分类</div> 
      </template>
    </nav-bar>

    <div class="content">
      <!-- 左侧商品分类目录 -->
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <!-- 右侧商品分类数据 -->
      <scroll class="tab-content" 
              ref="scroll" 
              :probe-type="3"
              @scroll="contentScroll">
        <tab-content-category :subcategories="showSubcategory"/>
        <tab-control :titles="['综合', '新品', '销量']" @tabControl="tabControl"/>
        <tab-content-detail :category-detail="showCategoryDetail"/>
      </scroll>
    </div>
    
    <!-- 返回顶部组件 -->
    <back-top @click.native="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll.vue';
import TabControl from 'components/content/tabcontrol/TabControl';
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory';
import TabContentDetail from './childComps/TabContentDetail'

import { POP, SELL, NEW } from "common/const";
import { itemLinstenerMixin, backTopMixin } from 'common/mixin'
import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'


export default {
  name: "Category",
  mixins: [itemLinstenerMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      tabControlIndex: 0,
      currentType: 'pop',
    }
  },
  components: {
    Scroll,
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据(categoryData本身是一个对象,里面存放着一个数组,每个数组成员本身又是一个对象)
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的详细数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      // 获取请求的mailKey
      const mailKey = this.categories[index].maitKey;
      // 发送请求,传入mailKey
      getSubcategory(mailKey).then(res => {
        // 将获取的数据保存下来
        this.categoryData[index].subcategories = res.data
        // 扩展运算符拷贝对象
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(NEW)
        this._getCategoryDetail(SELL)
      })
    },
    _getCategoryDetail(type) {
      // 获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        // 扩展运算符拷贝对象
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)
      })
    },
    /**
     * 事件响应相关方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    },
    tabControl(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    contentScroll(position) {
      // 判断backTop是否显示
      this.showBackTop = (-position.y) > 1000
    }
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    // 请求所有分类数据
    this._getCategory()
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
  }
  .tab-content {
    height: 100%;
    overflow: hidden;
    flex: 1;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style>
