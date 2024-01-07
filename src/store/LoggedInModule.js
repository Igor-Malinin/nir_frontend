export const LoggedInModule = {
  state: () => ({
    loggedIn: false,
    userInfo: {
      sid: "",
      // accessToken: "",
      // expire: "",
      // time: "",
      name: "",
      surname: "",
      photo: "",
      social: "",
      password: "",
      email: "",
      phone: ""
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