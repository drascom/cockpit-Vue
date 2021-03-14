import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/api/user.js'
import { buildSuccess, handleError } from '@/utils/utils.js'
import { addMinutes, format } from 'date-fns'
const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440
const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isTokenSet: (state) => state.isTokenSet
}
const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      commit(types.SHOW_COMPLETED, true)
      api
        .userLogin(payload)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem('user', JSON.stringify(response.data))
            window.localStorage.setItem('xf', JSON.stringify(payload.password))
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.api_key)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  't'
                )
              )
            )
            commit(types.SAVE_USER, response.data)
            commit(types.SET_LOCALE, response.data.i18n)
            commit(types.SAVE_TOKEN, response.data.api_key)
            buildSuccess('login.LOGGED_IN', commit, resolve, router.push('/'))
          }
        })
        .catch((error) => {
          console.log('login error', error)
          handleError(error, commit, reject)
        })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .refreshToken()
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.api_key)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  't'
                )
              )
            )
            commit(types.SAVE_TOKEN, response.data.api_key)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  autoLogin({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SAVE_USER, user)
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiration')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('locale')
    commit(types.LOGOUT)
    if (router.currentRoute.name !== 'login') {
      router.push({
        name: 'login'
      })
    }
  }
}
const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state) {
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    state.user = user
  }
}
const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  isTokenSet: !!localStorage.getItem('token')
}
export default {
  state,
  getters,
  actions,
  mutations
}
