import Vue from 'vue';
import VueRouter from 'vue-router';
import CountryDetailsView from '@/views/CountryDetailsView/CountryDetailsView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "homeView" */ '../views/HomeView/HomeView.vue'),
  },
  {
    path: '/countries',
    name: 'countries',
    component: () => import(/* webpackChunkName: "countriesView" */ '../views/CountriesView/CountriesView.vue'),
    meta: {
      title: 'Countries | TERRIS',
    },
  },
  {
    path: '/country/:countryName',
    name: 'country',
    component: CountryDetailsView,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

const DEFAULT_TITLE = 'TERRIS';
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = (
      to.name === 'country'
        ? `${to.params.countryName} | ${DEFAULT_TITLE}`
        : to.meta.title)
      || DEFAULT_TITLE;
  });
});

export default router;
