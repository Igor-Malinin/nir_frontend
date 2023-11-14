<template>
  <button type="button" class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MisButton"
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 6px;
  border: 1px solid $font;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
  color: $font;
}
</style>