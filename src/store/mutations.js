/**
 * mutations原则:
 * (1)唯一目的就是修改state中的状态
 * (2)尽可能使每个方法完成的事情单一一点
 */

import { reject } from 'core-js/fn/promise'
import {
  ADD_COUNTER,
  CUT_COUNTER,
  ADD_TO_CAR
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payLoad) {
    payLoad.count ++
  },
  [CUT_COUNTER](state, payLoad) {
      payLoad.count --
  },
  [ADD_TO_CAR](state, payLoad) {
    state.carList.push(payLoad)
  }
}

