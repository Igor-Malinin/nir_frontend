<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MisBlock"
}
</script>

<style lang="scss" scoped>
.block {
  line-height: 22px;
  position: relative;
  padding: 30px;
  z-index: 2;
  //border: 1px solid linear-gradient(#e66465, #9198e5);

  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background: $block_border;
    border-radius: 6px;
    z-index: -2;
  }
  &:after {
    position: absolute;
    top: 0.5px;
    left: 0.5px;
    right: 0.5px;
    bottom: 0.5px;
    content: "";
    background: $block;
    border-radius: 6px;
    z-index: -1;
  }
}
</style>