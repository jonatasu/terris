import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    countryNameList: [],
    visitedCountries: {},
    appBarFlagCountryDetails: {
      flag: '',
      name: '',
      flagImg: '',
    },
  },
  getters: {
  },
  mutations: {
    addVisitedCountry(state, payload) {
      state.visitedCountries[payload.code] = payload.info;
    },
    setAppBarCountryDetails(state, payload) {
      state.appBarFlagCountryDetails = payload;
    },
  },
  actions: {
    addVisitedCountry({ commit }, payload) {
      if (!this.state.visitedCountries[payload.code]) {
        commit('addVisitedCountry', payload);
      }
    },
    setAppBarCountryDetails({ commit }, payload) {
      commit('setAppBarCountryDetails', payload);
    },
  },
  modules: {
  },
});
