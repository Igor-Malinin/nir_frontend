<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MisDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);

}

.dialog__content {
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
  margin: auto;
  background-color: white;
  border-radius: 5px;
}
</style>