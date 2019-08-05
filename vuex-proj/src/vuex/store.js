import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// state store的数据
const state = {
  count: 0
}
// // 使用getters来获取state,相当于state的计算属性
// const getters = {
//   getterCount (state, n = 0) {
//     return (state.count += n)
//   }
// }
// mutations 修改state中的数据，组件中使用commit触发
// mutations的第一个参数是state
const mutations = {
  mutationsAddCount (state, n = 0) {
    return (state.count += n)
  },
  mutationsReduceCount (state, n = 0) {
    return (state.count -= n)
  }
}
// actions 异步修改state中的数据，组件中使用dispatch触发
// actions的第一个参数是context
const actions = {
  actionsAddCount (context, n = 0) {
    return (state.count += n)
  },
  actionsReduceCount (context, n = 0) {
    return (state.count -= n)
  }
}

export default new Vuex.Store({
  state,
  // getters,
  mutations,
  actions
})
