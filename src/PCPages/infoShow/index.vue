<template>
  <div class="home">
    <div>
      <mheader :back="false"></mheader>
      <div class="mbody">
        <el-card class="box-card">
          <div class="row-item">
            <label>姓名</label>
            <div>{{ form.userName }}</div>
          </div>

          <el-divider></el-divider>

          <div class="row-item">
            <label>性别</label>
            <div>{{ form.sex }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>民族</label>
            <div>{{ form.nation }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>身份证号</label>
            <div>{{ form.idNumber }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>出生日期</label>
            <div>{{ form.birthDate }}</div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="row-item">
            <label>毕业学校</label>
            <div>{{ form.gradSchool }}</div>
          </div>
          <el-divider></el-divider>

          <div class="row-item">
            <label>学历</label>
            <div>{{ form.eduBg }}</div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="row-item">
            <label>人员类别</label>
            <div>{{ form.peopleType }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>转入支部</label>
            <div>{{ form.transferFrom }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>转正日期</label>
            <div>{{ form.turnTrueDate }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>介绍人1</label>
            <div>{{ form.introducer1 }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>介绍人2</label>
            <div>{{ form.introducer2 }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>党籍正常</label>
            <div>{{ form.partyNormal }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>档案地</label>
            <div>{{ form.archiveAddr }}</div>
          </div>
        </el-card>

        <el-card class="box-card">
          <div class="row-item">
            <label>手机号码</label>
            <div>{{ form.phone }}</div>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <label>家庭住址</label>
            <div>{{ form.homeAddr }}</div>
          </div>
        </el-card>

        <el-card class="box-card">
          <div class="row-item">
            <label>党员签名</label>
          </div>
          <el-divider></el-divider>
          <div class="row-item">
            <img class="signImg" :src="form.sign" alt="" />
          </div>
        </el-card>
      </div>
    </div>
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
  created() {
    document.title = '党员信息';
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    const url = `${this.Common.prefixUrl}/userById?_id=${this.$route.query._id}`;
    fetch(url, {
      method: 'GET',
    }).then((response) => response.json()).then((res) => {
      this.form = res.result;
    });
  },
};
</script>

<style lang="scss">
@import 'index.scss'
</style>
