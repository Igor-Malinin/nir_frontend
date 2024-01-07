<template>
  <div class="choose-scopes">
    <p class="choose-scopes__text">Выберите действия, которые вы хотите сделать</p>
    <div class="actions">
      <div class="actions">
        <div class="actions__item">
          <p>Если в сервисе</p>
          <mis-select
              v-model="selectedService"
              :options="getChosenServices"
          />
        </div>
        <div v-if="selectedService" class="actions__item">
          <p>Произошло действие</p>
          <mis-select
              v-model="selectedIfAction"
              :options="getIfActions[selectedService]"
          />
        </div>
        <div v-if="selectedIfAction" class="actions__item">
          <p>Дополнительная информация (по желанию)</p>
          <mis-select
              v-model="selectedIfFilter"
              :options="getIfFilters[selectedService]"
          />
          <div v-if="selectedIfFilter === 'ifFilterMessageFrom'" class="filter__additional">
            <p>введите email</p>
            <mis-input class="choose-scopes__input" type="text" v-model="messageFrom" />
          </div>
        </div>
      </div>
      <div class="actions">
        <div v-if="selectedIfAction" class="actions__item">
          <p>Тогда в сервисе</p>
          <mis-select
              v-model="selectedService2"
              :options="getChosenServices.filter(service => service.title !== selectedService)"
          />
        </div>
        <div v-if="selectedService2" class="actions__item">
          <p>Произошло действие</p>
          <mis-select
              v-model="selectedThenAction"
              :options="getThenActions[selectedService2]"
          />
        </div>
        <div v-if="selectedThenAction" class="actions__item">
          <p>Дополнительная информация (по желанию)</p>
          <mis-select
              v-model="selectedThenFilter"
              :options="getThenFilters[selectedService2]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createMisMixin from "@/mixins/CreateMisMixin";
import gmailMixin from "@/mixins/GmailMixin";

export default {
  name: "ChooseScopes",
  mixins: [createMisMixin, gmailMixin],
  data() {
    return {
      selectedService: "",
      selectedService2: "",
      selectedIfAction: "",
      selectedThenAction: "",
      selectedIfFilter: "",
      selectedThenFilter: "",
      messageFrom: ""
    }
  },
  updated() {
    this.setMessageFrom(this.messageFrom)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.choose-scopes {
}
.choose-scopes__text {
  font-size: 20px;
  margin-bottom: 1.5em;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter__additional {
  display: flex;
  gap: 20px;
  align-items: center;
}

.actions__item {
  display: flex;
  gap: 20px;
  align-items: center;
}

.choose-scopes__input {
  width: 200px;
  padding: 4px 8px;
  background-color: transparent;
  border-color: $light;
}
</style>