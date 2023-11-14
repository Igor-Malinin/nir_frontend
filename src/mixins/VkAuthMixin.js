import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      textSnip: "",
      APP_ID: 51792289,
      user_id: "",
      NILVENGOR: 514898183,
      VERSION: "5.154",
      loggedIn: false,
      vk_token: "vk1.a.dPZkfgeLBgywbfT4q4CcJmKizV_J8xDLF0APDDqgMGZHU0E8GCrzmo3If3LFpMakVPJxzvCvmTdaVTmvfVjoBw8-RXE4diIpkJN1Zt9YbxJ-5PG8RFipN_Z7LuyK4aakVajRo4rUchM7F2JO1DTtuiob3wx5m1nxKskBGYVk9CnkyORVMs_QE_A_snC1StF3it1k9wikiG73uKu5t2vcFQ",
      senMes: false
    }
  },
  mounted() {
    if (this.$route.hash) {
      this.senMes = true
      this.vk_token = this.$route.hash.slice(this.$route.hash.indexOf('=') + 1, this.$route.hash.indexOf('&'))
      console.log(this.$route.hash.slice(this.$route.hash.indexOf('=') + 1, this.$route.hash.indexOf('&')))
      this.user_id = this.$route.hash.slice(this.$route.hash.indexOf('id=') + 3, this.$route.hash.indexOf('&state'))
      console.log(this.user_id)
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "loggedInMod/setUserInfo",
      setLoggedIn: "loggedInMod/setLoggedIn"
    }),

    async vkAuth() {
      await VK.init({
        apiId: this.APP_ID
      })
      await VK.Auth.revokeGrants()
      await VK.Auth.logout(async resp => {
        console.log(resp)
      })
      await VK.Auth.login(async response => {
        if (response.session) {
          let photoUrl = ""
          VK.Api.call(
            'users.get',
            {
              user_ids: response.session.mid,
              fields: 'photo_200',
              access_token: response.session.sid,
              v: '5.131',
            },
            resp => {
              if (resp.response) {
                const user = resp.response[0];
                photoUrl = user.photo_200;
                this.setLoggedIn(true)
                this.setUserInfo({
                  name: response.session.user.first_name,
                  surname: response.session.user.last_name,
                  photo: photoUrl,
                  social: "vk"
                })
                console.log(this.userInfo)
              } else {
                console.error('Error getting user photo:', resp);
              }
            }
          );
        }
        else if (response.status === 'not_authorized') {
          console.log('User not authorized', response);
        }
        else {
          console.log('Authorization canceled');
        }
      }, VK.access.PHOTOS)
    },

    async vkPost() {
      await VK.Api.call("wall.post", {
        user_id: this.NILVENGOR,
        message: "post from webApp MIS",
        v: this.VERSION
      }, r => {
        console.log(r)
      })

      // await VK.Api.call("messages.send", {
      //   access_token: this.access_token,
      //   user_id: "177264765",
      //   v: this.VERSION,
      //   random_id: "0",
      //   message: "vk API, please dont reply",
      // }, response => {
      //   console.log(response)
      // })
    },
  },
  computed: {
    ...mapState({
      loggedIn: state => state.loggedInMod.loggedIn,
      userInfo: state => state.loggedInMod.userInfo
    }),
    ...mapGetters({
      getLoggedIn: "loggedInMod/getLoggedIn",
      getUserInfo: "loggedInMod/getUserInfo"
    })
  }
}