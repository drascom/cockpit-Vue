/* eslint-disable no-shadow */
import api from 'axios'

const PHOTO_END_POINT = 'api/cockpit'

const state = () => {
  return {
    uploadProgress: 0,
    params: ''
  }
}
const getters = {
  uploadProgress: (state) => state.uploadProgress
}

const mutations = {
  SET_PROGRESS(state, payload) {
    state.uploadProgress = payload
  },
  SET_PARAMS(state, payload) {
    state.params = payload
  }
}
const actions = {
  saveImage({ commit }, payload) {
    const config = {
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        commit('SET_PROGRESS', percentCompleted)
      }
    }
    return api
      .post(`${PHOTO_END_POINT}/addAssets`, payload, config)
      .then((res) => {
        return res
      })
  },
  deleteFile({ commit }, payload) {
    const parametre = {
      assets: [payload]
    }
    commit('SET_PARAMS', parametre)
    return api
      .post(`${PHOTO_END_POINT}/removeAssets`, parametre)
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
