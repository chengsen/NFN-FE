<template>
  <div class="mhome">
    <el-container>
      <mheader :back="false"></mheader>
      <div class="mbody">
        <el-avatar :src="require('@/assets/logo.png')"></el-avatar>
        <h2>党员信息表</h2>
        <div>请相关人员认真填写</div>
        <el-button type="primary" @click="onSubmit">开始填写</el-button>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    onSubmit() {
      this.$router.push({ name: 'infoEdit' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
