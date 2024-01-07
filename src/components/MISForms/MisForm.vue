<template>
  <form action="" class="form">
    <input type="text" class="form__input" placeholder="Ваше имя">
    <input data-tel-input type="text" class="form__input" placeholder="Ваш телефон" :value="selectorValue">
    <button type="submit" class="form__btn">Посмотреть район</button>
  </form>
</template>

<script>
import mask_list from "@/libs/phoneMask/mask_list";

export default {
  name: "MisForm",
  mixins: [mask_list],
  props: {
    style: Number
  },
  data() {
    return {
      selector: '[data-tel-input]',
      selectorValue: ''
    }
  },
  mounted() {
    let inputs = document.querySelectorAll(this.selector)

    inputs.forEach(input => {
      // if (!input.value) input.value = '+';
      input.addEventListener('input', this.setMask)
      input.addEventListener('focus', this.setMask)
      input.addEventListener('blur', () => {
        input.value === '+' ? input.value = '' : this.setMask
      })
    });
  },
  methods: {
    setOrder() {
      return this.style ? `order: ${this.style}` : ""
    },

    setMask() {
      let matrix = '+###############'
      let selectorValue = document.querySelector('[data-tel-input]')
      this.maskList.forEach(item => {
        let code = item.code.replace(/[\s#]/g, ''),
            phone = selectorValue.value.replace(/[\s#-)(]/g, '');

        if (phone.includes(code)) {
          matrix = item.code
        }
      });

      let i = 0,
          val = selectorValue.value.replace(/\D/g, '')

      selectorValue.value = matrix.replace(/(?!\+)./g, function(a) {
        return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
      })
      this.selectorValue = selectorValue.value
    }
  },
}
</script>

<style lang="scss" scoped>

.form {

}

.form__input {
  font-size: 14px;
  text-align: center;
  height: 50px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  color: $dark;
  transition: background-color .2s ease-in;

  &::placeholder {
    color: $placeholder;
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.25);
  }
}

.form__btn {
  height: 50px;
  text-align: center;
  color: $light;
  font-weight: 700;
  padding: 12px;
  background-color: $accent;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: saturate($accent, 15%);
  }
}

</style>