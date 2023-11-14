<template>
  <div class="auth">
    <div class="auth__container">
      <span></span>
      <span></span>
      <span></span>
      <Transition name="slide">
        <login-form v-if="registered" @changeView="changeView" class="form" />
        <registration-form v-else @changeView="changeView" class="form" />
      </Transition>
    </div>


<!--    <h1 class="auth__title">Авторизация</h1>-->
<!--    <mis-button @click="googleAuth" v-if="!loggedIn">Авторизоваться через Google</mis-button>-->
<!--    <mis-button @click="vkAuth" v-if="!loggedIn">Авторизоваться через ВКонтакте</mis-button>-->
<!--    <div v-else>-->
<!--      <p>{{userData.name}}</p>-->
<!--      <p>{{userData.surname}}</p>-->
<!--      <p>{{userData.email}}</p>-->
<!--      <p><img :src="userData.picture" width="100" alt="UserImage"></p>-->
<!--    </div>-->
<!--    <mis-button @click="vkPost" v-if="senMes">пост ВКонтакте</mis-button>-->
<!--    <mis-button @click="revoke">revoke</mis-button>-->



<!--    <pre id="content" style="white-space: pre-wrap;"></pre>-->
<!--    <p>{{textSnip}}</p>-->
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

export default {
  name: "AuthorizationView",
  components: {RegistrationForm, LoginForm},
  data() {
    return {
      registered: true,
    }
  },
  mounted() {

  },
  methods: {
    changeView(value) {
      let auth = document.querySelector('.auth')
      this.registered = value
      if(!value) {
        auth.classList.add('register')
      }
      else
        auth.classList.remove('register')
    },
    login() {
      let auth = document.querySelector('.auth')
      auth.classList.add('enlarged')
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.auth {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -10;
  transition: all 1s ease-in-out;

  &:before {
    position: absolute;
    content: '';
    inset: 0;
    background: url("@/assets/bg1.jpeg") fixed center;
    background-size: cover;
    z-index: -5;
  }

  &:after {
    position: absolute;
    content: '';
    inset: 0;
    background: url("@/assets/bg2.jpeg") fixed center;
    opacity: 0;
    background-size: cover;
    z-index: -5;
    transition: 1s ease-in-out;
  }
}
.auth.register:after {
  opacity: 1;
}

.enlarged {
  transform: translateY(-27100px) translateX(-2000px) scale(80);
}

.auth__container {
  position: relative;
  width: 370px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgb(0, 0, 0, 0.25);
  z-index: 10;
  transition: 1s;
  overflow: hidden;

  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(from var(--a), $accent 0%, $accent 12%, transparent 12%, transparent 80%, $accent 100%);
    border-radius: 15px;
    animation: animate 10s linear infinite;
  }
}
.auth.register .auth__container {
  height: 450px;
  &:before {
    filter: hue-rotate(140deg);
  }
}
@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes animate {
  0% {
    --a: 0deg
  }
  100% {
    --a: 360deg
  }
}

.auth__container span {
  position: absolute;
  inset: 5px;
  overflow: hidden;
  border-radius: 12.5px;

  &:before {
    position: absolute;
    inset: 5px;
    content: '';
    background: url("@/assets/bg1.jpeg") fixed center;
    background-size: cover;
    border-radius: 12.5px;
    filter: blur(10px);
    transition: all 1.1s ease-in-out;
  }
  &:after {
    position: absolute;
    inset: 5px;
    content: '';
    background: url("@/assets/bg1.jpeg") fixed center;
    background-size: cover;
    border-radius: 12.5px;
    filter: blur(15px);
    transition: all 1.1s ease-in-out;
  }
}

.auth.register .auth__container span {
  &:before, &:after {
    background: url("@/assets/bg2.jpeg") fixed center;
    background-size: cover;
  }
}

.form {
  transition: 0.5s ease-in-out;
}
</style>