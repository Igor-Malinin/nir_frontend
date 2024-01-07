<template>
  <div class="app">
    <mis-header/>
    <Transition name="fade">
      <router-view class="grow"/>
    </Transition>
    <mis-footer v-if="this.$route.name !== 'auth'" />
  </div>
</template>

<script setup>
import MisFooter from "@/components/MisFooter.vue";
import MisHeader from "@/components/MisHeader.vue";
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app {
  //width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 170px;
}
.grow {
  flex-grow: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
