/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import api from '@/api/user.js'

const state = () => {
    return {
        item: '',
        total: 0
    }
}
const getters = {
    member: (state) => {
        return state.item
    }
}
const actions = {
    getOneItem({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api
                .getOne(payload)
                .then((res) => {
                    console.log(res)
                    commit('user/SET_ITEM', res.data, { root: true })
                    resolve()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
}
const mutations = {
    SET_ITEM(state, payload) {
        state.item = payload[0]
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