<template>
  <div class="card">
    <div class="card__main">
      <img class="card__image" :src="require(`@/assets/socials/${service.image}`)" :alt="service.title">
      <p class="card__name">{{service.name}}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MisServiceCard",
  props: {
    service: Object
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  min-width: 210px;
  padding: 20px;
  font-size: 20px;
  background: $block;
  border: 1px solid $accent2;
  border-radius: 8px;
}

.card__main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 0 10px;
  p {
    width: min-content;
    text-align: center;
    line-height: 1.5;
  }
}

.card__image {
  width: 50px;
  max-height: 50px;
  filter: saturate(120%);
}
</style>