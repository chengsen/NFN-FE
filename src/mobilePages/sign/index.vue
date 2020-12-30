<template>
  <div class="homeSign">
    <div class="containerSign">
      <div class="back" @click="backPev">返回</div>
      <div class="mheader">党员信息表</div>
      <div class="mainSign">
        <div id="canvasBox">
          <canvas id="canvasItem" @mousemove="savePNG"></canvas>
          <div class="tools">
            <div class="toolsBtn">
              <el-button @click="clear">清除</el-button>
              <el-button
                type="primary"
                @click="savePNG"
                >确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draw from '@/utils/draw';

export default {
  name: 'canvas',
  data() {
    return {
      // degree: 90,
      form: {},
      signImage: null,
      // canvasBoxStyle: {},
    };
  },
  mounted() {
    this.form = this.$route.params;
    this.initCanvas();
  },
  methods: {
    backPev() {
      this.$router.go(-1);
    },
    initCanvas() {
      const canvas = document.getElementById('canvasItem');
      this.draw = new Draw(canvas, 0);
    },
    clear() {
      this.draw.clear();
    },
    // download() {
    //   this.draw.downloadPNGImage(this.draw.getPNGImage());
    // },
    savePNG() {
      this.form.sign = this.draw.getPNGImage();
      // console.log(this.form.sign);
      this.$router.push({ name: 'infoShow', params: { ...this.form } });
      // this.showBox = true;
    },
    // upload() {
    //   const image = this.draw.getPNGImage();
    //   const blob = this.draw.dataURLtoBlob(image);
    //   const url = '';
    //   const successCallback = (response) => {
    //     console.log(response);
    //   };
    //   const failureCallback = (error) => {
    //     console.log(error);
    //   };
    //   this.draw.upload(blob, url, successCallback, failureCallback);
    // },
  },
};
</script>

<style lang='scss'>
@import "index.scss";
// .container {
//   width: 100%;
//   height: 100%;
// }
// #canvasBox {
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 80%;
// }
// .greet {
//   padding: 10px;
//   // font-size: 20px;
//   width: 90%;
//   // user-select: none;
//   display: flex;
//   justify-content: space-between;
//   .smallImg {
//     width: 40%;
//     height: 30%;
//     margin-top: 0px;
//     border: 1px solid gray;
//   }
// }
// input {
//   font-size: 20px;
// }
// .greet select {
//   font-size: 18px;
// }
// canvas {
//   flex: 1;
//   cursor: crosshair;
//   border: 2px dashed lightgray;
// }
// .image-box {
//   width: 100%;
//   height: 100%;
// }
// .image-box header {
//   font-size: 18px;
// }
// .image-box img {
//   max-width: 80%;
//   max-height: 80%;
//   margin-top: 50px;
//   border: 1px solid gray;
// }
</style>
