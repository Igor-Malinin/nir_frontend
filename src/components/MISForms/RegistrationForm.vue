<template>
  <form class="reg__form">
    <h1 class="title">Регистрация</h1>
    <div class="input-box">
      <mis-input class="input" placeholder="Email" v-model="registrationData.email" autocomplete="new-email" />
    </div>
    <div class="input-box">
      <mis-input class="input" placeholder="Имя" v-model="registrationData.name" autocomplete="new-name" />
    </div>
    <div class="input-box">
      <mis-input class="input" placeholder="Фамилия" v-model="registrationData.surname" autocomplete="new-surname" />
    </div>
    <div class="input-box">
      <mis-input type="password" class="input" placeholder="Пароль" v-model="registrationData.password" autocomplete="new-password" />
    </div>
    <div class="input-box">
      <mis-input type="password" class="input" placeholder="Повторите пароль" v-model="passwordRepeat" autocomplete="new-password" />
      <div class="error-box">
        <p>{{error}}</p>
      </div>
    </div>
    <div class="input-box group">
      <p>Уже есть аккаунт?</p>
      <a class="reg__signin-link" type="button" @click="$emit('changeView', true)">Войти</a>
    </div>
    <div class="input-box">
      <mis-button class="button" @click="registerUser">Зарегистрироваться</mis-button>
    </div>
  </form>
</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "RegistrationForm",
  data() {
    return {
      error: "",
      registrationData: {
        sid: "",
        email: "",
        name: "",
        surname: "",
        password: "",
        phone: "",
        social: "mis",
        photo: "",
      },
      passwordRepeat: "",
    }
  },
  methods: {
    registerUser() {
      console.log(this.registrationData)
      if(this.registrationData.password === this.passwordRepeat) {
        UserDataService.registerUser(this.registrationData).catch(error => {
          document.querySelector(".error-box").classList.add("shake")
          if (error.message === "Network Error")
            this.error = "Ошибка соединения с сервером"
          else
            this.error = error.response.data
          setTimeout(() => document.querySelector(".error-box").classList.remove("shake"),400)
        })
        this.error = ""
      }
      else {
        document.querySelector(".error-box").classList.add("shake")
        this.error = "Пароли не совпадают"
        setTimeout(() => document.querySelector(".error-box").classList.remove("shake"),400)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reg__form {
  position: absolute;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: 0.5s;
  color: $test;
}

.title {
  position: relative;
  font-size: 1.3em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
}

.input-box {
  position: relative;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: $test;
  }

  a {
    color: $test;
    font-size: 0.95em;
    cursor: pointer;
  }

  .button {
    font-weight: 500;
    width: 80%;
    padding: 8px;
    background-color: rgba(154, 149, 203, 0.15);
    letter-spacing: 0.05em;
    margin: 5px auto 0;
    color: $font;
    border: 1px solid $font;
    &:hover {
      filter: hue-rotate(50deg) brightness(150%);
    }
  }

  .error-box {
    position: absolute;
    width: 100%;
    top: 51px;
    text-align: center;
    p {
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

.group {
  margin-top: 17px;
  .reg__signin-link {
    color: #85b0ff;
    &:hover {
      filter: saturate(150%) hue-rotate(30deg);
    }
  }
}
</style>