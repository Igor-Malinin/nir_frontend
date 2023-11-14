<template>
  <div class="contacts">
    <div class="container">
      Контакты
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsView',
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.contacts {
  transition: all 0.5s ease-in-out;
}
</style>
