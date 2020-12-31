<template>
  <div class="home">
    <div>
      <mheader :back="true"></mheader>
      <div class="mbody">
        <div class="formFrame">
          <el-card class="box-card">
            <div class="formItem">
              <label class="formLabel">姓名</label>
              <el-input v-model="form.userName" placeholder="姓名"></el-input>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">性别</label>
              <el-radio-group v-model="form.sex">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">民族</label>
              <el-select v-model="form.nation" placeholder="民族">
                <el-option
                  v-for="item in nation"
                  :key="item"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">身份证</label>
              <el-input
                v-model="form.idNumber"
                placeholder="身份证号"
              ></el-input>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">出生日期</label>
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.birthDate"
                type="date"
                placeholder="出生日期"
              >
              </el-date-picker>
            </div>
          </el-card>
          <el-card class="box-card">
            <div class="formItem">
              <label class="formLabel">毕业学校</label>
              <el-input
                v-model="form.gradSchool"
                placeholder="毕业学校"
              ></el-input>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">学历</label>
              <el-select v-model="form.eduBg" placeholder="学历">
                <el-option
                  v-for="item in education"
                  :key="item"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </el-card>
          <el-card class="box-card">
            <div class="formItem">
              <label class="formLabel">人员类别</label>
              <el-radio-group v-model="form.peopleType">
                <el-radio-button label="正式党员"></el-radio-button>
                <el-radio-button label="预备党员"></el-radio-button>
              </el-radio-group>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">转入支部</label>
              <el-select v-model="form.transferFrom" placeholder="转入支部">
                <el-option
                  v-for="item in branch"
                  :key="item"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">入党日期</label>
              <el-date-picker
              size="large"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.partyJoinDate"
                type="date"
                placeholder="入党日期"
              >
              </el-date-picker>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">转正日期</label>
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.turnTrueDate"
                type="date"
                placeholder="转正日期"
              >
              </el-date-picker>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">介绍人1</label>
              <el-input
                v-model="form.introducer1"
                placeholder="介绍人姓名（选填）"
              ></el-input>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">介绍人2</label>
              <el-input
                v-model="form.introducer2"
                placeholder="介绍人姓名（选填）"
              ></el-input>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">党籍正常</label>
              <el-radio-group v-model="form.partyNormal">
                <el-radio-button label="是"></el-radio-button>
                <el-radio-button label="否"></el-radio-button>
              </el-radio-group>
            </div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">档案地</label>
              <el-input
                v-model="form.archiveAddr"
                placeholder="地址精确到门牌号（选填）"
              ></el-input
            ></div>
          </el-card>
          <el-card class="box-card">
            <div class="formItem">
              <label class="formLabel">手机号码</label>
              <el-input v-model="form.phone" placeholder="手机号码"></el-input
            ></div>
            <el-divider></el-divider>
            <div class="formItem">
              <label class="formLabel">家庭住址</label>
              <el-input
                v-model="form.homeAddr"
                placeholder="地址精确到门牌号"
              ></el-input
            ></div>
          </el-card>
          <div class="submitBtn" label-width="0">
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="submitDisabled"
              >确认并签名</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from '../../data/index.json';

export default {
  data() {
    return {
      ...jsonData,
      optInput: ['introducer1', 'introducer2', 'archiveAddr'],
      form: {
        userName: '',
        sex: '',
        nation: '',
        idNumber: '',
        birthDate: '',
        gradSchool: '',
        eduBg: '',
        peopleType: '',
        transferFrom: '',
        partyJoinDate: '',
        turnTrueDate: '',
        introducer1: '',
        introducer2: '',
        partyNormal: '',
        archiveAddr: '',
        phone: '',
        homeAddr: '',
        sign: '0',
      },
      submitDisabled: true,
    };
  },
  watch: {
    form: {
      handler(newProps) {
        this.isSubmitEnable(newProps);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    backPev() {
      this.$router.go(-1);
    },
    onSubmit() {
      // this.$router.push({ name: 'infoShow', params: { ...this.form } });
      this.$router.push({ name: 'signnew', params: { ...this.form } });
      // console.log(this.form);
    },
    isSubmitEnable(newProps) {
      try {
        Object.keys(newProps).forEach((key) => {
          // 如果该字段为空，但这是必填的
          console.log(key, this.form[key], this.optInput.indexOf(key));
          if (this.form[key] === '' && this.optInput.indexOf(key) === -1) {
            console.log(key);
            console.log(this.form[key]);
            throw new Error('mustInput');
          }
        });
        this.submitDisabled = false;
      } catch (e) {
        if (e.message === 'mustInput') {
          this.submitDisabled = true;
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "index.scss";
</style>
