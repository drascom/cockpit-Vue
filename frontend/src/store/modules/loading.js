import * as types from '@/store/mutation-types'
const getters = {
  showLoading: (state) => state.showLoading,
  completed: (state) => state.completed
}
const mutations = {
  [types.SHOW_LOADING](state, value) {
    state.showLoading = value
  },
  [types.SHOW_COMPLETED](state, value) {
    state.completed = value
  }
}
const state = {
  showLoading: false,
  completed: false
}
export default {
  state,
  getters,
  mutations
}
