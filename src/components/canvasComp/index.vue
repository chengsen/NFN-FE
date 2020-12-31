<template>
  <div>
    <div id="canvasBox" :style="getHorizontalStyle" v-show="!showBox">
      <canvas></canvas>
      <div class="signMsg" :style="getHorizontalStyle2">签字区域</div>
      <div class="greet">
        <el-button @click="clear">清除</el-button>
        <el-button type="primary" @click="savePNG">确定</el-button>
      </div>
    </div>
    <div class="image-box" v-show="showBox">
      <header>
        请长按图片并保存至本地后发送好友
        <input type="button" value="返回" @click="showBox = false" />
      </header>
      <img :src="signImage" />
    </div>
  </div>
</template>

<script>
import Draw from '@/utils/drawNew';

export default {
  name: 'canvasComp',
  data() {
    return {
      // msg: '请在下方空白处签名',
      degree: 90,
      signImage: null,
      showBox: false,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Draw,
  },
  beforeCreate() {
    // document.title = '手写签名';
    // console.log('beforecreated');
  },
  mounted() {
    // console.log('mounted');
    this.initCanvas();
  },
  created() {
    // console.log('created');
  },
  computed: {
    getHorizontalStyle() {
      console.log('computed');
      const d = document;
      // const mheaderW = mheader.offsetWidth;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      // const w = d.documentElement.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      // const h = d.documentElement.clientHeight;
      const length = (h - w) / 2;
      const width = h;
      const height = w;
      // switch (this.degree) {
      //   // case -90:
      //   // length = -length;
      //   // eslint-disable-next-line no-fallthrough
      //   case 90:
      //     width = h;
      //     height = w;
      //     break;
      //   default:
      //     length = 0;
      // }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        // eslint-disable-next-line vue/no-async-in-computed-properties
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center',
      };
    },
    getHorizontalStyle2() {
      const d = document;
      // const mheaderW = mheader.offsetWidth;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      // const w = d.documentElement.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      // const h = d.documentElement.clientHeight;
      const length = (h - w) / 2;
      const width = h;
      const height = w * 0.79;
      return {
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center',
      };
    },
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    // download() {
    //   this.draw.downloadPNGImage(this.draw.getPNGImage());
    // },
    savePNG() {
      this.signImage = this.draw.getPNGImage();
      this.$emit('getsign', this.signImage);
      console.log(this.signImage);
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

<style lang="scss" scoped>
@import "index.scss";
.container {
  width: 100%;
  height: 100%;
}

input {
  font-size: 20px;
}
.greet select {
  font-size: 18px;
}

.image-box {
  width: 100%;
  height: 100%;
}
.image-box header {
  font-size: 18px;
}
.image-box img {
  max-width: 80%;
  max-height: 80%;
  margin-top: 50px;
  border: 1px solid gray;
}
</style>
