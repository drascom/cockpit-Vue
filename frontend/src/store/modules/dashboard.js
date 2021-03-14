/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import apiModule from '@/api/index.js'
import * as types from '@/store/mutation-types'
const getters = {
  messages: (state) => state.sidebar
}
const actions = {}
const mutations = {
  UPDATE_SIDEBAR(state, payload) {
    state.sidebar = payload
  }
}
const state = () => {
  return {
    sidebar: false
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
