import * as types from '@/store/mutation-types'
const getters = {
  showErrorMessage: (state) => state.showErrorMessage,
  errMsg: (state) => state.errMsg,
  errCode: (state) => state.errCode
}
const mutations = {
  [types.ERROR](state, payload) {
    console.log('error js', payload)
    if (payload === null) {
      state.showErrorMessage = false
      state.errMsg = null
    } else {
      state.showErrorMessage = true
      state.errMsg = payload.errMsg
      state.errCode = payload.errCode
    }
  },
  [types.SHOW_ERROR](state, payload) {
    state.showErrorMessage = payload
    if (!payload) {
      state.errCode = null
    }
    if (!payload) {
      state.errMsg = null
    }
  }
}
const state = {
  showErrorMessage: false,
  errMsg: null,
  errCode: null
}
export default {
  state,
  getters,
  mutations
}
