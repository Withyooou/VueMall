/**
 * mutations原则:
 * (1)唯一目的就是修改state中的状态
 * (2)尽可能使每个方法完成的事情单一一点
 */

import {
  ADD_COUNTER,
  CUT_COUNTER,
  ADD_TO_CAR,
  CLEAR_CAR,
  CHECKED_CHANGE,
  CLEAR_CAR_ITEM
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
  },
  [CLEAR_CAR](state) {
    state.carList = []
  },
  [CHECKED_CHANGE](state, payload) {
    payload.checked = !payload.checked
  },
  [CLEAR_CAR_ITEM](state, payload) {
    state.carList.splice(payload, 1)
  }
}

