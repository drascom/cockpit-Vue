import api from 'axios'

const END_POINT = '/api/collections'
export default {
  async all(payload) {
    const params = {
      filter: payload.data,
      sort: {
        status: 1,
        populate: 1,
        limit: 50,
        _modified: -1
      }
    }
    return api.post(`${END_POINT}/get/activities`, params)
  },
  async waiting() {
    const params = {
      filter: { status: false },
      limit: 50,
      _modified: -1
    }
    return api.post(`${END_POINT}/get/activities`, params)
  },
  async completed() {
    const params = {
      filter: { status: true },
      limit: 50,
      _modified: -1
    }
    return api.post(`${END_POINT}/get/activities`, params)
  },
  async save(payload) {
    return api.post(`${END_POINT}/save/activities`, payload).then((res) => {
      return res
    })
  },
  async deleteItem(payload) {
    const params = { filter: { _id: payload._id } }
    return api
      .post(`${END_POINT}/remove/activities`, params)
      .then((resonse) => {
        return resonse
      })
  }
}
