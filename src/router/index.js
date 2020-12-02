import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载技术
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Shopcar = () => import('views/shopcar/Shopcar')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

// 配置路由映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/shopcar',
    component: Shopcar,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router