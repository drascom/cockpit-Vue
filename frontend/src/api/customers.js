import api from 'axios'

const END_POINT = '/api/collections'
export default {
  async all(payload) {
    const params = {
      sort: {
        _created: -1
      },
      ...payload.data,
      limit: null,
      // skip: 0,
      populate: 0,
      simple: 0
    }
    return api.post(`${END_POINT}/get/customers`, params)
  },
  // async completed() {
  //   const params = { filter: { status: true } }
  //   return api.post(`${END_POINT}/get/customers`, params)
  // },
  async save(payload) {
    return api.post(`${END_POINT}/save/customers`, payload).then((res) => {
      return res
    })
  },
  async deleteItem(payload) {
    const params = { filter: { _id: payload._id } }
    return api.post(`${END_POINT}/remove/customers`, params).then((res) => {
      return res
    })
  }
}
