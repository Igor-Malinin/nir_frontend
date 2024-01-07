import {mapGetters, mapMutations, mapState} from "vuex";
import UserDataService from "@/services/UserDataService";

export default {
  data() {
    return {
      textSnip: "",
      APP_ID: 51792289,
      VERSION: "5.154",
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
      })
      await VK.Auth.login(async response => {
        if (response.session) {
          let photoUrl = ""
          VK.Api.call('users.get', {
              user_ids: response.session.mid,
              fields: 'photo_200',
              access_token: response.session.sid,
              v: '5.131',
            },
            resp => {
              if (resp.response) {
                console.log(response)
                const user = resp.response[0];
                photoUrl = user.photo_200;
                this.setLoggedIn(true)
                this.setUserInfo({
                  sid: response.session.user.id,
                  // accessToken: response.session.sid,
                  // expire: response.session.expire,
                  // time: +(new Date()),
                  name: response.session.user.first_name,
                  surname: response.session.user.last_name,
                  photo: photoUrl,
                  social: "vk"
                })
                UserDataService.addUser(this.getUserInfo).then(response => {
                  console.log(response)
                })
                console.log(this.userInfo)
              } else {
                console.error('Error getting user photo:', resp);
              }
            }
          );
        }
        else if (response.status === 'not_authorized') {
          console.error('User not authorized', response);
        }
        else {
          console.error('Authorization canceled');
        }
      }, VK.access.PHOTOS | VK.access.WALL)
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