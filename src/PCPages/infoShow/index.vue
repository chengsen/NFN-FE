<template>
  <div class="home">
    <el-container>
      <el-header>党员信息表</el-header>
      <el-main>
        <el-card class="box-card">
          <label>姓名</label>
          <div>{{ form.userName }}</div>

          <label>性别</label>
          <div>{{ form.sex }}</div>

          <label>民族</label>
          <div>{{ form.nation }}</div>

          <label>身份证号</label>
          <div>{{ form.idNumber }}</div>

          <label>出生日期</label>
          <div>{{ form.birthDate }}</div>
        </el-card>
        <el-card class="box-card">
          <label>毕业学校</label>
          <div>{{ form.gradSchool }}</div>

          <label>学历</label>
          <div>{{ form.eduBg }}</div>
        </el-card>
        <el-card class="box-card">
          <label>人员类别</label>
          <div>{{ form.peopleType }}</div>

          <label>转入支部</label>
          <div>{{ form.transferFrom }}</div>

          <label>转正日期</label>
          <div>{{ form.turnTrueDate }}</div>

          <label>介绍人1</label>
          <div>{{ form.introducer1 }}</div>

          <label>介绍人2</label>
          <div>{{ form.introducer2 }}</div>

          <label>党籍正常</label>
          <div>{{ form.partyNormal }}</div>

          <label>档案地</label>
          <div>{{ form.archiveAddr }}</div>
        </el-card>

        <el-card class="box-card">
          <label>手机号码</label>
          <div>{{ form.phone }}</div>
          <label>家庭住址</label>
          <div>{{ form.homeAddr }}</div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      centerDialogVisible: false,
    };
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    const url = `http://127.0.0.1:7001/api/v2/userById?_id=${this.$route.query._id}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json()).then((res) => {
      console.log('返回的数据', res);
      this.form = res.result;
    });
  },
};
</script>

<style>
</style>
