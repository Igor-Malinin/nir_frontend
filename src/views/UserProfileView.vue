<template>
  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <div class="profile__user">
          <div class="profile__user-control">
            <img class="profile__user-image" :src="getUserInfo.photo ? getUserInfo.photo : require(`@/assets/photo-placeholder.jpeg`)" alt="photo">
            <mis-button @click="editUserInfo">Редактировать</mis-button>
            <mis-button class="logout" v-if="getUserInfo.social === 'vk'" @click="logoutVk(false)">Выйти</mis-button>
            <mis-button class="logout" v-if="getUserInfo.social === 'google'" @click="logoutGoogle(false)">Выйти</mis-button>
            <mis-button class="logout" v-if="getUserInfo.social === 'telegram'">Выйти</mis-button>
          </div>
          <mis-block class="profile__user-data">
            <p><span>Имя:</span><b>{{getUserInfo.name}}</b></p>
            <p><span>Фамилия:</span><b>{{getUserInfo.surname}}</b></p>
            <p><span>Email:</span>
              <b v-if="getUserInfo.email">{{getUserInfo.email}}</b>
              <b v-else>Email</b>
            </p>
            <p><span>Телефон:</span>
              <b v-if="getUserInfo.phone">{{getUserInfo.phone}}</b>
              <b v-else>+Х ХХХ ХХХ ХХ ХХ</b>
            </p>
          </mis-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "@/services/UserDataService";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "UserProfileView",
  data() {
    return {
      editUserData: {

      }
    }
  },
  mounted() {

  },
  updated() {
    if(!this.getLoggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "loggedInMod/setUserInfo",
      setLoggedIn: "loggedInMod/setLoggedIn"
    }),

    async editUserInfo() {
      await UserDataService.editUser(this.editUserData)
    },

    async logoutVk(value) {
      await VK.Auth.revokeGrants()
      await VK.Auth.logout(async resp => {
        console.log(resp)
      })
      this.setLoggedIn(value)
      this.setUserInfo({
        name: "",
        surname: "",
        photo: "",
        social: ""
      })
    },
    async logoutGoogle(value) {
      const token = this.getUserInfo.accessToken;
      const sid = this.getUserInfo.sid
      let reset = () => {
        this.setLoggedIn(value)
        this.setUserInfo({
          sid: "",
          name: "",
          surname: "",
          photo: "",
          social: ""
        })
      }
      if(sid !== null) {
        await google.accounts.id.revoke(sid);
        await google.accounts.id.disableAutoSelect()
        reset()
      }
    },
    async getUserData() {
      await UserDataService.getUser()
    },
    setWidth() {
      let maxSpanWidth = 0;
      let spans = document.querySelector('.profile__user-data').querySelectorAll('span')
      for(let span in spans) {
        let spanWidth = span.getBoundingClientRect().width
        if (spanWidth > maxSpanWidth)
          maxSpanWidth = spanWidth
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.loggedInMod.userInfo
    }),
    ...mapGetters({
      getUserInfo: "loggedInMod/getUserInfo"
    })
  }
}
</script>

<style lang="scss" scoped>
.profile__inner {
  display: flex;
  justify-content: center;
}

.profile__user {
  display: flex;
  align-items: center;
  gap: 50px;
}

.profile__user-control {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile__user-image {
  max-width: 200px;
}

.profile__user-data {
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    font-weight: 500;
    font-size: 18px;
    position: relative;
    padding: 12px;
    background: url("@/assets/bgHome4.jpeg") fixed center;
    background-size: cover;
    border-radius: 6px;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
    }
    span {
      display: inline-block;
      min-width: 100px;
      width: max-content;
      text-align: right;
      margin-right: 20px;
    }
    b {
      display: inline-block;
      width: max-content;
      min-width: 240px;
      text-align: center;
    }
  }
}

.logout {
  border-color: $logout_border;
  color: $logout;
}
</style>