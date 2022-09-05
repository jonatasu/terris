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
    storedRegions: [],
    darkMode: false,
    loading: false,
  },
  mutations: {
    addVisitedCountry(state, payload) {
      state.visitedCountries[payload.code] = payload.info;
    },
    setAppBarCountryDetails(state, payload) {
      state.appBarFlagCountryDetails = payload;
    },
    setRegions(state, payload) {
      state.storedRegions = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
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
    setRegions({ commit }, payload) {
      commit('setRegions', payload);
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
  },
});
