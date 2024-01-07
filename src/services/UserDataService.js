import http from '../http-common'

class UserDataService {
  addUser(data) {
    return http.post('/addUser', data)
  }

  registerUser(data) {
    return http.post('/addUser', data)
  }

  getAllUsers() {
    return http.get('/users')
  }

  getUser(data) {
    return http.post('/getUser', data)
  }

  editUser(data) {
    return http.patch('/editUser', data)
  }
}

export default new UserDataService()