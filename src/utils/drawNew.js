function Draw(canvas, degree, config = {}) {
  if (!(this instanceof Draw)) return new Draw(canvas, config);
  // eslint-disable-next-line consistent-return
  if (!canvas) return;
  let { width, height } = window.getComputedStyle(canvas, null);
  width = width.replace('px', '');
  height = height.replace('px', '');

  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.width = width;
  this.height = height;
  const { context } = this;

  // 根据设备像素比优化canvas绘图
  const { devicePixelRatio } = window;
  if (devicePixelRatio) {
    // eslint-disable-next-line no-param-reassign
    canvas.style.width = `${width}px`;
    // eslint-disable-next-line no-param-reassign
    canvas.style.height = `${height}px`;
    // eslint-disable-next-line no-param-reassign
    canvas.height = height * devicePixelRatio;
    // eslint-disable-next-line no-param-reassign
    canvas.width = width * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);
  } else {
    // eslint-disable-next-line no-param-reassign
    canvas.width = width;
    // eslint-disable-next-line no-param-reassign
    canvas.height = height;
  }

  context.lineWidth = 6;
  context.strokeStyle = 'black';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  Object.assign(context, config);

  const { left, top } = canvas.getBoundingClientRect();
  const point = {};
  const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
    navigator.userAgent,
  );
  // 去掉模糊以提高手写渲染速度
  context.shadowBlur = 0;
  let pressed = false;

  const paint = (signal) => {
    switch (signal) {
      case 1:
        context.beginPath();
        context.moveTo(point.x, point.y);
      // eslint-disable-next-line no-fallthrough
      case 2:
        context.lineTo(point.x, point.y);
        context.stroke();
        break;
      default:
    }
  };
  const create = (signal) => (e) => {
    e.preventDefault();
    if (signal === 1) {
      pressed = true;
    }
    if (signal === 1 || pressed) {
      // eslint-disable-next-line no-param-reassign
      e = isMobile ? e.touches[0] : e;
      point.x = e.clientX - left;
      point.y = e.clientY - top;
      paint(signal);
    }
  };
  const start = create(1);
  const move = create(2);
  const { requestAnimationFrame } = window;
  const optimizedMove = requestAnimationFrame
    ? (e) => {
      requestAnimationFrame(() => {
        move(e);
      });
    }
    : move;

  if (isMobile) {
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', optimizedMove);
  } else {
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', optimizedMove);
    ['mouseup', 'mouseleave'].forEach((event) => {
      canvas.addEventListener(event, () => {
        pressed = false;
      });
    });
  }

  this.degree = degree;
  context.rotate((degree * Math.PI) / 180);
  context.translate(-height, 0);
}
Draw.prototype = {
  scale(width, height, canvas = this.canvas) {
    const w = canvas.width;
    const h = canvas.height;
    // eslint-disable-next-line no-param-reassign
    width = width || w;
    // eslint-disable-next-line no-param-reassign
    height = height || h;
    if (width !== w || height !== h) {
      const tmpCanvas = document.createElement('canvas');
      const tmpContext = tmpCanvas.getContext('2d');
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      tmpContext.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
      // eslint-disable-next-line no-param-reassign
      canvas = tmpCanvas;
    }
    return canvas;
  },
  rotate(degree, image = this.canvas) {
    // eslint-disable-next-line no-param-reassign
    degree = Number(degree);
    if (degree !== 0) {
      const maxDegree = 180;
      const minDegree = -90;
      if (degree > maxDegree) {
        // eslint-disable-next-line no-param-reassign
        degree = maxDegree;
      } else if (degree < minDegree) {
        // eslint-disable-next-line no-param-reassign
        degree = minDegree;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const { height } = image;
      const { width } = image;
      const degreePI = (degree * Math.PI) / 180;

      switch (degree) {
        // 逆时针旋转90°
        case -90:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degreePI);
          context.drawImage(image, -width, 0);
          break;
        // 顺时针旋转90°
        case 90:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degreePI);
          context.drawImage(image, 0, -height);
          break;
        // 顺时针旋转180°
        case 180:
          canvas.width = width;
          canvas.height = height;
          context.rotate(degreePI);
          context.drawImage(image, -width, -height);
          break;
        default:
      }
      // eslint-disable-next-line no-param-reassign
      image = canvas;
    }
    return image;
  },
  getPNGImage(canvas = this.canvas) {
    return canvas.toDataURL('image/png');
  },
  getJPGImage(canvas = this.canvas) {
    return canvas.toDataURL('image/jpeg', 0.5);
  },
  downloadPNGImage(image) {
    const url = image.replace(
      'image/png',
      'image/octet-stream;Content-Disposition:attachment;filename=test.png',
    );
    window.location.href = url;
  },
  dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  clear() {
    let width;
    let height;
    switch (this.degree) {
      case -90:
      case 90:
        width = this.height;
        height = this.width;
        break;
      default:
        width = this.width;
        height = this.height;
    }
    this.context.clearRect(0, 0, width, height);
  },
  upload(blob, url, success, failure) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    formData.append('image', blob, 'sign');

    xhr.open('POST', url, true);
    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        success(xhr.responseText);
      } else {
        failure();
      }
    };
    xhr.onerror = (e) => {
      if (typeof failure === 'function') {
        failure(e);
      } else {
        console.log(`upload img error: ${e}`);
      }
    };
    xhr.send(formData);
  },
};
export default Draw;
