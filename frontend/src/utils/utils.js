import i18n from '@/plugins/i18n'
import * as types from '@/store/mutation-types'
import { format, parseISO } from 'date-fns'
import { store } from '@/store'
import { es, zhCN } from 'date-fns/locale'

const localesDateFns = {
  es,
  cn: zhCN
}
export const getFormat = (date, formatStr) =>
  format(parseISO(date), formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
export const formatErrorMessages = (translationParent, msg) => {
  if (msg.errMsg !== null) {
    const errorArray = []
    // Check for error msgs

    const json = JSON.parse(JSON.stringify(msg))
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map((error) => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`))
      })
    } else {
      // Single error
      errorArray.push({
        errCode: msg.errCode,
        errMsg: i18n.t(`${translationParent}.${msg.errMsg}`)
      })
    }
    return errorArray
  }
  // all good,    return null
  return null
}
// Catches error connection or any other error(checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = ''
  let errCode = ''
  // Resets errors in store
  commit(types.SHOW_LOADING, false, {
    root: true
  })
  commit(types.SHOW_COMPLETED, false, {
    root: true
  })
  commit(types.ERROR, null, {
    root: true
  })
  // Checks if  unauthorized
  if (error.response && error.response.status === 401) {
    errMsg = error.response.data.error
    errCode = error.response.statusText
    setTimeout(
      () =>
        errMsg
          ? commit(
              types.ERROR,
              {
                errMsg,
                errCode
              },
              {
                root: true
              }
            )
          : commit(types.SHOW_ERROR, false, {
              root: true
            }),
      0
    )
    store.dispatch('userLogout')
  } else {
    // Any other error
    errMsg = error.response
      ? error.response.data.error
      : 'SERVER_TIMEOUT_CONNECTION_ERROR'
    errCode = error.response
      ? error.response.statusText
      : 'CODE CANNOT RECEIVED'
    setTimeout(
      () =>
        errMsg
          ? commit(
              types.ERROR,
              {
                errMsg,
                errCode
              },
              {
                root: true
              }
            )
          : commit(types.SHOW_ERROR, false, {
              root: true
            }),
      0
    )
  }
  reject(error)
}
export const buildSuccess = (
  msg,
  commit,
  resolve,
  resolveParam = undefined
) => {
  commit(types.SHOW_LOADING, false, {
    root: true
  })
  commit(types.SUCCESS, null, {
    root: true
  })
  setTimeout(
    () =>
      msg
        ? commit(types.SUCCESS, msg, {
            root: true
          })
        : commit(types.SHOW_SUCCESS, false, {
            root: true
          }),
    0
  )
  commit(types.ERROR, null, {
    root: true
  })
  resolve(resolveParam)
}

