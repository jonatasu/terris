import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    countryNameList: [],
    visitedCountries: {},
  },
  getters: {
  },
  mutations: {
    addVisitedCountry(state, payload) {
      state.visitedCountries[payload.code] = payload.info;
    },
  },
  actions: {
    addVisitedCountry({ commit }, payload) {
      if (!this.state.visitedCountries[payload.code]) {
        commit('addVisitedCountry', payload);
      }
    },
  },
  modules: {
  },
});
