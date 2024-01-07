<template>
  <div class="header" id="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo">
          <img class="logo" src="@/assets/mis_logo/MIS_logo-wt.png" alt="">
          <img class="logo-spin" src="@/assets/mis_logo/logo-icon-p.png" alt="">
        </div>
        <nav class="header__nav">
          <router-link to="/">Главная</router-link>
          <router-link to="/create">Создать MIS</router-link>
          <router-link v-if="getLoggedIn" to="/active">Активные MIS</router-link>
          <router-link to="/contacts">Контакты</router-link>

          <mis-user-card
              v-if="getLoggedIn"
              :userInfo="getUserInfo"
              class="user-card"
          />
          <mis-button v-else class="auth__btn" @click="$router.push('/auth')">Войти</mis-button>
        </nav>
      </div>
    </div>
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
  mounted() {
    this.scrollShade()
  },
  methods: {
    scrollShade() {
      document.addEventListener("DOMContentLoaded", () => {
        window.addEventListener("scroll", () => {
          let header = document.getElementById("header")
          let scrollPosition = window.scrollY
          let point = 50
          if (scrollPosition >= 50) {
            let opacity = Math.min(1, (scrollPosition - 50) / 80)
            header.style.background = "linear-gradient(to bottom, rgba(10, 14, 43, " + opacity + "), rgba(15, 35, 68, " + opacity + "))";
            header.style.borderColor = "rgba(51, 51, 51, "+opacity+")";
          } else {
            header.style.background = "transparent"; // возвращаем исходный линейный градиент
            header.style.borderColor = "transparent";
          }
        })
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
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  //width: 100%;
  padding: 0 20px;
  z-index: 100;
  margin: 20px 50px 0;
  border: 1px solid transparent;
  border-radius: 6px;
}

.header__inner {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 30px 0 30px;
  z-index: 20;
  transition: all 0.5s ease-in-out;
}

.header__logo {
  min-width: 90px;
  width: 90px;
  position: relative;

  .logo-spin {
    position: absolute;
    width: 35px;
    top: -7%;
    left: 50%;
    translate: -50%;
    animation: animate 8s linear infinite;
  }
}

@keyframes animate {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

.header__nav {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;

  .user-card {
    margin-left: auto;
  }
  .auth__btn {
    margin-left: auto;
  }
}

</style>