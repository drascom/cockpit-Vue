/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import apiModule from '@/api/index.js'
import { buildSuccess, handleError } from '@/utils/utils.js'
import * as types from '@/store/mutation-types'
// initial state
const state = () => {}
    // initial getters
const getters = {
        // sampleFilter: (state) => {
        //   return state.items.filter((item) => {
        //     return item.kritik_miktar >= item.stok
        //   })
        // },
        // items: (state) => {
        //   return state.items.sort((a, b) => {
        //     return a.name < b.name
        //   })
        // },
        // getItem: (state) => (id) => {
        //   return state.items.find((item) => item._id === id)
        // },
        // total: (state) => {
        //   return state.total
        // },
        // messages: (state) => state.messages
    }
    // initial actions
const actions = {
    getAllItems({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit(types.SHOW_LOADING, true, { root: true })
            apiModule[payload.name]
                .all(payload)
                .then((res) => {
                    commit(types.SHOW_COMPLETED, true, { root: true })
                    commit(`${payload.name}/SET_ITEMS`, res.data.entries, { root: true })
                    commit(`${payload.name}/SET_TOTAL`, res.data.total, { root: true })
                    resolve()
                })
                .catch((error) => {
                    handleError(error, commit, reject)
                })
        })
    },
    getSearchedItems({ commit }, payload) {
        commit(types.SHOW_LOADING, true, { root: true })
        return apiModule[payload.name]
            .all(payload)
            .then((res) => {
                commit(types.SHOW_COMPLETED, true, { root: true })
                commit(`${payload.name}/SET_FOUND`, res.data.entries, { root: true })
                commit(`${payload.name}/SET_TOTAL`, res.data.total, { root: true })
                return res
            })
            .catch((error) => {
                handleError(error, commit)
            })
    },
    save({ commit, dispatch }, payload) {
        commit(types.SHOW_LOADING, true, { root: true })
        return apiModule[payload.name].save(payload).then((res) => {
            commit(types.SHOW_COMPLETED, true, { root: true })
            dispatch('getAllItems', {
                name: payload.name
            })
            return res
        })
    },
    saveSingle({ commit }, payload) {
        commit(types.SHOW_LOADING, true, { root: true })
        return apiModule[payload.name].saveSingle(payload).then((res) => {
            commit(types.SHOW_COMPLETED, true, { root: true })
            return res
        })
    },
    delete({ commit, dispatch }, payload) {
        commit(types.SHOW_LOADING, true, { root: true })
        return apiModule[payload.name].deleteItem(payload.data).then((res) => {
            commit(types.SHOW_COMPLETED, true, { root: true })
            dispatch('getAllItems', {
                name: payload.name
            })
            return res
        })
    },
    deleteAll({ dispatch }, payload) {
        Promise.all(
            payload.data.map((item) => {
                return apiModule[payload.name].deleteItem(item.id)
            })
        ).finally(() => {
            dispatch('getAllItems', { name: payload.name })
            return true
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions
}