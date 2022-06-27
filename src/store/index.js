import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import userModule from './module/user';

Vue.prototype.$axios = axios;

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule,
  },
});
