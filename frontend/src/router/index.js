/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import routes from '@/router/routes'
import { store } from '@/store'
import { checkIfTokenNeedsRefresh } from '@/utils/utils.js'
import { checkForUpdates } from '@/utils/updates.js'
import * as types from '@/store/mutation-types'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  checkForUpdates()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const { isTokenSet } = store.getters
  if (requiresAuth && !isTokenSet) {
    return next('/login')
  }
  // checkIfTokenNeedsRefresh()
  // store.commit(types.SUCCESS, null)
  // store.commit(types.ERROR, null)
  store.commit('UPDATE_SIDEBAR', false)
  return next()
})

export default router
