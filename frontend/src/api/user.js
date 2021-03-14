import Api from 'axios'

const LOGIN_END_POINT = '/api/cockpit/authUser'
const SAVE_END_POINT = '/api/cockpit/saveUser'
const FILES_END_POINT = '/files'
export default {
  userLogin(payload) {
    return Api.post(LOGIN_END_POINT, payload)
  },
  getAvatar(id) {
    console.log(id)
    return Api.get(`${FILES_END_POINT}/${id}`, {
      params: { fields: 'private_hash' }
    })
  },
  saveProfile(payload) {
    return Api.post(SAVE_END_POINT, { user: payload })
  },
  deleteItem(url, id) {
    return Api.delete(`${url}/${id}`)
  }
}
