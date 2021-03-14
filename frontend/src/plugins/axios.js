/* eslint-disable no-unused-vars */
import Vue from 'vue'
import axios from 'axios'
import { store } from '@/store/index'
import { checkIfTokenNeedsRefresh } from '@/utils/utils.js'
import { checkForUpdates } from '@/utils/updates.js'

axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || process.env.VUE_APP_WEB_API_URL
axios.defaults.headers.common['Accept-Language'] =
  JSON.parse(localStorage.getItem('locale')) || 'en'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cockpit-Token'] =
  '02addf09176edcfd28734398683fa3'

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent // If request is different than any of    the URLS in urlsExcludedForBearerHeader
    // then send Authorization header with   token from localstorage
    const urlsExcludedForBearerHeader = [
      '/login',
      '/forgot',
      '/register',
      '/reset',
      `${window.location.origin}/version.json`
    ]
    if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
      config.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem('token')
      )}`
    }
    return config
  },
  (error) => {
    // Do    something with request error
    return Promise.reject(error)
  }
)
// Add a response interceptor
// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    // Checks if app is being used in mobile
    if (
      response.config.url !== `${process.env.VUE_APP_API_URL}/token` &&
      response.config.url !== `${window.location.origin}/version.json`
    ) {
      checkForUpdates()
      // checkIfTokenNeedsRefresh()
    }
    return response
  },
  (error) => {
    store.commit(
      'ERROR',
      {
        errMsg: error.response.data.error,
        errCode: error.response.status
      },
      { root: true }
    )
    // Do something with response error
    return Promise.reject(error)
  }
)

// eslint-disable-next-line no-shadow
Plugin.install = (Vue) => {
  Vue.axios = axios
  window.axios = axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },
    $axios: {
      get() {
        return axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
