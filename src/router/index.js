import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "homeView" */ '../views/HomeView.vue'),
  },
  {
    path: '/country/:countryName',
    name: 'country',
    component: () => import(/* webpackChunkName: "countryView" */ '../views/CountryView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
