<template>
  <select class="mis-select" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите опцию</option>
    <option v-for="option in options" :key="option.id" :value="option.title">{{option.name}}</option>
  </select>
</template>

<script>
export default {
  name: "MisSelect",
  props: {
    functionName: String,
    modelValue: {
      type: String, Number
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.mis-select {
  border: 1px solid $light;
  border-radius: 4px;
  padding: 4px 8px;
  outline: none;
}
</style>