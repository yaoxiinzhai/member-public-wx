// 模块化状态管理
import {
  createStore
} from 'vuex'

import getters from "./getters"
import layout from "./modules/layout"

export default createStore({
  getters,
  modules: {
    layout
  }
})