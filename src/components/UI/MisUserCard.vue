<template>
  <div class="user-card">
    <img class="user-card__photo" :src="userInfo.photo ? userInfo.photo : require(`@/assets/photo-placeholder.jpeg`)" alt="Photo">
    <div class="user-card__data">
      <p>{{userInfo.name}}</p>
      <p>{{userInfo.surname}}</p>
    </div>
    <mis-button @click="this.$router.push('/profile');">Профиль</mis-button>
  </div>
</template>

<script>
export default {
  name: "MisUserCard",
  props: {
    userInfo: Object,
  },
  mounted() {
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 15px
}

.user-card__photo {
  width: 55px;
  border: 1px solid $accent;
  border-radius: 50%;
}

.user-card__data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>