/**
 * actions中除了执行异步操作以外,也可以执行一些较为复杂的逻辑处理操作
 */

import {
  ADD_COUNTER,
  ADD_TO_CAR
} from './mutation-types'

export default {
  addCar(context, payLoad) {
    
    // let oldProduct = null;
    // for(let item of state.carList) {
    //   if(item.iid === payLoad.iid) {
    //     oldProduct = item;
    //   }
    // }

    return new Promise((resolve, reject) => {
      // 1.根据iid判断是否添加过该商品(find用于找出第一个符合条件的数组成员)
      const oldProduct = context.state.carList.find(item => item.iid === payLoad.iid)

      // 2.拆分成两个mutations,这样以来就可以在插件中清晰地看出是新增了商品还是旧商品添加了数量不存在
      if (oldProduct) {
        // 若oldProduct不为null,证明商品存在; 此时商品数量+1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量 +1')
      } else {
        // 若oldProduct为null,证明商品不存在; 此时为payLoad新增属性count,并赋值为1(确保每件商品添加进来的初始count均为1)
        payLoad.count = 1
        payLoad.checked = true
        context.commit(ADD_TO_CAR, payLoad)
        resolve('添加商品成功')
      }
    })
  }
}