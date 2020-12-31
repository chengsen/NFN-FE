<template>
  <div>
    <mheader :back="true"></mheader>
    <canvasComp @getsign="savePNG"></canvasComp>
  </div>
</template>

<script>
import canvasComp from '../../components/canvasComp/index.vue';

export default {
  name: 'canvas',
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.form = this.$route.params;
  },
  components: {
    canvasComp,
  },
  methods: {
    backPev() {
      this.$router.go(-1);
    },
    savePNG(signData) {
      this.form.sign = signData;
      this.$router.push({ name: 'infoShow', params: { ...this.form } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
