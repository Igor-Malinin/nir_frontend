import http from '../http-common'

class UserDataService {
  addAuth(data) {
    return http.post('/addAuth', data)
  }

  updateToken(id) {
    return http.patch(`/updateToken/${id}`)
  }

  uploadPost(data) {
    return http.post(`/uploadPost`, data)
  }

  postImage(data) {
    return http.post('/image', data)
  }
}

export default new UserDataService()