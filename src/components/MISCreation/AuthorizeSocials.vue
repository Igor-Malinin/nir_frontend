<template>
  <div class="auth-socials">
    <p class="auth-socials__text">Пожалуйста авторизуйтесь в сервисах, которые хотите связать</p>
    <div class="auth-socials__service-cards">
      <mis-service-card class="service-card" :service="service" v-for="service in getChosenServices" :key="service.title">
        <mis-button v-if="service.title === 'vk' && service.auth === false" class="auth-socials__btn" @click="vkMethodsAuth">Авторизоваться</mis-button>
<!--        <img v-else-if="service.title === 'vk' && service.auth === true" class="auth-socials__check" src="@/assets/check.svg" alt="check">-->
        <mis-button v-if="service.title === 'gmail' && service.auth === false" class="auth-socials__btn" id="authorize_button" @click="gmailAuth">Авторизоваться</mis-button>
        <div v-if="service.auth === true" class="auth-socials__check-container">
          <img class="auth-socials__check" src="@/assets/check.svg" alt="check">
          <p :id="service.title">Готово</p>
        </div>
<!--        v-else-if="service.title === 'gmail' && service.auth === true"-->
      </mis-service-card>
    </div>
<!--    <input type="file" multiple @change="handleFileChange" />-->
<!--    <mis-button class="mis-creation__btn" @click="vkPostWall">postonwall</mis-button>-->

  </div>
</template>

<script>
import vkMethodsMixin from "@/mixins/VkMethodsMixin";
import createMisMixin from "@/mixins/CreateMisMixin";
import gmailMixin from "@/mixins/GmailMixin";

export default {
  name: "AuthorizeSocials",
  mixins: [vkMethodsMixin, createMisMixin, gmailMixin],
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      this.vkWallPost.photoName = file.name
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.vkWallPost.photoPath = reader.result
        }
        reader.readAsDataURL(file)
      }
      // console.log(this.vkWallPost.photoName, this.vkWallPost.photoPath)
      // const files = event.target.files
      // if (files) {
      //   for (let i = 0; i < files.length; i++) {
      //     const file = files[i]
      //     const reader = new FileReader()
      //     reader.onload = () => {
      //       this.images.push(reader.result)
      //     }
      //     reader.readAsDataURL(file)
      //   }
      // }
    },
  }
}
</script>

<style lang="scss" scoped>
.auth-socials__text {
  font-size: 20px;
  margin-bottom: 1.5em;
}

.auth-socials__service-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 70px;
  padding: 0 60px;

  .service-card {
    width: 260px;
    max-width: 260px;
  }
}

.auth-socials__btn {
  border: 1px solid rgba(91, 214, 212, 0.42);
}

.auth-socials__check-container {
  width: 100%;
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  .auth-socials__check {
    display: block;
    margin-right: 70px;
    width: 50px;
  }
  p {
    position: absolute;
    transform: translateX(30px);
    color: #13D000;
  }
}
.auth-slide-in {
  transform: translateX(120px); /* Регулируйте смещение текста относительно изображения */
  opacity: 0;
  animation: slideIn 1s forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-60px);
    opacity: 0;
  }
  to {
    transform: translateX(30px);
    opacity: 1;
  }
}
</style>