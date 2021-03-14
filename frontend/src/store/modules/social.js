/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = () => {
  return {
    items: [],
    found: '',
    total: 0
  }
}
const getters = {
  socialData: (state) => {
    return state.found
  },
  items: (state) => {
    return state.items
  }
}
const actions = {}
const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
    state.total = payload.length
    if (payload && payload[0]) {
      state.found = payload[0]
    }
  },
  SET_FOUND(state, payload) {
    state.found = payload
    state.total = payload.length
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
