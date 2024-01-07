<template>
  <div class="choose-socials">
    <p class="choose-socials__text">Выберите сервисы, которые хотите связать</p>
    <div class="choose-socials__service-cards">
      <mis-service-card
          class="service-card"
          :class="{checked: service.chosen}"
          :service="service"
          @click="chooseService(service.title)"
          v-for="service in getServices"
          :key="service.title"
      />
    </div>
  </div>
</template>

<script>
import CreateMisMixin from "@/mixins/CreateMisMixin";

export default {
  name: "ChooseSocials",
  mixins: [CreateMisMixin],
  methods: {
    chooseService(service) {
      this.setServiceChosen(service)
      this.$emit("updateError")
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-socials__text {
  font-size: 20px;
  margin-bottom: 1.5em;
}

.choose-socials__service-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px 70px;
  padding: 0 60px;

  .service-card {
    width: 260px;
    max-width: 260px;
  }
}

.service-card:hover {
  filter: saturate(150%);
  cursor: pointer;
}

.checked {
  background: $checked;
}
</style>