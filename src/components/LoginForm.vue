<template>
  <form class="auth__form">
    <h1 class="title">Авторизация</h1>
    <div class="input-box">
      <mis-input class="input" placeholder="Email" />
    </div>
    <div class="input-box">
      <mis-input class="input" placeholder="Пароль" />
    </div>
    <div class="input-box">
      <a href="#">Забыли пароль?</a>
      <a type="button" @click="$emit('changeView', false)">Зарегистрироваться</a>
    </div>
    <h2 class="sub-title">Авторизация через:</h2>
    <div class="input-box group">
      <mis-button id="authorize_button" class="button-google" v-if="authBtnVisibility" @click="handleAuthClick">
        <img src="@/assets/google-icon.png" alt="G" class="icon">
        Google
      </mis-button>
      <mis-button id="signout_button" class="button" v-else @click="handleSignoutClick">Выйти</mis-button>
      <mis-button class="button-vk" @click="vkAuth" v-if="!loggedIn">
        <img src="@/assets/vk-icon.png" alt="VK" class="icon">
        Вконтакте
      </mis-button>
    </div>
    <div class="input-box">
      <mis-button class="button" @click="login">Войти</mis-button>
    </div>
  </form>
</template>

<script>
import GoogleAuthMixin from "@/mixins/GoogleAuthMixin";
import VkAuthMixin from "@/mixins/VkAuthMixin";

export default {
  name: "LoginForm",
  mixins: [GoogleAuthMixin, VkAuthMixin],
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    login() {
      let auth = document.querySelector('.auth')
      auth.classList.add('enlarged')
      console.log(auth)
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
  gap: 20px;
  transition: 0.5s;
  color: $form;
}

.title {
  position: relative;
  font-size: 1.3em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 5px;
}

.sub-title {
  font-size: 1.1em;
  color: $form;
  text-shadow: 0 0 10px $light;
}

.input-box {
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: $form;
    font-size: 0.95em;
    text-shadow: 0 0 10px $light;
    cursor: pointer;
  }

  .button {
    font-weight: 500;
    width: 60%;
    padding: 8px;
    background-color: rgba(252, 221, 130, 0.7);
    letter-spacing: 0.05em;
    margin: 0 auto;
    color: $form;
    border: 1px solid $form;
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

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 30px;
    }
  }
}
</style>