import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 2.创建store对象
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 3.挂载在Vue实例上
export default store