<template>
  <input :value="modelValue" @input="updateInput" class="input" autocomplete="off">
</template>

<script>
export default {
  name: "MisInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  background-color: rgba(0,0,0,0.25);
  color: $accent;
  padding: 10px 15px;
  &::placeholder {
    color: $font;
  }
}
</style>