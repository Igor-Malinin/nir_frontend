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
  padding: 6px 10px;
  border: 1px solid rgba(91, 214, 212, 0.5);
  border-radius: 4px;
  //background-color: #041c34;
  color: $accent2;
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: saturate(150%) hue-rotate(40deg);
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>