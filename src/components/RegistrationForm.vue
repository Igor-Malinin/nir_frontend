<template>
  <form class="reg__form">
    <h1 class="title">Регистрация</h1>
    <div class="input-box">
      <mis-input class="input" placeholder="Email" />
    </div>
    <div class="input-box">
      <mis-input class="input" placeholder="Пароль" />
    </div>
    <div class="input-box">
      <mis-input class="input" placeholder="Повторите Пароль" />
    </div>
    <div class="input-box group">
      <p>Уже есть аккаунт?</p>
      <a type="button" @click="$emit('changeView', true)">Войти</a>
    </div>
    <div class="input-box">
      <mis-button class="button" @click="registerUser">Зарегистрироваться</mis-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {

    }
  },
  methods: {
    registerUser() {

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
  color: $font;
}

.title {
  position: relative;
  font-size: 1.3em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 25px;
}

.input-box {
  position: relative;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: $font;
  }

  a {
    color: $font;
    font-size: 0.95em;
    text-shadow: 0 0 10px $light;
    cursor: pointer;
  }

  .button {
    font-weight: 500;
    width: 80%;
    padding: 8px;
    background-color: rgba(84, 188, 227, 0.7);
    letter-spacing: 0.05em;
    margin: 25px auto 0;
    color: $font;
    border: 1px solid $font;
  }
}
</style>