import vkAuthMixin from "@/mixins/VkAuthMixin";
import VkMethodsService from "@/services/VkMethodsService";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  mixins: [vkAuthMixin],
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations({
      setVkSession: "sessions/setVkSession",
      setServiceAuth: "createMis/setServiceAuth",
      setVkWallPost: "createMis/setVkWallPost"
    }),
    async vkPostWall() {
      this.vkWallPost.userId = this.getVkSession.userId
      await VkMethodsService.uploadPost(this.getVkWallPost)
    },
    async vkMethodsAuth() {
      await VK.init({
        apiId: this.APP_ID,
      })
      // await VK.Auth.revokeGrants()
      // await VK.Auth.logout()
      await VK.Auth.login(async response => {
        if (response.session) {
          let session = {
            userId: response.session.mid,
            accessToken: response.session.sid,
            expire: response.session.expire,
            version: "5.199"
          }
          this.setVkSession(session)
          this.setServiceAuth('vk')
          console.log(this.getVkSession)
          console.log(this.getServices)
          await VkMethodsService.addAuth(this.getVkSession).then(r => console.log(r))
          setTimeout(() => {
            document.querySelector("#vk").classList.add('auth-slide-in')
          }, 10)
          this.$emit("updateError")
        }
      }, VK.access.WALL | VK.access.PHOTOS)
    }
  },
  computed: {
    ...mapState({
      vkSession: state => state.sessions.vkSession,
      vkWallPost: state => state.createMis.vkWallPost
    }),
    ...mapGetters({
      getVkSession: "sessions/getVkSession",
      getServices: "createMis/getServices",
      getVkWallPost: "createMis/getVkWallPost"
    })
  }
}