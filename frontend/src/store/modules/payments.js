/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import apiModule from '@/api/index.js'
import * as types from '@/store/mutation-types'

const state = () => {
    return {
        items: [],
        total: 0
    }
}

const getters = {
    AllPayments: (state) => {
        return state.items
    },
    ReceivedPayments: (state) => {
        return state.items.filter((item) => {
            return item.receiving_done === true && item.status === false
        })
    },
    WaitingPayments: (state) => {
        return state.items.filter((item) => {
            return item.sending_done === true && item.status === false
        })
    },
    CompletedPayments: (state) => {
        return state.items.filter((item) => {
            return item.status === true
        })
    },
    TotalCount: (state, getters) => {
        return getters.AllPayments.length
    },
    WaitingCount: (state, getters) => {
        return getters.WaitingPayments.length
    },
    ReceivedCount: (state, getters) => {
        return getters.ReceivedPayments.length
    },
    CompletedCount: (state, getters) => {
        return getters.CompletedPayments.length
    },
    getItem: (state) => (id) => {
        return state.items.find((item) => item._id === id)
    }
}
const actions = {}
const mutations = {
    SET_ITEMS(state, payload) {
        state.items = payload
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