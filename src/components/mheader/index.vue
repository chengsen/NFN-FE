<template>
  <div>
    <div class="back" @click="backPev" v-if="back">返回</div>
    <div class="mheader">党员信息表</div>
  </div>
</template>

<script>
export default {
  name: 'mheader',
  props: {
    back: {
      type: Boolean,
    },
  },
  methods: {
    backPev() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='scss' scoped>
@import 'index.scss'
</style>
