import {Base64} from "js-base64";
import vkMethodsMixin from "@/mixins/VkMethodsMixin";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  mixins: [vkMethodsMixin],
  data() {
    return {
      CLIENT_ID: '918711322163-ud06rp13o8a6p9j87c0mfo7t3unrmdb8.apps.googleusercontent.com',
      API_KEY: 'AIzaSyA5HPFjuJ0KnQ-fSeJF0KPBxgqQ9V-5O00',
      DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
      SCOPES: 'https://www.googleapis.com/auth/gmail.readonly',
      tokenClient: null,
      gapiInited: false,
      gisInited: false,
      messagesResponse: [],
      messagesSubjects: [],
      intervalId: null,
    }
  },
  mounted() {
    // document.getElementById('authorize_button').style.visibility = 'hidden';
    // document.getElementById('signout_button').style.visibility = 'hidden';
    this.gapiLoaded()
    this.gisLoaded()
  },
  updated() {
    // document.getElementById('authorize_button').style.visibility = 'hidden';
    // document.getElementById('signout_button').style.visibility = 'hidden';
    this.gapiLoaded()
    this.gisLoaded()
  },
  methods: {
    ...mapMutations({
      setServiceAuth: "createMis/setServiceAuth",
      setActivated: "sessions/setActivated",
      setIntervalId: "createMis/setIntervalId",
      setLastMessageId: "createMis/setLastMessageId",
      setMessageFrom: "createMis/setMessageFrom"
    }),
    gapiLoaded() {
      gapi.load('client', this.initializeGapiClient);
    },

    async initializeGapiClient() {
      await gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      });
      this.gapiInited = true;
      // this.maybeEnableButtons();
    },

    gisLoaded() {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        callback: (resp) => {
          // document.getElementById('signout_button').style.visibility = 'visible';
          // document.getElementById('authorize_button').innerText = 'Refresh';
          this.setServiceAuth('gmail')
          // this.listMessages()
          setTimeout(() => {
            document.querySelector("#gmail").classList.add('auth-slide-in')
          }, 10)
          this.$emit("updateError")
        }
      });
      this.gisInited = true;
      // this.maybeEnableButtons();
    },

    maybeEnableButtons() {
      if (this.gapiInited && this.gisInited) {
        // document.getElementById('authorize_button').style.visibility = 'visible';
      }
    },
    gmailAuth() {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        this.tokenClient.requestAccessToken({prompt: ''});
      }
    },

    handleSignoutClick() {
      const token = gapi.client.getToken();
      if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken(null);
        // document.getElementById('content').innerText = '';
        // document.getElementById('authorize_button').innerText = 'Авторизоваться';
        // document.getElementById('signout_button').style.visibility = 'hidden';
      }
    },

    startListening() {
      this.setActivated(true)
      this.setIntervalId(setInterval(() => {this.listMessages()}, 10000))
    },

    stopListening() {
      clearInterval(this.getIntervalId)
      this.setActivated(false)
      console.log('stopped')
    },

    async listMessages() {
      try {
        await gapi.client.gmail.users.messages.list({
          'userId': 'me',
          'includeSpamTrash': false,
          'labelIds': ['INBOX'],
          'maxResults': 2,
          'q': `from:${this.getMessageFrom}`
        }).then(async messages => {
          this.messagesResponse = []
          for (let message of messages.result.messages) {
            await gapi.client.gmail.users.messages.get({
              'userId': 'me',
              'id': message.id,
              'format': 'full',
              'metadataHeaders': ['From', 'Subject']
            }).then(message => {
              this.messagesResponse.push(message)
            })
          }
          console.log(this.messagesResponse)
          if (+(new Date()) - parseInt(this.messagesResponse[0].result.internalDate) <= 50000 && this.getLastMessageId !== this.messagesResponse[0].result.id) {
            if (this.messagesResponse[0].result.payload.mimeType === "multipart/alternative") {
              this.vkWallPost.message = this.messagesResponse[0].result.payload.parts
                  .filter(part => part.mimeType === 'text/plain')[0].body.data
                  .replace(/-/g, '+').replace(/_/g, '/')
            }
            else if (this.messagesResponse[0].result.payload.mimeType === "multipart/mixed") {
              this.vkWallPost.message = this.messagesResponse[0].result.payload.parts
                  .filter(part => part.mimeType === 'multipart/alternative')[0].parts
                  .filter(part => part.mimeType === 'text/plain')[0].body.data
                  .replace(/-/g, '+').replace(/_/g, '/')
              await gapi.client.gmail.users.messages.attachments.get({
                'userId': 'me',
                'messageId': this.messagesResponse[0].result.id,
                'id': this.messagesResponse[0].result.payload.parts[1].body.attachmentId,
              }).then(attachment => {
                console.log(attachment)
                this.vkWallPost.photoName = this.messagesResponse[0].result.payload.parts[1].filename
                this.vkWallPost.photoPath = 'data:image/jpeg;base64,' + attachment.result.data.replace(/-/g, '+').replace(/_/g, '/').replace('\n', '').replace('\r', '')
              })
            }
            console.log(+(new Date()) - parseInt(this.messagesResponse[0].result.internalDate))
            console.log(this.getVkWallPost)
            this.setLastMessageId(this.messagesResponse[0].result.id)

            await this.vkPostWall()
          }
          else {
            this.setVkWallPost({userId: "", message: "", photoName: "", photoPath: ""})
          }
        })
        //   let img = new Image()
        //   img.src = 'data:image/jpeg;base64,' + attachment.result.data.replace(/-/g, '+').replace(/_/g, '/').replace('\n', '').replace('\r', '')
        //   document.querySelector('#image').appendChild(img)
        // this.messagesResponse.sort((a, b) => parseInt(b.result.internalDate) - parseInt(a.result.internalDate))
        // console.log(
        //     Base64.decode(
        //       this.messagesResponse[0].result.payload.parts
        //         .filter(part => part.mimeType === 'text/plain')[0].body.data
        //         .replace(/-/g, '+').replace(/_/g, '/')
        //     )
        // )
        //   let str = decodeURIComponent(Array.prototype.map.call(atob(responseAttachment.result.data.replace(/-/g, '+').replace(/_/g, '/')), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
          // document.querySelector('#iframe').contentWindow.document.write(str)
      }
      catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    ...mapGetters({
      getActivated: "sessions/getActivated",
      getIntervalId: "createMis/getIntervalId",
      getLastMessageId: "createMis/getLastMessageId",
      getMessageFrom: "createMis/getMessageFrom"
    })
  }
}