/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const getters = {
  AllActivities: (state) => {
    return state.items
  }
}
const state = () => {
  return {
    items: [],
    messages: [],
    total: 0
  }
}
const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
  SET_MESSAGES(state, payload) {
    if (payload.data.messages) {
      state.messages = payload
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
