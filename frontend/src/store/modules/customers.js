/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = () => {
    return {
        items: [],
        found: [],
        total: 0
    }
}
const getters = {
    AllCustomers: (state) => {
        return state.items
    },
    ActiveCustomers: (state) => {
        return state.items.filter((item) => {
            return item.receiving_done === true && item.status === false
        })
    },
    DeactiveCustomers: (state) => {
        return state.items.filter((item) => {
            return item.sending_done === true && item.status === false
        })
    },
    TotalCount: (state, getters) => {
        return getters.AllCustomers.length
    },
    ActiveCount: (state, getters) => {
        return getters.ActiveCustomers.length
    },
    PassiveCount: (state, getters) => {
        return getters.DeactiveCustomers.length
    },
    getItem: (state) => (id) => {
        return state.items.find((item) => item._id === id)
    }
}
const actions = {}
const mutations = {
    SET_ITEMS(state, payload) {
        state.items = payload
        state.total = payload.length
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