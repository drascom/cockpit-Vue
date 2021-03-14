import * as types from '@/store/mutation-types'
import api from '@/api/user.js'
import { buildSuccess, handleError } from '@/utils/utils.js'
const getters = {
  profile: (state) => state.profile
}
const actions = {
  changeMyPassword({ commit }, payload) {
    const currentpassword = JSON.parse(localStorage.getItem('xf'))
    if (currentpassword === payload.oldPassword) {
      return new Promise((resolve, reject) => {
        commit(types.SHOW_LOADING, true, { root: true })
        api
          .saveProfile({
            _id: payload._id,
            password: payload.password
          })
          .then((response) => {
            if (response.status === 200) {
              commit(types.SHOW_COMPLETED, true, { root: true })
              buildSuccess('myProfile.PASSWORD_CHANGED', commit, resolve)
            }
          })
          .catch((error) => {
            handleError(error, commit, reject)
          })
      })
    }
    return false
  },
  getProfile({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.FILL_PROFILE, user)
  },
  saveProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .saveProfile(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data)
            const currentuser = JSON.parse(localStorage.getItem('user'))
            currentuser.name = response.data.name
            currentuser.email = response.data.email
            currentuser.i18n = response.data.i18n
            window.localStorage.setItem('user', JSON.stringify(currentuser))
            commit(types.SAVE_USER, currentuser)
            commit(types.SET_LOCALE, response.data.i18n)
            buildSuccess(
              'myProfile.PROFILE_SAVED_SUCCESSFULLY',
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  addProfileData({ commit }, data) {
    commit(types.ADD_PROFILE_DATA, data)
  }
}
const mutations = {
  [types.FILL_PROFILE](state, data) {
    state.profile.name = data.name
    state.profile.email = data.email
    state.profile._id = data._id
    state.profile.i18n = data.i18n
  },
  [types.ADD_PROFILE_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.profile.name = data.value
        break
      case 'email':
        state.profile.email = data.value
        break
      case 'i18n':
        state.profile.i18n = data.value
        break
      default:
        break
    }
  }
}
const state = {
  profile: {
    verified: false,
    name: '',
    email: '',
    i18n: ''
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}