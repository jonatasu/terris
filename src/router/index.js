import Vue from 'vue';
import VueRouter from 'vue-router';
import CountryView from '@/views/CountryView.vue';

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
    component: CountryView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
