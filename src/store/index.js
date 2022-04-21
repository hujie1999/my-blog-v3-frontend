import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import { randomId } from '../utils/randomid'

Vue.use(Vuex)

let state = {
  UserInfo: localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")) : {
      islogin: false,
      token: '',
      nickname: '游客'+randomId(10),
      role: 'Tourist',
      account: randomId(15),
      uniqueid: randomId(16),
      avatar: ''
  },
  //搜索关键字
  keywords:'',
  //用户未读信息条数
  unreadnoticount:0
}
let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
