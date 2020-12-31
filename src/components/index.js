export default (Vue) => {
  Vue.component('canvasComp', () => import('./canvasComp'));
  Vue.component('mheader', () => import('./mheader'));
};
