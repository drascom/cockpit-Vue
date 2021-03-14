/* eslint-disable no-shadow */

const state = {
  search: ''
}
const mutations = {
  setSearch(state, value) {
    state.search = value
  }
}
export default {
  state,
  mutations
}
