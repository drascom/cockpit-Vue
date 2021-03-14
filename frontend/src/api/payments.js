import api from 'axios'

const END_POINT = '/api/collections'
export default {
  async all(payload) {
    const params = {
      filter: { ...payload.data },
      limit: 30,
      populate: 0,
      simple: 0,
      sort: {
        status: 1,
        payment_date: -1
      }
    }
    return api.post(`${END_POINT}/get/payments`, params)
  },
  // async completed() {
  //   const params = { filter: { status: true } }
  //   return api.post(`${END_POINT}/get/payments`, params)
  // },
  async save(payload) {
    return api.post(`${END_POINT}/save/payments`, payload).then((res) => {
      return res
    })
  },
  async deleteItem(payload) {
    const params = { filter: { _id: payload._id } }
    return api.post(`${END_POINT}/remove/payments`, params).then((resonse) => {
      return resonse
    })
  }
}
