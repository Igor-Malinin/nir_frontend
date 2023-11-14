export const LoggedInModule = {
  state: () => ({
    loggedIn: false,
    userInfo: {
      name: "",
      surname: "",
      photo: "",
      social: ""
    }
  }),
  getters: {
    getLoggedIn(state) {
      return state.loggedIn
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  namespaced: true
}