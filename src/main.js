import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/lazyload.png')
})

// 解决移动端300毫秒延迟
FastClick.attach(document.body)

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
