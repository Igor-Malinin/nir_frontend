<template>
  <div class="active-mis">
    <div class="container">
      <mis-block>
        <h1 class="active-mis__title">Созданные MIS</h1>
      </mis-block>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActiveMisView"
}
</script>

<style lang="scss" scoped>
.active-mis__title {
  font-size: 30px;
  color: $title;
}
</style>