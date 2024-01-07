<template>
  <div class="auth">
    <div class="auth__container">
      <span></span>
      <span></span>
      <span></span>
      <div class="transitions" :class="{transition1: registered, transition2: !registered}">
        <Transition name="slide" class="transition">
          <login-form v-if="registered" @changeView="changeView" class="form" />
          <registration-form v-else @changeView="changeView" class="form" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/MISForms/LoginForm.vue";
import RegistrationForm from "@/components/MISForms/RegistrationForm.vue";
import GmailMixin from "@/mixins/GmailMixin";

export default {
  name: "AuthorizationView",
  components: {RegistrationForm, LoginForm},
  data() {
    return {
      registered: true,
    }
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
.transitions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease-in-out;
}
.transition1 {
  .slide-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  .slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}
.transition2 {
  .slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
.auth {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  //z-index: -10;
  transition: all 1s ease-in-out;

  &:before {
    position: absolute;
    content: '';
    inset: 0;
    background: url("@/assets/bg1.jpeg") fixed center;
    background-size: cover;
    //z-index: -5;
  }

  &:after {
    position: absolute;
    content: '';
    inset: 0;
    background: url("@/assets/bg2.jpeg") fixed center;
    opacity: 0;
    background-size: cover;
    //z-index: -5;
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
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgb(0, 0, 0, 0.25);
  z-index: 10;
  transition: 1s;
  overflow: hidden;
  margin-top: 80px;

  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(from var(--a), #a12b70 0%, #a12b70 12%, transparent 12%, transparent 80%, #a12b70 100%);
    filter: brightness(130%);
    border-radius: 15px;
    animation: animate 7s linear infinite;
  }
}
.auth.register .auth__container {
  height: 500px;
  &:before {
    filter: hue-rotate(300deg) brightness(200%);
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