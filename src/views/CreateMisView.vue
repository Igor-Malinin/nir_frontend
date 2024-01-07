<template>
  <div class="mis-creation">
    <div class="container">
      <mis-block v-if="getLoggedIn" class="mis-creation__block">
        <div class="mis-creation__block-inner">
          <h1 class="mis-creation__title">Создание MIS</h1>
          <div class="transitions" :class="{transition1: next, transition2: previous}">
            <Transition name="slide" class="transition">
              <choose-socials v-if="currentPage === 0" @updateError="updateError"/>
              <authorize-socials v-else-if="currentPage === 1" @updateError="updateError"/>
              <choose-scopes v-else-if="currentPage === 2"/>
            </Transition>
          </div>
        </div>
        <div class="control-btns">
          <mis-button class="mis-creation__btn" :class="{disabled: currentPage === 0}" @click="previousPage">Назад</mis-button>
          <div v-if="error" class="mis-creation__error">
            <p>{{error}}</p>
          </div>
          <mis-button class="mis-creation__btn" :class="{disabled: currentPage === 2, hidden: currentPage === 2}" @click="nextPage">Далее</mis-button>
          <mis-button class="mis-creation__btn activate" v-if="!getActivated && currentPage === 2" @click="startListening">Актировать</mis-button>
          <mis-button class="mis-creation__btn stop" v-else-if="getActivated && currentPage === 2" @click="stopListening">Остановить</mis-button>
        </div>
      </mis-block>
      <mis-block v-else class="mis-creation__unauth">
        <p>Пожалуйста авторизуйтесь в системе, чтобы создать MIS</p>
      </mis-block>
    </div>
  </div>
</template>

<script>
import ChooseSocials from "@/components/MISCreation/ChooseSocials.vue";
import ChooseScopes from "@/components/MISCreation/ChooseScopes.vue";
import AuthorizeSocials from "@/components/MISCreation/AuthorizeSocials.vue";
import CreateMisMixin from "@/mixins/CreateMisMixin";
import GmailMixin from "@/mixins/GmailMixin";
import MisBlock from "@/components/UI/MisBlock.vue";

export default {
  name: "CreateMisView",
  components: {MisBlock, AuthorizeSocials, ChooseScopes, ChooseSocials},
  mixins: [CreateMisMixin, GmailMixin],
  data() {
    return {
      currentPage: 2,
      images: [],
      next: false,
      previous: false,
      chosenServicesAmount: null,
      authorizedServicesAmount: null,
      error: ""
    }
  },
  methods: {
    nextPage() {
      let chosenAmount = this.getChosenServices.length
      if (this.currentPage !== 2){
        if (chosenAmount < 2)
          this.error = "Пожалуйста выберите как минимум 2 сервиса"
        else if(this.currentPage === 1 && this.getAuthorizedServices.length !== chosenAmount)
          this.error = "Пожалуйста авторизуйтесь во всех сервисах"
        else {
          this.currentPage++
          this.error = ""
        }
      }
      this.next = true
      this.previous = false
    },
    previousPage() {
      if(this.currentPage !==0) {
        this.currentPage--
        this.error = ""
      }
      this.next = false
      this.previous = true
    },
    updateError() {
      if(this.error !== '') {
        if(this.getChosenServices.length >= 2)
          this.error = ''
        if(this.getAuthorizedServices.length === this.getChosenServices.length)
          this.error = ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out, height 1s ease-in-out;
}

.transition1 {
  .slide-enter-from {
    height: 0;
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-leave-to {
    height: 0;
    opacity: 0;
    transform: translateX(-100%);
  }
}
.transition2 {
  .slide-enter-from {
    height: 0;
    opacity: 0;
    transform: translateX(-100%);
  }
  .slide-leave-to {
    height: 0;
    opacity: 0;
    transform: translateX(100%);
  }
}

.mis-creation__title {
  font-size: 30px;
  color: $title;
  margin-bottom: 1em;
}

.mis-creation__block {
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  overflow: hidden;
  margin-bottom: 40px;
}

.mis-creation__block-inner {
  display: flex;
  flex-direction: column;
}

.control-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.mis-creation__btn {
  align-self: flex-end;
  padding: 10px 15px;
}

.activate {
  filter: hue-rotate(270deg);
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: saturate(150%) hue-rotate(300deg);
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.stop {
  filter: hue-rotate(200deg);
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: saturate(150%) hue-rotate(220deg);
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.mis-creation__unauth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mis-creation__error {
  text-align: center;
  padding: 8px 12px;
  color: $danger;
  background-color: $danger_back;
  border: 1px solid $danger_border;
  border-radius: 5px;
}

.disabled {
  color: rgba(173, 210, 222, 0.85);
  border-color: rgba(61, 94, 105, 0.45);
  cursor: not-allowed;
  &:hover {
    filter: none;
    background-color: transparent;
  }
}

.hidden {
  display: none;
}
</style>