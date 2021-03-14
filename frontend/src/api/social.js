import api from 'axios'

const END_POINT = '/api/collections'
export default {
  async all(payload) {
    const params = {
      filter: { ...payload.data },
      populate: 1,
      simple: 0
    }
    return api.post(`${END_POINT}/get/social`, params)
  },
  // async completed() {
  //   const params = { filter: { status: true } }
  //   return api.post(`${END_POINT}/get/customers`, params)
  // },
  async save(payload) {
    return api.post(`${END_POINT}/save/social`, payload).then((res) => {
      return res
    })
  },
  async deleteItem(payload) {
    const params = { filter: { _id: payload._id } }
    return api.post(`${END_POINT}/remove/social`, params).then((res) => {
      return res
    })
  }
}
