export const SessionsModule = {
  state: () => ({
    vkSession: {
      userId: "",
      accessToken: "",
      expire: "",
      version: 5.199,
    },
    activated: false,
  }),
  getters: {
    getVkSession(state) {
      return state.vkSession
    },
    getActivated(state) {
      return state.activated
    }
  },
  mutations: {
    setVkSession(state, vkSession) {
      state.vkSession = vkSession
    },
    setActivated(state, activated) {
      state.activated = activated
    }
  },
  namespaced: true
}