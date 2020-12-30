import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../mobilePages/home'),
  },
  {
    path: '/infoEdit',
    name: 'infoEdit',
    component: () => import('../mobilePages/infoEdit'),
    meta: { keepAlive: true },
  },
  {
    path: '/infoShow',
    name: 'infoShow',
    component: () => import('../mobilePages/infoShow'),
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../mobilePages/sign'),
  },
  {
    path: '/pc/admin',
    name: 'admin',
    component: () => import('../PCPages/admin'),
  },
  {
    path: '/pc/infoShow',
    name: 'pcInfoShow',
    component: () => import('../PCPages/infoShow'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
