<template>
  <div class="header">
    <span class="header__logo">
      𝙼𝙸𝚂
<!--      <img src="@/assets/logo.png" alt="">-->
    </span>
    <nav class="header__nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/contacts">Контакты</router-link>

      <mis-user-card v-if="getLoggedIn" :userInfo="getUserInfo" class="user-card" @logout="logout" />
      <mis-button v-else class="auth__btn" @click="$router.push('/auth')">Войти</mis-button>
    </nav>
  </div>
</template>

<script>
import MisButton from "@/components/UI/MisButton.vue";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "MisHeader",
  components: {MisButton},
  updated() {
    if(this.getLoggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "loggedInMod/setUserInfo",
      setLoggedIn: "loggedInMod/setLoggedIn"
    }),
    async logout(value) {
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
    }
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
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.header {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px 0;
  z-index: 20;
  transition: all 0.5s ease-in-out;
}

.header__logo {
  font-size: 26px;
}

.header__nav {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  .user-card {
    margin-left: auto;
  }
  .auth__btn {
    margin-left: auto;
  }
}
</style>