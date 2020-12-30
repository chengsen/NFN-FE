<template>
  <div class="home">
    <el-container>
      <el-header class="mheader">党员信息表</el-header>
      <el-main>
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

        <el-button @click="onBackToEdit">修改</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-main>
      <el-dialog
        title="提交成功"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <span>信息提交成功，可关闭该页面</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close">确 定</el-button>
        </span>
      </el-dialog>
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
    this.form = this.$route.params;
    console.log(this.form);
  },
  methods: {
    onBackToEdit() {
      this.$router.go(-1);
    },
    close() {
      this.centerDialogVisible = false;
    },
    onSubmit() {
      fetch('http://127.0.0.1:7001/api/v2/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      }).then((res) => {
        if (res.ok === true) {
          console.log('发送成功，这是返回信息', res);
          this.centerDialogVisible = true;
        }
      });
      const msg = JSON.stringify(this.form);
      console.log('向服务器发送数据', msg);
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>
