import Vue from 'vue';

import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import '@/styles/index.css';
import registerComponents from './components';
import Common from './utils/globalVar.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.Common = Common;

registerComponents(Vue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
