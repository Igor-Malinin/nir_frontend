import axios from "axios";

export default {
  data() {
    return {
      access_token: "",
      userData: {
        name: "",
        surname: "",
        email: "",
        picture: "",
      },
      CLIENT_ID: '918711322163-ud06rp13o8a6p9j87c0mfo7t3unrmdb8.apps.googleusercontent.com',
      API_KEY: 'AIzaSyA5HPFjuJ0KnQ-fSeJF0KPBxgqQ9V-5O00',

      DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
      SCOPES: 'https://www.googleapis.com/auth/gmail.readonly',

      tokenClient: "",
      gapiInited: false,
      gisInited: false,
      authBtnVisibility: false,
      signoutBtnVisibility: false
    }
  },
  mounted() {
    this.gapiLoaded()
    this.gisLoaded()
  },
  methods: {
    googleAuth() {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: '918711322163-ud06rp13o8a6p9j87c0mfo7t3unrmdb8.apps.googleusercontent.com',
        callback: async (tokenResponse) => {
          console.log(tokenResponse)
          this.access_token = tokenResponse.access_token
          if (google.accounts.oauth2.hasGrantedAllScopes(tokenResponse,
            'https://www.googleapis.com/auth/documents.readonly')) {
            console.log('here')
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
            this.loggedIn = true
            console.log(response)
            this.userData = {
              name: response.data.given_name,
              surname: response.data.family_name,
              email: response.data.email,
              picture: response.data.picture
            }
          }
        },
        scope: 'https://www.googleapis.com/auth/documents.readonly',
      })
      client.requestAccessToken()
    },

    gapiLoaded() {
      gapi.load('client', this.initializeGapiClient);
    },

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async initializeGapiClient() {
      await gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      });
      this.gapiInited = true;
      this.maybeEnableButtons();
    },

    /**
     * Callback after Google Identity Services are loaded.
     */
    gisLoaded() {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        callback: '', // defined later
      });
      this.gisInited = true;
      this.maybeEnableButtons();
    },

    /**
     * Enables user interaction after all libraries are loaded.
     */
    maybeEnableButtons() {
      if (this.gapiInited && this.gisInited) {
        this.authBtnVisibility = true
      }
    },

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
      this.tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw (resp);
        }
        this.authBtnVisibility = false
        this.signoutBtnVisibility = true
        document.getElementById('authorize_button').innerText = 'Refresh';
        // await this.listLabels();
      };

      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        this.tokenClient.requestAccessToken({prompt: ''});
      }
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      const token = gapi.client.getToken();
      if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        this.authBtnVisibility = true
        this.signoutBtnVisibility = false
      }
    },

    /**
     * Print all Labels in the authorized user's inbox. If no labels
     * are found an appropriate message is printed.
     */
    async listLabels() {
      let response;
      try {
        response = await gapi.client.gmail.users.messages.get({
          'userId': 'me',
          id: "18b67600e2b86107"
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
      }
      console.log(response)
      this.textSnip = response.result.snippet
      const labels = response.result.labels;
      if (!labels || labels.length === 0) {
        document.getElementById('content').innerText = 'No labels found.';
        return;
      }

      document.getElementById('content').innerText = labels.reduce(
        (str, label) => `${str}${label.name}\n`,
        'Labels:\n');
    }
  }
}