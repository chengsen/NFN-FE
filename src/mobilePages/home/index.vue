<template>
  <div class="mhome">
    <el-container>
      <el-header class='mheader'>党员信息表</el-header>
      <el-main class="mbody">
        <el-avatar :size="120" :src="circleUrl"></el-avatar>
        <h2>党员信息表</h2>
        <div>请相关人员认真填写</div>
        <router-link to="/infoEdit">
          <el-button type="primary">开始填写</el-button>
        </router-link>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss">
@import 'index.scss'
</style>
