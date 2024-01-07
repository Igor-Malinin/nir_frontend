<template>
  <form class="auth__form">
    <h1 class="title">Авторизация</h1>
    <div class="input-box">
      <mis-input class="input" type="text" placeholder="Email" v-model="userLogIn.email" autocomplete="new-email"/>
    </div>
    <div class="input-box error-handler">
      <mis-input class="input" type="password" placeholder="Пароль" v-model="userLogIn.password" autocomplete="new-password" />
      <div class="error-box">
        <p>{{error}}</p>
      </div>
    </div>
    <div class="input-box control">
      <a href="#">Забыли пароль?</a>
      <a type="button" class="auth__register-link" @click="$emit('changeView', false)">Зарегистрироваться</a>
    </div>
    <div class="input-box">
      <mis-button class="button" @click="login">Войти</mis-button>
    </div>
    <h2 class="sub-title">Авторизация через:</h2>
    <div class="input-box group">
      <div class="signInDiv">
        <img src="@/assets/socials/google-icon.png" alt="G" class="icon">
        <div id="signInDiv"></div>
      </div>
      <button type="button" class="button-vk" @click="vkAuth" v-if="!loggedIn">
        <img src="@/assets/socials/vk-icon.png" alt="VK" class="icon">
        Вконтакте
      </button>
    </div>
  </form>
</template>

<script>
import GoogleAuthMixin from "@/mixins/GoogleAuthMixin";
import VkAuthMixin from "@/mixins/VkAuthMixin";
import UserDataService from "@/services/UserDataService";

export default {
  name: "LoginForm",
  mixins: [GoogleAuthMixin, VkAuthMixin],
  data() {
    return {
      userLogIn: {
        sid: "",
        email: "",
        password: ""
      },
      error: ""
    }
  },
  mounted() {
  },
  methods: {
    login() {
      UserDataService.getUser(this.userLogIn).then(response => {
        this.setUserInfo(response.data)
        this.setLoggedIn(true)
        console.log(this.getUserInfo)
      }).catch(error => {
        document.querySelector(".error-box").classList.add("shake")
        if (error.message === "Network Error")
          this.error = "Ошибка соединения с сервером"
        else
          this.error = error.response.data
        setTimeout(() => document.querySelector(".error-box").classList.remove("shake"),400)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.auth__form {
  position: absolute;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  transition: 0.5s;
  color: $light;
  z-index: 10;
}

.title {
  position: relative;
  font-size: 1.3em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
}

.sub-title {
  font-size: 1.1em;
  color: $light;
}

.input-box {
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: $light;
    font-size: 0.95em;
    cursor: pointer;
  }

  .button {
    font-weight: 500;
    width: 60%;
    padding: 8px;
    background-color: rgba(51, 48, 43, 0.4);
    letter-spacing: 0.05em;
    margin: 0 auto;
    color: $light;
    border: 1px solid $light;
    &:hover {
      filter: hue-rotate(50deg) brightness(150%);
    }
  }
}

.control {
  margin-top: 15px;
  .auth__register-link {
    color: #7de177;
    &:hover {
      filter: saturate(150%) hue-rotate(30deg);
    }
  }
}

.group {
  justify-content: space-around;
  .button-google {
    position: relative;
    padding: 10px 8px 10px 40px;
    background-color: rgba(0, 0, 0, 0.35);
    font-weight: 500;

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 30px;
    }
  }
  .button-vk {
    position: relative;
    padding: 10px 8px 10px 40px;
    background-color: rgba(0, 0, 0, 0.35);
    font-weight: 500;
    border: 1px solid $light;
    border-radius: 4px;
    color: $light;

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 30px;
    }
  }
}

#signInDiv {
  position: relative;
  border-radius: 4px;
  filter: blur(15px);
  &:after {
    pointer-events: none;
    position: absolute;
    content: "";
    top: 1.9px;
    left: -0.5px;
    border-radius: 4px;
    width: 98px;
    height: 40.2px;
    background: url("@/assets/bg1.jpeg") fixed center;
    background-size: cover;
  }
}
.signInDiv {
  position: relative;
  &:after {
    width: 105px;
    height: 40.55px;
    pointer-events: none;
    position: absolute;
    content: "Google";
    line-height: 38px;
    text-align: right;
    padding-right: 8px;
    color: $font;
    top: -0.5px;
    left: 0;
    border: 1px solid $font;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 4px;
  }
  .icon {
    pointer-events: none;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
    width: 30px;
  }
}

.error-handler {
  position: relative;
  .error-box {
    width: 100%;
    position: absolute;
    top: 53px;
    p {
      text-align: center;
      color: $danger;
    }
  }
}

.shake {
  animation: shake 0.3s linear;
  transform-origin: center;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  50% {
    transform: translateX(6px);
  }
  75% {
    transform: translateX(-6px);
  }
}
</style>