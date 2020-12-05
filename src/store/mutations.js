/**
 * mutations原则:
 * (1)唯一目的就是修改state中的状态
 * (2)尽可能使每个方法完成的事情单一一点
 */
export default {
  addCounter(state, payLoad) {
    payLoad.count ++
  },
  addToCart(state, payLoad) {
    state.cartList.push(payLoad)
  }
}

