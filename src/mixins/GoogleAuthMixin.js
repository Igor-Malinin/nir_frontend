import {mapGetters, mapMutations, mapState} from "vuex";
import UserDataService from "@/services/UserDataService";

export default {
  data() {
    return {
      CLIENT_ID: '918711322163-ud06rp13o8a6p9j87c0mfo7t3unrmdb8.apps.googleusercontent.com',
      API_KEY: 'AIzaSyA5HPFjuJ0KnQ-fSeJF0KPBxgqQ9V-5O00',
      DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
      SCOPES: 'https://www.googleapis.com/auth/gmail.readonly',
      SCOPESdocs: 'https://www.googleapis.com/auth/documents.readonly',
    }
  },
  mounted() {
    this.googleAuth()
  },
  updated() {

  },
  methods: {
    ...mapMutations({
      setUserInfo: "loggedInMod/setUserInfo",
      setLoggedIn: "loggedInMod/setLoggedIn"
    }),

    async googleAuth() {
      await google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: response => {
          console.log(response)
          let resp = this.decodeJwtResponse(response.credential).payload
          console.log(resp)
          this.setLoggedIn(true)
          this.setUserInfo({
            sid: resp.sub,
            // accessToken: resp.azp,
            // expire: resp.exp,
            // time: +(new Date()),
            name: resp.given_name,
            surname: resp.family_name,
            photo: resp.picture,
            email: resp.email,
            social: "google"
          })
          UserDataService.addUser(this.getUserInfo).then(response => {
            console.log(response)
          })
        }
      });
      await google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin',
        locale: "en",
        width: "80"
      })
    },
    decodeJwtResponse(t) {
      let token = {};
      token.raw = t;
      token.header = JSON.parse(window.atob(t.split('.')[0]));

      var base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      token.payload = JSON.parse(jsonPayload);
      return (token)
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